function EmployeeFormSkeleton() {
  const skeletonClass =
    'animate-pulse bg-slate-200 dark:bg-slate-700 rounded-xl';

  const fieldSkeleton = (
    <div className="mb-4 flex flex-col">
      <div className={`h-4 w-24 mb-2 ${skeletonClass}`} />
      <div className={`h-10 w-full ${skeletonClass}`} />
    </div>
  );

  const sectionHeadingSkeleton = (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 bg-slate-300 dark:bg-slate-600 rounded-full animate-pulse" />
      <div className={`h-5 w-48 ${skeletonClass}`} />
    </div>
  );

  return (
    <div
      className=" p-3 sm:p-4
            w-full sm:w-115 md:w-125 lg:w-135
            h-full
            overflow-y-auto
            bg-white dark:bg-slate-900
            text-slate-900 dark:text-slate-100
            shadow-2xl
            fixed z-300 right-0 top-0"
    >
      <div className="p-2 xl:p-4 dark:bg-gray-800">
        <div className="mb-6">
          <div className={`h-8 w-56 mb-2 ${skeletonClass}`} />
          <div className={`h-4 w-80 ${skeletonClass}`} />
        </div>

        <div
          className="
            bg-linear-to-br
            from-white
            to-indigo-50/40
            rounded-2xl
            shadow-sm
            border
            border-slate-100
            p-2
            flex
            flex-col
            gap-3
            dark:bg-linear-to-br
            dark:from-slate-900
            dark:to-purple-950/20
            dark:border-none
          "
        >
          <div className="p-4">
            {sectionHeadingSkeleton}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="p-4">
            {sectionHeadingSkeleton}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="p-4">
            {sectionHeadingSkeleton}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="p-4">
            {sectionHeadingSkeleton}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
            </div>

            <div className="flex justify-end mt-2">
              <div className={`h-10 w-32 ${skeletonClass}`} />
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="p-4">
            {sectionHeadingSkeleton}

            <div className="flex gap-3">
              <div className={`h-10 flex-1 ${skeletonClass}`} />
              <div className={`h-10 w-20 ${skeletonClass}`} />
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <div className={`h-7 w-20 ${skeletonClass}`} />
              <div className={`h-7 w-28 ${skeletonClass}`} />
              <div className={`h-7 w-24 ${skeletonClass}`} />
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="p-4">
            {sectionHeadingSkeleton}

            <div className="flex items-center gap-3">
              <div
                className="
                  w-4
                  h-4
                  rounded
                  bg-slate-200
                  dark:bg-slate-700
                  animate-pulse
                "
              />

              <div className={`h-4 w-52 ${skeletonClass}`} />
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="flex justify-between items-center p-4">
            <div className={`h-11 w-40 ${skeletonClass}`} />
            <div className={`h-11 w-28 ${skeletonClass}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeFormSkeleton;
