import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { About } from '@/components/screens/about';

const meta: Meta<typeof About> = {
  title: 'Screens/About',
  component: About,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};
