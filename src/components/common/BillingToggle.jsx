import { cn } from '../../utils/helpers';
import { QUARTERLY_DISCOUNT } from '../../data/memberships';

const OPTIONS = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: `Quarterly · save ${Math.round(QUARTERLY_DISCOUNT * 100)}%` },
];

/** Segmented control. Radiogroup semantics, arrow keys handled by the browser. */
export default function BillingToggle({ value, onChange, className }) {
  return (
    <div
      className={cn('inline-flex rounded-xs border border-text/10 bg-bg-2 p-1', className)}
      role="radiogroup"
      aria-label="Billing period"
    >
      {OPTIONS.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.id)}
            className={cn(
              'rounded-xs px-4 py-2.5 text-micro font-bold uppercase transition-[background-color,color] duration-fast ease-snap',
              selected ? 'bg-accent text-accent-ink' : 'text-text-dim hover:text-text'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
