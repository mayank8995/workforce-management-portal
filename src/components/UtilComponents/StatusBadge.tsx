import React from 'react';
import type { StatusBadgeProps } from '../../types/types';
import { statusTone, toneBadge } from '../../theme/theme';

/** Pill showing a project / employee status, coloured by `statusTone`. */
const StatusBadge = ({ value }: StatusBadgeProps) => {
  if (!value) {
    return;
  }
  return (
    <div className="flex flex-col items-start flex-1 min-w-0">
      <div
        className={toneBadge(
          statusTone[value.toLocaleLowerCase()] ?? 'neutral'
        )}
      >
        {value}
      </div>
    </div>
  );
};

export default React.memo(StatusBadge);
