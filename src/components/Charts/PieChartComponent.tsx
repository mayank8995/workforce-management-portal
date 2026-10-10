import {
  Legend,
  Pie,
  PieChart,
  Sector,
  Tooltip,
  type PieSectorShapeProps,
} from 'recharts';
import { card, chartTheme, cx } from '../../theme/theme';
import { useTheme } from '../../hooks/useTheme';
import React from 'react';

/** Series colours are the same in both themes, so they are read once. */
const PIE_COLORS = chartTheme('light').series;

const MyCustomPie = (props: PieSectorShapeProps) => {
  return (
    <Sector {...props} fill={PIE_COLORS[props.index % PIE_COLORS.length]} />
  );
};

function PieChartComponent({ data, title, X, Y }: any) {
  const { theme: themeMode } = useTheme();
  const chart = chartTheme(themeMode);
  const RenderCustomLegend = () => {
    return (
      <div className="grid grid-cols-2">
        {data?.length > 0 &&
          data?.map((entry: any, index: any) => {
            const itemColor = PIE_COLORS[index % PIE_COLORS.length];
            return (
              <div
                key={entry[X]}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    backgroundColor: itemColor,
                  }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    color: chart.text,
                  }}
                >
                  {entry[X]}
                </span>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <>
      <div className={card.chart}>
        <h1 className={cx(card.title, 'flex items-center justify-between')}>
          {title}
        </h1>
        <div className="overflow-y-auto min-h-0 max-h-87.5">
          <PieChart
            style={{ width: '100%', height: '100%', aspectRatio: 1 }}
            responsive
          >
            <Pie
              data={data}
              dataKey={Y}
              nameKey={X}
              isAnimationActive={true}
              shape={MyCustomPie}
              labelLine={true}
              style={{ outline: 'none', fontSize: '12px' }}
            />
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
            />
            <Legend
              layout="horizontal"
              align="right"
              verticalAlign="bottom"
              content={RenderCustomLegend}
            />
          </PieChart>
        </div>
      </div>
    </>
  );
}

export default React.memo(PieChartComponent);
