import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Checkout } from '@/components/screens/checkout';
// mock data
import { mockOrderItems, mockCostBreakdown } from '@/data/mocks/checkout';

const meta: Meta<typeof Checkout> = {
  title: 'Screens/Checkout',
  component: Checkout,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const SingleItem: Story = {
  args: {
    initialItems: [
      {
        id: '1',
        title: 'Peach Mango Sparkling Water',
        imageSource: { uri: 'https://picsum.photos/seed/peach/200' },
        price: 4.99,
        quantity: 1,
      },
    ],
  },
};

export const MultipleItems: Story = {
  args: {
    initialItems: [
      {
        id: '1',
        title: 'Peach Mango Sparkling Water',
        imageSource: { uri: 'https://picsum.photos/seed/peach/200' },
        price: 4.99,
        quantity: 3,
      },
      {
        id: '2',
        title: 'Mint Lime Cold Brew',
        imageSource: { uri: 'https://picsum.photos/seed/mint/200' },
        price: 5.49,
        quantity: 2,
      },
      {
        id: '3',
        title: 'Strawberry Lemon Soda',
        imageSource: { uri: 'https://picsum.photos/seed/strawberry/200' },
        price: 3.99,
        quantity: 1,
      },
    ],
    initialMethod: 'card-on-file',
    savedCards: [
      { brand: 'Visa', last4: '4242', expiry: '12/26', nickname: 'Work Card', isDefault: true },
      { brand: 'Mastercard', last4: '5555', expiry: '11/25', nickname: 'Personal Card', isDefault: false },
    ],
    initialAddress: {
      initialName: 'Jane Smith',
      initialStreet: '123 Main St',
      initialApt: 'Apt 4B',
      initialCity: 'New York',
      initialState: 'NY',
      initialZip: '10001',
    },
  },
};

function ConfirmedCheckout() {
  return (
    <Checkout
      initialOrderNumber="A1B2C3D4"
      initialItems={mockOrderItems}
      initialCost={mockCostBreakdown}
      initialConfirmedAddress={{
        name: 'Jane Smith',
        street: '123 Main St',
        apt: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      }}
    />
  );
}

export const OrderConfirmed: Story = {
  render: () => <ConfirmedCheckout />,
};
