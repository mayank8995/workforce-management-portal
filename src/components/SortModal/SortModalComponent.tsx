import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, X } from 'lucide-react';
import FormField from '../Form/FormField';
import type { ListType, TableHeader } from '../../types/types';
import { button, cx, form, modal, surface, text } from '../../theme/theme';

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

interface SortModalComponentProps<T extends ListType> {
  isOpen?: boolean;
  headersData: TableHeader<T>[];
  sortConfig: SortConfig;
  onSort: (value: string) => void;
  onClose: () => void;
  containerCss: string;
}

const SortModalComponent = <T extends ListType>({
  headersData,
  sortConfig,
  onSort,
  onClose,
  containerCss,
}: SortModalComponentProps<T>) => {
  const [focusedIndex, setFocusedIndex] = useState('');
  const myElementRef = useRef<HTMLButtonElement>(null);

  function handleRadio(index: string) {
    setFocusedIndex(index);
  }

  function getSortIcon(sortConfig: SortConfig, key: string) {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={20} />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={20} />
    ) : (
      <ArrowDown size={20} />
    );
  }

  function handleSort() {
    if (myElementRef?.current) {
      const id = myElementRef?.current?.id;
      if (id) {
        onSort(id);
        setTimeout(() => {
          onClose?.();
        }, 150);
      }
    }
  }

  return (
    <>
      <div className={`${containerCss}`}>
        <div className={modal.handle} />
        <div className={modal.header}>
          <h2 className={modal.title}>Sorting</h2>
          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="Close sort modal"
            className={button.icon}
          >
            <X size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2 max-h-150 h-fit overflow-y-auto p-4">
          {headersData?.map((header) => {
            const isSelected = focusedIndex === header.key;
            return (
              <button
                ref={myElementRef}
                key={header.key}
                id={focusedIndex}
                className={cx(
                  'cursor-pointer h-11 min-w-0 inline-flex items-center gap-2.5 px-3 rounded-lg border text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
                  isSelected
                    ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-200'
                    : `${surface.border} ${text.secondary} hover:bg-slate-50 dark:hover:bg-white/5`
                )}
                onClick={() => handleRadio(header.key)}
              >
                <FormField
                  name={header.value}
                  value={header.value}
                  type={'radio'}
                  id={header.value}
                  checked={isSelected}
                  onChange={() => handleRadio(header.key)}
                  className={`${form.radio} m-0 cursor-pointer outline-none`}
                />
                <span className="truncate">{header.value}</span>
              </button>
            );
          })}
        </div>
        <div className={modal.footer}>
          <span
            className={`text-xs font-semibold uppercase tracking-wide ${text.muted}`}
          >
            Direction
          </span>
          <button
            onClick={handleSort}
            type="button"
            className={`${button.primary} px-3!`}
            disabled={!focusedIndex}
            aria-label="Apply sort direction"
          >
            {getSortIcon(sortConfig, focusedIndex)}
          </button>
        </div>
      </div>
    </>
  );
};

const MemoizedSortModal = React.memo(SortModalComponent) as <
  T extends ListType,
>(
  props: SortModalComponentProps<T>
) => React.ReactElement;
export default MemoizedSortModal;
