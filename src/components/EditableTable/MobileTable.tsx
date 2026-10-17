import { TextSearch } from 'lucide-react';
import MobileViewCardForTable from './MobileViewCardForTable';
import { NO_RESULT_FOUND } from '../../utils/constants';
import type { ListType, MobileTableProps } from '../../types/types';
import { useLoader } from '../../context/Loadercontext';
import { card, cx, emptyState, skeleton } from '../../theme/theme';

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
            <div
              className={cx(
                emptyState.wrapper,
                'py-12 rounded-xl border border-dashed border-line'
              )}
            >
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
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: rowsPerPage }, (_, index) => index + 1)?.map(
            (_, id) => {
              return (
                <div
                  key={`${id + rowsPerPage}`}
                  className={cx(card.base, 'animate-pulse p-4')}
                >
                  <div className="flex items-center gap-3 pb-3 mb-3 border-b border-line-subtle">
                    <div
                      className={cx(
                        'h-10 w-10 shrink-0 rounded-full',
                        skeleton.fill
                      )}
                    ></div>
                    <div
                      className={cx(
                        'h-4 w-40 max-w-full rounded',
                        skeleton.fill
                      )}
                    ></div>
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
                          <div
                            className={cx('h-2.5 w-16 rounded', skeleton.fill)}
                          ></div>
                          <div
                            className={cx('h-3.5 w-24 rounded', skeleton.fill)}
                          ></div>
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
