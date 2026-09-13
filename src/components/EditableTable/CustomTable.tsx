import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import React, { useState, useEffect, type ChangeEvent } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumbs';
import { useQueryClient } from '@tanstack/react-query';
import FilterModal from '../FilterComponent/FilterModal';
import SortModalComponent from '../SortModal/SortModalComponent';
import TableToolbar from './TableToolbar';
import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import type {
  CustomTableProps,
  ListType,
  SelectedChip,
} from '../../types/types';
import EmployeeTableSkeleton from '../Skeleton/EmployeeTableSkeleton';
import ErrorPage from '../Error/ErrorPage';
import { useCheckBox } from '../../hooks/useCheckBox';
import { exportSelected } from '../../services/utils.service';
import { toast } from 'react-toastify';
import useScreenType from '../../hooks/useScreenSize';
import { useModal } from '../../context/ModalContext';
import {
  BACKGROUND_COLOR,
  CREATE_EMPLOYEE_SUBTITLE,
  CREATE_EMPLOYEE_TITLE,
  EMPLOYEE_TABLE,
  ERROR_OCCURRED_WHILE_DOWNLOADING_FILE,
  sortModalContainerCss,
} from '../../utils/constants';
import { useSearchParams } from 'react-router-dom';
import EmployeeForm from '../Form/EmployeeForm/EmployeeForm';

