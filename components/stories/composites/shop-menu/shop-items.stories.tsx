import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';

// shared component
import { ShopItems } from '@/components/composites/shop-menu/shop-items';
// shared theme constants
import { Spacing } from '@/constants/theme';

const meta: Meta<typeof ShopItems> = {
  title: 'Composites/ShopMenu/ShopItems',
  component: ShopItems,
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
  render: () => (
    <ShopItems
      items={[
        {
          id: 'peach-princess',
          name: 'Peach Princess',
          image: require('@/assets/img/flavors/peach-princess.png'),
          tag: 'Fan Favorite',
          priceRange: { min: 3.99, max: 25.99 },
          onPress: () => {},
        },
        {
          id: 'monstera-original',
          name: 'Monstera Original',
          image: require('@/assets/img/flavors/monstera-original.png'),
          tag: 'Year Round',
          priceRange: { min: 4.99, max: 24.99 },
          onPress: () => {},
        },
        {
          id: 'half-moon',
          name: 'Half Moon',
          image: require('@/assets/img/flavors/half-moon.png'),
          tag: 'Seasonal',
          priceRange: { min: 4.99, max: 25.99 },
          onPress: () => {},
        },
        {
          id: 'watermelon',
          name: 'Watermelon',
          image: require('@/assets/img/flavors/watermelon.png'),
          tag: 'Seasonal',
          priceRange: { min: 4.99, max: 24.99 },
          onPress: () => {},
        },
        {
          id: 'bae-root',
          name: 'Bae Root',
          image: require('@/assets/img/flavors/bae-root.png'),
          tag: 'Fan Favorite',
          priceRange: { min: 4.99, max: 24.99 },
          onPress: () => {},
        },
        {
          id: 'chai-constellation',
          name: 'Chai Constellation',
          image: require('@/assets/img/flavors/chai-constellation.png'),
          tag: 'Year Round',
          priceRange: { min: 4.99, max: 24.99 },
          onPress: () => {},
        },
      ]}
    />
  ),
};

export const WithLimitedEdition: Story = {
  render: () => (
    <ShopItems
      items={[
        {
          id: 'date-night-special',
          name: 'Date Night Special',
          image: require('@/assets/img/flavors/date-night-special.png'),
          tag: 'Limited Edition',
          priceRange: { min: 5.99, max: 29.99 },
          onPress: () => {},
        },
        {
          id: 'peru-passion',
          name: 'Peru Passion',
          image: require('@/assets/img/flavors/peru-passion.png'),
          tag: 'Limited Edition',
          priceRange: { min: 4.99, max: 24.99 },
          onPress: () => {},
        },
        {
          id: 'watermelon',
          name: 'Watermelon',
          image: require('@/assets/img/flavors/watermelon.png'),
          tag: 'Seasonal',
          priceRange: { min: 4.99, max: 24.99 },
          onPress: () => {},
        },
        {
          id: 'peach-princess',
          name: 'Peach Princess',
          image: require('@/assets/img/flavors/peach-princess.png'),
          priceRange: { min: 3.99, max: 25.99 },
          onPress: () => {},
        },
        {
          id: 'half-moon',
          name: 'Half Moon',
          image: require('@/assets/img/flavors/half-moon.png'),
          priceRange: { min: 4.99, max: 25.99 },
          onPress: () => {},
        },
        {
          id: 'monstera-original',
          name: 'Monstera Original',
          image: require('@/assets/img/flavors/monstera-original.png'),
          priceRange: { min: 4.99, max: 24.99 },
          onPress: () => {},
        },
      ]}
    />
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
