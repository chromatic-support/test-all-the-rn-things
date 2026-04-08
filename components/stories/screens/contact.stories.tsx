import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Contact } from '@/components/screens/contact';

const meta: Meta<typeof Contact> = {
  title: 'Screens/Contact',
  component: Contact,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const EmailSelected: Story = {
  args: { initialMethod: 'email' },
};

export const PhoneSelected: Story = {
  args: { initialMethod: 'phone', phoneNumber: '(555) 123-4567' },
};
