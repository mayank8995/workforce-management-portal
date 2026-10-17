import { ChevronRight, TrendingUp, UserStar } from 'lucide-react';
import React from 'react';
import {
  CARD_CONTENT_LIMIT_TO_SCROLL,
  VIEW_MORE_ROUTES_VALUES,
} from '../../utils/constants';
import { Link } from 'react-router-dom';
import type { TopPerformersList } from '../../types/types';
import Rating from '../UtilComponents/Rating';
import { loadViewMorePage } from '../../router/router';
import { avatar, card, cx, icon, text, toneBadge } from '../../theme/theme';

const TopPerformersCard = ({ topPerformersList }: TopPerformersList) => {
  const getInitials = (name: string) =>
    String(name || '')
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className={card.panel}>
      <div className={card.header}>
        <div className="flex items-center gap-2 min-w-0">
          <UserStar size={18} className={`shrink-0 ${icon.highlight}`} />
          <h1 className={card.title}>{topPerformersList?.title}</h1>
        </div>
        <span className={cx(toneBadge('success'), 'tabular-nums')}>
          <TrendingUp size={12} strokeWidth={2.5} />
          <span>{topPerformersList?.trendValue}%</span>
        </span>
      </div>

      <div className={card.list}>
        {Array.isArray(topPerformersList?.employees) &&
          topPerformersList?.employees?.map((value, index: number) => {
            return (
              <React.Fragment key={value._id + value.name + value.rating}>
                {index < CARD_CONTENT_LIMIT_TO_SCROLL && (
                  <Link
                    to="/home/dashboard/viewmore?target=topPerformers"
                    state={{ name: VIEW_MORE_ROUTES_VALUES.top_performers }}
                    onMouseEnter={() => {
                      loadViewMorePage();
                    }}
                    onPointerDown={() => loadViewMorePage()}
                    className={card.listRow}
                  >
                    <span
                      className={`shrink-0 w-4 text-right text-xs font-medium tabular-nums ${text.subtle}`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={cx(
                        avatar.base,
                        avatar.soft,
                        'h-7 w-7 xl:h-8 xl:w-8 text-[10px] xl:text-xs'
                      )}
                    >
                      {getInitials(value?.name)}
                    </span>
                    <span className="flex flex-col min-w-0 flex-1">
                      <span className={card.rowTitle}>{value?.name}</span>
                      <span className={card.rowSubtitle}>
                        {value?.designation}
                      </span>
                    </span>
                    <span className="shrink-0">
                      <Rating value={String(value?.rating)} />
                    </span>
                    <ChevronRight
                      size={16}
                      className={`shrink-0 ${text.subtle}`}
                    />
                  </Link>
                )}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default React.memo(TopPerformersCard);
