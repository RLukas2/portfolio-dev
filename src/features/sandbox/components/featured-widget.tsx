import { Sparkles } from 'lucide-react';
import Image from 'next/image';

import Link from '@/components/common/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FeaturedWidgetProps {
  className?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
}

export function FeaturedWidget({
  className = '',
  title = 'Portfolio',
  description = 'A personal portfolio website showcasing my projects, skills, and experience.',
  imageSrc = '/media/site/og-image.jpg',
  imageAlt = 'Portfolio Website Preview',
  href = '/projects/rlukas2',
}: FeaturedWidgetProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex size-full flex-col gap-3 p-4',
        'relative overflow-hidden',
        className,
      )}
    >
      {/* Header Badge */}
      <Badge variant="wide" className="gap-2">
        <Sparkles className="size-4" />
        <span className="text-sm">Featured Work</span>
      </Badge>
      {/* Title & Description */}
      <div className="space-y-2">
        <h3 className="text-2xl font-medium">{title}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {description}
        </p>
      </div>{' '}
      {/* Browser Mockup with Website Preview */}
      <div className="group relative flex-1 overflow-hidden rounded-lg">
        <BrowserMockup>
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              quality={50}
              sizes="(max-width: 200px) 100vw, 200px"
              fill
              priority
              className="object-cover object-top transition-[object-position] duration-[2s] ease-in-out group-hover:object-bottom"
            />
          </div>
        </BrowserMockup>
      </div>
    </Link>
  );
}

function BrowserMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/50 flex h-full min-h-[200px] flex-col overflow-hidden rounded-2xl border">
      {/* Browser Header */}
      <div className="bg-muted flex shrink-0 items-center gap-2 border-b px-3 py-1">
        {/* Traffic Lights */}
        <div className="flex gap-1.5">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-green-500/80" />
        </div>
        {/* URL Bar */}
        <div className="bg-card-badge ml-2 flex-1 rounded-md px-3 py-[0.5]">
          <span className="text-muted-foreground text-xs">rlukas.com</span>
        </div>
      </div>{' '}
      {/* Browser Content */}
      <div className="relative min-h-[150px] flex-1">{children}</div>
    </div>
  );
}
