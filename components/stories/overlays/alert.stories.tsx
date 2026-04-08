import { useState } from 'react';
import { Button, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useArgs } from 'storybook/preview-api';

// shared component
import { Alert, type AlertProps } from '@/components/ui/overlays/alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Overlays/Alert',
  component: Alert,
  args: {
    visible: false,
    title: 'Confirm Action',
    actions: [],
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: function Render(args: AlertProps) {
    const [{ visible }, updateArgs] = useArgs<AlertProps>();
    const close = () => updateArgs({ visible: false });
    return (
      <View style={{ padding: 16 }}>
        <Button title="Show Alert" onPress={() => updateArgs({ visible: true })} />
        <Alert
          {...args}
          visible={visible ?? false}
          actions={[
            { label: 'Cancel', variant: 'cancel', onPress: close },
            { label: 'Confirm', onPress: close },
          ]}
          onDismiss={close}
        />
      </View>
    );
  },
};

export const WithMessage: Story = {
  render: function Render(args: AlertProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <View style={{ padding: 16 }}>
        <Button title="Show Alert" onPress={() => setVisible(true)} />
        <Alert
          {...args}
          visible={visible}
          title="Delete item?"
          message="This action cannot be undone. The item will be permanently removed."
          actions={[
            { label: 'Cancel', variant: 'cancel', onPress: close },
            { label: 'Delete', variant: 'destructive', onPress: close },
          ]}
          onDismiss={close}
        />
      </View>
    );
  },
};

export const Destructive: Story = {
  render: function Render(args: AlertProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <Alert
        {...args}
        visible={visible}
        title="Delete Account"
        message="Are you sure you want to permanently delete your account?"
        actions={[
          { label: 'Cancel', variant: 'cancel', onPress: close },
          { label: 'Delete', variant: 'destructive', onPress: close },
        ]}
      />
    );
  },
};

export const SingleAction: Story = {
  render: function Render(args: AlertProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <Alert
        {...args}
        visible={visible}
        title="Update Available"
        message="A new version is ready to install."
        actions={[{ label: 'OK', onPress: close }]}
      />
    );
  },
};
