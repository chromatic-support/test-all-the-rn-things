import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View, StyleSheet } from 'react-native';

// shared component
import { AddToCart } from '@/components/composites/shop-detail/add-to-cart';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';

const meta: Meta<typeof AddToCart> = {
  title: 'Composites/ShopDetail/AddToCart',
  component: AddToCart,
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

export const Default: Story = {
  render: () => {
    const [lastAdded, setLastAdded] = useState<number | null>(null);
    return (
      <View style={styles.container}>
        <AddToCart onAddToCart={(qty) => setLastAdded(qty)} />
        {lastAdded !== null ? (
          <Text style={styles.confirmation}>
            Added {lastAdded} to cart
          </Text>
        ) : null}
      </View>
    );
  },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
  container: {
    gap: Spacing[3],
  },
  confirmation: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
    color: Palette.brand,
  },
});
