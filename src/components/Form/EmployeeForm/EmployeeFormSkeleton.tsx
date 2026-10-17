import { modal } from '../../../theme/theme';

function EmployeeFormSkeleton() {
  const skeletonClass = 'animate-pulse bg-skeleton rounded-xl';

  const fieldSkeleton = (
    <div className="mb-4 flex flex-col">
      <div className={`h-4 w-24 mb-2 ${skeletonClass}`} />
      <div className={`h-10 w-full ${skeletonClass}`} />
    </div>
  );

  const sectionHeadingSkeleton = (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 bg-skeleton rounded-full animate-pulse" />
      <div className={`h-5 w-48 ${skeletonClass}`} />
    </div>
  );

  return (
    <div className={modal.drawer}>
      <div className="p-4 sm:p-5">
        <div className="mb-6">
          <div className={`h-8 w-56 mb-2 ${skeletonClass}`} />
          <div className={`h-4 w-80 max-w-full ${skeletonClass}`} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="p-4">
            {sectionHeadingSkeleton}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
            </div>
          </div>

          <hr className="border-t border-line" />

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

          <hr className="border-t border-line" />

          <div className="p-4">
            {sectionHeadingSkeleton}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
              {fieldSkeleton}
            </div>
          </div>

          <hr className="border-t border-line" />

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

          <hr className="border-t border-line" />

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

          <hr className="border-t border-line" />

          <div className="p-4">
            {sectionHeadingSkeleton}

            <div className="flex items-center gap-3">
              <div
                className="
                  w-4
                  h-4
                  rounded
                  bg-skeleton
                  animate-pulse
                "
              />

              <div className={`h-4 w-52 ${skeletonClass}`} />
            </div>
          </div>

          <hr className="border-t border-line" />

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
