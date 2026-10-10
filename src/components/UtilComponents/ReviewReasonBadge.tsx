import React from 'react';
import type { ReviewReasonBadgeProps } from '../../types/types';
import { reviewTone, toneBadge } from '../../theme/theme';

/** Pill showing why an employee needs review, coloured by `reviewTone`. */
const ReviewReasonBadge = ({ value }: ReviewReasonBadgeProps) => {
  if (!value) {
    return;
  }

  return (
    <div className="flex flex-col items-start p-1 flex-1 min-w-0">
      <div
        className={toneBadge(
          reviewTone[value.toLocaleLowerCase()] ?? 'neutral'
        )}
      >
        {value}
      </div>
    </div>
  );
};

export default React.memo(ReviewReasonBadge);
