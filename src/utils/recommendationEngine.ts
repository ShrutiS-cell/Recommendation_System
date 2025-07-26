import { Movie, User, UserRating, Recommendation } from '@/types/recommendation';

// Calculate similarity between two users based on their ratings
function calculateUserSimilarity(user1Ratings: UserRating[], user2Ratings: UserRating[]): number {
  const commonMovies = user1Ratings.filter(rating1 => 
    user2Ratings.some(rating2 => rating2.movieId === rating1.movieId)
  );

  if (commonMovies.length === 0) return 0;

  const sum1 = commonMovies.reduce((sum, rating) => sum + rating.rating, 0);
  const sum2 = commonMovies.reduce((sum, rating) => {
    const matchingRating = user2Ratings.find(r => r.movieId === rating.movieId);
    return sum + (matchingRating?.rating || 0);
  }, 0);

  const sum1Sq = commonMovies.reduce((sum, rating) => sum + Math.pow(rating.rating, 2), 0);
  const sum2Sq = commonMovies.reduce((sum, rating) => {
    const matchingRating = user2Ratings.find(r => r.movieId === rating.movieId);
    return sum + Math.pow(matchingRating?.rating || 0, 2);
  }, 0);

  const pSum = commonMovies.reduce((sum, rating) => {
    const matchingRating = user2Ratings.find(r => r.movieId === rating.movieId);
    return sum + rating.rating * (matchingRating?.rating || 0);
  }, 0);

  const num = pSum - (sum1 * sum2 / commonMovies.length);
  const den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / commonMovies.length) * 
                        (sum2Sq - Math.pow(sum2, 2) / commonMovies.length));

  if (den === 0) return 0;
  return num / den;
}

// Collaborative filtering recommendation
export function getCollaborativeRecommendations(
  currentUser: User,
  allUsers: User[],
  allMovies: Movie[],
  count: number = 5
): Recommendation[] {
  const similarities = allUsers
    .filter(user => user.id !== currentUser.id)
    .map(user => ({
      user,
      similarity: calculateUserSimilarity(currentUser.ratings, user.ratings)
    }))
    .filter(item => item.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity);

  const movieScores: { [movieId: number]: { score: number; count: number } } = {};
  const ratedMovieIds = new Set(currentUser.ratings.map(r => r.movieId));

  similarities.forEach(({ user, similarity }) => {
    user.ratings.forEach(rating => {
      if (!ratedMovieIds.has(rating.movieId)) {
        if (!movieScores[rating.movieId]) {
          movieScores[rating.movieId] = { score: 0, count: 0 };
        }
        movieScores[rating.movieId].score += rating.rating * similarity;
        movieScores[rating.movieId].count += similarity;
      }
    });
  });

  const recommendations = Object.entries(movieScores)
    .map(([movieId, { score, count }]) => {
      const movie = allMovies.find(m => m.id === parseInt(movieId));
      return movie ? {
        movie,
        score: count > 0 ? score / count : 0,
        reason: `Recommended by users with similar taste`,
        type: 'collaborative' as const
      } : null;
    })
    .filter((rec): rec is NonNullable<typeof rec> => rec !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, count);

  return recommendations;
}

// Content-based filtering recommendation
export function getContentBasedRecommendations(
  currentUser: User,
  allMovies: Movie[],
  count: number = 5
): Recommendation[] {
  const userPreferences: { [genre: string]: number } = {};
  let totalRatings = 0;

  // Calculate genre preferences based on user ratings
  currentUser.ratings.forEach(rating => {
    const movie = allMovies.find(m => m.id === rating.movieId);
    if (movie) {
      movie.genre.forEach(genre => {
        if (!userPreferences[genre]) userPreferences[genre] = 0;
        userPreferences[genre] += rating.rating;
        totalRatings += rating.rating;
      });
    }
  });

  // Normalize preferences
  Object.keys(userPreferences).forEach(genre => {
    userPreferences[genre] = userPreferences[genre] / totalRatings;
  });

  const ratedMovieIds = new Set(currentUser.ratings.map(r => r.movieId));
  
  const recommendations = allMovies
    .filter(movie => !ratedMovieIds.has(movie.id))
    .map(movie => {
      let score = 0;
      movie.genre.forEach(genre => {
        if (userPreferences[genre]) {
          score += userPreferences[genre];
        }
      });
      
      // Boost score for higher-rated movies and recent movies
      score *= (movie.rating / 10);
      if (movie.year > 2010) score *= 1.1;

      return {
        movie,
        score,
        reason: `Matches your preference for ${movie.genre.slice(0, 2).join(' and ')} movies`,
        type: 'content-based' as const
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count);

  return recommendations;
}

// Get hybrid recommendations combining both approaches
export function getHybridRecommendations(
  currentUser: User,
  allUsers: User[],
  allMovies: Movie[],
  count: number = 10
): Recommendation[] {
  const collaborative = getCollaborativeRecommendations(currentUser, allUsers, allMovies, Math.ceil(count / 2));
  const contentBased = getContentBasedRecommendations(currentUser, allMovies, Math.ceil(count / 2));
  
  const combined = [...collaborative, ...contentBased];
  const uniqueRecommendations = combined.reduce((acc, rec) => {
    const existing = acc.find(r => r.movie.id === rec.movie.id);
    if (!existing) {
      acc.push(rec);
    } else if (rec.score > existing.score) {
      const index = acc.indexOf(existing);
      acc[index] = rec;
    }
    return acc;
  }, [] as Recommendation[]);

  return uniqueRecommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}