import React from 'react';
import { useLoader } from '../../context/Loadercontext';
import { KEY_TRACK_METRIC, KEY_TRACK_METRIC_ICON } from '../../utils/constants';
import {
  CirclePercent,
  FolderDot,
  IndianRupee,
  User,
  UserMinus,
} from 'lucide-react';
import type {
  KeyMetricCardsConfig,
  KeyMetricCardsProps,
} from '../../types/types';

function KeyMetric({ metricData }: KeyMetricCardsProps): React.ReactElement {
  const { isLoading } = useLoader();
  const data: KeyMetricCardsConfig = {
    [KEY_TRACK_METRIC['TOTAL_EMPLOYEES']]: {
      value: metricData?.summary?.totalEmployees ?? 0,
      icon: KEY_TRACK_METRIC_ICON['USER'],
    },
    [KEY_TRACK_METRIC['ATTRITION_RATE']]: {
      value: metricData?.summary?.attritionRate ?? 0,
      icon: KEY_TRACK_METRIC_ICON['USER_MINUS'],
    },
    [KEY_TRACK_METRIC['REVENUE_IN_THIS_MONTH']]: {
      value: metricData?.summary?.totalRevenue ?? 0,
      icon: KEY_TRACK_METRIC_ICON['INDIAN_RUPEE'],
    },
    [KEY_TRACK_METRIC['PROFIT_MARGIN']]: {
      value: metricData?.summary?.profitMargin ?? 0,
      icon: KEY_TRACK_METRIC_ICON['CIRCLE_PERCENT'],
    },
    [KEY_TRACK_METRIC['TOTAL_PROJECTS']]: {
      value: metricData?.summary?.activeProjects ?? 0,
      icon: KEY_TRACK_METRIC_ICON['FOLDER_DOT'],
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 xl:p-4 min-w-0">
      {!isLoading ? (
        <React.Fragment>
          {data &&
            Object?.keys(data)?.map((key) => (
              <div
                key={key}
                className={`flex-1 min-w-0 bg-linear-to-br from-white to-indigo-50/40 border border-slate-200 rounded-xl flex flex-col gap-3 p-2 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/40 hover:-translate-y-0.5 transition-all duration-200 dark:bg-linear-to-br dark:from-slate-900 dark:to-blue-950/20 dark:border-none
            ${data[key]?.icon === KEY_TRACK_METRIC_ICON['USER'] && 'border-l-4 border-l-blue-500 dark:border-l-blue-400'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['FOLDER_DOT'] && 'border-l-4 border-l-green-500 dark:border-l-green-400'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['INDIAN_RUPEE'] && 'border-l-4 border-l-orange-500 dark:border-l-orange-400'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['CIRCLE_PERCENT'] && 'border-l-4 border-l-purple-500 dark:border-l-purple-400'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['USER_MINUS'] && 'border-l-4 border-l-red-500 dark:border-l-red-400'}
            `}
              >
                <div className="items-center flex flex-row gap-2 flex-1 min-w-0">
                  <div
                    className={`shrink-0 h-8 w-8 xl:h-10 xl:w-10 rounded-xl bg-blue-100 flex items-center justify-center`}
                  >
                    {data[key]?.icon === KEY_TRACK_METRIC_ICON['USER'] && (
                      <User className="h-4 w-4 xl:h-6 xl:w-6 text-blue-600" />
                    )}
                    {data[key]?.icon ===
                      KEY_TRACK_METRIC_ICON['FOLDER_DOT'] && (
                      <FolderDot className="h-4 w-4 xl:h-6 xl:w-6 text-green-600" />
                    )}
                    {data[key]?.icon ===
                      KEY_TRACK_METRIC_ICON['INDIAN_RUPEE'] && (
                      <IndianRupee className="h-4 w-4 xl:h-6 xl:w-6 text-orange-600" />
                    )}
                    {data[key]?.icon ===
                      KEY_TRACK_METRIC_ICON['CIRCLE_PERCENT'] && (
                      <CirclePercent className="h-4 w-4 xl:h-6 xl:w-6 text-purple-600" />
                    )}
                    {data[key]?.icon ===
                      KEY_TRACK_METRIC_ICON['USER_MINUS'] && (
                      <UserMinus className="h-4 w-4 xl:h-6 xl:w-6 text-red-600" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h1 className="text-sm xl:text-base text-slate-500 font-medium dark:text-slate-100 truncate">
                      {key}
                    </h1>
                    <h2 className="font-bold text-indigo-600 drop-shadow-sm text-sm truncate">
                      {data[key]?.value}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
        </React.Fragment>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {Array.from({ length: 4 }, (_, index) => index + 1)?.map((_, i) => (
            <div
              key={`items-start-${i * 2}`}
              className="flex flex-col gap-3 p-2 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200 bg-white border border-gray-200 rounded-xl shadow animate-pulse dark:bg-gray-800 dark:border-gray-700 dark:border-none"
            >
              <div className="items-center flex flex-row ">
                <div
                  className={`animate-pulse h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}
                ></div>
                <div className="pl-2 flex flex-col">
                  <div className=" animate-pulse h-2  bg-gray-200 dark:bg-gray-700 items-center mb-1 text-sm text-slate-500 font-medium dark:text-slate-100 w-50 truncate"></div>
                  <h2 className=" animate-pulse h-2 bg-gray-200 dark:bg-gray-700 text-xl font-bold text-gray-200 drop-shadow-sm "></h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(KeyMetric);
