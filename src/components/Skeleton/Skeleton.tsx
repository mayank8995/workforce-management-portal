import React from 'react';
import { useLocation } from 'react-router-dom';
import EmployeeTableSkeleton from './EmployeeTableSkeleton';
import { card, cx, skeleton } from '../../theme/theme';

const bar = (size: string) => cx('rounded', skeleton.fill, size);

const LIST_ROWS = 5;

function MetricRowSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 xl:gap-4 p-2 xl:p-4 min-w-0">
      {Array.from({ length: 5 }, (_, i) => i).map((i) => (
        <div key={`metric-${i}`} className={cx(card.metric, 'animate-pulse')}>
          <div className="flex items-center gap-2">
            <div
              className={cx(
                'h-7 w-7 xl:h-8 xl:w-8 rounded-lg shrink-0',
                skeleton.fill
              )}
            />
            <div className={bar('h-2.5 w-16 xl:w-24')} />
          </div>
          <div className={bar('h-5 xl:h-6 w-14 xl:w-16')} />
        </div>
      ))}
    </div>
  );
}

function PanelHeaderSkeleton() {
  return (
    <div className={card.header}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={cx('h-4.5 w-4.5 rounded shrink-0', skeleton.fill)} />
        <div className={bar('h-3.5 w-32 xl:w-40')} />
      </div>
      <div className={cx('h-5 w-12 rounded-full shrink-0', skeleton.fill)} />
    </div>
  );
}

type ListVariant = 'ranked' | 'date' | 'badge';

function ListPanelSkeleton({ variant }: { variant: ListVariant }) {
  return (
    <div className={cx(card.panel, 'animate-pulse')}>
      <PanelHeaderSkeleton />
      <div className={card.list}>
        {Array.from({ length: LIST_ROWS }, (_, i) => i).map((i) => (
          <div
            key={`${variant}-row-${i}`}
            className="flex items-center gap-2.5 xl:gap-3 min-w-0 px-4 xl:px-5 py-2.5"
          >
            {variant === 'ranked' && (
              <div className={bar('h-3 w-3 shrink-0')} />
            )}
            <div
              className={cx(
                'h-7 w-7 xl:h-8 xl:w-8 rounded-full shrink-0',
                skeleton.fill
              )}
            />
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <div className={bar('h-3 w-28 max-w-full')} />
              <div className={bar('h-2.5 w-20 max-w-full')} />
            </div>
            {variant === 'ranked' && (
              <div className={bar('h-3 w-8 shrink-0')} />
            )}
            {variant === 'date' && <div className={bar('h-3 w-16 shrink-0')} />}
            {variant === 'badge' && (
              <div
                className={cx('h-5 w-16 rounded-full shrink-0', skeleton.fill)}
              />
            )}
            <div className={bar('h-3 w-2 shrink-0')} />
          </div>
        ))}
      </div>
    </div>
  );
}

function KpiPanelSkeleton() {
  return (
    <div className={cx(card.panel, 'animate-pulse')}>
      <PanelHeaderSkeleton />
      <div className="flex-1 flex flex-col px-4 xl:px-5 py-4">
        <div className="flex items-baseline gap-1.5 mb-5">
          <div className={bar('h-6 xl:h-7 w-12')} />
          <div className={bar('h-2.5 w-24')} />
        </div>
        <div className="flex-1 flex flex-col justify-evenly gap-4">
          {Array.from({ length: 3 }, (_, i) => i).map((i) => (
            <div key={`kpi-${i}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className={bar('h-2.5 w-28')} />
                <div className={bar('h-2.5 w-8')} />
              </div>
              <div className={cx('h-1.5 w-full rounded-full', skeleton.fill)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardWidgetsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 xl:px-4 pb-2 xl:pb-4">
      <ListPanelSkeleton variant="ranked" />
      <ListPanelSkeleton variant="date" />
      <ListPanelSkeleton variant="badge" />
      <KpiPanelSkeleton />
    </div>
  );
}

const Skeleton = React.memo(() => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-auto flex-col">
      {(location?.pathname?.includes('dashboard') ||
        location?.pathname?.includes('analytics')) &&
        !location?.search?.includes('target') && <MetricRowSkeleton />}

      <>
        {location?.pathname?.includes('dashboard') &&
        !location?.search?.includes('target') ? (
          <DashboardWidgetsSkeleton />
        ) : (
          <React.Fragment>
            {location?.pathname?.includes('analytics') ? (
              <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 5 }, (_, index) => index + 1)?.map(
                  (_, id) => {
                    return (
                      <div
                        key={`suspense-${id}`}
                        className="
                      w-full max-w-sm
                      rounded-xl
                      border border-line
                      bg-surface p-6
                      shadow-sm
                      animate-pulse
                    "
                      >
                        <div className="flex flex-col">
                          <div
                            className="
                          h-3 w-24
                          rounded-full
                          bg-skeleton
                        "
                          />
                        </div>

                        <div
                          className="
                        relative mx-auto mt-6
                        h-44 w-44
                        overflow-hidden rounded-full
                        bg-skeleton
                      "
                          style={{
                            background:
                              'conic-gradient(#e2e8f0 0% 40%, #ffffff 40% 41%, #e2e8f0 41% 75%, #ffffff 75% 76%, #e2e8f0 76% 100%)',
                          }}
                        >
                          <div
                            className="absolute inset-0 hidden rounded-full dark:block"
                            style={{
                              background:
                                'conic-gradient(#334155 0% 40%, #1e293b 40% 41%, #334155 41% 75%, #1e293b 75% 76%, #334155 76% 100%)',
                            }}
                          />
                        </div>

                        <div className="mt-6 flex flex-col gap-4">
                          <div className="h-3 w-28 rounded-full bg-skeleton" />
                          <div className="h-3 w-24 rounded-full bg-skeleton" />
                          <div className="h-3 w-32 rounded-full bg-skeleton" />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <>
                {(location?.pathname?.includes('employees') ||
                  location?.search?.includes('target')) && (
                  <EmployeeTableSkeleton />
                )}
              </>
            )}
          </React.Fragment>
        )}
      </>
    </div>
  );
});

export default Skeleton;
