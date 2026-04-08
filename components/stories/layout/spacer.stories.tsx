import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Spacer } from '@/components/ui/layout/spacer';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

const meta: Meta<typeof Spacer> = {
  title: 'Components/Layout/Spacer',
  component: Spacer,
  args: {
    size: 4,
    axis: 'vertical',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function Block({ label }: { label: string }) {
  const textColor = useThemeColor({}, 'text');
  return (
    <View style={styles.block}>
      <Text style={[styles.blockText, { color: textColor }]}>{label}</Text>
    </View>
  );
}

// --- Stories ---

export const Vertical: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Block label="Block A" />
      <Spacer size={4} axis="vertical" />
      <Block label="Block B (Spacing[4] = 16px gap)" />
      <Spacer size={8} axis="vertical" />
      <Block label="Block C (Spacing[8] = 32px gap)" />
    </View>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <View style={styles.row}>
      <Block label="A" />
      <Spacer size={4} axis="horizontal" />
      <Block label="B" />
      <Spacer size={8} axis="horizontal" />
      <Block label="C" />
    </View>
  ),
};

export const Scale: Story = {
  render: () => (
    <View style={styles.wrapper}>
      {([1, 2, 3, 4, 6, 8, 10, 12] as const).map((size) => (
        <React.Fragment key={size}>
          <View style={styles.row}>
            <Text style={styles.sizeLabel}>size={size} ({Spacing[size]}px)</Text>
          </View>
          <Spacer size={size} axis="vertical" />
          <View style={styles.line} />
        </React.Fragment>
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
  row: {
    flexDirection: 'row',
  },
  block: {
    backgroundColor: `${Palette.brand}28`,
    borderRadius: 8,
    padding: Spacing[3],
    alignItems: 'center',
    flex: 1,
  },
  blockText: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  sizeLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.normal,
    opacity: 0.6,
  },
  line: {
    height: 1,
    backgroundColor: `${Palette.brand}40`,
  },
});
