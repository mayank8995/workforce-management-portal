import KeyMetricCard from '../../components/Card/KeyMetricCard';
import KeyMetric from '../../components/Card/KeyMetric';
import {
  ATTRITION_INSIGHTS,
  DEPARTMENT_WISE_HEADCOUNT,
  REVENUE_IN_THIS_MONTH,
  SKILLS_IN_DEMAND,
  TOP_CLIENTS,
  TOTAL_PROJECTS,
} from '../../utils/constants';
import React, { Suspense } from 'react';
import type { ProjectStatusDistribution } from '../../types/types';
import DonutCharts from '../../components/Charts/DonutCharts';
import { useAnalytics } from '../../api/tanstack.query';
import ErrorPage from '../../components/Error/ErrorPage';
import Skeleton from '../../components/Skeleton/Skeleton';
const PieChartComponent = React.lazy(
  () => import('../../components/Charts/PieChartComponent')
);
const LineChartComponent = React.lazy(
  () => import('../../components/Charts/LineChartComponent')
);
const BarChartComponent = React.lazy(
  () => import('../../components/Charts/BarChartComponent')
);

const MultiCityBarChartComponent = React.lazy(
  () => import('../../components/Charts/MultiCityBarChartComponent')
);

function Analytics() {
  // const queryClient = useQueryClient();
  // const { data: metricData }: AnalyticsCard =
  //   queryClient.getQueryData(['analyticsData']) || {};
  const { data, isLoading, isError, refetch } = useAnalytics();
  const { data: metricData } = data || {};
  return (
    <>
      {!isLoading ? (
        <>
          {!isError ? (
            <div className="flex flex-col flex-auto">
              <KeyMetricCard>
                <KeyMetric metricData={metricData}></KeyMetric>
              </KeyMetricCard>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-2 xl:p-4">
                <Suspense
                  fallback={
                    <>
                      {Array.from({ length: 5 }, (_, index) => index + 1)?.map(
                        (_, id) => {
                          return (
                            <div
                              key={`suspense-${id}`}
                              className="
    w-full max-w-sm
    rounded-xl
    border border-slate-200
    bg-white
    p-6
    shadow-sm
    animate-pulse
    dark:border-slate-700
    dark:bg-slate-800
  "
                            >
                              <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />

                              <div className="mx-auto mt-6 h-44 w-44 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                <div className="absolute inset-0 hidden rounded-full dark:block" />
                              </div>

                              <div className="mt-6 space-y-4">
                                <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />
                                <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
                                <div className="h-3 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
                              </div>

                              <div className="mt-8">
                                <div className="mb-4 h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />

                                <div
                                  className="relative h-40 w-full
        overflow-hidden
        rounded-lg
        border border-slate-200
        bg-slate-50
        dark:border-slate-700
        dark:bg-slate-900
      "
                                >
                                  <div className="absolute inset-x-0 top-1/4 border-t border-slate-200 dark:border-slate-700" />
                                  <div className="absolute inset-x-0 top-1/2 border-t border-slate-200 dark:border-slate-700" />
                                  <div className="absolute inset-x-0 top-3/4 border-t border-slate-200 dark:border-slate-700" />

                                  <div className="absolute left-[8%] top-[65%] h-2 w-[12%] rotate-[-15deg] rounded-full bg-slate-200 dark:bg-slate-700" />
                                  <div className="absolute left-[18%] top-[53%] h-2 w-[14%] rotate-20 rounded-full bg-slate-200 dark:bg-slate-700" />
                                  <div className="absolute left-[31%] top-[58%] h-2 w-[13%] rotate-[-10deg] rounded-full bg-slate-200 dark:bg-slate-700" />
                                  <div className="absolute left-[43%] top-[43%] h-2 w-[15%] rotate-18deg rounded-full bg-slate-200 dark:bg-slate-700" />
                                  <div className="absolute left-[57%] top-[50%] h-2 w-[14%] rotate-[-20deg] rounded-full bg-slate-200 dark:bg-slate-700" />
                                  <div className="absolute left-[70%] top-[35%] h-2 w-[13%] rotate-12deg rounded-full bg-slate-200 dark:bg-slate-700" />
                                </div>

                                <div className="mt-3 flex justify-between">
                                  <div className="h-3 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                                  <div className="h-3 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                                  <div className="h-3 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                                  <div className="h-3 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                                </div>
                              </div>

                              <div className="mt-8">
                                <div className="mb-5 h-3 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />

                                <div className="mx-auto h-40 w-40 rounded-full bg-slate-200 dark:bg-slate-700" />

                                <div className="mt-5 space-y-3">
                                  <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-slate-200 dark:bg-slate-700" />
                                    <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-slate-200 dark:bg-slate-700" />
                                    <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-slate-200 dark:bg-slate-700" />
                                    <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </>
                  }
                >
                  <PieChartComponent
                    X={'client'}
                    Y={'revenueCr'}
                    title={TOP_CLIENTS}
                    data={metricData?.topClients}
                  />

                  <LineChartComponent
                    name={'Revenue'}
                    X={'month'}
                    Y={'revenueCr'}
                    title={REVENUE_IN_THIS_MONTH}
                    data={metricData?.revenueTrend}
                  />
                  <DonutCharts
                    title={TOTAL_PROJECTS}
                    data={
                      metricData
                        ?.projectStatusDistribution?.[0] as ProjectStatusDistribution
                    }
                  />
                  <MultiCityBarChartComponent
                    name={'Head Count by Location'}
                    X={'city'}
                    Y={'employeeCount'}
                    data={metricData?.headcountByLocation}
                    title={'Head Count by Location'}
                  />
                  <PieChartComponent
                    X={'department'}
                    Y={'count'}
                    title={DEPARTMENT_WISE_HEADCOUNT}
                    data={metricData?.departmentHeadcount}
                  />

                  <LineChartComponent
                    name={'Attrition'}
                    X={'month'}
                    Y={'rate'}
                    data={metricData?.attritionInsights?.trend}
                    title={ATTRITION_INSIGHTS}
                  />
                  <BarChartComponent
                    X={'employeeCount'}
                    Y={'skill'}
                    title={SKILLS_IN_DEMAND}
                    data={metricData?.skillsInDemand}
                  />
                </Suspense>
              </div>
            </div>
          ) : (
            <>
              {' '}
              <ErrorPage refetchAll={refetch} />
            </>
          )}
        </>
      ) : (
        <>
          {' '}
          <Skeleton />
        </>
      )}
    </>
  );
}

export default Analytics;
