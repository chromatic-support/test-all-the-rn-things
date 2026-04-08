import type { Meta, StoryObj } from "@storybook/react-native";
import { Dimensions, StyleSheet, Text, View } from "react-native";

// shared component
import { CheckoutScreen } from "@/components/ui/layout/screen-templates/checkout";
// shared theme constants
import { FontSize, FontWeight, Palette } from "@/constants/theme";

const HERO_HEIGHT = Dimensions.get("window").height * 0.25;

const meta: Meta<typeof CheckoutScreen> = {
  title: "Components/Layout/Screen Templates/Checkout",
  component: CheckoutScreen,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => (
    <CheckoutScreen
      hero={
        <View style={[styles.hero, { height: HERO_HEIGHT }]}>
          <Text style={styles.label}>checkout hero</Text>
        </View>
      }
      orderSummary={
        <View style={styles.orderSummary}>
          <Text style={styles.label}>order summary</Text>
        </View>
      }
      deliveryAddress={
        <View style={styles.address}>
          <Text style={styles.label}>delivery address</Text>
        </View>
      }
      paymentMethod={
        <View style={styles.payment}>
          <Text style={styles.label}>payment method</Text>
        </View>
      }
      orderTotal={
        <View style={styles.total}>
          <Text style={styles.label}>order total</Text>
        </View>
      }
      placeOrder={
        <View style={styles.placeOrder}>
          <Text style={styles.label}>place order</Text>
        </View>
      }
    />
  ),
};

export const Success: Story = {
  render: () => (
    <CheckoutScreen
      hero={
        <View style={[styles.hero, { height: HERO_HEIGHT }]}>
          <Text style={styles.label}>checkout hero</Text>
        </View>
      }
      confirmation={
        <View style={styles.confirmation}>
          <Text style={styles.label}>order confirmation</Text>
        </View>
      }
      shippingSummary={
        <View style={styles.shippingSummary}>
          <Text style={styles.label}>shipping summary</Text>
        </View>
      }
    />
  ),
};

const styles = StyleSheet.create({
  hero: {
    width: "100%",
    backgroundColor: `${Palette.brand}28`,
    alignItems: "center",
    justifyContent: "center",
  },
  orderSummary: {
    minHeight: 160,
    backgroundColor: `${Palette.brand}18`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  address: {
    minHeight: 120,
    backgroundColor: `${Palette.brand}18`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  payment: {
    minHeight: 100,
    backgroundColor: `${Palette.brand}18`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  total: {
    height: 80,
    backgroundColor: `${Palette.brand}18`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  placeOrder: {
    height: 80,
    backgroundColor: `${Palette.brand}28`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  confirmation: {
    minHeight: 300,
    backgroundColor: `${Palette.brand}18`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  shippingSummary: {
    minHeight: 120,
    backgroundColor: `${Palette.brand}18`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  label: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.medium,
    color: Palette.gray500,
  },
});
