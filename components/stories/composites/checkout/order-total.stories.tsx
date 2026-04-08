import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { OrderTotal } from '@/components/composites/checkout/order-total';

const meta: Meta<typeof OrderTotal> = {
  title: 'Composites/Checkout/OrderTotal',
  component: OrderTotal,
  args: {
    total: 24.99,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const CustomLabel: Story = {
  args: {
    label: 'Total Due',
  },
};

export const LargeAmount: Story = {
  args: {
    total: 149.95,
  },
};
