import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';

// shared component
import { ProductInfo } from '@/components/composites/shop-detail/product-info';
// shared theme constants
import { Spacing } from '@/constants/theme';

const meta: Meta<typeof ProductInfo> = {
  title: 'Composites/ShopDetail/ProductInfo',
  component: ProductInfo,
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
  args: {
    name: 'Peach Princess',
    description:
      'Sun-ripened peaches blended into something royally refreshing. Sweet, fragrant, and just tart enough.',
    tags: ['Seasonal', 'Fan Favorite', 'Dairy-Free'],
    calories: 115,
  },
};

export const NoOptional: Story = {
  args: {
    name: 'Monstera Original',
    description:
      'The one that started it all. Crisp, clean, and lightly tropical with just a hint of mango — our signature flavor done the original way.',
  },
};

export const LimitedEdition: Story = {
  args: {
    name: 'Date Night Special',
    description:
      'Lush medjool dates, ripe figs, and deep plum with a whisper of vanilla. Rich, velvety, and made for an evening in.',
    tags: ['Limited Edition', 'Fan Favorite'],
    calories: 190,
  },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
