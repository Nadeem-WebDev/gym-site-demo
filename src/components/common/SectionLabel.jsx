import { cn } from '../../utils/helpers';

/** Uppercase micro-label with a hairline rule - the site's section marker. */
export default function SectionLabel({ children, index, className }) {
  return (
    <p className={cn('flex items-center gap-3 leading-none micro', className)}>
      {index ? <span className="tabular-nums text-accent-bright">{index}</span> : null}
      <span aria-hidden="true" className="h-px w-[clamp(1.5rem,4vw,3rem)] flex-none bg-text/20" />
      <span>{children}</span>
    </p>
  );
}
