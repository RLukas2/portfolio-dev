'use client';

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
        'font-cal group scroll-m-32 tracking-wider text-pretty wrap-break-word',
        className,
      )}
      id={id}
      {...props}
    >
      {id ? (
        <a
          href={`#${id}`}
          className={cn(
            'decoration-muted-foreground/50 no-underline underline-offset-4 transition-all hover:underline',
            'text-foreground hover:text-foreground',
          )}
        >
          {children}

          <span
            className={cn(
              'text-muted-foreground ml-2 opacity-0 transition-opacity group-hover:opacity-100',
            )}
            aria-hidden="true"
          >
            #
          </span>
        </a>
      ) : (
        children
      )}
    </Tag>
  );
};

export default Heading;
