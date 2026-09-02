/* eslint-disable no-useless-catch */
import type { ListType, TableHeader } from '../types/types';
import axios from 'axios';

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
