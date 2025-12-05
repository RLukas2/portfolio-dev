'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Spotify } from '@/components/common/icons';
import { Badge } from '@/components/ui/badge';
import { useLastPlayed } from '@/features/now-playing/hooks/use-last-played';
import { cn } from '@/lib/utils';

interface SpotifyWidgetProps {
  className?: string;
}

export function SpotifyWidget({ className = '' }: SpotifyWidgetProps) {
  const { track, isLoading } = useLastPlayed();

  const hasTrack = track?.songUrl;

  return (
    <Link
      href={track?.songUrl ?? 'https://open.spotify.com'}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex size-full items-center gap-4 p-4',
        'relative overflow-hidden',
        className,
      )}
    >
      {/* Album Art */}
      <div className="bg-muted relative aspect-square h-full shrink-0 overflow-hidden rounded-xl">
        {isLoading ? (
          <div className="bg-muted size-full animate-pulse" />
        ) : hasTrack && track.albumImageUrl ? (
          <Image
            src={track.albumImageUrl}
            alt={track.album ?? 'Album cover'}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="bg-muted flex size-full items-center justify-center">
            <Spotify className="text-muted-foreground size-8" />
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <span className="text-muted-foreground text-xs">
          {track?.isPlaying ? 'Now Playing' : 'Last Played'}
        </span>
        <h3 className="truncate text-base font-semibold">
          {isLoading ? 'Loading...' : (track?.title ?? 'Not Playing')}
        </h3>
        <p className="text-muted-foreground truncate text-sm">
          {isLoading ? '...' : (track?.artist ?? 'No artist')}
        </p>
      </div>

      {/* Spotify Badge - Top Right */}
      <Badge
        variant="outline"
        className={cn('absolute top-4 right-4 rounded-full p-1')}
        asChild
      >
        <Spotify className="text-foreground size-7 transition-colors group-hover:text-[#1DB954]" />
      </Badge>
    </Link>
  );
}
