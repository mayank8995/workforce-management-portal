import React from 'react';
import { useLocation } from 'react-router-dom';
import EmployeeTableSkeleton from './EmployeeTableSkeleton';

const Skeleton = React.memo(() => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-auto flex-col">
      {(location?.pathname?.includes('dashboard') ||
        location?.pathname?.includes('analytics')) &&
        !location?.search?.includes('target') && (
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => index + 1)?.map((_, i) => (
              <div
                key={`items-start-${i}`}
                className="
              flex flex-col gap-3 rounded-xl
              border border-line
              bg-surface p-4
              shadow-sm
              animate-pulse
            "
              >
                <div className="flex flex-row items-center">
                  <div
                    className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl
                  bg-skeleton
                  animate-pulse
                "
                  />

                  <div className="flex min-w-0 flex-col pl-3">
                    <div
                      className="
                    mb-2 h-3 w-32 rounded-md
                    bg-skeleton
                    animate-pulse
                    sm:w-40
                  "
                    />

                    <div
                      className="
                    h-2 w-20 rounded-md
                    bg-skeleton
                    animate-pulse
                  "
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      <>
        {location?.pathname?.includes('dashboard') &&
        !location?.search?.includes('target') ? (
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 5 }, (_, index) => index + 1).map((_, id) => {
              return (
                <div
                  key={`w-full-${id}`}
                  className="
                w-full rounded-xl
                border border-line
                bg-surface p-5
                shadow-sm
              "
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center">
                      <div
                        className="
                      mr-3 h-9 w-10
                      rounded-lg
                      bg-skeleton
                      animate-pulse
                    "
                      />

                      <div
                        className="
                      h-3 w-20
                      rounded-md
                      bg-skeleton
                      animate-pulse
                    "
                      />
                    </div>

                    <span
                      className="
                    h-5 w-12
                    rounded-full
                    bg-skeleton
                    animate-pulse
                  "
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    {Array.from({ length: 5 }, (_, index) => index + 1)?.map(
                      (_, index) => (
                        <React.Fragment key={`w-9-${index}`}>
                          <div className="mb-4 flex flex-row items-center">
                            <div
                              className="
                            h-9 w-9 shrink-0
                            rounded-full
                            bg-skeleton
                            animate-pulse
                          "
                            />

                            <div className="flex w-full flex-row justify-between pl-3">
                              <div className="flex flex-col justify-center">
                                <span
                                  className="
                                mb-2 h-2 w-20
                                rounded-md
                                bg-skeleton
                                animate-pulse
                              "
                                />

                                <span
                                  className="
                                h-2 w-14
                                rounded-md
                                bg-skeleton
                                animate-pulse
                              "
                                />
                              </div>

                              <div className="flex items-center justify-end">
                                <span
                                  className="
                                h-2 w-12
                                rounded-md
                                bg-skeleton
                                animate-pulse
                              "
                                />
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      )
                    )}
                  </div>

                  <div className="mt-2 flex flex-col items-end">
                    <span
                      className="
                    h-2 w-12
                    rounded-md
                    bg-skeleton
                    animate-pulse
                  "
                    />
                  </div>
                </div>
              );
            })}
          </div>
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
