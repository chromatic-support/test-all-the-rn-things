import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { PlaceOrder } from '@/components/composites/checkout/place-order';

const meta: Meta<typeof PlaceOrder> = {
  title: 'Composites/Checkout/PlaceOrder',
  component: PlaceOrder,
  args: {
    onPress: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
