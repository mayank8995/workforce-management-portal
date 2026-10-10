import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { card, chartTheme, cx } from '../../theme/theme';
import { useTheme } from '../../hooks/useTheme';

function LineChartComponent({ data, title, X, Y, name }: any) {
  const { theme: themeMode } = useTheme();
  const chart = chartTheme(themeMode);
  return (
    <>
      <div className={card.chart}>
        <h1 className={cx(card.title, 'flex items-center justify-between')}>
          {title}
        </h1>
        <div className="overflow-y-auto min-h-0 max-h-87.5">
          <LineChart
            style={{ width: '100%', height: '100%', aspectRatio: 1 }}
            responsive
            data={data}
          >
            <CartesianGrid
              stroke={chart.grid}
              strokeDasharray="5 5"
              style={{ outline: 'none' }}
            />
            <XAxis dataKey={X} stroke={chart.textMuted} />
            <YAxis dataKey={Y} width="auto" stroke={chart.textMuted} />
            <Line
              type="monotone"
              dataKey={Y}
              stroke={chart.primary}
              dot={{
                fill: chart.primary,
              }}
              activeDot={{
                stroke: chart.primary,
              }}
              name={name}
            />
            <Legend align="right" wrapperStyle={{ fontSize: '12px' }} />
            <Tooltip
              {...chart.tooltip}
              // Format the raw number values (adds currency formatting)
              formatter={(value: any) => {
                const formattedValue = new Intl.NumberFormat('en-IN').format(
                  value
                );
                return [formattedValue];
              }}
              // Clean up the hover cursor guide line
              cursor={{ fill: 'transparent' }}
            />
          </LineChart>
        </div>
      </div>
    </>
  );
}

export default React.memo(LineChartComponent);
