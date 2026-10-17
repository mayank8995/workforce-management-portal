import { Target, TrendingUp } from 'lucide-react';
import type { MeetingKPIList } from '../../types/types';
import React from 'react';
import {
  card,
  cx,
  icon,
  skeleton,
  text,
  toneBadge,
  toneSolid,
} from '../../theme/theme';

function MeetingKPIsCard({ meetingKPIs }: MeetingKPIList) {
  const rows = [
    {
      label: 'Exceeding',
      range: meetingKPIs?.breakdown?.exceeding?.ratingRange,
      percentage: meetingKPIs?.breakdown?.exceeding?.percentage,
      bar: toneSolid.success,
    },
    {
      label: 'Meeting',
      range: meetingKPIs?.breakdown?.meeting?.ratingRange,
      percentage: meetingKPIs?.breakdown?.meeting?.percentage,
      bar: toneSolid.accent,
    },
    {
      label: 'Not Meeting',
      range: meetingKPIs?.breakdown?.notMeeting?.ratingRange,
      percentage: meetingKPIs?.breakdown?.notMeeting?.percentage,
      bar: toneSolid.danger,
    },
  ];

  return (
    <div className={card.panel}>
      <div className={card.header}>
        <div className="flex items-center gap-2 min-w-0">
          <Target size={18} className={`shrink-0 ${icon.highlight}`} />
          <h1 className={card.title}>{meetingKPIs?.title}</h1>
        </div>
        <h2 className={cx(toneBadge('success'), 'tabular-nums')}>
          <TrendingUp size={12} strokeWidth={2.5} />
          <span>{meetingKPIs?.trendValue}%</span>
        </h2>
      </div>

      <div className="flex-1 flex flex-col px-4 xl:px-5 py-4">
        <div className="flex items-baseline gap-1.5 mb-5">
          <span
            className={`text-xl xl:text-2xl font-semibold tabular-nums ${text.primary}`}
          >
            {meetingKPIs?.percentage}
          </span>
          <span className={`text-xs ${text.muted}`}>/ 100 employees</span>
        </div>

        <div className="flex-1 flex flex-col justify-evenly gap-4">
          {rows.map((row) => (
            <div key={row.label}>
              <div className="flex items-baseline justify-between gap-2 mb-1.5">
                <span
                  className={`text-xs font-medium ${text.secondary} truncate`}
                >
                  {row.label}
                  <span className={text.subtle}> ({row.range})</span>
                </span>
                <span
                  className={`shrink-0 text-xs font-semibold tabular-nums ${text.primary}`}
                >
                  {row.percentage}%
                </span>
              </div>
              <div
                className={`h-1.5 w-full rounded-full overflow-hidden ${skeleton.fill}`}
              >
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
