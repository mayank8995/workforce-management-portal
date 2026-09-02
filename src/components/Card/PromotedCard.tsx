import { ArrowRight, ChevronsUp, TrendingUp, Trophy } from 'lucide-react';
import type { PromotedList } from '../../types/types';
import React from 'react';
import {
  bgColors,
  CARD_BACKGROUND_COLOR,
  CARD_CONTENT_LIMIT_TO_SCROLL,
  gradients,
  VIEW_MORE,
  VIEW_MORE_ROUTES_VALUES,
} from '../../utils/constants';
import { Link } from 'react-router-dom';
import { loadViewMorePage } from '../../router/router';

const PromotedCard = ({ promotedThisYear }: PromotedList) => {
  return (
    // <div className=" h-full bg-linear-to-br from-white to-indigo-50/40 rounded-2xl  shadow-sm border border-slate-100 p-4 xl:p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/40  hover:-translate-y-0.5 transition-all duration-200 darK:bg-gradient-to-br dark:from-slate-900 dark:to-green-950/20 dark:border-none">
    <div
      className={`h-full ${CARD_BACKGROUND_COLOR} rounded-2xl shadow-sm p-4 xl:p-5 flex flex-col gap-3 hover:shadow-xl  hover:-translate-y-0.5 transition-all duration-200`}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center justify-center">
          <div className="mr-2 h-5 w-5 xl:h-6 xl:w-6 rounded-lg  flex items-center justify-center">
            <Trophy className="text-amber-500 dark:text-amber-100" />
          </div>
          <h1 className=" flex items-center text-sm xl:text-base font-bold dark:text-slate-100">
            {promotedThisYear?.title}
          </h1>
        </div>
        <h2 className="gap-1 whitespace-nowrap bg-green-400 text-white text-[10px] xl:text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center dark:bg-emerald-900/40 dark:text-emerald-400">
          <TrendingUp size={12} strokeWidth={2.5} />
          <span>{promotedThisYear?.trendValue}%</span>
        </h2>
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        {Array.isArray(promotedThisYear?.employees) &&
          promotedThisYear?.employees?.map((value, index: number) => {
            return (
              <React.Fragment key={value._id + value.name + value.promotedOn}>
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
                      <div className="flex flex-col gap-1 min-w-0">
                        <h1 className="text-sm font-bold dark:text-slate-100 truncate">
                          {value?.name}
                        </h1>
                        <h1 className="text-xs text-slate-500 font-bold dark:text-slate-300 truncate">
                          {value?.currentDesignation}
                        </h1>
                      </div>
                    </div>
                    <div className="shrink-0 self-start max-xs:self-end min-w-0 ">
                      <h2 className="text-amber-500 dark:text-amber-100 flex items-center justify-center">
                        <ChevronsUp size={12} strokeWidth={2.5} />
                        <span className=" text-xs">
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
                      </h2>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
      {Array.isArray(promotedThisYear?.employees) &&
        promotedThisYear?.employees?.length > CARD_CONTENT_LIMIT_TO_SCROLL && (
          <div className=" bottom-2 right-2 flex flex-col items-end text-sm text-blue-700 font-bold">
            <Link
              className="items-center flex flex-row text-blue-700"
              to="/home/dashboard/viewmore?target=promotedThisYear"
              state={{ name: VIEW_MORE_ROUTES_VALUES.promotedThisYear }}
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

export default React.memo(PromotedCard);
