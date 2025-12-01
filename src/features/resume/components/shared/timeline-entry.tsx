import { cn } from '@/lib/utils';

interface TimelineEntryAccomplishmentsProps {
  accomplishments: string[];
  className?: string;
}

/**
 * Reusable accomplishments list for timeline entries
 */
export const TimelineEntryAccomplishments = ({
  accomplishments,
  className,
}: TimelineEntryAccomplishmentsProps) => {
  if (!accomplishments.length) return null;

  return (
    <ul className={cn('mt-4 space-y-2 pl-0', className)}>
      {accomplishments.map((accomplishment, index) => (
        <li
          key={index}
          className="text-muted-foreground before:bg-primary/50 relative pl-4 text-sm leading-relaxed before:absolute before:top-2 before:left-0 before:size-1.5 before:rounded-full"
        >
          {accomplishment}
        </li>
      ))}
    </ul>
  );
};

interface TimelineEntryMetaItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Reusable meta item for timeline entries
 */
export const TimelineEntryMetaItem = ({
  icon,
  children,
}: TimelineEntryMetaItemProps) => (
  <div className="flex items-center gap-1.5">
    {icon}
    {children}
  </div>
);
