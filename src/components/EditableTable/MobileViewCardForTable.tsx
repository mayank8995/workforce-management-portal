import React, { useEffect } from 'react';
import type { ListType, MobileTableProps } from '../../types/types';
import {
  bgColors,
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

  function getRowCss(value: string) {
    const initialCss = `grid grid-cols-2 gap-y-2 text-xs min-w-0 flex-1`;
    if (value === 'id') {
      return 'hidden';
    }
    return initialCss;
  }
  return (
    <>
      {list?.map((row, index: number) => (
        <div
          key={`${row._id}-data`}
          className="bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20  mb-2  odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-900/50 "
        >
          {columnsData?.map((coloumn) => {
            const value = row[coloumn?.key];
            return (
              <React.Fragment key={coloumn.key}>
                {coloumn?.key === NAME && (
                  <div className="flex items-center justify-between min-w-0">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <h1
                        className={`shrink-0 w-6 h-6 xl:w-9 xl:h-9 rounded-full text-white font-bold text-[10px] xl:text-sm flex items-center justify-center ${gradients[index % gradients.length]} col-span-0 dark:${bgColors[index % bgColors.length]}`}
                      >
                        {String(value)
                          ?.split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </h1>
                      <button
                        type="button"
                        className={` flex flex-col gap-1 min-w-0 cursor-pointer`}
                        onClick={() => {
                          openModal(EmployeeForm, {
                            _id: row._id,
                            tableQueryParams,
                            title: EDIT_EMPLOYEE_TITLE,
                            subtitle: EDIT_EMPLOYEE_SUBTITLE,
                          });
                        }}
                      >
                        <h2 className="text-indigo-600 dark:text-indigo-400 text-sm xl:text-base truncate">
                          {Array.isArray(value) && value?.length > 0
                            ? value[0]
                            : value}
                        </h2>
                      </button>
                    </div>
                    <FormField
                      className={`${!isUpdateAllowed ? 'cursor-pointer-none' : 'cursor-pointer'} w-auto`}
                      disabled={!isUpdateAllowed}
                      name={String(row?._id)}
                      type={'checkbox'}
                      id={String(row?._id)}
                      checked={selectedRow.has(String(row?._id))}
                      onChange={handleOnChange}
                    />
                  </div>
                )}
                <>
                  {coloumn?.key !== 'name' &&
                    !(coloumn?.metadata?.show === false) && (
                      <div className={getRowCss(coloumn?.key)}>
                        <h2 className="text-slate-500 text-xs xl:text-base truncate">
                          {coloumn?.header
                            ?.split(' ')
                            .map(
                              (n: string) => n[0] + n.substring(1).toLowerCase()
                            )
                            .join(' ')}
                        </h2>
                        <h2 className=" text-slate-800 dark:text-slate-300 text-xs xl:text-base">
                          {Array.isArray(value) && value?.length > 0 ? (
                            <AndOthersComponent
                              values={value}
                              id={coloumn?.key}
                              render={coloumn?.render}
                            />
                          ) : (
                            <>
                              {!coloumn?.render
                                ? row[coloumn?.key]
                                : coloumn?.render(String(value), coloumn?.key)}
                            </>
                          )}
                        </h2>
                      </div>
                    )}
                </>
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default React.memo(MobileViewCardForTable) as <T extends ListType>(
  props: MobileTableProps<T>
) => React.ReactElement;
