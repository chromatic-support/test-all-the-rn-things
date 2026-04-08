import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Stack } from '@/components/ui/layout/stack';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

const meta: Meta<typeof Stack> = {
  title: 'Components/Layout/Stack',
  component: Stack,
  args: {
    direction: 'vertical',
    gap: 4,
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function Box({ label, flex }: { label: string; flex?: number }) {
  const textColor = useThemeColor({}, 'text');
  return (
    <View style={[styles.box, flex !== undefined && { flex }]}>
      <Text style={[styles.boxLabel, { color: textColor }]}>{label}</Text>
    </View>
  );
}

// --- Stories ---

export const Vertical: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Stack direction="vertical" gap={3}>
        <Box label="Item 1" />
        <Box label="Item 2" />
        <Box label="Item 3" />
      </Stack>
    </View>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Stack direction="horizontal" gap={3}>
        <Box label="A" flex={1} />
        <Box label="B" flex={1} />
        <Box label="C" flex={1} />
      </Stack>
    </View>
  ),
};

export const Centered: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Stack direction="horizontal" gap={3} align="center" justify="center">
        <Box label="Short" />
        <View style={[styles.box, { height: 80 }]}>
          <Text style={styles.boxLabel}>Tall</Text>
        </View>
        <Box label="Short" />
      </Stack>
    </View>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Stack direction="horizontal" gap={3} justify="between">
        <Box label="Left" />
        <Box label="Center" />
        <Box label="Right" />
      </Stack>
    </View>
  ),
};

export const Wrapped: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Stack direction="horizontal" gap={2} wrap>
        {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta'].map((label) => (
          <View key={label} style={styles.chip}>
            <Text style={styles.chipLabel}>{label}</Text>
          </View>
        ))}
      </Stack>
    </View>
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
  box: {
    backgroundColor: `${Palette.brand}28`,
    borderRadius: 8,
    padding: Spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  boxLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  chip: {
    backgroundColor: `${Palette.brand}28`,
    borderRadius: 99,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1],
  },
  chipLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
});
