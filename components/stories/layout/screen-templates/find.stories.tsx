import { Dimensions, StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { FindScreen } from '@/components/ui/layout/screen-templates/find';
// shared theme constants
import { FontSize, FontWeight, Palette } from '@/constants/theme';

const MAP_HEIGHT = Dimensions.get('window').height * 0.45;

const meta: Meta<typeof FindScreen> = {
  title: 'Components/Layout/Screen Templates/Find',
  component: FindScreen,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => (
    <FindScreen
      hero={
        <View style={styles.hero}>
          <Text style={styles.label}>hero / filters</Text>
        </View>
      }
      map={
        <View style={[styles.map, { height: MAP_HEIGHT }]}>
          <Text style={styles.label}>map</Text>
        </View>
      }
      results={
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.label}>store result</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.label}>store result</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.label}>store result</Text>
          </View>
        </View>
      }
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
  map: {
    width: '100%',
    backgroundColor: `${Palette.brand}28`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    gap: 8,
  },
  listItem: {
    height: 80,
    backgroundColor: `${Palette.brand}18`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  label: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.medium,
    color: Palette.gray500,
  },
});
