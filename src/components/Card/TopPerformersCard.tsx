import { ArrowRight, Medal, TrendingUp, UserStar } from 'lucide-react';
import React from 'react';
import {
  CARD_BACKGROUND_COLOR,
  CARD_CONTENT_LIMIT_TO_SCROLL,
  VIEW_MORE,
  VIEW_MORE_ROUTES_VALUES,
} from '../../utils/constants';
import { Link } from 'react-router-dom';
import type { TopPerformersList } from '../../types/types';
import Rating from '../UtilComponents/Rating';
import { loadViewMorePage } from '../../router/router';

const TopPerformersCard = ({ topPerformersList }: TopPerformersList) => {
  const getMedalClassName = (index: number) => {
    if (index === 0) {
      return 'text-yellow-400';
    }
    if (index === 1) {
      return 'text-gray-400';
    }
    if (index === 2) {
      return 'text-amber-600';
    }
    return '';
  };

  return (
    // <div className=" h-full bg-linear-to-br from-white to-indigo-50/40 rounded-2xl shadow-sm border border-slate-100 p-4 xl:p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/40  hover:-translate-y-0.5 transition-all duration-200 dark:bg-linear-to-br dark:from-slate-900 dark:to-yellow-950/20 dark:border-none">
    <div
      className={`h-full ${CARD_BACKGROUND_COLOR} rounded-2xl shadow-sm p-4 xl:p-5 flex flex-col gap-3 hover:shadow-xl  hover:-translate-y-0.5 transition-all duration-200`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center justify-center">
          <div className="mr-2 h-5 w-5 xl:h-6 xl:w-6 rounded-lg flex items-center justify-center">
            {' '}
            <UserStar className="text-amber-500 dark:text-amber-100" />
          </div>
          <h1 className=" flex items-center text-sm xl:text-base font-bold dark:text-slate-100">
            {topPerformersList?.title}
          </h1>
        </div>
        <span className="gap-1 whitespace-nowrap bg-green-400 text-white text-[10px] xl:text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center dark:bg-emerald-900/40 dark:text-emerald-400">
          <TrendingUp size={12} strokeWidth={2.5} />
          <span>{topPerformersList?.trendValue}%</span>
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        {Array.isArray(topPerformersList?.employees) &&
          topPerformersList?.employees?.map((value, index: number) => {
            return (
              <React.Fragment key={value._id + value.name + value.rating}>
                {index < CARD_CONTENT_LIMIT_TO_SCROLL && (
                  <div className="min-w-0 flex items-center justify-between mb-2 xs:items-start">
                    <div className="flex items-center gap-6 text-sm flex-1 min-w-0">
                      {index >= 0 && index <= 2 && (
                        <Medal
                          className={`shrink-0 self-start h-5 w-5 xl:h-6 xl:w-6 rounded-full flex items-center justify-center text-sm font-bold ${getMedalClassName(index)}`}
                        />
                      )}
                      {index > 2 && (
                        <div
                          className={`shrink-0 self-start h-5 w-5 xl:h-6 xl:w-6 text-center text-sm font-bold dark:text-slate-100`}
                        >
                          {index + 1}
                        </div>
                      )}
                      <div className="flex flex-col gap-1 min-w-0">
                        <h1 className="text-sm font-bold dark:text-slate-100 truncate">
                          {value?.name}
                        </h1>
                        <h2 className="text-xs text-slate-500 font-bold dark:text-slate-300 truncate">
                          {value?.designation}
                        </h2>
                      </div>
                    </div>
                    {/* <div className="shrink-0 self-start min-w-0 flex gap-1 text-sm font-bold items-center">
                      <h1 className="dark:text-slate-100 text-xs">
                        {value?.rating}
                      </h1>
                      <Star
                        size={14}
                        className="text-amber-200"
                        fill="#FFEA00"
                      />
                    </div> */}
                    <Rating value={String(value?.rating)} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
      {Array.isArray(topPerformersList?.employees) &&
        topPerformersList?.employees?.length > CARD_CONTENT_LIMIT_TO_SCROLL && (
          <div className=" bottom-2 right-2 flex flex-col items-end text-sm text-blue-700 font-bold">
            <Link
              className="items-center flex flex-row text-blue-700"
              to="/home/dashboard/viewmore?target=topPerformers"
              state={{ name: VIEW_MORE_ROUTES_VALUES.top_performers }}
              onMouseEnter={() => {
                loadViewMorePage();
              }}
              onPointerDown={() => loadViewMorePage()}
            >
              <span>{VIEW_MORE}</span>
              <ArrowRight className=" text-blue-700" />
            </Link>
          </div>
        )}
    </div>
  );
};

export default React.memo(TopPerformersCard);
