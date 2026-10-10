import { TextSearch } from 'lucide-react';
import MobileViewCardForTable from './MobileViewCardForTable';
import { NO_RESULT_FOUND } from '../../utils/constants';
import type { ListType, MobileTableProps } from '../../types/types';
import { useLoader } from '../../context/Loadercontext';

const MobileTable = <T extends ListType>({
  list,
  rowsPerPage,
  columnsData,
  tableQueryParams,
  selectedRow,
  setSelectedRow,
  handleOnChange,
}: MobileTableProps<T>) => {
  const { isLoading } = useLoader();
  return (
    <div className="lg:hidden p-3 max-xs:p-2 sm:p-4">
      {!isLoading ? (
        <>
          {list?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <MobileViewCardForTable
                list={list}
                rowsPerPage={rowsPerPage}
                columnsData={columnsData}
                tableQueryParams={tableQueryParams}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
                handleOnChange={handleOnChange}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                <TextSearch size={22} />
              </span>
              <div>
                <h1 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {NO_RESULT_FOUND}
                </h1>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Try adjusting your search or filters.
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: rowsPerPage }, (_, index) => index + 1)?.map(
            (_, id) => {
              return (
                <div
                  key={`${id + rowsPerPage}`}
                  className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-3 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <div className="h-4 w-40 max-w-full rounded bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 max-xs:grid-cols-1">
                    {Array.from(
                      { length: Math.max((columnsData?.length || 0) - 2, 2) },
                      (_, index) => index + 1
                    )?.map((_, i) => {
                      return (
                        <div
                          key={`${i + 1 + id + rowsPerPage}`}
                          className="space-y-1.5"
                        >
                          <div className="h-2.5 w-16 rounded bg-slate-200 dark:bg-slate-700"></div>
                          <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-slate-700"></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default MobileTable;
