'use client';

import { MapPinIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Dynamically import the map component to avoid SSR issues with Leaflet
const LocationMap = dynamic(() => import('./location-map'), {
  ssr: false,
  loading: () => (
    <div className="bg-background/50 flex h-full w-full items-center justify-center">
      <span className="text-muted-foreground text-sm">Loading map...</span>
    </div>
  ),
});

interface LocationWidgetProps {
  className?: string;
}

export function LocationWidget({ className = '' }: LocationWidgetProps) {
  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {/* Location Badge */}
      <div className="absolute top-4 left-4 z-1000">
        <Badge variant="wide" className="gap-2 text-sm backdrop-blur-sm">
          <MapPinIcon className="size-4" />
          <span>Location</span>
        </Badge>
      </div>
      {/* Leaflet Map */}
      <LocationMap />
    </div>
  );
}

export default LocationWidget;
