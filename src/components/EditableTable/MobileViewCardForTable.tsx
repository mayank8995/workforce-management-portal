import React, { useEffect } from 'react';
import type { ListType, MobileTableProps } from '../../types/types';
import {
  checkboxClass,
  EDIT_EMPLOYEE_SUBTITLE,
  EDIT_EMPLOYEE_TITLE,
  gradients,
  NAME,
} from '../../utils/constants';
import FormField from '../Form/FormField';
import { useModal } from '../../context/ModalContext';
// import DetailModal from '../Overlay/DetailModal';
import AndOthersComponent from '../AndOthers/AndOthersComponent';
import EmployeeForm from '../Form/EmployeeForm/EmployeeForm';
import { useAuth } from '../../context/AuthContext';

function MobileViewCardForTable<T extends ListType>({
  list,
  columnsData,
  tableQueryParams,
  selectedRow,
  setSelectedRow,
  handleOnChange,
}: MobileTableProps<T>) {
  const { openModal } = useModal();
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
  // const isTopProj =
  //   tableQueryParams?.tableType === (TOP_PROJ as keyof TableTypeMap);

  useEffect(() => {
    setSelectedRow(new Set());
  }, [tableQueryParams]);

  const hasNameColumn = columnsData?.some((column) => column?.key === NAME);
  const detailColumns = columnsData?.filter(
    (column) =>
      column?.key !== NAME &&
      column?.key !== 'id' &&
      (column?.metadata as { show?: boolean } | undefined)?.show !== false
  );

  return (
    <>
      {list?.map((row, index: number) => {
        const isSelected = selectedRow.has(String(row?._id));
        const nameValue = row[NAME as keyof T];
        const name = String(
          Array.isArray(nameValue) && nameValue?.length > 0
            ? nameValue[0]
            : (nameValue ?? '')
        );
        return (
          <article
            key={`${row._id}-data`}
            className={`min-w-0 rounded-xl border bg-white p-4 max-xs:p-3 shadow-sm transition-colors dark:bg-slate-900 ${isSelected ? 'border-brand-600 ring-1 ring-brand-600 dark:border-brand-400 dark:ring-brand-400' : 'border-slate-200 dark:border-slate-800'}`}
          >
            {hasNameColumn && (
              <div className="flex items-center gap-3 max-xs:gap-2.5 min-w-0 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                <span
                  className={`shrink-0 w-10 h-10 max-xs:w-9 max-xs:h-9 rounded-full text-white font-semibold text-sm max-xs:text-xs flex items-center justify-center ${gradients[index % gradients.length]}`}
                >
                  {name
                    ?.split(' ')
                    .map((n: string) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
                <button
                  type="button"
                  className="flex-1 min-w-0 text-left cursor-pointer rounded-md focus-visible:ring-2 focus-visible:ring-brand-600"
                  onClick={() => {
                    openModal(EmployeeForm, {
                      _id: row._id,
                      tableQueryParams,
                      title: EDIT_EMPLOYEE_TITLE,
                      subtitle: EDIT_EMPLOYEE_SUBTITLE,
                    });
                  }}
                >
                  <h2 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                    {name}
                  </h2>
                  {Array.isArray(nameValue) && nameValue.length > 1 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      +{nameValue.length - 1} more
                    </p>
                  )}
                </button>
                <FormField
                  className={`${checkboxClass} h-5! w-5! ${!isUpdateAllowed ? 'cursor-pointer-none' : 'cursor-pointer'}`}
                  disabled={!isUpdateAllowed}
                  name={String(row?._id)}
                  type={'checkbox'}
                  id={String(row?._id)}
                  checked={isSelected}
                  onChange={handleOnChange}
                />
              </div>
            )}
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 max-xs:grid-cols-1 max-xs:gap-y-2.5">
              {detailColumns?.map((column) => {
                const value = row[column?.key];
                return (
                  <div
                    key={column.key}
                    className="min-w-0 max-xs:flex max-xs:items-center max-xs:justify-between max-xs:gap-3"
                  >
                    <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500 truncate max-xs:shrink-0 max-xs:max-w-[45%]">
                      {column?.header}
                    </dt>
                    <dd className="mt-1 max-xs:mt-0 max-xs:min-w-0 max-xs:text-right max-xs:flex max-xs:justify-end max-xs:*:flex-none max-xs:*:items-end text-sm text-slate-800 dark:text-slate-200 wrap-break-word">
                      {Array.isArray(value) && value?.length > 0 ? (
                        <AndOthersComponent
                          values={value}
                          id={column?.key}
                          render={column?.render}
                        />
                      ) : (
                        <>
                          {!column?.render
                            ? row[column?.key]
                            : column?.render(String(value), column?.key)}
                        </>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </article>
        );
      })}
    </>
  );
}

export default React.memo(MobileViewCardForTable) as <T extends ListType>(
  props: MobileTableProps<T>
) => React.ReactElement;
