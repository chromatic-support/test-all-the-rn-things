import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Image } from '@/components/ui/primatives/image';

// shared component
import { Header, type HeaderAction } from '@/components/ui/navigation/header';

const meta: Meta<typeof Header> = {
  title: 'Components/Navigation/Header',
  component: Header,
  args: {
    title: 'Page Title',
  },
  argTypes: {
    background: {
      control: { type: 'select' },
      options: [undefined, 'brand', 'brandLight', 'brandDark'],
    },
  },
  render: function Render(args) {
    const rightActions = (args.rightActions ?? []).map((action: HeaderAction) => ({
      ...action,
      onPress: () => {},
    }));
    return (
      <Header
        {...args}
        onBack={args.onBack ? () => {} : undefined}
        rightActions={rightActions}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const WithBackButton: Story = {
  args: { onBack: () => {} },
};

export const WithRightAction: Story = {
  args: {
    rightActions: [
      { icon: 'settings', accessibilityLabel: 'Open settings', onPress: () => {} },
    ],
  },
};

export const WithBackAndActions: Story = {
  args: {
    onBack: () => {},
    rightActions: [
      { icon: 'search', accessibilityLabel: 'Search', onPress: () => {} },
      { icon: 'more-vert', accessibilityLabel: 'More options', onPress: () => {} },
    ],
  },
};

export const LongTitle: Story = {
  args: {
    title: 'A Very Long Page Title That Should Truncate',
    onBack: () => {},
  },
};

export const BrandBackground: Story = {
  args: { background: 'brand' },
};

export const BrandLightBackground: Story = {
  args: { background: 'brandLight' },
};

export const BrandDarkBackground: Story = {
  args: { background: 'brandDark' },
};

export function MonsteraLogoHeaderComponent() {
  return (
    <Header
      title=""
      titleComponent={
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        <Image source={require('../../../assets/img/logo.png')} width={240} height={40} accessibilityLabel="Logo" resizeMode="contain" background="transparent" />
      }
    />
  );
}

export function WithBackAndActionsComponent() {
  return (
    <Header
      title="Page Title"
      onBack={() => {}}
      rightActions={[
        { icon: 'search', accessibilityLabel: 'Search', onPress: () => {} },
        { icon: 'more-vert', accessibilityLabel: 'More options', onPress: () => {} },
      ]}
    />
  );
}

export const MonsteraLogoHeader: Story = {
  render: () => <MonsteraLogoHeaderComponent />,
};
