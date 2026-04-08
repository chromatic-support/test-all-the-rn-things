import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/navigation/breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  args: {
    items: [
      { label: 'Home' },
      { label: 'Settings' },
      { label: 'Profile' },
    ],
  },
  render: function Render(args) {
    const itemsWithHandlers = args.items.map((item: BreadcrumbItem, index: number) => ({
      ...item,
      onPress: index < args.items.length - 1 ? () => {} : undefined,
    }));
    return <Breadcrumbs {...args} items={itemsWithHandlers} />;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const CustomSeparator: Story = {
  args: { separator: '>' },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home' }],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [{ label: 'Home' }, { label: 'Settings' }],
  },
};

export const DeepPath: Story = {
  args: {
    items: [
      { label: 'Home' },
      { label: 'Account' },
      { label: 'Security' },
      { label: 'Two-Factor Auth' },
    ],
  },
};
