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
import { card, cx, icon, skeleton, text, tone } from '../../theme/theme';

const METRIC_STYLES = {
  [KEY_TRACK_METRIC_ICON['USER']]: {
    Icon: User,
    tile: tone.info,
  },
  [KEY_TRACK_METRIC_ICON['USER_MINUS']]: {
    Icon: UserMinus,
    tile: tone.danger,
  },
  [KEY_TRACK_METRIC_ICON['INDIAN_RUPEE']]: {
    Icon: IndianRupee,
    tile: tone.caution,
  },
  [KEY_TRACK_METRIC_ICON['CIRCLE_PERCENT']]: {
    Icon: CirclePercent,
    tile: tone.violet,
  },
  [KEY_TRACK_METRIC_ICON['FOLDER_DOT']]: {
    Icon: FolderDot,
    tile: tone.success,
  },
} as const;

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
              <div key={key} className={card.metric}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className={cx(icon.tile, 'h-7 w-7 xl:h-8 xl:w-8', tile)}>
                    <Icon className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
                  </div>
                  <h1
                    className={`text-[11px] xl:text-sm ${text.muted} font-medium truncate`}
                  >
                    {key}
                  </h1>
                </div>
                <h2
                  className={`text-lg xl:text-2xl font-semibold tabular-nums truncate ${text.primary}`}
                >
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
              className={`${card.metric} animate-pulse`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`h-7 w-7 xl:h-8 xl:w-8 rounded-lg shrink-0 ${skeleton.fill}`}
                />
                <div
                  className={`h-2.5 w-16 xl:w-24 rounded ${skeleton.fill}`}
                />
              </div>
              <div
                className={`h-5 xl:h-6 w-14 xl:w-16 rounded ${skeleton.fill}`}
              />
            </div>
          ))}
    </div>
  );
}

export default React.memo(KeyMetric);
