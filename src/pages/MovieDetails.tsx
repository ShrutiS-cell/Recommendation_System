import { useParams, Link } from 'react-router-dom';
import { movies } from '@/data/movies';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Calendar, User, Users } from 'lucide-react';
import { useState } from 'react';

export default function MovieDetails() {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id || ''));
  const [userRating, setUserRating] = useState<number>(0);

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Movie Not Found</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Movies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (currentRating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Button
        key={i}
        variant="ghost"
        size="sm"
        onClick={() => setUserRating(i + 1)}
        className={`${i < currentRating ? 'text-secondary' : 'text-muted-foreground'} p-1`}
      >
        <Star className={`w-5 h-5 ${i < currentRating ? 'fill-current' : ''}`} />
      </Button>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Movies
            </Button>
          </Link>
        </div>

        {/* Movie Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full max-w-md mx-auto rounded-xl shadow-2xl group-hover:shadow-3xl transition-all duration-300"
              />
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-secondary fill-current" />
                  <span className="font-bold text-lg">{movie.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Year */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">{movie.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{movie.director}</span>
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">Plot Summary</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{movie.description}</p>
            </div>

            {/* Cast */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Cast
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {movie.cast.map((actor) => (
                  <div
                    key={actor}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
                  >
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-card-foreground">{actor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* User Rating */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-xl font-semibold text-card-foreground mb-4">Rate This Movie</h2>
              <div className="flex items-center gap-2 mb-4">
                {renderStars(userRating)}
                {userRating > 0 && (
                  <span className="text-sm text-muted-foreground ml-2">
                    You rated this {userRating} star{userRating !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              {userRating > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUserRating(0)}
                >
                  Clear Rating
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}