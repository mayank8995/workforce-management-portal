/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import CustomTable from '../EditableTable/CustomTable';
import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_TABLE_QUERY_PARAMS,
  TABLE_CONFIG,
} from '../../utils/constants';
import type { TableQueryParams, TableTypeMap } from '../../types/types';
import { useLoader } from '../../context/Loadercontext';
import { useEmployeeAnalyticsTableData } from '../../api/tanstack.query';

function ViewMore() {
  const { setIsLoading } = useLoader();
  const [signal, setSignal] = useState<AbortSignal>();

  const [searchParams] = useSearchParams();
  const target = searchParams?.get('target');
  const config = TABLE_CONFIG[target as string];
  const [query, setQuery] = useState<TableQueryParams>(
    DEFAULT_TABLE_QUERY_PARAMS as TableQueryParams
  );
  const tableQuery = useEmployeeAnalyticsTableData(
    { ...query, tableType: target as keyof TableTypeMap },
    setIsLoading,
    signal
  );
  const list = tableQuery?.['data']?.data?.data?.['employees'] || [];
  function handleTableQuery(queryData: TableQueryParams, signal?: AbortSignal) {
    setQuery(
      (prev) =>
        ({
          ...prev,
          ...queryData,
          tableType: target as string,
        }) as TableQueryParams
    );
    setSignal(signal);
  }
  return (
    <CustomTable
      handleTableQuery={handleTableQuery}
      list={list || []}
      tableQueryParams={
        tableQuery?.['data']?.data?.data?.['pagination'] ||
        DEFAULT_TABLE_QUERY_PARAMS
      }
      setQuery={setQuery}
      columnsData={(config.columns as any[]) || []}
      headersData={(config.headers as any[]) || []}
      title={config.title || tableQuery?.data?.data?.['data']?.title}
      isError={tableQuery?.isError}
      isLoading={tableQuery?.isLoading}
      refetch={tableQuery?.refetch}
    />
  );
}
export default ViewMore;
