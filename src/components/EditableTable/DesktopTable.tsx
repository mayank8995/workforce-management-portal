import { TextSearch } from 'lucide-react';
import React, { useEffect } from 'react';
import {
  className,
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

  return (
    <div className="hidden lg:block m-2.5 rounded-2xl border border-slate-200 shadow-lg overflow-hidden dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900/50">
      <table className="w-full">
        <thead className="bg-slate-100 dark:bg-slate-800">
          {headersData?.length > 0 && (
            <tr className="cursor-pointer dark:border-slate-700">
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap select-none text-slate-600 dark:text-slate-400">
                <FormField
                  ref={ref}
                  name={'selectAll'}
                  type={'checkbox'}
                  id={'selectAll'}
                  checked={
                    selectedRow.size === list.length && list.length !== 0
                  }
                  onChange={handleOnChange}
                  className={`${className} ${!isUpdateAllowed ? 'cursor-pointer-none' : 'cursor-pointer'}`}
                  disabled={!isUpdateAllowed}
                />
              </th>
              {headersData?.map((header) => {
                return (
                  <React.Fragment key={header.key}>
                    {!(header?.metadata?.show === false) && (
                      <th
                        className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap select-none text-slate-600 dark:text-slate-400"
                        onClick={() => handleSort(header?.key)}
                      >
                        {header?.value} {getSortIcon(header?.key)}
                      </th>
                    )}
                  </React.Fragment>
                );
              })}
            </tr>
          )}
        </thead>
        {!isLoading ? (
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {list?.length > 0 ? (
              list?.map((row, index: number) => (
                <tr
                  key={`${row._id}-${index * 2}`}
                  className="transition-colors duration-150 odd:bg-white even:bg-slate-50 hover:bg-blue-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:hover:bg-slate-700/60 dark:border-slate-800"
                >
                  {/* {Hooking checkboxlist into list as checkbox list is derived from list} */}
                  <td
                    id={String(row?._id)}
                    className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-slate-800 dark:text-slate-300"
                  >
                    <FormField
                      name={String(row?._id)}
                      type={'checkbox'}
                      id={String(row?._id)}
                      checked={selectedRow.has(String(row?._id))}
                      onChange={handleOnChange}
                      className={`${className} ${!isUpdateAllowed ? 'cursor-pointer-none' : 'cursor-pointer'}`}
                      disabled={!isUpdateAllowed}
                    />
                  </td>
                  {columnsData?.map((column) => {
                    const value = row[column?.key];
                    return (
                      <React.Fragment key={column?.key}>
                        {!(column?.metadata?.show === false) && (
                          <td
                            className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-slate-800 dark:text-slate-300"
                            id={String(row?._id)}
                          >
                            <button
                              id={column?.key}
                              className={
                                column?.key === NAME
                                  ? 'cursor-pointer'
                                  : 'cursor-default'
                              }
                              type="button"
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
                                    : column?.render(
                                        String(value),
                                        column?.key
                                      )}
                                </>
                              )}
                            </button>
                          </td>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headersData?.length + 1}
                  className="text-center py-8"
                >
                  <h1 className="dark:text-slate-100 text-slate-800 flex flex-row justify-center items-center">
                    <TextSearch className="pr-1" />
                    <span>{NO_RESULT_FOUND}</span>
                  </h1>
                </td>
              </tr>
            )}
          </tbody>
        ) : (
          <tbody className="divide-y divide-slate-200 border-t border-slate-200 animate-pulse dark:divide-slate-800 dark:border-slate-800">
            {Array.from({ length: rowsPerPage }, (_, index) => index + 1)?.map(
              (_, id) => {
                return (
                  <tr key={`${id + rowsPerPage}`}>
                    {Array.from(
                      { length: headersData?.length },
                      (_, index) => index + 1
                    )?.map((_, i) => {
                      return (
                        <td
                          key={`${i + 1 + id + rowsPerPage}`}
                          className="px-4 py-4"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`${i === 0 ? 'h-5 w-5' : 'h-8 w-24'} rounded bg-slate-200 dark:bg-slate-700`}
                            ></div>
                          </div>
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
