import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { DonutChartProps } from '../../types/types';
import { useTheme } from '../../hooks/useTheme';
import React from 'react';

const DonutCharts = ({ data: rawData, title }: DonutChartProps) => {
  const { theme: themeMode } = useTheme();

  const data = [
    { name: 'Active', value: rawData?.Active, color: '#4CAF50' },
    { name: 'Support', value: rawData?.Support, color: '#FF9800' },
    { name: 'Completed', value: rawData?.Completed, color: '#2196F3' },
  ];

  return (
    <div className="overflow-hidden bg-linear-to-br from-white to-indigo-50/40 rounded-2xl  shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/40 hover:-translate-y-0.5 transition-all duration-200  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none">
      <h1 className="flex items-center justify-between text-sm xl:text-base font-bold dark:text-slate-100">
        {title}
      </h1>
      <div className="overflow-y-auto min-h-0 max-h-87.5 relative overflow-hidden">
        <PieChart
          style={{ width: '100%', height: '100%', aspectRatio: 1 }}
          responsive
        >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60} // Creates the donut hole
            outerRadius={100}
            dataKey="value"
          >
            {data?.map((entry, index) => (
              <Cell key={index} fill={entry?.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
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
            // formatter={(value: any) => {
            //   const formattedValue = new Intl.NumberFormat('en-IN').format(
            //     value
            //   );
            //   return [formattedValue];
            // }}
            // 5. Clean up the hover cursor guide line
            cursor={{ fill: 'transparent' }}
            wrapperStyle={{ zIndex: 50 }}
          />
        </PieChart>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 0,
          }}
        >
          <h2
            style={{
              margin: 0,
              color: themeMode === 'dark' ? '#f3f4f6' : '#333',
            }}
          >
            {rawData?.totalProjects}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              color: themeMode === 'dark' ? '#f3f4f6' : '#333',
            }}
          >
            Total Projects
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DonutCharts);
