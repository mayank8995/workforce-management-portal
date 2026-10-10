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

function BarChartComponent({ data, title, X, Y }: any) {
  const { theme: themeMode } = useTheme();
  const chart = chartTheme(themeMode);

  return (
    <>
      <div className={card.chart}>
        <h1 className={cx(card.title, 'flex items-center justify-between')}>
          {title}
        </h1>
        <div className="overflow-y-auto min-h-0 max-h-87.5 overflow-hidden">
          <ResponsiveContainer width="100%" height={350}>
            {/* Crucial: layout="vertical" makes the chart horizontal */}
            <BarChart
              responsive
              data={data}
              layout="vertical"
              className="flex items-center justify-between text-sm font-bold"
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              {/* Hide the grid lines and X-axis line/ticks to match the clean look */}
              <XAxis
                type="number"
                hide
                className="flex items-center justify-between text-sm font-bold outline-0"
              />

              {/* YAxis displays the text labels */}
              <YAxis
                dataKey={Y}
                type="category"
                axisLine={false}
                tickLine={false}
                // tick={{
                //   fill: chart.text,
                //   fontSize: 12,
                // }}
                width={100}
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
                isAnimationActive={true}
                dataKey={X}
                fill={chart.primary}
                radius={[10, 10, 10, 10]} // Gives the bars rounded pill ends
                barSize={10} // Controls the thickness of the bars
                label={{
                  position: 'right',
                  fill: chart.text,
                  fontSize: 12,
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

export default React.memo(BarChartComponent);
