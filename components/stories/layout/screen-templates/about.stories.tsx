import type { Meta, StoryObj } from "@storybook/react-native";
import { Dimensions, StyleSheet, Text, View } from "react-native";

// shared component
import { AboutScreen } from "@/components/ui/layout/screen-templates/about";
// shared theme constants
import { FontSize, FontWeight, Palette } from "@/constants/theme";

const HERO_HEIGHT = Dimensions.get("window").height * 0.35;

const meta: Meta<typeof AboutScreen> = {
  title: "Components/Layout/Screen Templates/About",
  component: AboutScreen,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => (
    <AboutScreen
      hero={
        <View style={[styles.hero, { height: HERO_HEIGHT }]}>
          <Text style={styles.label}>brand hero</Text>
        </View>
      }
      ourStory={
        <View style={styles.section}>
          <Text style={styles.label}>our story</Text>
        </View>
      }
      missionValues={
        <View style={styles.section}>
          <Text style={styles.label}>mission / values</Text>
        </View>
      }
      team={
        <View style={styles.section}>
          <Text style={styles.label}>team</Text>
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
  section: {
    minHeight: 140,
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

