export interface Movie {
  id: number;
  title: string;
  genre: string[];
  year: number;
  rating: number;
  description: string;
  poster: string;
  director: string;
  cast: string[];
}

export interface UserRating {
  movieId: number;
  rating: number;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  ratings: UserRating[];
}

export interface Recommendation {
  movie: Movie;
  score: number;
  reason: string;
  type: 'collaborative' | 'content-based';
}