import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useArgs } from 'storybook/preview-api';

// shared component
import { Drawer, type DrawerProps } from '@/components/ui/overlays/drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Overlays/Drawer',
  component: Drawer,
  args: {
    visible: false,
    title: 'Drawer Title',
    placement: 'right',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: function Render(args: DrawerProps) {
    const [{ visible }, updateArgs] = useArgs<DrawerProps>();
    const close = () => updateArgs({ visible: false });
    return (
      <View style={{ padding: 16 }}>
        <Button title="Open Drawer" onPress={() => updateArgs({ visible: true })} />
        <Drawer {...args} visible={visible ?? false} onClose={close}>
          <Text>Drawer content goes here.</Text>
        </Drawer>
      </View>
    );
  },
};

export const Open: Story = {
  render: function Render(args: DrawerProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <Drawer {...args} visible={visible} onClose={close}>
        <Text>Drawer content goes here.</Text>
      </Drawer>
    );
  },
};

export const Left: Story = {
  render: function Render(args: DrawerProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <Drawer {...args} visible={visible} placement="left" onClose={close}>
        <Text>Left drawer content.</Text>
      </Drawer>
    );
  },
};

export const Bottom: Story = {
  render: function Render(args: DrawerProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <Drawer {...args} visible={visible} placement="bottom" title="Filter Options" onClose={close}>
        <Text>Bottom sheet content.</Text>
      </Drawer>
    );
  },
};

export const NoTitle: Story = {
  render: function Render(args: DrawerProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <Drawer {...args} visible={visible} title={undefined} onClose={close}>
        <Text>Drawer without a title.</Text>
      </Drawer>
    );
  },
};
