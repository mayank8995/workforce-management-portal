import { ChevronRight, TrendingDown, TriangleAlert } from 'lucide-react';
import type { ReviewList } from '../../types/types';
import React from 'react';
import {
  CARD_BACKGROUND_COLOR,
  CARD_CONTENT_LIMIT_TO_SCROLL,
  gradients,
  VIEW_MORE_ROUTES_VALUES,
} from '../../utils/constants';
import { Link } from 'react-router-dom';
import { loadViewMorePage } from '../../router/router';

const RequiringReviewCard = ({ requiringReview }: ReviewList) => {
  return (
    <div
      className={`h-full ${CARD_BACKGROUND_COLOR} rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all duration-200 hover:shadow-xl`}
    >
      <div className="flex flex-row items-center justify-between gap-3 px-4 xl:px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <TriangleAlert
            size={18}
            className="shrink-0 text-amber-500 dark:text-amber-400"
          />
          <h1 className="text-sm xl:text-base font-semibold text-slate-800 dark:text-slate-100 truncate">
            {requiringReview?.title}
          </h1>
        </div>
        <h2 className="shrink-0 gap-1 whitespace-nowrap bg-amber-50 text-amber-700 ring-1 ring-amber-200 text-[10px] xl:text-xs font-semibold px-2 py-0.5 rounded-full flex items-center tabular-nums dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-800">
          <TrendingDown size={12} strokeWidth={2.5} />
          <span>{requiringReview?.trendValue}%</span>
        </h2>
      </div>

      <div className="flex-1 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
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
                    className="flex flex-row items-center gap-2.5 xl:gap-3 min-w-0 px-4 xl:px-5 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    <span
                      className={`shrink-0 w-7 h-7 xl:w-8 xl:h-8 rounded-full text-white font-semibold text-[10px] xl:text-xs flex items-center justify-center ${gradients[index % gradients.length]}`}
                    >
                      {value.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')}
                    </span>
                    <span className="flex flex-col flex-1 min-w-0">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                        {value?.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {value?.designation}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 flex items-center text-[10px] xl:text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ring-1
            ${value.reviewReason[0] === 'Low Rating' ? 'bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-900' : ''}
            ${value.reviewReason[0] === 'Low Attendance' ? 'bg-yellow-50 text-yellow-700 ring-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-900' : ''}
            ${value.reviewReason[0] === 'On Notice' ? 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-900' : ''}
            ${value.reviewReason[0] === 'Low Satisfaction' ? 'bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-900' : ''}
          `}
                    >
                      {value.reviewReason[0]}
                    </span>
                    <ChevronRight
                      size={16}
                      className="shrink-0 text-slate-300 dark:text-slate-600"
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
