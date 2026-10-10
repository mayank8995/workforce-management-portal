import React from 'react';

const ProfileSettingSkeleton = React.memo(() => {
  return (
    <div className="min-h-screen w-full">
      <div className="p-3 sm:p-4">
        <div className="mb-6">
          <div className="h-6 w-40 animate-pulse rounded-md bg-skeleton" />
          <div className="mt-2 h-3 w-64 animate-pulse rounded-md bg-skeleton" />
        </div>

        <div
          className="
        overflow-hidden rounded-2xl
        border border-line
        bg-surface shadow-sm
      "
        >
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6">
            <div
              className="
            rounded-2xl
            border border-line
            bg-surface-muted
            p-6
          "
            >
              <div className="mb-6 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-skeleton" />
                <div className="h-4 w-28 animate-pulse rounded-md bg-skeleton" />
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <div
                  className="
                h-32 w-32
                animate-pulse rounded-full
                border-4 border-surface
                bg-skeleton
                shadow-lg
              "
                />

                <div className="flex flex-col items-center gap-2">
                  <div className="h-4 w-32 animate-pulse rounded-md bg-skeleton" />
                  <div className="h-3 w-24 animate-pulse rounded-md bg-skeleton" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-2 sm:p-4">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-skeleton" />
                <div className="h-4 w-36 animate-pulse rounded-md bg-skeleton" />
              </div>

              <div className="space-y-5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex flex-col gap-2">
                    <div className="h-3 w-20 animate-pulse rounded-md bg-skeleton" />
                    <div className="h-10 w-full animate-pulse rounded-lg bg-skeleton" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-line" />

          <div className="p-4 sm:p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-skeleton" />
              <div className="h-4 w-32 animate-pulse rounded-md bg-skeleton" />
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <div className="h-3 w-24 animate-pulse rounded-md bg-skeleton" />
                  <div className="h-10 w-full animate-pulse rounded-lg bg-skeleton" />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-dashed border-line" />

          <div className="p-4 sm:p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-skeleton" />
              <div className="h-4 w-36 animate-pulse rounded-md bg-skeleton" />
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <div className="h-3 w-24 animate-pulse rounded-md bg-skeleton" />
                  <div className="h-10 w-full animate-pulse rounded-lg bg-skeleton" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileSettingSkeleton;