function CustomTable<T extends ListType>(
  props: CustomTableProps<T>
): React.ReactElement {
  const {
    list,
    tableQueryParams,
    columnsData,
    headersData,
    title,
    setQuery,
    isError,
    isLoading,
    refetch,
  } = props;
  const { screenType } = useScreenType();
  const [searchParams] = useSearchParams();

  const { openModal, updateModalProps } = useModal();
  const { selectedRow, setSelectedRow, handleOnChange, ref } =
    useCheckBox(list);
  const queryClient = useQueryClient();
  const [txtToBeSearched, setTxtToBeSearched] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const isMobile = screenType === 'sm' || screenType === 'md';
    if (!isMobile) {
      return;
    }
    updateModalProps({
      sortConfig: {
        key: tableQueryParams.sortBy as string,
        direction: tableQueryParams.sortOrder as string,
      },
    });
  }, [tableQueryParams.sortBy, tableQueryParams.sortOrder, screenType]);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ['filterKeyData'], exact: true });
  }, []);
  useLockBodyScroll(showModal);

  function handleNext() {
    setQuery((prev) => {
      return {
        ...prev,
        page: Math.min(
          tableQueryParams.page + 1,
          tableQueryParams?.totalPages || 0
        ),
        limit: tableQueryParams.limit,
      };
    });
  }
  function handlePrevious() {
    setQuery((prev) => {
      return {
        ...prev,
        page: tableQueryParams.page - 1,
        limit: tableQueryParams.limit,
      };
    });
  }

  useEffect(() => {
    const controller = new AbortController();
    const timerId = setTimeout(() => {
      setQuery((prev) => {
        return {
          ...prev,
          page: 1,
          search: txtToBeSearched,
        };
      });
    }, 300);
    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [txtToBeSearched]);

  // Handler functions
  const handleSort = (key: string) => {
    setQuery((prev) => {
      const direction = prev.sortOrder;
      return {
        ...prev,
        sortBy: key,
        sortOrder: direction === 'asc' ? 'desc' : 'asc',
      };
    });
  };

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e?.target?.value));
    setQuery((prev) => {
      return {
        ...prev,
        page: 1,
        limit: Number(e?.target?.value),
      };
    });
  };

  const getSortIcon = (key: string) => {
    if (tableQueryParams.sortBy !== key) {
      return (
        <ArrowUpDown className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:hover:text-indigo-400" />
      );
    }
    return tableQueryParams.sortOrder === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:hover:text-indigo-400" />
    ) : (
      <ArrowDown className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:hover:text-indigo-400" />
    );
  };

  const openFilterModal = () => {
    openModal(FilterModal, {
      submitFilterData,
      clearAllFilter,
      tableQueryParams,
      setQuery,
      searchParams,
    });
  };

  const openSortModal = () => {
    openModal(SortModalComponent, {
      headersData,
      onSort: (key: string) => handleSort(key),
      sortConfig: {
        key: tableQueryParams.sortBy as string,
        direction: tableQueryParams.sortOrder as string,
      },
      containerCss: sortModalContainerCss,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const submitFilterData = (data: SelectedChip[]) => {
    queryClient.setQueryData(['filterKeyData'], data);
    closeModal();
    setQuery((prev) => {
      return {
        ...prev,
        page: 1,
      };
    });
  };

  const clearAllFilter = () => {
    queryClient.removeQueries({ queryKey: ['filterKeyData'], exact: true });
    setQuery((prev) => {
      return {
        ...prev,
        page: 1,
      };
    });
  };

  const bulkAction = () => {
    try {
      setDownloading(true);
      exportSelected(
        selectedRow,
        list,
        headersData,
        tableQueryParams?.tableType ?? EMPLOYEE_TABLE
      );
      setDownloading(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : ERROR_OCCURRED_WHILE_DOWNLOADING_FILE;
      toast.error(errorMessage);
    } finally {
      setDownloading(false);
    }
  };

  const openCreateEmployeeModal = () => {
    openModal(EmployeeForm, {
      title: CREATE_EMPLOYEE_TITLE,
      subtitle: CREATE_EMPLOYEE_SUBTITLE,
    });
  };
  return (
    <>
      {!isLoading ? (
        <div
          className={`min-h-screen bg-slate-50 p-2 xl:p-4 ${BACKGROUND_COLOR}`}
        >
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 flex-1 overflow-x-auto dark:bg-slate-950 dark:border-none">
            <div className="flex items-center justify-between gap-3 px-4 lg:px-6 py-4 pb-0">
              <h2 className="flex flex-row min-w-0 text-slate-800 dark:text-slate-100 font-semibold text-sm xl:text-base items-center gap-2">
                <Breadcrumb />
                <span className="truncate">{title}</span>
              </h2>
              <span
                className="shrink-0 px-3 py-0.5 xl:py-1
                  rounded-full
                  bg-green-100
                  text-green-700
                  text-[10px] xl:text-xs
                  font-semibold tabular-nums
                  ring-1 ring-green-200
                  dark:bg-emerald-900/40 dark:text-emerald-400 dark:ring-emerald-800"
              >
                Total: {tableQueryParams?.total || 0}
              </span>
            </div>
            <TableToolbar
              txtToBeSearched={txtToBeSearched}
              setTextToBeSearched={setTxtToBeSearched}
              tableQueryParams={tableQueryParams}
              handleRowsPerPageChange={handleRowsPerPageChange}
              openFilterModal={openFilterModal}
              openSortModal={openSortModal}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              bulkAction={bulkAction}
              selectedRow={selectedRow}
              handleOnChange={handleOnChange}
              downloading={downloading}
              ref={ref}
              listSize={list.length}
              openCreateEmployeeModal={openCreateEmployeeModal}
            />
            {!isError ? (
              <div className="flex flex-col justify-center">
                {screenType === 'sm' || screenType === 'md' ? (
                  <MobileTable
                    rowsPerPage={rowsPerPage}
                    list={list}
                    columnsData={columnsData}
                    tableQueryParams={tableQueryParams}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                    handleOnChange={handleOnChange}
                  />
                ) : (
                  <DesktopTable
                    list={list}
                    headersData={headersData}
                    columnsData={columnsData}
                    handleSort={handleSort}
                    getSortIcon={getSortIcon}
                    rowsPerPage={rowsPerPage}
                    tableQueryParams={tableQueryParams}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                    handleOnChange={handleOnChange}
                    ref={ref}
                  />
                )}
              </div>
            ) : (
              <ErrorPage refetchAll={() => refetch?.()} />
            )}
          </div>
        </div>
      ) : (
        <EmployeeTableSkeleton />
      )}
    </>
  );
}
const MemoizedCustomTable = React.memo(CustomTable) as <T extends ListType>(
  props: CustomTableProps<T>
) => React.ReactElement;
export default MemoizedCustomTable;
