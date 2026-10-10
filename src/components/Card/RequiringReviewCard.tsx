import { ChevronRight, TrendingDown, TriangleAlert } from 'lucide-react';
import type { ReviewList } from '../../types/types';
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
  reviewTone,
  text,
  toneBadge,
} from '../../theme/theme';

const RequiringReviewCard = ({ requiringReview }: ReviewList) => {
  return (
    <div className={card.panel}>
      <div className={card.header}>
        <div className="flex items-center gap-2 min-w-0">
          <TriangleAlert size={18} className={`shrink-0 ${icon.highlight}`} />
          <h1 className={card.title}>{requiringReview?.title}</h1>
        </div>
        <h2 className={cx(toneBadge('warning'), 'tabular-nums')}>
          <TrendingDown size={12} strokeWidth={2.5} />
          <span>{requiringReview?.trendValue}%</span>
        </h2>
      </div>

      <div className={card.list}>
        {Array.isArray(requiringReview?.employees) &&
          requiringReview?.employees?.map((value, index: number) => {
            return (
              <React.Fragment key={value._id + value.name + value.rating}>
                {index < CARD_CONTENT_LIMIT_TO_SCROLL && (
                  <Link
                    to="/home/dashboard/viewmore?target=requiringReview"
                    state={{ name: VIEW_MORE_ROUTES_VALUES.requiringReview }}
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
                        {value?.designation}
                      </span>
                    </span>
                    <span
                      className={toneBadge(
                        reviewTone[
                          String(value.reviewReason[0]).toLowerCase()
                        ] ?? 'neutral'
                      )}
                    >
                      {value.reviewReason[0]}
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

export default React.memo(RequiringReviewCard);
