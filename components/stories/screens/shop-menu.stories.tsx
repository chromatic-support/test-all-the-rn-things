import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { ShopMenu } from '@/components/screens/shop-menu';

const meta: Meta<typeof ShopMenu> = {
  title: 'Screens/ShopMenu',
  component: ShopMenu,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const WithCallbacks: Story = {
  render: () => (
    <ShopMenu
      onItemPress={(id) => console.log('Item pressed:', id)}
      onPromoPress={() => console.log('Promo pressed')}
    />
  ),
};
