import { Target, TrendingUp } from 'lucide-react';
import type { MeetingKPIList } from '../../types/types';
import React from 'react';
import { CARD_BACKGROUND_COLOR } from '../../utils/constants';

function MeetingKPIsCard({ meetingKPIs }: MeetingKPIList) {
  const rows = [
    {
      label: 'Exceeding',
      range: meetingKPIs?.breakdown?.exceeding?.ratingRange,
      percentage: meetingKPIs?.breakdown?.exceeding?.percentage,
      bar: 'bg-emerald-500 dark:bg-emerald-400',
    },
    {
      label: 'Meeting',
      range: meetingKPIs?.breakdown?.meeting?.ratingRange,
      percentage: meetingKPIs?.breakdown?.meeting?.percentage,
      bar: 'bg-violet-500 dark:bg-violet-400',
    },
    {
      label: 'Not Meeting',
      range: meetingKPIs?.breakdown?.notMeeting?.ratingRange,
      percentage: meetingKPIs?.breakdown?.notMeeting?.percentage,
      bar: 'bg-red-500 dark:bg-red-400',
    },
  ];

  return (
    <div
      className={`h-full ${CARD_BACKGROUND_COLOR} rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all duration-200 hover:shadow-xl`}
    >
      <div className="flex flex-row items-center justify-between gap-3 px-4 xl:px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <Target
            size={18}
            className="shrink-0 text-amber-500 dark:text-amber-400"
          />
          <h1 className="text-sm xl:text-base font-semibold text-slate-800 dark:text-slate-100 truncate">
            {meetingKPIs?.title}
          </h1>
        </div>
        <h2 className="shrink-0 gap-1 whitespace-nowrap bg-green-50 text-green-700 ring-1 ring-green-200 text-[10px] xl:text-xs font-semibold px-2 py-0.5 rounded-full flex items-center tabular-nums dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-800">
          <TrendingUp size={12} strokeWidth={2.5} />
          <span>{meetingKPIs?.trendValue}%</span>
        </h2>
      </div>

      <div className="flex-1 flex flex-col px-4 xl:px-5 py-4">
        <div className="flex items-baseline gap-1.5 mb-5">
          <span className="text-xl xl:text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
            {meetingKPIs?.percentage}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            / 100 employees
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-evenly gap-4">
          {rows.map((row) => (
            <div key={row.label}>
              <div className="flex items-baseline justify-between gap-2 mb-1.5">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                  {row.label}
                  <span className="text-slate-400 dark:text-slate-500">
                    {' '}
                    ({row.range})
                  </span>
                </span>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-800 dark:text-slate-100">
                  {row.percentage}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden dark:bg-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${row.bar}`}
                  style={{ width: `${row.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(MeetingKPIsCard);
