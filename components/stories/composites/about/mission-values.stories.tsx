import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { MissionValues } from '@/components/composites/about/mission-values';

const meta: Meta<typeof MissionValues> = {
  title: 'Composites/About/MissionValues',
  component: MissionValues,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const CustomSummary: Story = {
  args: {
    summary:
      'We exist to prove that doing things the right way and making something people love are not mutually exclusive. Quality, honesty, and a little bit of adventure — that is what we stand for.',
  },
};

export const CustomValues: Story = {
  args: {
    values: ['Transparency', 'Sustainability', 'Community first', 'No compromises'],
  },
};

export const NoValues: Story = {
  args: { values: [] },
};
