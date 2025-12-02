import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md cursor-pointer',
    'text-sm font-medium',
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'ring-offset-background',
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90',
        ),
        destructive: cn(
          'bg-destructive text-destructive-foreground',
          'hover:bg-destructive/90',
        ),
        outline: cn(
          'border border-input bg-background',
          'hover:bg-accent hover:text-accent-foreground',
        ),
        secondary: cn(
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/80',
        ),
        ghost: cn('hover:bg-accent hover:text-accent-foreground'),
        link: cn('text-primary underline-offset-4', 'hover:underline'),
        shadow: cn(
          'border border-secondary-foreground bg-background',
          'shadow-[3px_3px_rgb(0_0_0_/_20%)]',
          'hover:bg-primary hover:text-primary-foreground',
          'dark:shadow-[3px_3px_rgb(255_255_255_/_40%)]',
        ),
      },
      size: {
        default: cn('h-10 px-4 py-2'),
        sm: cn('h-9 rounded-md px-3'),
        lg: cn('h-11 rounded-md px-8'),
        icon: cn('size-10'),
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button component with variant and size options.
 *
 * @type {React.ForwardRefExoticComponent<ButtonProps>} - The Button component.
 *
 * @param {ButtonProps} param0 - The props for the Button component.
 * @param {string} [param0.className] - Additional class names for the button.
 * @param {string} [param0.variant] - The variant of the button (default, destructive, outline, secondary, ghost, link, shadow).
 * @param {string} [param0.size] - The size of the button (default, sm, lg, icon).
 * @param {boolean} [param0.asChild=false] - Whether to render the button as a child component.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} param0.props - Other button attributes.
 *
 * @returns {React.ReactNode} The rendered Button component.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, ...props },
    ref,
  ): React.ReactNode => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
