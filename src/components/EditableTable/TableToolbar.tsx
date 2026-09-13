/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import FormField from '../Form/FormField';
import {
  ArrowUpDown,
  Download,
  Funnel,
  FunnelX,
  SquareChevronLeft,
  SquareChevronRight,
  UserPlus,
  X,
} from 'lucide-react';
import {
  className,
  selectDropDownClass,
  selectOptionsClass,
} from '../../utils/constants';
import type { SelectedChip, TableToolbarProps } from '../../types/types';
import { useQueryClient } from '@tanstack/react-query';
import { TailSpin } from 'react-loader-spinner';
import { useAuth } from '../../context/AuthContext';

const TableToolbar = ({
  txtToBeSearched,
  setTextToBeSearched,
  tableQueryParams,
  handleRowsPerPageChange,
  openFilterModal,
  openSortModal,
  handlePrevious,
  handleNext,
  bulkAction,
  selectedRow,
  handleOnChange,
  downloading,
  ref,
  listSize,
  openCreateEmployeeModal,
}: TableToolbarProps) => {
  const queryClient = useQueryClient();
  const isfilterAvailable: SelectedChip[] =
    queryClient.getQueryData(['filterKeyData']) || [];
  const { can } = useAuth();
  const isUpdateAllowed = can('employee', 'update');
  const isCreateAllowed = can('employee', 'create');

  const iconBtn =
    'p-1.5 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 disabled:hover:bg-transparent';
  const iconActive = 'text-blue-600 dark:text-blue-400';
  const iconMuted = 'text-slate-400 dark:text-slate-600';

  return (
    <React.Fragment>
      {/* MOBILE search */}
      <div className="lg:hidden px-4 pt-4">
        <div className="relative">
          <FormField
            style={{ width: '100%' }}
            value={txtToBeSearched}
            className={`${className}`}
            type={'text'}
            name={'search'}
            placeholder={'Search...'}
            onChange={(e) => setTextToBeSearched(e?.target?.value || '')}
          />
          {txtToBeSearched && (
            <button
              onClick={() => setTextToBeSearched('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <X width={18} className={iconActive} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-row items-center justify-between">
        <div className="flex-1 min-w-0 flex flex-wrap items-center justify-between gap-y-2 px-4 lg:px-6 pb-4">
          <div className="gap-2 flex flex-row items-center shrink-0">
            {/* DESKTOP rows per page */}
            <div className="flex justify-center items-center">
              <label
                htmlFor="limit"
                className="hidden lg:flex gap-2 text-sm items-center font-bold dark:text-slate-100 pr-2"
              >
                Rows / page{' '}
                <select
                  id="limit"
                  name="limit"
                  value={tableQueryParams.limit}
                  onChange={handleRowsPerPageChange}
                  className={selectDropDownClass}
                >
                  {[2, 3, 5, 7, 10, 15].map((option, index) => (
                    <option
                      key={`option-${index}`}
                      className={selectOptionsClass}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="hidden lg:block h-5 w-px bg-slate-200 dark:bg-slate-700" />

            <div className="gap-0.5 lg:gap-1 flex items-center shrink-0">
              <button
                className={`${iconBtn} cursor-pointer`}
                onClick={openFilterModal}
              >
                <span title="Filter">
                  {isfilterAvailable?.length === 0 ? (
                    <Funnel size={20} className={iconActive} />
                  ) : (
                    <FunnelX size={20} className={iconActive} />
                  )}
                </span>
              </button>

              {/* MOBILE sort */}
              <button
                className={`${iconBtn} cursor-pointer flex lg:hidden`}
                onClick={openSortModal}
              >
                <span title="Sort">
                  <ArrowUpDown size={20} className={iconActive} />
                </span>
              </button>

              <button
                disabled={selectedRow.size === 0 || !isUpdateAllowed}
                className={`${iconBtn} ${selectedRow.size === 0 || !isUpdateAllowed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={bulkAction}
              >
                <span title="Download csv" className="flex gap-2">
                  <Download
                    size={20}
                    className={selectedRow.size === 0 ? iconMuted : iconActive}
                  />
                  {downloading && (
                    <TailSpin
                      visible={true}
                      height={20}
                      width={20}
                      color={'#2563eb'}
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      strokeWidth="4"
                      wrapperStyle={{}}
                      wrapperClass="flex items-center justify-center"
                    />
                  )}
                </span>
              </button>

              {/* MOBILE select all */}
              <div
                title="Select All"
                className="flex lg:hidden items-center justify-center w-6 h-6 mx-1 shrink-0 rounded-md border border-dashed border-slate-300 dark:border-slate-600"
              >
                <FormField
                  ref={ref}
                  name={'selectAll'}
                  type={'checkbox'}
                  id={'selectAll'}
                  checked={selectedRow.size === listSize}
                  onChange={handleOnChange}
                  className={`m-0 cursor-pointer`}
                  disabled={!isUpdateAllowed}
                />
              </div>

              <button
                className={`${iconBtn} ${!isCreateAllowed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={openCreateEmployeeModal}
                disabled={!isCreateAllowed}
              >
                <span title="Add employee">
                  <UserPlus
                    size={20}
                    className={!isCreateAllowed ? iconMuted : iconActive}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* pagination */}
          <div className="flex justify-center items-center shrink-0">
            <button
              disabled={tableQueryParams.page === 1}
              onClick={handlePrevious}
              className={`${iconBtn} ${
                tableQueryParams.page === 1
                  ? 'opacity-40 cursor-not-allowed pointer-events-none text-slate-400 dark:text-slate-600'
                  : 'cursor-pointer text-slate-600 dark:text-slate-300'
              }`}
            >
              <SquareChevronLeft size={20} />
            </button>
            <span className="px-1.5 lg:px-2 text-xs md:text-sm font-bold tabular-nums whitespace-nowrap text-slate-700 dark:text-slate-100">
              {tableQueryParams.page} / {tableQueryParams.totalPages || 1}
            </span>
            <button
              disabled={
                tableQueryParams.page === tableQueryParams.totalPages ||
                tableQueryParams.totalPages === 0
              }
              onClick={handleNext}
              className={`${iconBtn} ${
                tableQueryParams.page === tableQueryParams.totalPages ||
                tableQueryParams.totalPages === 0
                  ? 'opacity-40 cursor-not-allowed pointer-events-none text-slate-400 dark:text-slate-600'
                  : 'cursor-pointer text-slate-600 dark:text-slate-300'
              }`}
            >
              <SquareChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* DESKTOP search */}
        <div className="hidden lg:flex px-6 pb-4">
          <div className="relative">
            <FormField
              value={txtToBeSearched}
              className={className}
              type={'text'}
              name={'search'}
              placeholder={'Search...'}
              onChange={(e) => setTextToBeSearched(e?.target?.value || '')}
            />
            {txtToBeSearched && (
              <button
                onClick={() => setTextToBeSearched('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <X width={18} className={iconActive} />
              </button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(TableToolbar);
