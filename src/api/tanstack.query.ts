import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import {
  fetchEmployeeDetails,
  getAnalytics,
  getAnalyticsEmployeesTable,
  getFilterList,
  getMeetingKPIs,
  getProfileData,
  getPromotedThisYear,
  getRequiringReview,
  getTableEmployees,
  getTopPerformers,
} from './admin-portal.api';
import { REFETCH_TRY } from '../utils/constants';
import type {
  FilterList,
  LoginProfile,
  TableQueryParams,
} from '../types/types';

export function useFilterList(params: FilterList) {
  return useQuery({
    queryKey: ['filterList', params.tableType],
    queryFn: () => getFilterList(params),
    staleTime: Infinity, // Keep the data "fresh" forever so it doesn't re-fetch
    retry: REFETCH_TRY,
  });
}

export function useTableData(
  params: TableQueryParams,
  setIsLoading: (loading: boolean) => void,
  signal?: AbortSignal
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { totalPages, totalItems, ...updatedParams } = params;

  // const reqParams = {};
  const queryParams: TableQueryParams =
    'tableType' in updatedParams
      ? updatedParams
      : { ...updatedParams, tableType: 'employees' };

  return useQuery({
    queryKey: [
      'employees',
      ...Object.values(queryParams).map((v) => String(v)),
    ],
    queryFn: () => getTableEmployees(queryParams, setIsLoading, signal),
    placeholderData: keepPreviousData, // Smooth transitions,
    staleTime: 1000 * 60 * 20,
    retry: REFETCH_TRY,
  });
}

export function useEmployeeAnalyticsTableData(
  params: TableQueryParams,
  setIsLoading: (loading: boolean) => void,
  signal?: AbortSignal
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { totalPages, totalItems, ...updatedParams } = params;

  // const reqParams = {};
  const queryParams: TableQueryParams =
    'tableType' in updatedParams
      ? updatedParams
      : { ...updatedParams, tableType: 'employees' };

  return useQuery({
    queryKey: [
      'employees',
      ...Object.values(queryParams).map((v) => String(v)),
    ],
    queryFn: () =>
      getAnalyticsEmployeesTable(queryParams, setIsLoading, signal),
    placeholderData: keepPreviousData, // Smooth transitions,
    staleTime: 1000 * 60 * 20,
    retry: REFETCH_TRY,
  });
}

export function useAllData() {
  return useQueries({
    queries: [
      {
        queryKey: ['analyticsData'],
        queryFn: getAnalytics,
        staleTime: 1000 * 60 * 20,
        retry: REFETCH_TRY,
      },
      {
        queryKey: ['topPerformers'],
        queryFn: getTopPerformers,
        staleTime: 1000 * 60 * 20,
        retry: REFETCH_TRY,
      },
      {
        queryKey: ['meetingKPIs'],
        queryFn: getMeetingKPIs,
        staleTime: 1000 * 60 * 20,
        retry: REFETCH_TRY,
      },
      {
        queryKey: ['promotedThisYear'],
        queryFn: getPromotedThisYear,
        staleTime: Infinity,
        retry: REFETCH_TRY,
      },
      {
        queryKey: ['requiringReview'],
        queryFn: getRequiringReview,
        staleTime: 1000 * 60 * 20,
        retry: REFETCH_TRY,
      },
    ],
  });
}

export function useAnalytics() {
  return useQuery({
    queryKey: ['analyticsView'],
    queryFn: getAnalytics,
    staleTime: 1000 * 60 * 20,
    retry: REFETCH_TRY,
  });
}

export function useProfileData(user: LoginProfile) {
  return useQuery({
    queryKey: ['profileData'],
    queryFn: () => getProfileData(user),
    staleTime: 1000 * 60 * 30,
    retry: REFETCH_TRY,
  });
}

export function useEmployeeDetail(_id: { _id: string }) {
  const { _id: userId } = _id;
  return useQuery({
    queryKey: ['employeeDetail', _id],
    queryFn: () => fetchEmployeeDetails(_id),
    staleTime: 1000 * 60 * 20,
    retry: REFETCH_TRY,
    enabled: !!userId, // Only run the query if _id is provided
  });
}
// export function useAIChat(data: string) {
//   return useQuery({
//     queryKey: ['AIChat'],
//     queryFn: () => aiChat(data),
//     staleTime: 1000 * 60 * 10,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     refetchOnReconnect: false,
//   });
// }
