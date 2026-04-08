import React from 'react';
import type { Region } from 'react-native-maps';

// shared component
import { Map } from '@/components/ui/primatives/map';
import type { StoreLocation } from '@/components/composites/find/store-results';

const DEFAULT_REGION: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const DEFAULT_HEIGHT = 300;

export type FindMapProps = {
  initialRegion?: Region;
  height?: number;
  locations?: StoreLocation[];
  selectedLocationId?: string;
  onLocationPress?: (id: string) => void;
};

export function FindMap({
  initialRegion = DEFAULT_REGION,
  height = DEFAULT_HEIGHT,
  locations = [],
  selectedLocationId,
  onLocationPress,
}: FindMapProps) {
  const markers = locations.map((loc) => ({
    id: loc.id,
    latitude: loc.latitude,
    longitude: loc.longitude,
    title: loc.name,
  }));

  return (
    <Map
      initialRegion={initialRegion}
      height={height}
      markers={markers}
      selectedMarkerId={selectedLocationId}
      onMarkerPress={onLocationPress}
    />
  );
}
