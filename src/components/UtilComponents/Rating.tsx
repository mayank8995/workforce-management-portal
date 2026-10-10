import { Star } from 'lucide-react';
import type { RatingProps } from '../../types/types';
import React from 'react';
import { icon, text } from '../../theme/theme';

/** Numeric rating followed by a star. */
const Rating = ({ value }: RatingProps) => {
  return (
    <div className="shrink-0 self-start min-w-0 flex gap-1 text-sm font-bold items-center">
      <h1 className={`${text.primary} text-xs`}>{Number(value).toFixed(1)}</h1>
      <Star size={14} className={icon.rating} fill="currentColor" />
    </div>
  );
};

export default React.memo(Rating);
