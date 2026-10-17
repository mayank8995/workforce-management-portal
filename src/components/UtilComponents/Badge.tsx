import React from 'react';
import type { BadgeProps } from '../../types/types';
import { toneBadge } from '../../theme/theme';

/** Generic success-toned pill (e.g. work mode). */
const Badge = ({ value }: BadgeProps) => {
  return (
    <div className="flex flex-col items-start flex-1 min-w-0">
      <div className={toneBadge('success')}>{value}</div>
    </div>
  );
};

export default React.memo(Badge);
