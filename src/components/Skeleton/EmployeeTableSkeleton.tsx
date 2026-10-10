import React from 'react';

const bar = 'rounded-md bg-skeleton animate-pulse';

const EmployeeTableSkeleton = React.memo(() => {
  return (
    <div className="min-h-screen p-2 sm:p-3 xl:p-4">
      <div className="min-h-full overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
        {/* title */}
        <div className="flex items-center justify-between gap-3 px-4 lg:px-6 pt-4 sm:pt-5">
          <div className={`h-5 w-44 ${bar}`} />
          <div className={`h-5 w-20 rounded-full! ${bar}`} />
        </div>

        {/* toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 lg:px-6 py-4 border-b border-line-subtle">
          <div className={`h-10 w-full sm:flex-1 lg:max-w-sm ${bar}`} />
          <div className="flex items-center gap-2 sm:ml-auto">
            <div className={`h-10 w-10 md:w-20 ${bar}`} />
            <div className={`h-10 w-10 md:w-20 lg:hidden ${bar}`} />
            <div className={`h-10 w-10 md:w-24 ${bar}`} />
            <div
              className={`h-10 w-10 min-[400px]:w-36 ml-auto sm:ml-0 ${bar}`}
            />
          </div>
        </div>

        {/* desktop rows */}
        <div className="hidden lg:block">
          <div className="flex gap-6 px-4 py-3 bg-surface-muted border-b border-line">
            {Array.from({ length: 8 }, (_, index) => index).map((id) => (
              <div
                key={`th-${id}`}
                className={`h-3 ${id === 0 ? 'w-4' : 'w-24'} ${bar}`}
              />
            ))}
          </div>
          {Array.from({ length: 6 }, (_, index) => index).map((id) => (
            <div
              key={`tr-${id}`}
              className="flex items-center gap-6 px-4 py-3.5 border-b border-line-subtle"
            >
              <div className={`h-4 w-4 ${bar}`} />
              <div className="flex items-center gap-2 w-36">
                <div className={`h-8 w-8 rounded-full! ${bar}`} />
                <div className={`h-4 flex-1 ${bar}`} />
              </div>
              {Array.from({ length: 6 }, (_, index) => index).map((i) => (
                <div key={`td-${id}-${i}`} className={`h-4 w-24 ${bar}`} />
              ))}
            </div>
          ))}
        </div>

        {/* mobile cards */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 p-3 sm:p-4">
          {Array.from({ length: 4 }, (_, index) => index).map((id) => (
            <div
              key={`card-${id}`}
              className="rounded-xl border border-line bg-surface p-4"
            >
              <div className="flex items-center gap-3 pb-3 mb-3 border-b border-line-subtle">
                <div className={`h-10 w-10 shrink-0 rounded-full! ${bar}`} />
                <div className={`h-4 w-40 max-w-full ${bar}`} />
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 max-xs:grid-cols-1">
                {Array.from({ length: 6 }, (_, index) => index).map((i) => (
                  <div key={`field-${id}-${i}`} className="space-y-1.5">
                    <div className={`h-2.5 w-16 ${bar}`} />
                    <div className={`h-3.5 w-24 ${bar}`} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between gap-3 px-4 lg:px-6 py-3 border-t border-line-subtle">
          <div className={`h-4 w-32 ${bar}`} />
          <div className="flex items-center gap-2">
            <div className={`h-10 w-10 ${bar}`} />
            <div className={`h-4 w-10 ${bar}`} />
            <div className={`h-10 w-10 ${bar}`} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default EmployeeTableSkeleton;
