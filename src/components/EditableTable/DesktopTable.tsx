import { TextSearch } from 'lucide-react';
import React, { useEffect } from 'react';
import {
  EDIT_EMPLOYEE_SUBTITLE,
  EDIT_EMPLOYEE_TITLE,
  NAME,
  NO_RESULT_FOUND,
} from '../../utils/constants';
import type { DesktopTableProps, ListType } from '../../types/types';
import { useLoader } from '../../context/Loadercontext';
import FormField from '../Form/FormField';
import { useModal } from '../../context/ModalContext';
// import DetailModal from '../Overlay/DetailModal';
import AndOthersComponent from '../AndOthers/AndOthersComponent';
import EmployeeForm from '../Form/EmployeeForm/EmployeeForm';
import { useAuth } from '../../context/AuthContext';
import { cx, emptyState, form, skeleton, table } from '../../theme/theme';

// checkbox column + first data column stay pinned while the rest scrolls horizontally
const stickyCheckboxCell = 'sticky left-0 z-10 w-12 min-w-12 bg-inherit';
const stickyFirstCell = cx('sticky left-12 z-10 bg-inherit', table.stickyEdge);

const isVisible = (item: { metadata?: { show?: boolean } }) =>
  item?.metadata?.show !== false;

function getAriaSort(isSorted: boolean, sortOrder?: string) {
  if (!isSorted) {
    return 'none';
  }
  return sortOrder === 'asc' ? 'ascending' : 'descending';
}

const skeletonCellCss = ['h-4 w-4', 'h-8 w-36'];

