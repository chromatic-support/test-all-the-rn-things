import { useState } from 'react';
import { Button, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Toast, type ToastProps } from '@/components/ui/overlays/toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Overlays/Toast',
  component: Toast,
  args: {
    visible: false,
    message: 'This is a notification message.',
    variant: 'info',
    position: 'bottom',
    duration: 3000,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

// Toast uses absolute positioning — the story wrapper provides a flex: 1 container
// so the toast renders above other content at the screen edge.

export const Default: Story = {
  render: function Render(args: ToastProps) {
    const [visible, setVisible] = useState(false);
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Button title="Show Toast" onPress={() => setVisible(true)} />
        <Toast
          {...args}
          visible={visible}
          onDismiss={() => setVisible(false)}
        />
      </View>
    );
  },
};

export const Success: Story = {
  render: function Render(args: ToastProps) {
    const [visible, setVisible] = useState(true);
    return (
      <View style={{ flex: 1 }}>
        <Toast
          {...args}
          visible={visible}
          message="Changes saved successfully."
          variant="success"
          onDismiss={() => setVisible(false)}
        />
      </View>
    );
  },
};

export const Error: Story = {
  render: function Render(args: ToastProps) {
    const [visible, setVisible] = useState(true);
    return (
      <View style={{ flex: 1 }}>
        <Toast
          {...args}
          visible={visible}
          message="Something went wrong. Please try again."
          variant="error"
          onDismiss={() => setVisible(false)}
        />
      </View>
    );
  },
};

export const Warning: Story = {
  render: function Render(args: ToastProps) {
    const [visible, setVisible] = useState(true);
    return (
      <View style={{ flex: 1 }}>
        <Toast
          {...args}
          visible={visible}
          message="Your session will expire in 5 minutes."
          variant="warning"
          onDismiss={() => setVisible(false)}
        />
      </View>
    );
  },
};

export const TopPosition: Story = {
  render: function Render(args: ToastProps) {
    const [visible, setVisible] = useState(true);
    return (
      <View style={{ flex: 1 }}>
        <Toast
          {...args}
          visible={visible}
          message="New message received."
          variant="info"
          position="top"
          onDismiss={() => setVisible(false)}
        />
      </View>
    );
  },
};
