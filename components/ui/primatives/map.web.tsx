import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type MapMarker = {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
};

export type MapProps = {
  initialRegion?: unknown;
  height: number;
  markers?: MapMarker[];
  selectedMarkerId?: string;
  onMarkerPress?: (id: string) => void;
};

export function Map({ height }: MapProps) {
  return (
    <View style={[styles.container, { height }]}>
      <Text style={styles.label}>Map not supported on web</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  label: {
    color: '#6b7280',
    fontSize: 14,
  },
});
