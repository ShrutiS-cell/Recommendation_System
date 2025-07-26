import { Movie } from '@/types/recommendation';
import { Button } from '@/components/ui/button';
import { Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  userRating?: number;
  onRate?: (movieId: number, rating: number) => void;
  showRating?: boolean;
}

export function MovieCard({ movie, userRating, onRate, showRating = true }: MovieCardProps) {
  const renderStars = (currentRating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Button
        key={i}
        variant="rating"
        size="sm"
        onClick={() => onRate?.(movie.id, i + 1)}
        className={`${i < currentRating ? 'text-secondary' : 'text-muted-foreground'} p-1`}
        disabled={!onRate}
      >
        <Star className={`w-4 h-4 ${i < currentRating ? 'fill-current' : ''}`} />
      </Button>
    ));
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border">
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-sm font-medium text-foreground">★ {movie.rating}</span>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-card-foreground mb-1">{movie.title}</h3>
          <p className="text-sm text-muted-foreground">{movie.year} • {movie.director}</p>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {movie.genre.map((g) => (
            <span
              key={g}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {g}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{movie.description}</p>
        
        <div className="flex gap-2">
          <Link to={`/movie/${movie.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </Link>
        </div>
        
        {showRating && (
          <div className="border-t border-border pt-3">
            <p className="text-sm font-medium text-card-foreground mb-2">Rate this movie:</p>
            <div className="flex gap-1">
              {renderStars(userRating)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}