import { cn } from '@/lib/utils';

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps<T extends As> = Omit<
  React.ComponentPropsWithoutRef<T>,
  'as'
> & {
  as?: T;
};

const Heading = <T extends As = 'h1'>({
  as,
  className,
  id,
  children,
  ...props
}: HeadingProps<T>) => {
  const Tag = as ?? 'h1';

  return (
    <Tag
      className={cn(
        'font-cal scroll-m-32 tracking-wider text-pretty wrap-break-word',
        className,
      )}
      id={id}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Heading;
