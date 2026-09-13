import { X } from 'lucide-react';
import React from 'react';
import StatusBadge from '../UtilComponents/StatusBadge';
import { accordians } from '../Accordian/AccordianRenderer';
import Accordion from '../Accordian/Accordian';
import EmployeeDetailSkeleton from '../Skeleton/EmployeeDetailSkeleton';
import ErrorPage from '../Error/ErrorPage';
import { useEmployeeDetail } from '../../api/tanstack.query';

interface DetailModalProps {
  onClose: () => void;
  _id: string;
}

const DetailModal = ({ onClose, _id }: DetailModalProps) => {
  const { data: details, isError, isLoading } = useEmployeeDetail({ _id });
  const row = details?.['data']?.data?.result ?? [];

  return (
    <>
      {!isLoading ? (
        <div
          className={`
            p-3 sm:p-4
            w-full sm:w-115 md:w-125 lg:w-135
            h-full
            overflow-y-auto
            bg-white dark:bg-slate-900
            text-slate-900 dark:text-slate-100
            shadow-2xl
            fixed z-300 right-0 top-0
          `}
        >
          {!isError ? (
            <>
              <div
                className="
                  flex flex-row items-center justify-between
                  pb-3
                  border-b border-slate-200 dark:border-slate-700
                "
              >
                <h1
                  className="
                    text-lg sm:text-xl
                    font-semibold
                    tracking-tight
                    text-slate-900 dark:text-white
                  "
                >
                  Employee Details
                </h1>

                <button
                  onClick={onClose}
                  className="
                    flex items-center justify-center
                    w-8 h-8
                    rounded-lg
                    cursor-pointer
                    transition-colors
                    hover:bg-slate-100
                    dark:hover:bg-slate-800
                  "
                >
                  <X
                    className="
                      text-slate-400
                      hover:text-slate-600
                      dark:text-slate-500
                      dark:hover:text-slate-300
                    "
                    width={18}
                    height={18}
                  />
                </button>
              </div>

              <div
                className="
                  grid grid-cols-[auto_minmax(0,1fr)_auto]
                  gap-3 sm:gap-4
                  items-center
                  pt-4 pb-4
                "
              >
                <div
                  className="
                    flex items-center
                    w-14 h-14
                    sm:w-16 sm:h-16
                    rounded-full
                    ring-2
                    ring-slate-200 dark:ring-slate-700
                    shadow-md
                    overflow-hidden
                    shrink-0
                  "
                >
                  <img
                    src={'/assets/avatar_fallback.svg'}
                    className="aspect-square w-full h-full object-cover"
                    alt="User Profile"
                  />
                </div>

                <dl className="min-w-0">
                  <dd
                    className="
                      text-base sm:text-lg
                      font-semibold
                      leading-tight
                      truncate
                      text-slate-900 dark:text-white
                    "
                  >
                    {row?.name}
                  </dd>

                  <dd
                    className="
                      mt-1
                      text-sm
                      font-medium
                      leading-tight
                      truncate
                      text-slate-700 dark:text-slate-200
                    "
                  >
                    {row?.designation}
                  </dd>

                  <dd
                    className="
                      mt-0.5
                      text-sm
                      leading-tight
                      truncate
                      text-slate-500 dark:text-slate-400
                    "
                  >
                    {row?.department}
                  </dd>
                </dl>

                <div className="shrink-0 self-start pt-1">
                  <StatusBadge
                    value={!row?.onNoticePeriod ? 'Active' : 'On Notice'}
                  />
                </div>
              </div>

              <div className="p-2 sm:p-3 flex-1 flex flex-col">
                <div className="space-y-2.5">
                  {accordians.map((accordian) => {
                    return (
                      <React.Fragment key={accordian.id}>
                        <Accordion accordian={accordian} content={row} />
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <ErrorPage />
          )}
        </div>
      ) : (
        <EmployeeDetailSkeleton />
      )}
    </>
  );
};

export default React.memo(DetailModal);
