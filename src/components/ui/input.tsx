import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Input component to render a styled input field.
 *
 * @param {React.ComponentProps<'input'>} param0
 * @param {React.ComponentProps<"input">} param0.className
 * @param {React.ComponentProps<"input">} param0.type
 * @param {React.ComponentProps<"input">} param0....props
 * @returns {*}
 */
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs',
        'border-input bg-transparent',
        'placeholder:text-muted-foreground file:text-foreground text-base file:text-sm file:font-medium md:text-sm',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent',
        'selection:bg-primary selection:text-primary-foreground',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
