import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Divider } from '@/components/ui/layout/divider';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

const meta: Meta<typeof Divider> = {
  title: 'Components/Layout/Divider',
  component: Divider,
};

export default meta;

type Story = StoryObj<typeof meta>;

function Placeholder({ label }: { label: string }) {
  const textColor = useThemeColor({}, 'text');
  return (
    <View style={styles.placeholder}>
      <Text style={[styles.placeholderText, { color: textColor }]}>{label}</Text>
    </View>
  );
}

// --- Stories ---

export const Default: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Placeholder label="Section A" />
      <Divider />
      <Placeholder label="Section B" />
    </View>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Placeholder label="Above" />
      <Divider label="OR" />
      <Placeholder label="Below" />
    </View>
  ),
};

export const Vertical: Story = {
  render: () => (
    <View style={styles.row}>
      <Placeholder label="Left" />
      <Divider orientation="vertical" />
      <Placeholder label="Right" />
    </View>
  ),
};

export const InList: Story = {
  render: () => (
    <View style={styles.wrapper}>
      {['First item', 'Second item', 'Third item'].map((item, index, arr) => (
        <React.Fragment key={item}>
          <Placeholder label={item} />
          {index < arr.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
    gap: Spacing[3],
  },
  row: {
    flexDirection: 'row',
    padding: Spacing[4],
    gap: Spacing[3],
    height: 120,
  },
  placeholder: {
    flex: 1,
    backgroundColor: `${Palette.brand}18`,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing[3],
  },
  placeholderText: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    opacity: 0.6,
  },
});
