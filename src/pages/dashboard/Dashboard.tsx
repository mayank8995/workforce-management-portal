/* eslint-disable @typescript-eslint/no-misused-promises */
import KeyMetric from '../../components/Card/KeyMetric';
// import { TOP_PROJECTS } from '../../utils/constants';
import KeyMetricCard from '../../components/Card/KeyMetricCard';
// import TopProjectsCard from '../../components/Card/TopProjectsCard';
import TopPerformersCard from '../../components/Card/TopPerformersCard';
import PromotedCard from '../../components/Card/PromotedCard';
import MeetingKPIsCard from '../../components/Card/MeetingKPIsCard';
import RequiringReviewCard from '../../components/Card/RequiringReviewCard';
import type {
  // TopProjectEmployeeResponse,
  MeetingKPIsCardProps,
  PromotedThisYearCardProps,
  RequiringReviewCardProps,
  TopPerformersCardProps,
} from '../../types/types';
import Skeleton from '../../components/Skeleton/Skeleton';
import ErrorPage from '../../components/Error/ErrorPage';
import { useAllData } from '../../api/tanstack.query';

function Dashboard() {
  const results = useAllData();
  const metricData = results[0]?.data?.data;
  const topPerformers = results[1]?.data?.data;
  const meetingKPIs = results[2]?.data?.data;
  const promotedThisYear = results[3]?.data?.data;
  const requiringReview = results[4]?.data?.data;
  // const topProjects = results[2]?.data;
  const isLoading = results.some((query) => query.isLoading);
  const isError = results.some((query) => query.isError);
  const refetchAll = () => {
    results.forEach((result) => result.refetch());
  };

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col flex-auto">
          {!isError ? (
            <>
              <KeyMetricCard>
                <KeyMetric metricData={metricData}></KeyMetric>
              </KeyMetricCard>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 xl:px-4 pb-2 xl:pb-4">
                <TopPerformersCard
                  topPerformersList={topPerformers as TopPerformersCardProps}
                ></TopPerformersCard>
                <PromotedCard
                  promotedThisYear={
                    promotedThisYear as PromotedThisYearCardProps
                  }
                ></PromotedCard>
                <RequiringReviewCard
                  requiringReview={requiringReview as RequiringReviewCardProps}
                ></RequiringReviewCard>
                <MeetingKPIsCard
                  meetingKPIs={meetingKPIs as MeetingKPIsCardProps}
                ></MeetingKPIsCard>
                {/* <TopProjectsCard
                  topProjects={
                    topProjects?.['data'] as TopProjectEmployeeResponse
                  }
                  title={TOP_PROJECTS}
                  isError={isError}
                  isLoading={isLoading}
                  refetch={refetchAll}
                /> */}
              </div>
            </>
          ) : (
            <div className="flex flex-col flex-1 h-screen overflow-y-auto justify-center items-center dark:bg-gray-800">
              <ErrorPage refetchAll={refetchAll} />{' '}
            </div>
          )}
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  );
}

export default Dashboard;
