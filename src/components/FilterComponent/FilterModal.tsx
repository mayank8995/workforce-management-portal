/* eslint-disable @eslint-react/set-state-in-effect */
import React, { useEffect, useMemo, useState } from 'react';
import { CORRESPONDING_FILTER_TABLE_KEY_NAME } from '../../utils/constants';
import { button, chip, cx, modal, surface, text } from '../../theme/theme';
import { X } from 'lucide-react';
import { TailSpin } from 'react-loader-spinner';
import type {
  SelectedChip,
  TableQueryParams,
  TableTypeMap,
} from '../../types/types';
import FilterModalSkeleton from '../Skeleton/FilterModalSkeleton';
import ErrorPage from '../Error/ErrorPage';
import { useQueryClient } from '@tanstack/react-query';
import { useFilterList } from '../../api/tanstack.query';

type FilterListItem = [string, string[]];
interface FilterListResponse {
  data?: {
    data?: {
      list?: FilterListItem[];
    };
  };
}
interface FilterModalComponentProps {
  tableType?: string;
  onClose: () => void;
  submitFilterData: (chips: SelectedChip[]) => void;
  clearAllFilter: () => void;
  filterList?: FilterListResponse;
  tableQueryParams?: TableQueryParams;
  setQuery: React.Dispatch<React.SetStateAction<TableQueryParams>>;
  searchParams: URLSearchParams;
}

