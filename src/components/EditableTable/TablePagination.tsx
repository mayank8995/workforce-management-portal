import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ROWS_PER_PAGE_OPTIONS,
  selectDropDownClass,
  selectOptionsClass,
  toolbarBtn,
} from '../../utils/constants';
import type { TablePaginationProps } from '../../types/types';

const TablePagination = ({
  tableQueryParams,
  handleRowsPerPageChange,
  handlePrevious,
  handleNext,
}: TablePaginationProps) => {
  const { page, limit } = tableQueryParams;
  const total = Number(tableQueryParams?.total) || 0;
  const totalPages = tableQueryParams.totalPages || 0;
  const isPrevDisabled = page === 1;
  const isNextDisabled = page === totalPages || totalPages === 0;
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 px-4 max-xs:px-3 lg:px-6 py-3 border-t border-slate-100 dark:border-slate-800">
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 tabular-nums text-center sm:text-left">
        Showing{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {from}–{to}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {total}
        </span>
      </p>

      <div className="flex items-center justify-between sm:justify-end gap-3 max-xs:gap-2 sm:gap-5">
        <label
          htmlFor="limit"
          className="flex gap-2 max-xs:gap-1.5 text-xs sm:text-sm items-center text-slate-500 dark:text-slate-400 whitespace-nowrap"
        >
          <span className="max-xs:hidden">Rows per page</span>
          <span className="hidden max-xs:inline">Rows</span>
          <select
            id="limit"
            name="limit"
            value={limit}
            onChange={handleRowsPerPageChange}
            className={selectDropDownClass}
          >
            {ROWS_PER_PAGE_OPTIONS.map((option) => (
              <option
                key={`option-${option}`}
                className={selectOptionsClass}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2 max-xs:gap-1.5">
          <button
            type="button"
            aria-label="Previous page"
            disabled={isPrevDisabled}
            onClick={handlePrevious}
            className={`${toolbarBtn} px-0! ${isPrevDisabled ? 'pointer-events-none' : 'cursor-pointer'}`}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs sm:text-sm font-medium tabular-nums whitespace-nowrap text-slate-700 dark:text-slate-200">
            {page} / {totalPages || 1}
          </span>
          <button
            type="button"
            aria-label="Next page"
            disabled={isNextDisabled}
            onClick={handleNext}
            className={`${toolbarBtn} px-0! ${isNextDisabled ? 'pointer-events-none' : 'cursor-pointer'}`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TablePagination);
