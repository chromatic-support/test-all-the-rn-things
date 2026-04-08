import { View, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { DeliveryAddress } from '@/components/composites/checkout/delivery-address';
// shared theme constants
import { Spacing } from '@/constants/theme';

const meta: Meta<typeof DeliveryAddress> = {
  title: 'Composites/Checkout/DeliveryAddress',
  component: DeliveryAddress,
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
    initialName: 'Jane Smith',
    initialStreet: '123 Main St',
    initialApt: 'Apt 4B',
    initialCity: 'New York',
    initialState: 'NY',
    initialZip: '10001',
  },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
