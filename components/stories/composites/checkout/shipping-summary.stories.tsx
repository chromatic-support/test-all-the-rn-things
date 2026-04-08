import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { ShippingSummary } from '@/components/composites/checkout/shipping-summary';
// mock data
import { mockOrderItems, mockCostBreakdown } from '@/data/mocks/checkout';

const meta: Meta<typeof ShippingSummary> = {
  title: 'Composites/Checkout/ShippingSummary',
  component: ShippingSummary,
  args: {
    name: 'Jane Smith',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const WithApt: Story = {
  args: {
    apt: 'Apt 4B',
  },
};

export const WithEstimatedDelivery: Story = {
  args: {
    estimatedDelivery: 'Thursday, April 10',
  },
};

export const WithItems: Story = {
  args: {
    items: mockOrderItems,
  },
};

export const WithCost: Story = {
  args: {
    cost: mockCostBreakdown,
  },
};

export const Full: Story = {
  args: {
    apt: 'Apt 4B',
    estimatedDelivery: 'Thursday, April 10',
    items: mockOrderItems,
    cost: mockCostBreakdown,
  },
};
