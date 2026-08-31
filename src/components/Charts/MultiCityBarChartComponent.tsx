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

function MultiCityBarChartComponent({ title, X, Y, data }: any) {
  const { theme: themeMode } = useTheme();
  return (
    <>
      <div className="overflow-hidden bg-linear-to-br from-white to-indigo-50/40 rounded-2xl  shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/40 hover:-translate-y-0.5 transition-all duration-200  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none">
        <h1 className="flex items-center justify-between text-sm xl:text-base font-bold dark:text-slate-100">
          {title}
        </h1>

        <div className="overflow-y-auto min-h-0 max-h-87.5 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={550}>
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
                dataKey={X}
                type="category"
                axisLine={false}
                tickLine={false}
                // width={80}
                width={100}
                className="flex items-center justify-between text-sm font-bold outline-0"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  boxShadow:
                    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                }}
                // 2. Style the header / label text (e.g., "Jan", "Feb")
                labelStyle={{
                  fontWeight: 600,
                  color: '#1E293B',
                  fontSize: '12px',
                  marginBottom: '4px',
                  letterSpacing: '0.05em',
                }}
                // 3. Style the row containers for the items
                itemStyle={{
                  fontSize: '12px',
                  padding: '3px 0',
                  color: '#475569',
                }}
                // 4. Format the raw number values (adds currency formatting)
                formatter={(value: any, name) => {
                  // 1. Clean format the number value
                  const formattedValue = new Intl.NumberFormat('en-IN').format(
                    value
                  );

                  // 2. Customise or clean up the label name dynamically if needed
                  const customName =
                    name === 'employeeCount' ? 'Total Count' : name;

                  // 3. Return as an array: [Value, Name]
                  return [formattedValue, customName];
                }}
                // 5. Clean up the hover cursor guide line
                cursor={{ fill: 'transparent' }}
              />

              {/* The Bar component renders the horizontal bars */}
              <Bar
                isAnimationActive={false}
                dataKey={Y}
                fill="#3b82f6"
                radius={[0, 10, 10, 0]} // Gives the bars rounded pill ends
                barSize={10} // Controls the thickness of the bars
                label={{
                  position: 'right',
                  fill: themeMode === 'dark' ? '#8884d8' : '#333',
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
