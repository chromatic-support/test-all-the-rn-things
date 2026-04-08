import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Badge } from '@/components/ui/primatives/badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Primatives/Badge',
  component: Badge,
  args: {
    label: 'Badge',
    variant: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Success: Story = {
  args: { label: 'Success', variant: 'success' },
};

export const Error: Story = {
  args: { label: 'Error', variant: 'error' },
};

export const Warning: Story = {
  args: { label: 'Warning', variant: 'warning' },
};

export const Info: Story = {
  args: { label: 'Info', variant: 'info' },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ padding: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Badge label="Default" variant="default" />
      <Badge label="Success" variant="success" />
      <Badge label="Error" variant="error" />
      <Badge label="Warning" variant="warning" />
      <Badge label="Info" variant="info" />
    </View>
  ),
};
