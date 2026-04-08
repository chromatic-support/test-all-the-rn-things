import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Text } from '@/components/ui/primatives/typography/text';

const meta: Meta<typeof Text> = {
  title: 'Components/Primatives/Typography/Text',
  component: Text,
  args: {
    variant: 'body',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Body: Story = { args: { variant: 'body' } };
export const Caption: Story = { args: { variant: 'caption' } };
export const Label: Story = { args: { variant: 'label' } };

export const Truncated: Story = {
  render: () => (
    <View style={{ padding: 16, width: 200 }}>
      <Text variant="body" numberOfLines={1}>
        The quick brown fox jumps over the lazy dog.
      </Text>
    </View>
  ),
};

export const Scale: Story = {
  render: () => (
    <View style={{ padding: 16, gap: 12 }}>
      <Text variant="body">Body — The quick brown fox jumps over the lazy dog.</Text>
      <Text variant="label">Label — The quick brown fox jumps over the lazy dog.</Text>
      <Text variant="caption">Caption — The quick brown fox jumps over the lazy dog.</Text>
    </View>
  ),
};
