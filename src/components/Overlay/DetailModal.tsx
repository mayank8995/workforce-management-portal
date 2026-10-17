import { X } from 'lucide-react';
import React from 'react';
import StatusBadge from '../UtilComponents/StatusBadge';
import { accordians } from '../Accordian/AccordianRenderer';
import Accordion from '../Accordian/Accordian';
import EmployeeDetailSkeleton from '../Skeleton/EmployeeDetailSkeleton';
import ErrorPage from '../Error/ErrorPage';
import { useEmployeeDetail } from '../../api/tanstack.query';
import PromotionHistory from './PromotionHistory';
import { avatar, button, cx, modal, text } from '../../theme/theme';

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
        <div className={cx(modal.drawer, 'p-3 sm:p-4')}>
          {!isError ? (
            <>
              <div className="flex flex-row items-center justify-between pb-3 border-b border-line">
                <h1
                  className={cx(
                    text.primary,
                    'text-lg sm:text-xl font-semibold tracking-tight'
                  )}
                >
                  Employee Details
                </h1>

                <button onClick={onClose} className={button.icon}>
                  <X width={18} height={18} />
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
                  className={cx(
                    avatar.frame,
                    'flex items-center w-14 h-14 sm:w-16 sm:h-16 shrink-0'
                  )}
                >
                  <img
                    src={'/assets/avatar_fallback.svg'}
                    className="aspect-square w-full h-full object-cover"
                    alt="User Profile"
                  />
                </div>

                <dl className="min-w-0">
                  <dd
                    className={cx(
                      text.primary,
                      'text-base sm:text-lg font-semibold leading-tight truncate'
                    )}
                  >
                    {row?.name}
                  </dd>

                  <dd
                    className={cx(
                      text.secondary,
                      'mt-1 text-sm font-medium leading-tight truncate'
                    )}
                  >
                    {row?.designation}
                  </dd>

                  <dd
                    className={cx(
                      text.muted,
                      'mt-0.5 text-sm leading-tight truncate'
                    )}
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
                <PromotionHistory _id={_id} />
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
