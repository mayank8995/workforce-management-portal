import React from 'react';
import FormField from '../Form/FormField';
import {
  ArrowUpDown,
  Download,
  Funnel,
  FunnelX,
  Search,
  UserPlus,
  X,
} from 'lucide-react';
import {
  checkboxClass,
  className,
  toolbarBtn,
  toolbarPrimaryBtn,
} from '../../utils/constants';
import type { SelectedChip, TableToolbarProps } from '../../types/types';
import { useQueryClient } from '@tanstack/react-query';
import { TailSpin } from 'react-loader-spinner';
import { useAuth } from '../../context/AuthContext';

const TableToolbar = ({
  txtToBeSearched,
  setTextToBeSearched,
  openFilterModal,
  openSortModal,
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
  const isFilterActive = isfilterAvailable?.length > 0;
  const selectedCount = selectedRow.size;
  const isExportDisabled = selectedCount === 0 || !isUpdateAllowed;

  return (
    <div className="flex flex-col gap-3 px-4 max-xs:px-3 lg:px-6 py-4 max-xs:py-3 border-b border-slate-100 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* search */}
        <div className="relative flex-1 min-w-0 lg:max-w-sm">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />
          <FormField
            value={txtToBeSearched}
            className={`${className} pl-9! pr-9!`}
            type={'text'}
            name={'search'}
            placeholder={'Search...'}
            onChange={(e) => setTextToBeSearched(e?.target?.value || '')}
          />
          {txtToBeSearched && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setTextToBeSearched('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md cursor-pointer text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* actions */}
        <div className="flex items-center gap-2 max-xs:gap-1.5 sm:ml-auto">
          <button
            type="button"
            title="Filter"
            className={`${toolbarBtn} relative cursor-pointer ${isFilterActive ? 'border-brand-600/40! text-brand-600! dark:text-brand-300!' : ''}`}
            onClick={openFilterModal}
          >
            {isFilterActive ? <FunnelX size={16} /> : <Funnel size={16} />}
            <span className="hidden md:inline">Filter</span>
            {isFilterActive && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-brand-600 text-white text-[10px] font-semibold leading-4 text-center tabular-nums">
                {isfilterAvailable.length}
              </span>
            )}
          </button>

          {/* MOBILE sort */}
          <button
            type="button"
            title="Sort"
            className={`${toolbarBtn} cursor-pointer lg:hidden`}
            onClick={openSortModal}
          >
            <ArrowUpDown size={16} />
            <span className="hidden md:inline">Sort</span>
          </button>

          <button
            type="button"
            title="Download csv"
            disabled={isExportDisabled}
            className={`${toolbarBtn} ${isExportDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={bulkAction}
          >
            {downloading ? (
              <TailSpin
                visible={true}
                height={16}
                width={16}
                color={'#534ab7'}
                ariaLabel="tail-spin-loading"
                radius="1"
                strokeWidth="4"
                wrapperStyle={{}}
                wrapperClass="flex items-center justify-center"
              />
            ) : (
              <Download size={16} />
            )}
            <span className="hidden md:inline">Export</span>
            {selectedCount > 0 && (
              <span className="px-1.5 rounded-full bg-brand-600/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300 text-xs font-semibold tabular-nums">
                {selectedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            title="Add employee"
            className={`${toolbarPrimaryBtn} ml-auto sm:ml-0 ${!isCreateAllowed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={openCreateEmployeeModal}
            disabled={!isCreateAllowed}
          >
            <UserPlus size={16} />
            <span className="hidden min-[400px]:inline">Add employee</span>
          </button>
        </div>
      </div>

      {/* MOBILE select all */}
      <div className="flex lg:hidden items-center justify-between gap-2 text-xs">
        <label
          htmlFor="selectAll"
          className={`flex items-center gap-2 font-medium text-slate-600 dark:text-slate-300 ${isUpdateAllowed ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        >
          <FormField
            ref={ref}
            name={'selectAll'}
            type={'checkbox'}
            id={'selectAll'}
            checked={selectedCount === listSize && listSize !== 0}
            onChange={handleOnChange}
            className={`${checkboxClass} m-0 ${isUpdateAllowed ? 'cursor-pointer' : ''}`}
            disabled={!isUpdateAllowed}
          />
          Select all
        </label>
        {selectedCount > 0 && (
          <span className="text-slate-500 dark:text-slate-400 tabular-nums">
            {selectedCount} selected
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(TableToolbar);
