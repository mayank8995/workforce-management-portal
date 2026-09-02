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

  return (
    <React.Fragment>
      <div className="lg:hidden px-6 pt-4">
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
            <button onClick={() => setTextToBeSearched('')}>
              <X
                width={18}
                className="cursor-pointer absolute bottom-0 right-1.5 top-2.5 dark:text-slate-300 "
                color="#2563eb"
              />
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-row items-center justify-between">
        <div className="flex-1 justify-between  flex items-center px-6 pb-4">
          <div className="gap-2 flex flex-row items-center">
            <div className="flex justify-center items-center">
              <label
                htmlFor="limit"
                className=" hidden lg:flex gap-2 text-sm items-center font-bold dark:text-slate-100 pr-2"
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
            {
              <div className="gap-2 flex items-center">
                <button className="cursor-pointer" onClick={openFilterModal}>
                  <span title="Filter">
                    {isfilterAvailable?.length === 0 ? (
                      <Funnel
                        size={20}
                        className=" text-gray-600 dark:text-gray-100"
                        color="#2563eb"
                      />
                    ) : (
                      <FunnelX
                        size={20}
                        className=" text-gray-600 dark:text-gray-100"
                        color="#2563eb"
                      />
                    )}
                  </span>
                </button>
                <button
                  className="cursor-pointer flex lg:hidden"
                  onClick={openSortModal}
                >
                  {
                    <span title="Sort">
                      <ArrowUpDown
                        size={20}
                        className=" text-gray-600 dark:text-gray-100"
                        color="#2563eb"
                      />
                    </span>
                  }
                </button>
                <button
                  disabled={selectedRow.size === 0 || !isUpdateAllowed}
                  className={`${selectedRow.size === 0 || !isUpdateAllowed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={bulkAction}
                >
                  <span title="Download csv" className="flex gap-2">
                    <Download
                      size={20}
                      color={selectedRow.size === 0 ? '#9ca3af' : '#2563eb'}
                      className={`text-gray-600 dark:text-gray-100`}
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
                <div
                  title="Select All"
                  className="flex lg:hidden items-center justify-center border-2 border-slate-950 border-dotted dark:border-slate-100 w-5 h-5"
                >
                  <FormField
                    ref={ref}
                    name={'selectAll'}
                    type={'checkbox'}
                    id={'selectAll'}
                    checked={
                      // selectedRow.has('selectAll') ||
                      selectedRow.size === listSize
                    }
                    onChange={handleOnChange}
                    className={`m-0 cursor-pointer`}
                    disabled={!isUpdateAllowed}
                  />
                </div>
                <button
                  className={`${!isCreateAllowed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={openCreateEmployeeModal}
                  disabled={!isCreateAllowed}
                >
                  {
                    <span title="Sort">
                      <UserPlus
                        size={20}
                        className=" text-gray-600 dark:text-gray-100"
                        color={!isCreateAllowed ? '#9ca3af' : '#2563eb'}
                      />
                    </span>
                  }
                </button>
              </div>
            }
          </div>
          <div className="flex justify-center items-center">
            <button
              disabled={tableQueryParams.page === 1}
              onClick={handlePrevious}
              className={`p-2 transition-colors ${
                tableQueryParams.page === 1
                  ? 'opacity-40 cursor-not-allowed pointer-events-none  disabled:text-gray-400 dark:disabled:text-gray-100'
                  : 'cursor-pointer text-gray-600 dark:text-gray-100'
              }`}
            >
              <SquareChevronLeft />
            </button>
            <span className="text-xs md:text-sm font-bold  dark:text-slate-100">
              {tableQueryParams.page} / {tableQueryParams.totalPages || 1}
            </span>
            <button
              disabled={
                tableQueryParams.page === tableQueryParams.totalPages ||
                tableQueryParams.totalPages === 0
              }
              onClick={handleNext}
              className={`p-2 transition-colors ${
                tableQueryParams.page === tableQueryParams.totalPages ||
                tableQueryParams.totalPages === 0
                  ? 'opacity-40 cursor-not-allowed pointer-events-none  disabled:text-gray-400 dark:disabled:text-gray-100'
                  : 'cursor-pointer text-gray-600 dark:text-gray-100'
              }`}
            >
              <SquareChevronRight />
            </button>
          </div>
        </div>
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
              <button onClick={() => setTextToBeSearched('')}>
                <X
                  width={18}
                  className="cursor-pointer absolute bottom-0 right-1.5 top-2.5 dark:text-slate-300"
                  color="#2563eb"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(TableToolbar);
