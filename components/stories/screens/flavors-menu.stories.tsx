import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { FlavorsMenu } from '@/components/screens/flavors-menu';

const meta: Meta<typeof FlavorsMenu> = {
  title: 'Screens/FlavorsMenu',
  component: FlavorsMenu,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};
