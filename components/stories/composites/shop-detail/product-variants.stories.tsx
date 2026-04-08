import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';

// shared component
import { ProductVariants } from '@/components/composites/shop-detail/product-variants';
// shared theme constants
import { Spacing } from '@/constants/theme';
// mock data
import { peachPrincessVariants, monsteraVariants } from '@/data/mocks/shop';

const meta: Meta<typeof ProductVariants> = {
  title: 'Composites/ShopDetail/ProductVariants',
  component: ProductVariants,
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

export const WithSale: Story = {
  render: () => {
    const [selected, setSelected] = useState('peach-princess-can');
    return (
      <ProductVariants
        variants={peachPrincessVariants}
        selectedId={selected}
        onSelect={setSelected}
      />
    );
  },
};

export const SalePriceSelected: Story = {
  render: () => {
    const [selected, setSelected] = useState('peach-princess-4pack');
    return (
      <ProductVariants
        variants={peachPrincessVariants}
        selectedId={selected}
        onSelect={setSelected}
      />
    );
  },
};

export const NoSale: Story = {
  render: () => {
    const [selected, setSelected] = useState('monstera-original-can');
    return (
      <ProductVariants
        variants={monsteraVariants}
        selectedId={selected}
        onSelect={setSelected}
      />
    );
  },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
