import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Map } from '@/components/ui/primatives/map';

const AndroidPlaceholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>No map available on Android</Text>
  </View>
);

const meta: Meta<typeof Map> = {
  title: 'Components/Primatives/Map',
  component: Platform.OS === 'android' ? AndroidPlaceholder : Map,
  args: {
    height: 300,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Tall: Story = Platform.OS === 'android' ? {} : {
  args: { height: 500 },
};

export const Short: Story = Platform.OS === 'android' ? {} : {
  args: { height: 160 },
};

export const CustomRegion: Story = Platform.OS === 'android' ? {} : {
  args: {
    height: 300,
    initialRegion: {
      latitude: 40.7128,
      longitude: -74.006,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
};

export const Zoomed: Story = Platform.OS === 'android' ? {} : {
  args: {
    height: 300,
    initialRegion: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
  },
};

export const ZoomedOut: Story = Platform.OS === 'android' ? {} : {
  args: {
    height: 300,
    initialRegion: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    },
  },
};

export const InContext: Story = {
  render: Platform.OS === 'android'
    ? () => <AndroidPlaceholder />
    : () => (
        <View style={{ gap: 16, padding: 16 }}>
          <Map height={200} />
          <Map
            height={200}
            initialRegion={{
              latitude: 40.7128,
              longitude: -74.006,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          />
        </View>
      ),
};

const styles = StyleSheet.create({
  placeholder: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
  },
  placeholderText: {
    color: '#6b7280',
    fontSize: 14,
  },
});