const DesktopTable = <T extends ListType>(props: DesktopTableProps<T>) => {
  const {
    list,
    headersData,
    columnsData,
    handleSort,
    getSortIcon,
    rowsPerPage,
    tableQueryParams,
    selectedRow,
    setSelectedRow,
    handleOnChange,
    ref,
  } = props;
  const { openModal } = useModal();
  const { isLoading } = useLoader();
  const { can } = useAuth();
  const isUpdateAllowed = can('employee', 'update');
  // const { selectedRow, setSelectedRow, handleOnChange } = useCheckBox(list);
  // to do - uses cases of when checkbox should be selected or not.
  /** const {
    search: _search,
    limit: _limit,
    ...restParams
  } = tableQueryParams || {};
  const restParamsKeys = JSON.stringify(restParams);*/
  // const isTopProj = tableQueryParams?.tableType === (TOP_PROJ as keyof TableTypeMap);
  useEffect(() => {
    setSelectedRow(new Set());
  }, [tableQueryParams]);

  const visibleHeaders = headersData?.filter(isVisible);
  const visibleColumns = columnsData?.filter(isVisible);
  const checkboxCss = `${form.checkbox} ${!isUpdateAllowed ? 'cursor-pointer-none' : 'cursor-pointer'}`;

  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full min-w-max border-separate border-spacing-0">
        <thead>
          {visibleHeaders?.length > 0 && (
            <tr className={table.headRow}>
              <th className={cx(table.headCell, stickyCheckboxCell)}>
                <FormField
                  ref={ref}
                  name={'selectAll'}
                  type={'checkbox'}
                  id={'selectAll'}
                  checked={
                    selectedRow.size === list.length && list.length !== 0
                  }
                  onChange={handleOnChange}
                  className={checkboxCss}
                  disabled={!isUpdateAllowed}
                />
              </th>
              {visibleHeaders?.map((header, index) => {
                const isSorted = tableQueryParams?.sortBy === header?.key;
                return (
                  <th
                    key={header.key}
                    className={cx(
                      table.headCell,
                      index === 0 && stickyFirstCell,
                      'cursor-pointer hover:text-ink'
                    )}
                    aria-sort={getAriaSort(
                      isSorted,
                      tableQueryParams?.sortOrder
                    )}
                    onClick={() => handleSort(header?.key)}
                  >
                    <span
                      className={cx(
                        'inline-flex items-center gap-1.5',
                        isSorted && table.headCellSorted
                      )}
                    >
                      {header?.value} {getSortIcon(header?.key)}
                    </span>
                  </th>
                );
              })}
            </tr>
          )}
        </thead>
        {!isLoading ? (
          <tbody>
            {list?.length > 0 ? (
              list?.map((row, index: number) => {
                const isSelected = selectedRow.has(String(row?._id));
                return (
                  <tr
                    key={`${row._id}-${index * 2}`}
                    className={cx(
                      'group transition-colors duration-150',
                      isSelected ? table.rowSelected : table.row
                    )}
                  >
                    {/* {Hooking checkboxlist into list as checkbox list is derived from list} */}
                    <td
                      id={String(row?._id)}
                      className={cx(table.cell, stickyCheckboxCell)}
                    >
                      <FormField
                        name={String(row?._id)}
                        type={'checkbox'}
                        id={String(row?._id)}
                        checked={isSelected}
                        onChange={handleOnChange}
                        className={checkboxCss}
                        disabled={!isUpdateAllowed}
                      />
                    </td>
                    {visibleColumns?.map((column, colIndex) => {
                      const value = row[column?.key];
                      const isName = column?.key === NAME;
                      return (
                        <td
                          key={column?.key}
                          className={cx(
                            table.cell,
                            colIndex === 0 && stickyFirstCell,
                            isName && 'font-medium'
                          )}
                          id={String(row?._id)}
                        >
                          <button
                            id={column?.key}
                            className={`text-left max-w-full ${
                              isName
                                ? 'cursor-pointer rounded-md hover:underline underline-offset-4 decoration-brand-300 focus-visible:ring-2 focus-visible:ring-brand-600'
                                : 'cursor-default'
                            }`}
                            type="button"
                            tabIndex={isName ? 0 : -1}
                            onClick={(
                              event: React.MouseEvent<HTMLButtonElement>
                            ) => {
                              if (!(event.currentTarget.id === NAME)) {
                                event.preventDefault();
                                return;
                              }
                              openModal(EmployeeForm, {
                                _id: row._id,
                                tableQueryParams,
                                title: EDIT_EMPLOYEE_TITLE,
                                subtitle: EDIT_EMPLOYEE_SUBTITLE,
                              });
                            }}
                          >
                            {Array.isArray(value) && value?.length > 0 ? (
                              <AndOthersComponent
                                values={value}
                                id={column?.key}
                                render={column?.render}
                              />
                            ) : (
                              <>
                                {!column?.render
                                  ? value
                                  : column?.render(String(value), column?.key)}
                              </>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={visibleHeaders?.length + 1} className="py-16">
                  <div className={emptyState.wrapper}>
                    <span className={emptyState.icon}>
                      <TextSearch size={22} />
                    </span>
                    <div>
                      <h1 className={emptyState.title}>{NO_RESULT_FOUND}</h1>
                      <p className={emptyState.description}>
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        ) : (
          <tbody className="animate-pulse">
            {Array.from({ length: rowsPerPage }, (_, index) => index + 1)?.map(
              (_, id) => {
                return (
                  <tr key={`${id + rowsPerPage}`}>
                    {Array.from(
                      { length: (visibleHeaders?.length || 0) + 1 },
                      (_, index) => index + 1
                    )?.map((_, i) => {
                      return (
                        <td
                          key={`${i + 1 + id + rowsPerPage}`}
                          className="px-4 py-3.5 border-b border-line-subtle"
                        >
                          <div
                            className={cx(
                              skeletonCellCss[i] ?? 'h-4 w-24',
                              'rounded',
                              skeleton.fill
                            )}
                          ></div>
                        </td>
                      );
                    })}
                  </tr>
                );
              }
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

const MemoizedDesktopTable = React.memo(DesktopTable) as <T extends ListType>(
  props: DesktopTableProps<T>
) => React.ReactElement;
export default MemoizedDesktopTable;
