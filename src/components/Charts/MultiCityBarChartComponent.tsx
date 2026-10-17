import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import React from 'react';
import { card, chartTheme, cx } from '../../theme/theme';

function MultiCityBarChartComponent({ title, X, Y, data }: any) {
  const { theme: themeMode } = useTheme();
  const chart = chartTheme(themeMode);
  // Grow the chart with the number of rows so every bar gets the same
  // spacing and the list scrolls instead of squeezing/clipping rows.
  const ROW_HEIGHT = 32;
  const chartHeight = Math.max((data?.length ?? 0) * ROW_HEIGHT + 20, 200);
  return (
    <>
      <div className={card.chart}>
        <h1 className={cx(card.title, 'flex items-center justify-between')}>
          {title}
        </h1>

        <div className="scrollbar-thin max-h-87.5 min-h-0 w-full overflow-x-hidden overflow-y-auto pr-1">
          <ResponsiveContainer width="100%" height={chartHeight}>
            {/* Crucial: layout="vertical" makes the chart horizontal */}
            <BarChart
              responsive
              data={data}
              layout="vertical"
              className="flex items-center justify-between text-sm font-bold"
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              {/* Hide the grid lines and X-axis line/ticks to match the clean look */}
              <XAxis
                type="number"
                hide
                className="flex items-center justify-between text-sm font-bold outline-0"
              />

              {/* YAxis displays the text labels */}
              <YAxis
                dataKey={X}
                type="category"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={{ fill: chart.textMuted, fontSize: 12, fontWeight: 600 }}
                width={110}
                className="flex items-center justify-between text-sm font-bold outline-0"
              />

              <Tooltip
                {...chart.tooltip}
                // Format the raw number values (adds currency formatting)
                formatter={(value: any, name) => {
                  // Clean format the number value
                  const formattedValue = new Intl.NumberFormat('en-IN').format(
                    value
                  );

                  // Customise or clean up the label name dynamically if needed
                  const customName =
                    name === 'employeeCount' ? 'Total Count' : name;

                  // Return as an array: [Value, Name]
                  return [formattedValue, customName];
                }}
                // Clean up the hover cursor guide line
                cursor={{ fill: 'transparent' }}
              />

              {/* The Bar component renders the horizontal bars */}
              <Bar
                isAnimationActive={false}
                dataKey={Y}
                fill={chart.primary}
                radius={[0, 10, 10, 0]} // Gives the bars rounded pill ends
                barSize={10} // Controls the thickness of the bars
                label={{
                  position: 'right',
                  fill: chart.text,
                  fontSize: '12px',
                  fontWeight: '500',
                  //   formatter: (value) => value.toLocaleString() // Adds commas to numbers
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default React.memo(MultiCityBarChartComponent);
