import { View, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { ContactForm } from '@/components/composites/contact/contact-form';
// shared theme constants
import { Spacing } from '@/constants/theme';

const meta: Meta<typeof ContactForm> = {
  title: 'Composites/Contact/ContactForm',
  component: ContactForm,
  decorators: [
    (Story) => (
      <View style={styles.wrapper}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Prefilled: Story = {
  args: {
    initialEmail: 'jane@example.com',
    initialName: 'Jane Smith',
    initialMessage: 'I had a question about my recent order.',
  },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
