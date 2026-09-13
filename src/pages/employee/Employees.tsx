/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import CustomTable from '../../components/EditableTable/CustomTable';
import {
  DEFAULT_TABLE_QUERY_PARAMS,
  EMPLOYEE_DIREC,
  headers_employees,
} from '../../utils/constants';
import type {
  EmployeeDirectoryResponse,
  TableQueryParams,
} from '../../types/types';
import { useLoader } from '../../context/Loadercontext';
import { columns_employees } from '../../components/EditableTable/CustomCellRenderer';
import { useTableData } from '../../api/tanstack.query';

function Employees() {
  const { setIsLoading } = useLoader();
  const [signal, setSignal] = useState<AbortSignal>();

  const [query, setQuery] = useState<TableQueryParams>(
    DEFAULT_TABLE_QUERY_PARAMS as TableQueryParams
  );
  const {
    data: tableQuery,
    isError,
    isLoading,
    refetch,
  } = useTableData({ ...query }, setIsLoading, signal);

  const list =
    (tableQuery?.['data']?.data as EmployeeDirectoryResponse)?.['employees'] ||
    [];
  function handleTableQuery(queryData: TableQueryParams, signal?: AbortSignal) {
    setQuery((prev) => ({ ...prev, ...queryData }));
    setSignal(signal);
  }
  return (
    <CustomTable
      handleTableQuery={handleTableQuery}
      list={list || []}
      tableQueryParams={
        (tableQuery?.['data']?.data as EmployeeDirectoryResponse)?.[
          'pagination'
        ] || DEFAULT_TABLE_QUERY_PARAMS
      }
      columnsData={columns_employees}
      headersData={headers_employees}
      title={EMPLOYEE_DIREC}
      setQuery={setQuery}
      isError={isError}
      isLoading={isLoading}
      refetch={refetch}
    />
  );
}

export default Employees;
