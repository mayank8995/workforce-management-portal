import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { DonutChartProps } from '../../types/types';
import { useTheme } from '../../hooks/useTheme';
import React from 'react';
import { card, chartTheme, cx } from '../../theme/theme';

const DonutCharts = ({ data: rawData, title }: DonutChartProps) => {
  const { theme: themeMode } = useTheme();
  const chart = chartTheme(themeMode);

  const data = [
    { name: 'Active', value: rawData?.Active, color: chart.status.active },
    { name: 'Support', value: rawData?.Support, color: chart.status.support },
    {
      name: 'Completed',
      value: rawData?.Completed,
      color: chart.status.completed,
    },
  ];

  return (
    <div className={card.chart}>
      <h1 className={cx(card.title, 'flex items-center justify-between')}>
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
            {...chart.tooltip}
            // Format the raw number values (adds currency formatting)
            // formatter={(value: any) => {
            //   const formattedValue = new Intl.NumberFormat('en-IN').format(
            //     value
            //   );
            //   return [formattedValue];
            // }}
            // Clean up the hover cursor guide line
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
              color: chart.text,
            }}
          >
            {rawData?.totalProjects}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              color: chart.text,
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
