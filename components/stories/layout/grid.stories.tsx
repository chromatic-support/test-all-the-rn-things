import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Grid } from '@/components/ui/layout/grid';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

const meta: Meta<typeof Grid> = {
  title: 'Components/Layout/Grid',
  component: Grid,
  args: {
    columns: 2,
    gap: 4,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function Cell({ label }: { label: string }) {
  const textColor = useThemeColor({}, 'text');
  return (
    <View style={styles.cell}>
      <Text style={[styles.cellLabel, { color: textColor }]}>{label}</Text>
    </View>
  );
}

// --- Stories ---

export const TwoColumn: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Grid columns={2} gap={3}>
        {['One', 'Two', 'Three', 'Four'].map((label) => (
          <Cell key={label} label={label} />
        ))}
      </Grid>
    </View>
  ),
};

export const ThreeColumn: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Grid columns={3} gap={3}>
        {['A', 'B', 'C', 'D', 'E', 'F'].map((label) => (
          <Cell key={label} label={label} />
        ))}
      </Grid>
    </View>
  ),
};

export const FourColumn: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Grid columns={4} gap={2}>
        {['1', '2', '3', '4', '5', '6', '7', '8'].map((label) => (
          <Cell key={label} label={label} />
        ))}
      </Grid>
    </View>
  ),
};

export const LargeGap: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Grid columns={2} gap={6}>
        {['Alpha', 'Beta', 'Gamma', 'Delta'].map((label) => (
          <Cell key={label} label={label} />
        ))}
      </Grid>
    </View>
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
  cell: {
    backgroundColor: `${Palette.brand}28`,
    borderRadius: 8,
    padding: Spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
  },
  cellLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
});
