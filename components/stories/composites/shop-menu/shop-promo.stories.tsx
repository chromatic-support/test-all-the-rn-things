import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';

// shared component
import { ShopPromo } from '@/components/composites/shop-menu/shop-promo';
// shared theme constants
import { Spacing } from '@/constants/theme';

const meta: Meta<typeof ShopPromo> = {
  title: 'Composites/ShopMenu/ShopPromo',
  component: ShopPromo,
  decorators: [
    (Story) => (
      <View style={styles.wrapper}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

// Date Night Special — 30% off, with callout label
export const DateNightSpecialSale: Story = {
  render: () => (
    <ShopPromo
      title="Date Night Special"
      description="Lush medjool dates, ripe figs, and deep plum with a whisper of vanilla. Rich, velvety, and made for an evening in."
      calloutLabel="30% off · Limited time"
      image={require('@/assets/img/marketing/too-many-habibis.png')}
      onPress={() => {}}
    />
  ),
};

// No callout label
export const NoCallout: Story = {
  render: () => (
    <ShopPromo
      title="Date Night Special"
      description="Lush medjool dates, ripe figs, and deep plum with a whisper of vanilla. Rich, velvety, and made for an evening in."
      image={require('@/assets/img/marketing/too-many-habibis.png')}
      onPress={() => {}}
    />
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
