import { ChevronRight, ChevronsUp, TrendingUp, Trophy } from 'lucide-react';
import type { PromotedList } from '../../types/types';
import React from 'react';
import {
  CARD_BACKGROUND_COLOR,
  CARD_CONTENT_LIMIT_TO_SCROLL,
  gradients,
  VIEW_MORE_ROUTES_VALUES,
} from '../../utils/constants';
import { Link } from 'react-router-dom';
import { loadViewMorePage } from '../../router/router';

const PromotedCard = ({ promotedThisYear }: PromotedList) => {
  return (
    <div
      className={`h-full ${CARD_BACKGROUND_COLOR} rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all duration-200 hover:shadow-xl`}
    >
      <div className="flex items-center justify-between gap-3 px-4 xl:px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <Trophy
            size={18}
            className="shrink-0 text-amber-500 dark:text-amber-400"
          />
          <h1 className="text-sm xl:text-base font-semibold text-slate-800 dark:text-slate-100 truncate">
            {promotedThisYear?.title}
          </h1>
        </div>
        <h2 className="shrink-0 gap-1 whitespace-nowrap bg-green-50 text-green-700 ring-1 ring-green-200 text-[10px] xl:text-xs font-semibold px-2 py-0.5 rounded-full flex items-center tabular-nums dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-800">
          <TrendingUp size={12} strokeWidth={2.5} />
          <span>{promotedThisYear?.trendValue}%</span>
        </h2>
      </div>

      <div className="flex-1 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
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
                        {value?.currentDesignation}
                      </span>
                    </span>
                    <span className="shrink-0 flex items-center gap-0.5 text-xs whitespace-nowrap tabular-nums text-amber-600 dark:text-amber-400">
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

export default React.memo(PromotedCard);
