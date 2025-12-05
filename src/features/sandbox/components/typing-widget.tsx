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
        'group flex size-full flex-col p-4',
        'relative overflow-hidden',
        className,
      )}
    >
      {/* Header Badge */}
      <Badge variant="wide" className="gap-2">
        <KeyboardIcon className="size-6" />
        <span className="text-sm">Typing speed</span>
      </Badge>
      {/* Main WPM Display */}
      <div className="relative flex flex-1 items-end">
        {/* Background Large Number */}
        <div className="absolute inset-0 flex items-center justify-center mask-[linear-gradient(to_top,transparent,black)] opacity-10">
          <span className="text-[150px] leading-none font-bold">{wpm}</span>
        </div>

        {/* Foreground WPM */}
        <div className="relative flex items-baseline gap-2">
          <span className="text-8xl leading-none">{wpm}</span>
          <span className="text-4xl">wpm</span>
        </div>
      </div>
      {/* Stats Row */}
      <div className="text-muted-foreground mt-4 flex items-center gap-6">
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
    </Link>
  );
}
