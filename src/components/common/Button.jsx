import { Link } from 'react-router-dom';
import { cn } from '../../utils/helpers';

/**
 * One button, three visual weights. Renders as <button>, <a> or router <Link>
 * depending on the props given, so semantics always match behaviour.
 */
export default function Button({
  variant = 'primary',
  size,
  to,
  href,
  icon: Icon,
  block = false,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    'btn group',
    variant === 'primary' && 'btn-primary',
    variant === 'ghost' && 'btn-ghost',
    size === 'lg' && 'btn-lg',
    block && 'w-full',
    className
  );

  const inner = (
    <>
      <span>{children}</span>
      {Icon ? (
        <Icon
          className="flex-none transition-transform duration-base ease-quint group-hover:translate-x-1"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
