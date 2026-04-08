import { StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { FlavorsMenuScreen, type FlavorItem } from '@/components/ui/layout/screen-templates/flavors-menu';
// shared theme constants
import { FontSize, FontWeight, Palette } from '@/constants/theme';

const meta: Meta<typeof FlavorsMenuScreen> = {
  title: 'Components/Layout/Screen Templates/FlavorsMenu',
  component: FlavorsMenuScreen,
};

export default meta;

type Story = StoryObj<typeof meta>;

const flavorItems: FlavorItem[] = [
  { label: 'flavor 1', backgroundColor: `${Palette.brand}18` },
  { label: 'flavor 2', backgroundColor: `${Palette.brand}18` },
  { label: 'flavor 3', backgroundColor: `${Palette.brand}18` },
  { label: 'flavor 4', backgroundColor: `${Palette.brand}18` },
];

// --- Stories ---

export const Default: Story = {
  render: () => (
    <FlavorsMenuScreen
      hero={
        <View style={styles.hero}>
          <Text style={styles.label}>hero / filters</Text>
        </View>
      }
      items={flavorItems}
    />
  ),
};

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    height: 120,
    backgroundColor: `${Palette.brand}28`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.medium,
    color: Palette.gray500,
  },
});
