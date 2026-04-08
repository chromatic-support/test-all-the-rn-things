import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { OrderConfirmation } from '@/components/composites/checkout/order-confirmation';

const meta: Meta<typeof OrderConfirmation> = {
  title: 'Composites/Checkout/OrderConfirmation',
  component: OrderConfirmation,
  args: {
    orderNumber: 'A1B2C3D4',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const WithContinueShopping: Story = {
  args: {
    onContinueShopping: () => {},
  },
};
