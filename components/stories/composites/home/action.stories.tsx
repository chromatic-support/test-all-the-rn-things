import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';

// shared component
import { HomeAction } from '@/components/composites/home/action';

const meta: Meta<typeof HomeAction> = {
  title: 'Composites/Home/Action',
  component: HomeAction,
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

export const SaleRepurchase: Story = {
  render: () => (
    <HomeAction
      variant="sale"
      itemName="Peach Princess"
      discountPercent={20}
      image={require('@/assets/img/flavors/peach-princess.png')}
      onPress={() => {}}
    />
  ),
};

export const Reorder: Story = {
  render: () => (
    <HomeAction
      variant="reorder"
      itemName="Peach Princess"
      image={require('@/assets/img/flavors/peach-princess.png')}
      onPress={() => {}}
    />
  ),
};

export const FirstPurchase: Story = {
  render: () => (
    <HomeAction
      variant="first-purchase"
      onPress={() => {}}
    />
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
});
