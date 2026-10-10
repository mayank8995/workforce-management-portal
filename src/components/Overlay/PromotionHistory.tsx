import { TrendingUp } from 'lucide-react';
import { usePromotionHistory } from '../../api/tanstack.query';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

function PromotionHistory({ _id }: { _id: string }) {
  const { data: history = [], isLoading, isError } = usePromotionHistory(_id);

  return (
    <section className="mt-4 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
      <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
        <TrendingUp size={16} /> Promotion history
      </h2>
      {isLoading && (
        <p className="text-xs text-slate-500 dark:text-slate-400">Loading…</p>
      )}
      {isError && (
        <p className="text-xs text-red-600 dark:text-red-400">
          Could not load promotion history
        </p>
      )}
      {!isLoading && !isError && history.length === 0 && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          No promotions yet
        </p>
      )}
      <ol className="space-y-2">
        {history.map((record) => (
          <li
            key={record._id}
            className="border-l-2 border-indigo-400 pl-3 text-sm"
          >
            <p className="text-slate-800 dark:text-slate-100">
              {record.previousDesignation} → {record.currentDesignation}
              {record.currentLevel && (
                <span className="ml-2 text-xs capitalize text-slate-500 dark:text-slate-400">
                  {record.previousLevel ? `${record.previousLevel} → ` : ''}
                  {record.currentLevel}
                </span>
              )}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {formatDate(record.promotedOn)}
              {record.promotedBy?.name && ` · by ${record.promotedBy.name}`}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default PromotionHistory;
