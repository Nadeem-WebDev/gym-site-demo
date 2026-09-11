import { AlertCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';

/**
 * Labelled form control with an accessible error. The invalid state is carried
 * by a border, an icon and a text message - never colour on its own.
 */
export default function Field({
  id,
  label,
  error,
  hint,
  required = false,
  as = 'input',
  children,
  className,
  ...rest
}) {
  const Control = as;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ');

  return (
    <div className={cn('grid gap-2', error && 'field-invalid', className)}>
      <label className="micro text-text-dim" htmlFor={id}>
        {label}
        {required ? (
          <span className="ml-1 text-accent-bright" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      <Control
        id={id}
        name={id}
        className="field-control"
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        {...rest}
      >
        {children}
      </Control>

      {hint ? (
        <p className="text-sm text-muted" id={hintId}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p className="flex items-center gap-1.5 text-sm text-danger" id={errorId}>
          <AlertCircle size={14} strokeWidth={2.25} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
