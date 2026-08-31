import { ArrowRight, TrendingDown, TriangleAlert } from 'lucide-react';
import type { ReviewList } from '../../types/types';
import React from 'react';
import {
  bgColors,
  CARD_CONTENT_LIMIT_TO_SCROLL,
  gradients,
  VIEW_MORE,
  VIEW_MORE_ROUTES_VALUES,
} from '../../utils/constants';
import { Link } from 'react-router-dom';
import { loadViewMorePage } from '../../router/router';

const RequiringReviewCard = ({ requiringReview }: ReviewList) => {
  return (
    <div className="h-full bg-linear-to-br from-white to-indigo-50/40 rounded-2xl shadow-sm border border-slate-100 p-4 xl:p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/40  hover:-translate-y-0.5 transition-all duration-200 dark:bg-linear-to-br dark:from-slate-900 dark:to-red-950/20 dark:border-none">
      <div className=" mb-4 flex flex-row items-center justify-between">
        <div className="flex items-center justify-center">
          <div className="mr-2 h-5 w-5 xl:h-6 xl:w-6 rounded-lg  flex items-center justify-center">
            <TriangleAlert className="text-amber-500 dark:text-amber-100" />
          </div>
          <h1 className=" flex items-center text-sm xl:text-base font-bold dark:text-slate-100">
            {requiringReview?.title}
          </h1>
        </div>
        <h2 className="gap-1 whitespace-nowrap bg-amber-400 text-white text-[10px] xl:text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center dark:bg-emerald-900/40 dark:text-amber-400">
          <TrendingDown size={12} strokeWidth={2.5} />
          <span>{requiringReview?.trendValue}%</span>
        </h2>
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        {Array.isArray(requiringReview?.employees) &&
          requiringReview?.employees?.map((value, index: number) => {
            return (
              <React.Fragment key={value._id + value.name + value.rating}>
                {index < CARD_CONTENT_LIMIT_TO_SCROLL && (
                  <div className="flex flex-row justify-between max-xs:flex-col max-xs:gap-2 mb-2 min-w-0">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <h1
                        className={`shrink-0 self-start w-6 h-6 xl:w-9 xl:h-9 rounded-full text-white font-bold text-[10px] xl:text-sm flex items-center justify-center ${gradients[index % gradients.length]} col-span-0 dark:${bgColors[index % bgColors.length]}`}
                      >
                        {value.name
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </h1>
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <h1 className="text-sm font-bold dark:text-slate-100 truncate">
                          {value?.name}
                        </h1>
                        <h1 className="text-xs text-slate-500 font-bold dark:text-slate-300 truncate">
                          {value?.designation}
                        </h1>
                      </div>
                    </div>
                    <div className="shrink-0 self-start max-xs:self-end min-w-0 flex flex-col items-end gap-1">
                      <span
                        className={`flex items-center text-[10px] xl:text-xs px-2 py-0.2 xl:py-0.5 rounded-full font-bold whitespace-nowrap
            ${value.reviewReason[0] === 'Low Rating' ? 'bg-orange-100 text-orange-600 dark:bg-emerald-900/40 dark:text-orange-400' : ''}
            ${value.reviewReason[0] === 'Low Attendance' ? 'bg-yellow-100 text-yellow-600 dark:bg-emerald-900/40 dark:text-yellow-400' : ''}
            ${value.reviewReason[0] === 'On Notice' ? 'bg-red-100 text-red-600 dark:bg-emerald-900/40 dark:text-red-400' : ''}
            ${value.reviewReason[0] === 'Low Satisfaction' ? 'bg-purple-100 text-purple-600 dark:bg-emerald-900/40 dark:text-purple-400' : ''}
          `}
                      >
                        {value.reviewReason[0]}
                      </span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
      {Array.isArray(requiringReview?.employees) &&
        requiringReview?.employees?.length > CARD_CONTENT_LIMIT_TO_SCROLL && (
          <div className="bottom-2 right-2 flex flex-col items-end text-sm text-blue-700 font-bold">
            <Link
              className="items-center flex flex-row text-blue-700"
              to="/home/dashboard/viewmore?target=requiringReview"
              state={{ name: VIEW_MORE_ROUTES_VALUES.requiringReview }}
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

export default React.memo(RequiringReviewCard);
