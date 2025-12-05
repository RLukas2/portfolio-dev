import { Clock, KeyboardIcon, Languages, Target } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { MONKEYTYPE_URL } from '@/features/sandbox/constants/links';
import { cn } from '@/lib/utils';

interface TypingWidgetProps {
  wpm?: number;
  time?: string;
  accuracy?: string;
  language?: string;
  className?: string;
}

export function TypingWidget({
  wpm = 100,
  time = '15s',
  accuracy = '100%',
  language = 'EN',
  className = '',
}: TypingWidgetProps) {
  return (
    <Link
      href={MONKEYTYPE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex h-full flex-col justify-between p-4',
        'relative overflow-hidden',
        'max-md:gap-12',
        className,
      )}
    >
      {/* Background Large Number */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          'mask-[linear-gradient(to_top,transparent,black)] text-[196px] leading-none font-bold opacity-10',
        )}
      >
        {wpm}
      </div>

      {/* Header Badge */}
      <Badge variant="wide" className="gap-2">
        <KeyboardIcon className="size-6" />
        <span className="text-sm">Typing speed</span>
      </Badge>
      {/* Main WPM Display */}
      <div>
        {/* Foreground WPM */}
        <div className="flex items-baseline gap-2">
          <span className="text-7xl leading-none">{wpm}</span>
          <span className="text-4xl">wpm</span>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Clock className="text-muted-foreground group-hover:text-foreground size-4" />
            <span className="text-foreground font-medium">{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="text-muted-foreground group-hover:text-foreground size-4" />
            <span className="text-foreground font-medium">{accuracy}</span>
          </div>
          <div className="flex items-center gap-1">
            <Languages className="text-muted-foreground group-hover:text-foreground size-4" />
            <span className="text-foreground font-medium">{language}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
