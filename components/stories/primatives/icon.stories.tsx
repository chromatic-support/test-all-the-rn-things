import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Icon } from '@/components/ui/primatives/icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Primatives/Icon',
  component: Icon,
  args: {
    name: 'star',
    size: 24,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Small: Story = {
  args: { size: 16 },
};

export const Large: Story = {
  args: { size: 40 },
};

export const WithColor: Story = {
  args: { name: 'favorite', size: 32, color: '#F89980' },
};

export const CommonIcons: Story = {
  render: () => (
    <View style={{ padding: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      <Icon name="home" accessibilityLabel="Home" />
      <Icon name="search" accessibilityLabel="Search" />
      <Icon name="person" accessibilityLabel="Person" />
      <Icon name="settings" accessibilityLabel="Settings" />
      <Icon name="notifications" accessibilityLabel="Notifications" />
      <Icon name="favorite" accessibilityLabel="Favorite" />
      <Icon name="star" accessibilityLabel="Star" />
      <Icon name="close" accessibilityLabel="Close" />
    </View>
  ),
};
