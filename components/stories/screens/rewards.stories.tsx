import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Rewards, type RewardsUser } from '@/components/screens/rewards';
// mock data
import mockUser from '@/data/mocks/user';
import { welcomeUser } from '@/data/mocks/screen-users';

const meta: Meta<typeof Rewards> = {
  title: 'Screens/Rewards',
  component: Rewards,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

// Mock user: 340 pts — free can + 4-pack redeemable, 6-pack locked
export const Default: Story = {
  render: () => <Rewards user={mockUser as RewardsUser} />,
};

// New user with welcome bonus only: 250 pts — only free can redeemable
export const NewUser: Story = {
  render: () => <Rewards user={welcomeUser} />,
};
