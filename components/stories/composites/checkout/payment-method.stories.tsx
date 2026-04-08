import { View, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useArgs } from 'storybook/preview-api';

// shared component
import { PaymentMethod } from '@/components/composites/checkout/payment-method';
import type { PaymentMethodType } from '@/components/composites/checkout/payment-method';
// shared theme constants
import { Spacing } from '@/constants/theme';

const meta: Meta<typeof PaymentMethod> = {
  title: 'Composites/Checkout/PaymentMethod',
  component: PaymentMethod,
  args: {
    method: 'new-credit-card',
  },
  render: function Render(args) {
    const [{ method }, updateArgs] = useArgs<typeof args>();
    return (
      <View style={styles.wrapper}>
        <PaymentMethod
          {...args}
          method={method}
          onMethodChange={(m: PaymentMethodType) => updateArgs({ method: m })}
        />
      </View>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const NewCreditCard: Story = {
  args: { method: 'new-credit-card' },
};

export const CardOnFile: Story = {
  args: {
    method: 'card-on-file',
    savedCards: [
      { brand: 'Visa', last4: '4242', expiry: '12/26', nickname: 'Work Card', isDefault: true },
      { brand: 'Mastercard', last4: '5555', expiry: '11/25', nickname: 'Personal Card', isDefault: false },
    ],
  },
};

export const CardOnFileEmpty: Story = {
  args: { method: 'new-credit-card' },
};


const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
