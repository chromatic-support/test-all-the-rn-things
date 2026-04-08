import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Link } from '@/components/ui/primatives/link';

const meta: Meta<typeof Link> = {
  title: 'Components/Primatives/Link',
  component: Link,
  args: {
    label: 'Learn more',
    onPress: () => {},
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
