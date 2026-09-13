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
import { CARD_BACKGROUND_COLOR } from '../../utils/constants';

function LineChartComponent({ data, title, X, Y, name }: any) {
  return (
    <>
      {/* <div className=" overflow-hidden bg-linear-to-br from-white to-indigo-50/40 rounded-2xl  shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/40 hover:-translate-y-0.5 transition-all duration-200  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none"> */}
      <div
        className={`overflow-hidden ${CARD_BACKGROUND_COLOR} rounded-2xl shadow-sm p-5 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200`}
      >
        <h1 className="flex items-center justify-between text-sm xl:text-base font-bold dark:text-slate-100">
          {title}
        </h1>
        <div className="overflow-y-auto min-h-0 max-h-87.5">
          <LineChart
            style={{ width: '100%', height: '100%', aspectRatio: 1 }}
            responsive
            data={data}
          >
            <CartesianGrid
              stroke="#8884d8"
              strokeDasharray="5 5"
              style={{ outline: 'none' }}
            />
            <XAxis dataKey={X} stroke="#8884d8" />
            <YAxis dataKey={Y} width="auto" stroke="#8884d8" />
            <Line
              type="monotone"
              dataKey={Y}
              stroke="#8884d8"
              dot={{
                fill: '#8884d8',
              }}
              activeDot={{
                stroke: '#8884d8',
              }}
              name={name}
            />
            <Legend align="right" wrapperStyle={{ fontSize: '12px' }} />
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
              formatter={(value: any) => {
                const formattedValue = new Intl.NumberFormat('en-IN').format(
                  value
                );
                return [formattedValue];
              }}
              // 5. Clean up the hover cursor guide line
              cursor={{ fill: 'transparent' }}
            />
          </LineChart>
        </div>
      </div>
    </>
  );
}

export default React.memo(LineChartComponent);
