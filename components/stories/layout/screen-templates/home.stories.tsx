import type { Meta, StoryObj } from "@storybook/react-native";
import { Dimensions, StyleSheet, Text, View } from "react-native";

// shared component
import { HomeScreen } from "@/components/ui/layout/screen-templates/home";
// shared theme constants
import { FontSize, FontWeight, Palette } from "@/constants/theme";

const FEATURED_HEIGHT = Dimensions.get("window").height / 2.5;

const meta: Meta<typeof HomeScreen> = {
  title: "Components/Layout/Screen Templates/Home",
  component: HomeScreen,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => (
    <HomeScreen
      featured={
        <View style={[styles.featured, { height: FEATURED_HEIGHT }]}>
          <Text style={styles.label}>featured</Text>
        </View>
      }
      action={
        <View style={styles.action}>
          <Text style={styles.label}>action</Text>
        </View>
      }
      rewards={
        <View style={styles.rewards}>
          <Text style={styles.label}>rewards</Text>
        </View>
      }
      recommendations={
        <View style={styles.recommendations}>
          <Text style={styles.label}>recommendations</Text>
        </View>
      }
    />
  ),
};

const styles = StyleSheet.create({
  featured: {
    width: "100%",
    backgroundColor: `${Palette.brand}28`,
    alignItems: "center",
    justifyContent: "center",
  },
  action: {
    height: 80,
    backgroundColor: `${Palette.brand}18`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  rewards: {
    width: "100%",
    backgroundColor: `${Palette.brand}18`,
    paddingVertical: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  recommendations: {
    height: 120,
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
