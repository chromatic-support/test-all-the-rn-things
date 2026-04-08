import { StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { ShopMenuScreen } from '@/components/ui/layout/screen-templates/shop-menu';
// shared component
import { Grid } from '@/components/ui/layout/grid';
// shared theme constants
import { FontSize, FontWeight, Palette } from '@/constants/theme';

const meta: Meta<typeof ShopMenuScreen> = {
  title: 'Components/Layout/Screen Templates/ShopMenu',
  component: ShopMenuScreen,
};

export default meta;

type Story = StoryObj<typeof meta>;

const ITEMS = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6'];

// --- Stories ---

export const Default: Story = {
  render: () => (
    <ShopMenuScreen
      hero={
        <View style={styles.hero}>
          <Text style={styles.label}>hero / categories</Text>
        </View>
      }
      items={
        <Grid columns={3}>
          {ITEMS.map((item) => (
            <View key={item} style={styles.gridItem}>
              <Text style={styles.label}>{item}</Text>
            </View>
          ))}
        </Grid>
      }
      pagination={
        <View style={styles.pagination}>
          <Text style={styles.label}>pagination</Text>
        </View>
      }
      promo={
        <View style={styles.promo}>
          <Text style={styles.label}>promo</Text>
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
  gridItem: {
    height: 120,
    backgroundColor: `${Palette.brand}18`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  pagination: {
    height: 48,
    backgroundColor: `${Palette.brand}18`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  promo: {
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
