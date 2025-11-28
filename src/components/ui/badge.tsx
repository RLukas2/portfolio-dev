import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  cn(
    'inline-flex items-center justify-center w-fit shrink-0 overflow-auto rounded-md border px-2 py-0.5 gap-1',
    'text-xs font-medium whitespace-nowrap',
    '[&>svg]:size-3 [&>svg]:pointer-events-none',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    'transition-[color,box-shadow]',
  ),
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * Badge component to display a badge with different variants.
 * This used for indicating status or highlighting information.
 *
 * @param {(React.ComponentProps<'span'> &
 *   VariantProps<typeof badgeVariants> & { asChild?: boolean })} param0
 * @param {*} param0.className - Additional class names to apply to the badge.
 * @param {*} param0.variant - Variant of the badge (default, secondary, destructive, outline).
 * @param {*} [param0.asChild=false] - Whether to render the badge as a child component.
 * @param {*} param0....props - Additional props to pass to the badge component.
 * @returns {React.ReactNode} The rendered Badge component.
 */
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
