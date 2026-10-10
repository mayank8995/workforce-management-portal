import { ChevronRight, ChevronsUp, TrendingUp, Trophy } from 'lucide-react';
import type { PromotedList } from '../../types/types';
import React from 'react';
import {
  CARD_CONTENT_LIMIT_TO_SCROLL,
  VIEW_MORE_ROUTES_VALUES,
} from '../../utils/constants';
import { Link } from 'react-router-dom';
import { loadViewMorePage } from '../../router/router';
import {
  avatar,
  avatarGradient,
  card,
  cx,
  icon,
  text,
  toneBadge,
} from '../../theme/theme';

const PromotedCard = ({ promotedThisYear }: PromotedList) => {
  return (
    <div className={card.panel}>
      <div className={card.header}>
        <div className="flex items-center gap-2 min-w-0">
          <Trophy size={18} className={`shrink-0 ${icon.highlight}`} />
          <h1 className={card.title}>{promotedThisYear?.title}</h1>
        </div>
        <h2 className={cx(toneBadge('success'), 'tabular-nums')}>
          <TrendingUp size={12} strokeWidth={2.5} />
          <span>{promotedThisYear?.trendValue}%</span>
        </h2>
      </div>

      <div className={card.list}>
        {Array.isArray(promotedThisYear?.employees) &&
          promotedThisYear?.employees?.map((value, index: number) => {
            return (
              <React.Fragment key={value._id + value.name + value.promotedOn}>
                {index < CARD_CONTENT_LIMIT_TO_SCROLL && (
                  <Link
                    to="/home/dashboard/viewmore?target=promotedThisYear"
                    state={{ name: VIEW_MORE_ROUTES_VALUES.promotedThisYear }}
                    onMouseEnter={() => {
                      loadViewMorePage();
                    }}
                    onPointerDown={() => loadViewMorePage()}
                    className={card.listRow}
                  >
                    <span
                      className={cx(
                        avatar.base,
                        'w-7 h-7 xl:w-8 xl:h-8 text-[10px] xl:text-xs',
                        avatarGradient(index)
                      )}
                    >
                      {value.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')}
                    </span>
                    <span className="flex flex-col flex-1 min-w-0">
                      <span className={card.rowTitle}>{value?.name}</span>
                      <span className={card.rowSubtitle}>
                        {value?.currentDesignation}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 flex items-center gap-0.5 text-xs whitespace-nowrap tabular-nums ${text.warning}`}
                    >
                      <ChevronsUp size={12} strokeWidth={2.5} />
                      <time dateTime={value?.promotedOn}>
                        {new Date(value?.promotedOn).toLocaleDateString(
                          'en-US',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </time>
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

export default React.memo(PromotedCard);
