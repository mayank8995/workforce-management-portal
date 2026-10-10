import React from 'react';
import { modal } from '../../theme/theme';

const FilterModalSkeleton = () => {
  return (
    <div className={modal.dialog}>
      <div
        className="
      flex h-14 shrink-0 items-center justify-between
      border-b border-slate-200
      px-4
      dark:border-slate-800
      animate-pulse
    "
      >
        <div className="h-4 w-28 rounded-md bg-slate-200 dark:bg-slate-700" />

        <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="flex min-h-0 flex-1 animate-pulse">
        <div
          className="
        flex w-32 shrink-0 flex-col
        overflow-y-auto
        border-r border-slate-200
        bg-slate-50
        dark:border-slate-800
        dark:bg-slate-950
      "
        >
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div
              key={`${item}-tabId`}
              className="
            mx-2 my-1
            h-10
            rounded-lg
            bg-slate-200
            dark:bg-slate-800
          "
            />
          ))}
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="mb-5 h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-700" />

          {[1, 2, 3, 4, 5].map((item, index) => (
            <React.Fragment key={`${item}-filters`}>
              <div className="mb-5">
                <div className="mb-3 h-3 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />

                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((chip) => (
                    <div
                      key={`${index}-${chip}`}
                      className="
                    h-8
                    w-16
                    rounded-full
                    border border-slate-200
                    bg-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                  "
                    />
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div
        className="
      flex h-14 shrink-0 items-center justify-end gap-3
      border-t border-slate-200
      px-4
      dark:border-slate-800
      animate-pulse
    "
      >
        <div className="h-9 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-9 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
};

export default FilterModalSkeleton;
