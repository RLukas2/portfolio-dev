import { cn } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider = ({ className }: SectionDividerProps) => {
  return (
    <div
      className={cn(
        'relative my-12 flex items-center justify-center',
        className,
      )}
    >
      <div className="absolute inset-0 flex items-center">
        <div className="border-border w-full border-t" />
      </div>
      <div className="relative flex justify-center">
        <div className="bg-background px-4">
          <div className="flex gap-1">
            <span className="bg-primary size-1.5 rounded-full" />
            <span className="bg-primary/60 size-1.5 rounded-full" />
            <span className="bg-primary/30 size-1.5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
