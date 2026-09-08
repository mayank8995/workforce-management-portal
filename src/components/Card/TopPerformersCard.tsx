import { ChevronRight, TrendingUp, UserStar } from 'lucide-react';
import React from 'react';
import {
  CARD_BACKGROUND_COLOR,
  CARD_CONTENT_LIMIT_TO_SCROLL,
  VIEW_MORE_ROUTES_VALUES,
} from '../../utils/constants';
import { Link } from 'react-router-dom';
import type { TopPerformersList } from '../../types/types';
import Rating from '../UtilComponents/Rating';
import { loadViewMorePage } from '../../router/router';

const TopPerformersCard = ({ topPerformersList }: TopPerformersList) => {
  const getInitials = (name: string) =>
    String(name || '')
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <div
      className={`h-full ${CARD_BACKGROUND_COLOR} rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all duration-200 hover:shadow-xl`}
    >
      <div className="flex items-center justify-between gap-3 px-4 xl:px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <UserStar
            size={18}
            className="shrink-0 text-amber-500 dark:text-amber-400"
          />
          <h1 className="text-sm xl:text-base font-semibold text-slate-800 dark:text-slate-100 truncate">
            {topPerformersList?.title}
          </h1>
        </div>
        <span className="shrink-0 gap-1 whitespace-nowrap bg-green-50 text-green-700 ring-1 ring-green-200 text-[10px] xl:text-xs font-semibold px-2 py-0.5 rounded-full flex items-center tabular-nums dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-800">
          <TrendingUp size={12} strokeWidth={2.5} />
          <span>{topPerformersList?.trendValue}%</span>
        </span>
      </div>

      <div className="flex-1 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
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
                    className="min-w-0 flex items-center gap-2.5 xl:gap-3 px-4 xl:px-5 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    <span className="shrink-0 w-4 text-right text-xs font-medium tabular-nums text-slate-400 dark:text-slate-500">
                      {index + 1}
                    </span>
                    <span className="shrink-0 h-7 w-7 xl:h-8 xl:w-8 rounded-full flex items-center justify-center text-[10px] xl:text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                      {getInitials(value?.name)}
                    </span>
                    <span className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                        {value?.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {value?.designation}
                      </span>
                    </span>
                    <span className="shrink-0">
                      <Rating value={String(value?.rating)} />
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

export default React.memo(TopPerformersCard);
