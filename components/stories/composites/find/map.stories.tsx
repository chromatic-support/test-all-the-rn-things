import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { FindMap } from '@/components/composites/find/map';

const AndroidPlaceholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>No map available on Android</Text>
  </View>
);

const meta: Meta<typeof FindMap> = {
  title: 'Composites/Find/Map',
  component: Platform.OS === 'android' ? AndroidPlaceholder : FindMap,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const NewYork: Story = Platform.OS === 'android' ? {} : {
  args: {
    initialRegion: {
      latitude: 40.7128,
      longitude: -74.006,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
};

export const Tall: Story = Platform.OS === 'android' ? {} : {
  args: { height: 500 },
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