const FilterModal = ({
  onClose,
  submitFilterData,
  clearAllFilter,
  setQuery,
  searchParams,
}: FilterModalComponentProps) => {
  const target = searchParams?.get('target');
  const {
    data: filterList,
    isLoading,
    isError,
    refetch,
  } = useFilterList({
    tableType: (target || 'employees') as keyof TableTypeMap,
  });
  const queryClient = useQueryClient();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [selectedChips, setSelectedChips] = useState<SelectedChip[]>([]);
  const [seeMore, setSeeMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const dataList =
    (filterList as FilterListResponse | undefined)?.data?.data?.list ?? [];
  /**
   * Only show tabs which have filters.
   */
  const tabList = useMemo(() => {
    return dataList.filter(([, values]) => values.length > 0);
  }, [dataList]);

  /**
   * Prefill previously applied filters when modal opens.
   *
   * filterKeyData should contain:
   * [
   *   { key: 'department', value: ['Engineering', 'HR'] },
   *   { key: 'location', value: ['Delhi'] }
   * ]
   */
  useEffect(() => {
    const persistedFilters =
      queryClient.getQueryData<SelectedChip[]>(['filterKeyData']) ?? [];

    setSelectedChips(persistedFilters);
  }, [queryClient, filterList]);

  /**
   * Check whether a particular chip is selected.
   */
  function isChipSelected(key: string, value: string) {
    return selectedChips.some(
      (filter) => filter.key === key && filter.value?.includes(value)
    );
  }
  /**
   * Toggle a chip.
   */
  function handleSelectedChip(key: string, value: string) {
    setSelectedChips((prev) => {
      const filter = prev.find((item) => item.key === key);
      // First chip for this filter key
      if (!filter) {
        return [
          ...prev,
          {
            key,
            value: [value],
          },
        ];
      }

      const alreadySelected = filter.value.includes(value);

      // Remove chip
      if (alreadySelected) {
        const updatedValues = filter.value.filter((item) => item !== value);
        // No values left for this filter key
        if (updatedValues.length === 0) {
          return prev.filter((item) => item.key !== key);
        }
        return prev.map((item) =>
          item.key === key
            ? {
                ...item,
                value: updatedValues,
              }
            : item
        );
      }
      // Add chip
      return prev.map((item) =>
        item.key === key
          ? {
              ...item,
              value: [...item.value, value],
            }
          : item
      );
    });
  }

  function submitModal() {
    if (!selectedChips.length) {
      return;
    }

    setLoading(true);

    const filters = selectedChips.reduce<Record<string, string>>(
      (accumulator, currentItem) => {
        accumulator[currentItem.key] = currentItem.value.join(',');
        return accumulator;
      },
      {}
    );

    setTimeout(() => {
      setLoading(false);

      setQuery(
        (prev) =>
          ({
            ...prev,
            tableType: target || 'employees',
            ...filters,
          }) as TableQueryParams
      );
      submitFilterData(selectedChips);
      handleCloseModal();
    }, 300);
  }

  function handleCloseModal() {
    onClose?.();
  }

  function clearFilter() {
    setQuery((prev) => ({
      page: prev.page,
      limit: prev.limit,
      search: prev.search,
      sortBy: prev.sortBy,
      sortOrder: prev.sortOrder,
      tableType: prev.tableType,
    }));

    setSelectedChips([]);

    queryClient.setQueryData(['filterKeyData'], []);

    clearAllFilter();
    handleCloseModal();
  }

  function handleSeeMore() {
    setSeeMore(false);
  }

  return (
    <>
      {!isLoading ? (
        <div className={modal.dialog}>
          {!isError ? (
            <>
              <div className={`${modal.handle} md:hidden`} />
              <div className={modal.header}>
                <h1 className={modal.title}>Filters</h1>
                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={handleCloseModal}
                  className={button.icon}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-1 min-h-0">
                {/* Tabs */}
                <div
                  className={`flex flex-col w-28 sm:w-36 shrink-0 overflow-y-auto py-2 border-r ${surface.border} ${surface.muted}`}
                >
                  {tabList.map(([key], index) => {
                    const filterKey =
                      key as keyof typeof CORRESPONDING_FILTER_TABLE_KEY_NAME;
                    const isActive = focusedIndex === index;
                    const selectedCount =
                      selectedChips.find((chip) => chip.key === key)?.value
                        ?.length ?? 0;

                    return (
                      <button
                        tabIndex={index}
                        onClick={(event) =>
                          setFocusedIndex(event.currentTarget.tabIndex)
                        }
                        key={filterKey}
                        className={cx(
                          'relative flex items-center justify-between gap-1 min-h-10.5 px-3 py-2 text-left text-xs font-medium wrap-anywhere cursor-pointer transition-colors',
                          isActive
                            ? 'bg-white text-brand-700 dark:bg-slate-900 dark:text-brand-300'
                            : `${text.muted} hover:bg-white/70 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-slate-200`
                        )}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full bg-brand-600 dark:bg-brand-400" />
                        )}
                        <span>
                          {CORRESPONDING_FILTER_TABLE_KEY_NAME[filterKey]}
                        </span>
                        {selectedCount > 0 && (
                          <span className="shrink-0 min-w-4 h-4 px-1 rounded-full bg-brand-600 text-white text-[10px] font-semibold leading-4 text-center tabular-nums">
                            {selectedCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Chips */}
                <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
                  {tabList.map(([key, values], index) => {
                    if (focusedIndex !== index) {
                      return null;
                    }

                    return (
                      <div
                        key={`${key}-filters`}
                        className="transition-all duration-200 ease-out outline-none p-3 sm:p-4 relative flex flex-wrap content-start items-center gap-2"
                        itemID={`${index}`}
                      >
                        {values.map((value) => {
                          const selected = isChipSelected(key, value);

                          return (
                            <button
                              key={`${key}-filters-${value}`}
                              onClick={() => handleSelectedChip(key, value)}
                              className={cx(
                                chip.base,
                                selected ? chip.active : chip.idle
                              )}
                            >
                              {value}
                            </button>
                          );
                        })}

                        {seeMore && (
                          <button
                            onClick={handleSeeMore}
                            className={button.link}
                          >
                            See More
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={modal.footer}>
                <button onClick={clearFilter} className={button.dangerLink}>
                  Clear All
                </button>

                <button
                  onClick={submitModal}
                  disabled={!selectedChips.length}
                  className={`${button.primary} min-w-24`}
                >
                  {loading ? (
                    <TailSpin
                      visible={true}
                      height={20}
                      width={20}
                      color="#fff"
                      radius="4"
                      ariaLabel="tail-spin-loading"
                      wrapperStyle={{}}
                      wrapperClass="flex items-center justify-center"
                    />
                  ) : (
                    'Apply'
                  )}
                </button>
              </div>
            </>
          ) : (
            <ErrorPage refetchAll={refetch} />
          )}
        </div>
      ) : (
        <FilterModalSkeleton />
      )}
    </>
  );
};

export default React.memo(FilterModal);
