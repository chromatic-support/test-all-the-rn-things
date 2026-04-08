import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { ContactHero } from '@/components/composites/heroes/contact';

const meta: Meta<typeof ContactHero> = {
  title: 'Composites/Heroes/Contact',
  component: ContactHero,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const CustomTitle: Story = {
  args: { title: 'Get In Touch' },
};
