import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Home, type HomeUser } from '@/components/screens/home';
// mock data
import mockUser from '@/data/mocks/user';
import { reorderUser } from '@/data/mocks/screen-users';

const meta: Meta<typeof Home> = {
  title: 'Screens/Home',
  component: Home,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

// mockUser has peach-princess-can in history, which is on sale → sale action
export const Default: Story = {
  render: () => <Home user={mockUser as HomeUser} />,
};

export const Reorder: Story = {
  render: () => <Home user={reorderUser} />,
};

export const NoUser: Story = {
  render: () => <Home />,
};
