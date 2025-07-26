import { Recommendation } from '@/types/recommendation';
import { MovieCard } from './MovieCard';
import { Brain, Users } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onRate?: (movieId: number, rating: number) => void;
}

export function RecommendationCard({ recommendation, onRate }: RecommendationCardProps) {
  const { movie, score, reason, type } = recommendation;

  return (
    <div className="relative">
      <MovieCard movie={movie} onRate={onRate} showRating={true} />
      
      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-lg">
        {(score * 10).toFixed(0)}% match
      </div>
      
      <div className="mt-3 bg-muted/50 backdrop-blur-sm rounded-lg p-3 border border-border">
        <div className="flex items-center gap-2 mb-2">
          {type === 'collaborative' ? (
            <Users className="w-4 h-4 text-primary" />
          ) : (
            <Brain className="w-4 h-4 text-accent" />
          )}
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {type === 'collaborative' ? 'People like you' : 'Based on your taste'}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{reason}</p>
      </div>
    </div>
  );
}