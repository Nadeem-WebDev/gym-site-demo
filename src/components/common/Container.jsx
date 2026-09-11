import { cn } from '../../utils/helpers';

export default function Container({ wide = false, className, children, as: Tag = 'div' }) {
  return (
    <Tag
      className={cn('mx-auto w-full px-gutter', wide ? 'max-w-wide' : 'max-w-container', className)}
    >
      {children}
    </Tag>
  );
}
