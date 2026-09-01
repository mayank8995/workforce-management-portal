/* eslint-disable no-useless-catch */
import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import {
  getAnalytics,
  getTableEmployees,
  getProfileData,
  getFilterList,
  fetchEmployeeDetails,
  getTopPerformers,
  getMeetingKPIs,
  getPromotedThisYear,
  getRequiringReview,
  getAnalyticsEmployeesTable,
} from '../api/admin-portal.api';
import type {
  FilterList,
  ListType,
  LoginProfile,
  TableHeader,
  TableQueryParams,
} from '../types/types';
import axios from 'axios';
import { REFETCH_TRY } from '../utils/constants';

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
    staleTime: Infinity,
    retry: REFETCH_TRY,
  });
}

export function useEmployreeAnalyticsTableData(
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
    staleTime: Infinity,
    retry: REFETCH_TRY,
  });
}

export function usePerFormanceTableData(params: TableQueryParams) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { totalPages, totalItems, ...updatedParams } = params;
  const queryParams =
    'tableType' in updatedParams
      ? updatedParams
      : ({ ...updatedParams, tableType: 'employees' } as TableQueryParams);

  return useQuery({
    queryKey: [
      'performance',
      ...Object.values(queryParams).map((v) => String(v)),
    ],
    queryFn: () => getTableEmployees(queryParams),
    placeholderData: keepPreviousData, // Smooth transitions,
    staleTime: Infinity,
    retry: REFETCH_TRY,
  });
}

export function useAllData(params: TableQueryParams) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { totalPages, totalItems, ...updatedParams } = params;
  const queryParams =
    'tableType' in updatedParams
      ? updatedParams
      : ({ ...updatedParams, tableType: 'employees' } as TableQueryParams);
  return useQueries({
    queries: [
      {
        queryKey: ['analyticsData'],
        queryFn: getAnalytics,
        staleTime: Infinity,
        retry: REFETCH_TRY,
      },
      {
        queryKey: ['topPerformers'],
        queryFn: getTopPerformers,
        staleTime: Infinity,
        retry: REFETCH_TRY,
      },
      {
        queryKey: ['meetingKPIs'],
        queryFn: getMeetingKPIs,
        staleTime: Infinity,
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
        staleTime: Infinity,
        retry: REFETCH_TRY,
      },

      // {
      //   queryKey: [
      //     'performance',
      //     ...Object.values(queryParams).map((v) => String(v)),
      //   ],
      //   queryFn: () => getTableEmployees(queryParams),
      //   placeholderData: keepPreviousData, // Smooth transitions,
      //   staleTime: Infinity,
      //   retry: REFETCH_TRY,
      // },
    ],
  });
}

export function useAnalytics() {
  return useQuery({
    queryKey: ['analyticsView'],
    queryFn: getAnalytics,
    staleTime: Infinity,
    retry: REFETCH_TRY,
  });
}

export function useProfileData(user: LoginProfile) {
  return useQuery({
    queryKey: ['profileData'],
    queryFn: () => getProfileData(user),
    staleTime: Infinity, // Keep the data "fresh" forever so it doesn't re-fetch
    retry: REFETCH_TRY,
  });
}

export function useEmployeeDetail(_id: { _id: string }) {
  const { _id: userId } = _id;
  return useQuery({
    queryKey: ['employeeDetail', _id],
    queryFn: () => fetchEmployeeDetails(_id),
    staleTime: Infinity, // Keep the data "fresh" forever so it doesn't re-fetch
    retry: REFETCH_TRY,
    enabled: !!userId, // Only run the query if _id is provided
  });
}

export function exportSelected<T extends ListType>(
  selectedRow: Set<unknown>,
  data: T[],
  headers: TableHeader<T>[],
  fileName: string
) {
  try {
    const rows = data?.filter((item) => {
      if (selectedRow.has(String(item._id))) {
        return true;
      }
      return false;
    });

    const headerRow = headers.map((header) => header.value);

    const dataRows = rows.map((row) =>
      headers.map((header) => {
        const value = row[header.key];
        return escapeCSVValue(value);
      })
    );

    const csvRows = [headerRow, ...dataRows];

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = `${fileName}.csv`;

    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    throw error;
  }
}

function escapeCSVValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const stringValue = String(value);

  const escapedValue = stringValue.replace(/"/g, '""');

  return `"${escapedValue}"`;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const errorObj = error as { data?: { message?: string } };
    if (errorObj.data?.message) {
      return errorObj.data.message;
    }
  }
  return 'Something Went Wrong!';
}

export const getApiErrorDetails = (err: unknown) => {
  let message = null;
  if (err instanceof Error) {
    message = err.message;
  }
  if (typeof err === 'object' && err !== null && 'data' in err) {
    const errorObj = err as { data?: { message?: string } };
    if (errorObj.data?.message) {
      message = errorObj.data.message;
    }
  }
  const axiosError = axios.isAxiosError(err) ? err : undefined;

  return {
    message,
    status: axiosError?.response?.status,
    url: axiosError?.config?.url,
  };
};

export function isValidPrimitive(value: any) {
  return (
    value !== null &&
    value !== undefined &&
    typeof value !== 'object' &&
    typeof value !== 'function'
  );
}

// To extract the value from array of objects
export function extract(current: any, remainingKeys: string[]): string[] {
  // collect whatever we have
  if (remainingKeys.length === 0) {
    if (current === null) {
      return [];
    }

    if (Array.isArray(current)) {
      return current.flatMap((item) => extract(item, []));
    }

    if (typeof current === 'object') {
      return [];
    }

    return [String(current)];
  }

  if (current === null) {
    return [];
  }

  if (Array.isArray(current)) {
    return current.flatMap((item) => extract(item, remainingKeys));
  }

  if (typeof current !== 'object') {
    return [];
  }

  const [key, ...rest] = remainingKeys;

  return extract(current[key], rest);
}
