import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { OrderSummary } from '@/components/composites/checkout/order-summary';
// shared theme constants
import { Spacing } from '@/constants/theme';
// mock data
import { mockOrderItems } from '@/data/mocks/checkout';

const meta: Meta<typeof OrderSummary> = {
  title: 'Composites/Checkout/OrderSummary',
  component: OrderSummary,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState(mockOrderItems);

    function handleQuantityChange(id: string, quantity: number) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }

    return (
      <View style={styles.wrapper}>
        <OrderSummary items={items} onQuantityChange={handleQuantityChange} onRemove={(id: string) => setItems((prev) => prev.filter((item) => item.id !== id))} />
      </View>
    );
  },
};

export const SingleItem: Story = {
  render: () => {
    const [items, setItems] = useState([mockOrderItems[0]]);

    function handleQuantityChange(id: string, quantity: number) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }

    return (
      <View style={styles.wrapper}>
        <OrderSummary items={items} onQuantityChange={handleQuantityChange} onRemove={(id: string) => setItems((prev) => prev.filter((item) => item.id !== id))} />
      </View>
    );
  },
};

export const EmptyCart: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <OrderSummary items={[]} onQuantityChange={() => {}} onRemove={() => {}} />
    </View>
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
