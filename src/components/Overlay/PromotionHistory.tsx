import { TrendingUp } from 'lucide-react';
import { usePromotionHistory } from '../../api/tanstack.query';
import { cx, text } from '../../theme/theme';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

function PromotionHistory({ _id }: { _id: string }) {
  const { data: history = [], isLoading, isError } = usePromotionHistory(_id);

  return (
    <section className="mt-4 rounded-xl border border-line p-3">
      <h2
        className={cx(
          text.primary,
          'mb-2 flex items-center gap-2 text-sm font-semibold'
        )}
      >
        <TrendingUp size={16} /> Promotion history
      </h2>
      {isLoading && <p className={cx(text.muted, 'text-xs')}>Loading…</p>}
      {isError && (
        <p className={cx(text.danger, 'text-xs')}>
          Could not load promotion history
        </p>
      )}
      {!isLoading && !isError && history.length === 0 && (
        <p className={cx(text.muted, 'text-xs')}>No promotions yet</p>
      )}
      <ol className="space-y-2">
        {history.map((record) => (
          <li
            key={record._id}
            className="border-l-2 border-accent pl-3 text-sm"
          >
            <p className={text.primary}>
              {record.previousDesignation} → {record.currentDesignation}
              {record.currentLevel && (
                <span className={cx(text.muted, 'ml-2 text-xs capitalize')}>
                  {record.previousLevel ? `${record.previousLevel} → ` : ''}
                  {record.currentLevel}
                </span>
              )}
            </p>
            <p className={cx(text.muted, 'text-xs')}>
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
