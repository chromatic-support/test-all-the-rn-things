import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { CheckoutHero } from '@/components/composites/heroes/checkout';

const meta: Meta<typeof CheckoutHero> = {
  title: 'Composites/Heroes/Checkout',
  component: CheckoutHero,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const WithSubtitle: Story = {
  args: { subtitle: 'Review your order before placing it.' },
};

export const LongSubtitle: Story = {
  args: {
    subtitle: 'Almost there! Double-check your delivery address and payment details before confirming.',
  },
};

export const CustomTitle: Story = {
  args: { title: 'Complete Your Order' },
};
