import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import type { ListType } from '../types/types';

export function useCheckBox(list: ListType[]) {
  const [selectedRow, setSelectedRow] = useState(() => new Set());
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (ref.current && ref.current.id === 'selectAll') {
      const total = list.length;
      const selected = selectedRow.size;
      if (selected > 0 && selected < total) {
        ref.current.indeterminate = true;
      } else {
        ref.current.indeterminate = false;
      }
    }
  }, [selectedRow, list.length]);
  const handleOnChange = function (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) {
    if (!event.target?.id) {
      return;
    }
    const id = event.target.id;
    if (event.target.id === 'selectAll') {
      if (!event.target.checked) {
        setSelectedRow(new Set());
      } else {
        const Ids = list.map((item: ListType) => {
          if (!item) {
            return;
          }
          return String(item?._id);
        });
        setSelectedRow(new Set([...Ids]));
      }
    } else {
      setSelectedRow((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(String(id));
        }
        return next;
      });
    }
  };
  return {
    selectedRow,
    handleOnChange,
    setSelectedRow,
    ref,
  };
}
