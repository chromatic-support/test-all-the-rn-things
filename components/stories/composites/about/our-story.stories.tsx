import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { OurStory } from '@/components/composites/about/our-story';

const meta: Meta<typeof OurStory> = {
  title: 'Composites/About/OurStory',
  component: OurStory,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const CustomSummary: Story = {
  args: {
    summary:
      'Born from a love of travel and a hatred of boring beverages, we set out to bottle the flavors the world had been hiding. Every sip tells a story.',
  },
};
