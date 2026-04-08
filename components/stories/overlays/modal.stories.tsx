import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useArgs } from 'storybook/preview-api';

// shared component
import { Modal, type ModalProps } from '@/components/ui/overlays/modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Overlays/Modal',
  component: Modal,
  args: {
    visible: false,
    title: 'Modal Title',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: function Render(args: ModalProps) {
    const [{ visible }, updateArgs] = useArgs<ModalProps>();
    const close = () => updateArgs({ visible: false });
    return (
      <View style={{ padding: 16 }}>
        <Button title="Open Modal" onPress={() => updateArgs({ visible: true })} />
        <Modal {...args} visible={visible ?? false} onClose={close}>
          <Text>Modal content goes here.</Text>
        </Modal>
      </View>
    );
  },
};

export const Open: Story = {
  render: function Render(args: ModalProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <Modal {...args} visible={visible} onClose={close}>
        <Text>Modal content goes here.</Text>
      </Modal>
    );
  },
};

export const NoTitle: Story = {
  render: function Render(args: ModalProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <Modal {...args} visible={visible} title={undefined} onClose={close}>
        <Text>Modal without a title bar label.</Text>
      </Modal>
    );
  },
};

export const WithLongContent: Story = {
  render: function Render(args: ModalProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <Modal {...args} visible={visible} title="Terms of Service" onClose={close}>
        <Text>
          By using this application you agree to our terms and conditions. This
          agreement governs your use of the service and describes your rights and
          responsibilities as a user. Please read carefully before proceeding.
        </Text>
      </Modal>
    );
  },
};
