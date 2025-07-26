import { useState, useEffect } from 'react';
import { movies } from '@/data/movies';
import { sampleUsers } from '@/data/users';
import { User, UserRating, Recommendation } from '@/types/recommendation';
import { getHybridRecommendations, getCollaborativeRecommendations, getContentBasedRecommendations } from '@/utils/recommendationEngine';
import { MovieCard } from './MovieCard';
import { RecommendationCard } from './RecommendationCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Users, Sparkles, Star } from 'lucide-react';

export function RecommendationSystem() {
  const [currentUser, setCurrentUser] = useState<User>(sampleUsers[0]);
  const [allUsers, setAllUsers] = useState<User[]>(sampleUsers);
  const [recommendations, setRecommendations] = useState<{
    hybrid: Recommendation[];
    collaborative: Recommendation[];
    contentBased: Recommendation[];
  }>({
    hybrid: [],
    collaborative: [],
    contentBased: []
  });

  const handleRate = (movieId: number, rating: number) => {
    const existingRatingIndex = currentUser.ratings.findIndex(r => r.movieId === movieId);
    const newRatings = [...currentUser.ratings];
    
    if (existingRatingIndex >= 0) {
      newRatings[existingRatingIndex] = { movieId, rating, userId: currentUser.id };
    } else {
      newRatings.push({ movieId, rating, userId: currentUser.id });
    }

    const updatedUser = { ...currentUser, ratings: newRatings };
    setCurrentUser(updatedUser);

    // Update the user in allUsers array
    const updatedAllUsers = allUsers.map(user => 
      user.id === currentUser.id ? updatedUser : user
    );
    setAllUsers(updatedAllUsers);
  };

  useEffect(() => {
    if (currentUser.ratings.length > 0) {
      const hybrid = getHybridRecommendations(currentUser, allUsers, movies, 8);
      const collaborative = getCollaborativeRecommendations(currentUser, allUsers, movies, 6);
      const contentBased = getContentBasedRecommendations(currentUser, movies, 6);
      
      setRecommendations({
        hybrid,
        collaborative,
        contentBased
      });
    }
  }, [currentUser, allUsers]);

  const getUserRating = (movieId: number) => {
    return currentUser.ratings.find(r => r.movieId === movieId)?.rating;
  };

  const ratedMovies = movies.filter(movie => 
    currentUser.ratings.some(r => r.movieId === movie.id)
  );

  const unratedMovies = movies.filter(movie => 
    !currentUser.ratings.some(r => r.movieId === movie.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            CinemaAI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your next favorite movie with AI-powered recommendations
          </p>
        </div>

        {/* Getting Started / Rating Section */}
        {currentUser.ratings.length === 0 ? (
          <div className="bg-card rounded-xl shadow-lg border border-border p-8 mb-8 text-center">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-card-foreground mb-3">
              Get Started with Personalized Recommendations
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Rate a few movies below to unlock AI-powered recommendations tailored just for you!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies.slice(0, 8).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  userRating={getUserRating(movie.id)}
                  onRate={handleRate}
                />
              ))}
            </div>
          </div>
        ) : (
          <Tabs defaultValue="recommendations" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                For You
              </TabsTrigger>
              <TabsTrigger value="collaborative" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Similar Users
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Your Taste
              </TabsTrigger>
              <TabsTrigger value="rate" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Rate Movies
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recommendations" className="mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Recommended for You
                </h2>
                <p className="text-muted-foreground">
                  Based on your ratings and similar users' preferences
                </p>
              </div>
              {recommendations.hybrid.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recommendations.hybrid.map((rec) => (
                    <RecommendationCard
                      key={rec.movie.id}
                      recommendation={rec}
                      onRate={handleRate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Rate more movies to get better recommendations!
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="collaborative" className="mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  People Like You Also Enjoyed
                </h2>
                <p className="text-muted-foreground">
                  Recommendations based on users with similar movie taste
                </p>
              </div>
              {recommendations.collaborative.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recommendations.collaborative.map((rec) => (
                    <RecommendationCard
                      key={rec.movie.id}
                      recommendation={rec}
                      onRate={handleRate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Rate more movies to find users with similar taste!
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="content" className="mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Based on Your Preferences
                </h2>
                <p className="text-muted-foreground">
                  Movies similar to ones you've rated highly
                </p>
              </div>
              {recommendations.contentBased.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recommendations.contentBased.map((rec) => (
                    <RecommendationCard
                      key={rec.movie.id}
                      recommendation={rec}
                      onRate={handleRate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Rate more movies to analyze your preferences!
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="rate" className="mt-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Rate More Movies
                </h2>
                <p className="text-muted-foreground">
                  The more you rate, the better your recommendations become!
                </p>
              </div>

              {ratedMovies.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Your Ratings ({ratedMovies.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {ratedMovies.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        userRating={getUserRating(movie.id)}
                        onRate={handleRate}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Discover New Movies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {unratedMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      userRating={getUserRating(movie.id)}
                      onRate={handleRate}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}