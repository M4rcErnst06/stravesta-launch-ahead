
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, disabled = false }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !disabled && onRatingChange(star)}
          disabled={disabled}
          className={`p-1 transition-colors ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              star <= rating
                ? 'fill-stravesta-teal text-stravesta-teal'
                : 'text-stravesta-lightGray hover:text-stravesta-teal/60'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
