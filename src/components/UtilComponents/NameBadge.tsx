import React from 'react';
import type { NameBadgeProps } from '../../types/types';
import { NAME } from '../../utils/constants';
import { avatar, cx, text } from '../../theme/theme';

/** Initials avatar followed by the person's name. */
const NameBadge = ({ value, id }: NameBadgeProps) => {
  if (!value) {
    return;
  }
  return (
    <div className="flex items-center flex-1 min-w-0 gap-2">
      <h1
        className={cx(avatar.base, avatar.brand, 'w-8 h-8 text-xs font-bold')}
      >
        {value
          ?.split(' ')
          .map((n: string) => n[0])
          .join('')}
      </h1>
      <h2
        className={cx(id === NAME ? text.accent : text.secondary, 'truncate')}
      >
        {value}
      </h2>
    </div>
  );
};

export default React.memo(NameBadge);
