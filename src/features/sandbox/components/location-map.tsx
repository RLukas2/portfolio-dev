'use client';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useMemo, useState } from 'react';
import { CircleMarker, MapContainer, TileLayer, useMap } from 'react-leaflet';

import { cn } from '@/lib/utils';

// Fix for default marker icons in Leaflet with webpack
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Ho Chi Minh City, Vietnam coordinates
const LOCATION = {
  name: 'Ho Chi Minh City',
  country: 'Vietnam',
  lat: 10.7213234,
  lng: 106.6347246,
};

const MAX_ZOOM = 14; // Default/max zoom (zoomed in)
const MIN_ZOOM = 12; // Can zoom out 2 times (14 -> 13 -> 12)

// Tile URLs for different themes
const TILE_URLS = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
};

// Custom zoom control component
function CustomZoomControl({
  zoom,
  onZoomIn,
  onZoomOut,
}: {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}) {
  const canZoomIn = zoom < MAX_ZOOM;
  const canZoomOut = zoom > MIN_ZOOM;

  return (
    <>
      {/* Zoom out button - bottom left */}
      {canZoomOut && (
        <button
          onClick={onZoomOut}
          className={cn(
            'absolute bottom-4 left-4 z-1000',
            'flex h-10 w-10 items-center justify-center rounded-full',
            'bg-card-badge backdrop-blur-sm',
            'border-border border',
            'text-foreground',
            'hover:bg-accent transition-colors',
          )}
          aria-label="Zoom out"
        >
          <MinusIcon className="size-4" />
        </button>
      )}

      {/* Zoom in button - bottom right */}
      {canZoomIn && (
        <button
          onClick={onZoomIn}
          className={cn(
            'absolute right-4 bottom-4 z-1000',
            'flex h-10 w-10 items-center justify-center rounded-full',
            'bg-card-badge backdrop-blur-sm',
            'border-border border',
            'text-foreground',
            'hover:bg-accent transition-colors',
          )}
          aria-label="Zoom in"
        >
          <PlusIcon className="size-4" />
        </button>
      )}
    </>
  );
}

// Component to sync map zoom with state
function MapZoomHandler({ zoom }: { zoom: number }) {
  const map = useMap();

  // Update map when zoom state changes with animation
  if (map.getZoom() !== zoom) {
    map.flyTo(map.getCenter(), zoom, {
      duration: 0.3, // Animation duration in seconds
    });
  }

  return null;
}

// Derive radius from zoom level
const getRadiusFromZoom = (zoom: number) => 50 + (zoom - MAX_ZOOM) * 20;

export default function LocationMap() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [zoom, setZoom] = useState(MAX_ZOOM);

  // Derive radius from zoom instead of separate state
  const radius = useMemo(() => getRadiusFromZoom(zoom), [zoom]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, MIN_ZOOM));
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl">
      <MapContainer
        center={[LOCATION.lat, LOCATION.lng]}
        zoom={MAX_ZOOM}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        attributionControl={false}
        className="h-full w-full"
        style={{ background: 'transparent' }}
      >
        <MapZoomHandler zoom={zoom} />

        {/* Theme-aware map tiles */}
        <TileLayer
          key={resolvedTheme}
          url={isDark ? TILE_URLS.dark : TILE_URLS.light}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Green circle overlay for location */}
        <CircleMarker
          center={[LOCATION.lat, LOCATION.lng]}
          radius={radius}
          pathOptions={{
            fillColor: 'rgb(153, 204, 255)',
            fillOpacity: 0.5,
            weight: 0,
          }}
        />
      </MapContainer>

      {/* Custom zoom controls outside MapContainer */}
      <CustomZoomControl
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
    </div>
  );
}
