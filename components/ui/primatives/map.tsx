import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, type Region } from 'react-native-maps';

// shared theme constants
import { Palette } from '@/constants/theme';

export type MapMarker = {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
};

export type MapProps = {
  initialRegion?: Region;
  height: number;
  markers?: MapMarker[];
  selectedMarkerId?: string;
  onMarkerPress?: (id: string) => void;
};

const DEFAULT_REGION: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const FIT_PADDING = { top: 60, right: 60, bottom: 60, left: 60 };

export function Map({ initialRegion = DEFAULT_REGION, height, markers = [], selectedMarkerId, onMarkerPress }: MapProps) {
  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<Record<string, InstanceType<typeof Marker> | null>>({});

  useEffect(() => {
    if (markers.length === 0) return;

    const coordinates = markers.map(({ latitude, longitude }) => ({ latitude, longitude }));
    mapRef.current?.fitToCoordinates(coordinates, {
      edgePadding: FIT_PADDING,
      animated: true,
    });
  }, [markers]);

  useEffect(() => {
    Object.entries(markerRefs.current).forEach(([id, ref]) => {
      if (id === selectedMarkerId) {
        ref?.showCallout();
      } else {
        ref?.hideCallout();
      }
    });
  }, [selectedMarkerId]);

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        accessibilityLabel="Map"
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            ref={(ref) => { markerRefs.current[marker.id] = ref; }}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            pinColor={marker.id === selectedMarkerId ? Palette.brandDark : Palette.brand}
            onPress={() => onMarkerPress?.(marker.id)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
