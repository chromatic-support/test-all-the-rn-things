import type { Meta, StoryObj } from "@storybook/react-native";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

// shared component
import { Container } from "@/components/ui/layout/container";
// shared component
import { OutlinedText } from "@/components/ui/primatives/typography/outlined-text";
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";

const DATE_NIGHT_SPECIAL =
  require("@/assets/img/flavors/date-night-special.png") as number;

const BANNER_HEIGHT = Dimensions.get("window").height / 3;

const meta: Meta<typeof Container> = {
  title: "Components/Layout/Container",
  component: Container,
  args: {
    size: "md",
    padded: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function Block({ label }: { label: string }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockLabel}>{label}</Text>
    </View>
  );
}

// --- Stories ---

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <Block label={`size="${args.size}" padded=${args.padded}`} />
    </Container>
  ),
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Container {...args}>
      <Block label="Small (480px max-width)" />
    </Container>
  ),
};

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Container {...args}>
      <Block label="Large (1024px max-width)" />
    </Container>
  ),
};

export const Full: Story = {
  args: { size: "full" },
  render: (args) => (
    <Container {...args}>
      <Block label="Full width" />
    </Container>
  ),
};

export const NoPadding: Story = {
  args: { padded: false },
  render: (args) => (
    <Container {...args}>
      <Block label="No horizontal padding" />
    </Container>
  ),
};

export const HomeMarketingContainer: Story = {
  render: () => (
    <Container size="full" padded={false}>
      <ImageBackground
        source={DATE_NIGHT_SPECIAL}
        style={[styles.marketingBanner, { height: BANNER_HEIGHT }]}
        imageStyle={styles.marketingImage}
      >
        <OutlinedText
          fill={Palette.brand}
          stroke={Palette.slate}
          strokeWidth={1.3}
          fontSize={FontSize.xl3}
          boxColor={Palette.white}
          boxOpacity={0.3}
          boxFit="full"
        >
          Home Screen Marketing
        </OutlinedText>
      </ImageBackground>
    </Container>
  ),
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: `${Palette.brand}28`,
    borderRadius: 8,
    padding: Spacing[4],
    alignItems: "center",
  },
  blockLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    opacity: 0.7,
  },
  marketingBanner: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  marketingImage: {
    opacity: 0.5,
  },
});
