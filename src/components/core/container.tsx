import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  wide?: boolean;
}

/**
 * Container Component
 * This component provides a responsive container for layout purposes.
 *
 * @type {React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLDivElement>>}
 * @param {ContainerProps} param0
 * @param {boolean} [param0.wide=false] - Whether the container should be wide.
 * @param {string} [param0.className] - Additional class names to apply to the container.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to be forwarded to the div element.
 * @returns {React.ReactNode} The rendered Container component.
 */
const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, wide, ...props }, ref): React.ReactNode => (
    <div
      className={cn(
        'mx-auto flex w-full flex-col px-4',
        wide ? 'max-w-12xl' : 'max-w-5xl',
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  ),
);

Container.displayName = 'Container';

export default Container;
