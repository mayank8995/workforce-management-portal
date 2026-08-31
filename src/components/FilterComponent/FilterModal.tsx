/* eslint-disable @eslint-react/set-state-in-effect */
import React, { useEffect, useMemo, useState } from 'react';
import { CORRESPONDING_FILTER_TABLE_KEY_NAME } from '../../utils/constants';
import { X } from 'lucide-react';
import { TailSpin } from 'react-loader-spinner';
import type {
  SelectedChip,
  TableQueryParams,
  TableTypeMap,
} from '../../types/types';
import { useFilterList } from '../../services/utils.service';
import FilterModalSkeleton from '../Skeleton/FilterModalSkeleton';
import ErrorPage from '../Error/ErrorPage';
import { useQueryClient } from '@tanstack/react-query';

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
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 flex flex-col max-h-[85vh] md:h-125 md:max-h-125 shadow-sm fixed z-300 left-0 right-0 bottom-0 md:absolute md:top-[50%] md:left-[50%] md:transform md:-translate-x-1/2 md:-translate-y-1/2 rounded-t-2xl md:rounded-2xl">
          {!isError ? (
            <>
              <div className="flex flex-row justify-between items-center p-4 border-b border-b-slate-200 dark:border-b-white/10">
                <h1 className="text-sm font-bold text-slate-900 dark:text-white">
                  Filters
                </h1>
                <button onClick={handleCloseModal}>
                  <X
                    className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer"
                    width={16}
                    height={20}
                  />
                </button>
              </div>

              <div className="flex flex-1 overflow-y-auto">
                {/* Tabs */}
                <div className="flex flex-col border-r border-r-slate-200 dark:border-r-white/10">
                  {tabList.map(([key], index) => {
                    const filterKey =
                      key as keyof typeof CORRESPONDING_FILTER_TABLE_KEY_NAME;

                    return (
                      <button
                        tabIndex={index}
                        onClick={(event) =>
                          setFocusedIndex(event.currentTarget.tabIndex)
                        }
                        key={filterKey}
                        className={`h-10.5 cursor-pointer text-xs w-28 wrap-anywhere flex items-center justify-center border-slate-200 dark:border-white/10 ${
                          focusedIndex === index
                            ? 'bg-[#534ab7] text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                      >
                        <h1 className="text-center">
                          {CORRESPONDING_FILTER_TABLE_KEY_NAME[filterKey]}
                        </h1>
                      </button>
                    );
                  })}
                </div>

                {/* Chips */}
                <div className="flex flex-col flex-1">
                  {tabList.map(([key, values], index) => {
                    if (focusedIndex !== index) {
                      return null;
                    }

                    return (
                      <div
                        key={`${key}-filters`}
                        className="transition-all duration-200 ease-out outline-none p-2 relative flex flex-wrap items-center overflow-auto overflow-x-auto"
                        itemID={`${index}`}
                      >
                        {values.map((value) => {
                          const selected = isChipSelected(key, value);

                          return (
                            <button
                              key={`${key}-filters-${value}`}
                              onClick={() => handleSelectedChip(key, value)}
                              className={`cursor-pointer m-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium whitespace-nowrap border transition-all duration-150 text-xs ${
                                !selected
                                  ? 'border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-white/25'
                                  : 'bg-[#534ab7] text-white hover:bg-[#7f77dd]'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}

                        {seeMore && (
                          <button onClick={handleSeeMore}>See More</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between flex-row p-4 border-t border-t-slate-200 dark:border-t-white/10">
                <button
                  onClick={clearFilter}
                  className="text-rose-600 dark:text-rose-400 hover:underline font-semibold text-sm cursor-pointer"
                >
                  Clear All
                </button>

                <button
                  onClick={submitModal}
                  disabled={!selectedChips.length}
                  className={`px-6 py-2.5 font-semibold text-sm rounded-xl shadow-lg text-white ${
                    selectedChips.length
                      ? 'bg-[#534ab7] text-white hover:bg-[#7f77dd] hover:enabled:shadow-xl transition-all duration-200 cursor-pointer'
                      : 'bg-slate-300 text-slate-500 dark:bg-white/5 dark:text-slate-600 cursor-not-allowed'
                  }`}
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
