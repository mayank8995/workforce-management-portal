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

const METRIC_STYLES = {
  [KEY_TRACK_METRIC_ICON['USER']]: {
    Icon: User,
    tile: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  },
  [KEY_TRACK_METRIC_ICON['USER_MINUS']]: {
    Icon: UserMinus,
    tile: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
  },
  [KEY_TRACK_METRIC_ICON['INDIAN_RUPEE']]: {
    Icon: IndianRupee,
    tile: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
  },
  [KEY_TRACK_METRIC_ICON['CIRCLE_PERCENT']]: {
    Icon: CirclePercent,
    tile: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  },
  [KEY_TRACK_METRIC_ICON['FOLDER_DOT']]: {
    Icon: FolderDot,
    tile: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
  },
} as const;

const CARD_SHELL =
  'min-w-0 rounded-xl p-3 xl:p-4 flex flex-col gap-2.5 xl:gap-3 border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900';

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
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 xl:gap-4 p-2 xl:p-4 min-w-0">
      {!isLoading
        ? Object?.keys(data)?.map((key) => {
            const { Icon, tile } = METRIC_STYLES[data[key]?.icon];
            return (
              <div
                key={key}
                className={`${CARD_SHELL} transition-colors duration-200 hover:border-slate-300 dark:hover:border-slate-700`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`shrink-0 h-7 w-7 xl:h-8 xl:w-8 rounded-lg flex items-center justify-center ${tile}`}
                  >
                    <Icon className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
                  </div>
                  <h1 className="text-[11px] xl:text-sm text-slate-500 dark:text-slate-400 font-medium truncate">
                    {key}
                  </h1>
                </div>
                <h2 className="text-lg xl:text-2xl font-semibold tabular-nums truncate text-slate-900 dark:text-slate-100">
                  {data[key]?.icon === KEY_TRACK_METRIC_ICON['INDIAN_RUPEE']
                    ? new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0,
                      }).format(data[key]?.value)
                    : data[key]?.value}
                </h2>
              </div>
            );
          })
        : Array.from({ length: 5 }, (_, i) => i).map((i) => (
            <div
              key={`metric-skeleton-${i}`}
              className={`${CARD_SHELL} animate-pulse`}
            >
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 xl:h-8 xl:w-8 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0" />
                <div className="h-2.5 w-16 xl:w-24 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="h-5 xl:h-6 w-14 xl:w-16 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
    </div>
  );
}

export default React.memo(KeyMetric);
