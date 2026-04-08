import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Heading } from '@/components/ui/primatives/typography/heading';

const meta: Meta<typeof Heading> = {
  title: 'Components/Primatives/Typography/Heading',
  component: Heading,
  args: {
    level: 1,
    children: 'The quick brown fox',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const H1: Story = { args: { level: 1 } };
export const H2: Story = { args: { level: 2 } };
export const H3: Story = { args: { level: 3 } };
export const H4: Story = { args: { level: 4 } };
export const H5: Story = { args: { level: 5 } };
export const H6: Story = { args: { level: 6 } };

export const Scale: Story = {
  render: () => (
    <View style={{ padding: 16, gap: 8 }}>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </View>
  ),
};
