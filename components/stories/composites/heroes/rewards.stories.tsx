import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { RewardsHero } from '@/components/composites/heroes/rewards';

const meta: Meta<typeof RewardsHero> = {
  title: 'Composites/Heroes/Rewards',
  component: RewardsHero,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const WithPoints: Story = {
  args: { points: 1250 },
};

export const HighBalance: Story = {
  args: { points: 24500 },
};

export const CustomTitle: Story = {
  args: { title: 'Your Rewards', points: 750 },
};
