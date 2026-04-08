import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

// shared component
import { OutlinedText } from "@/components/ui/primatives/typography/outlined-text";
// shared theme constants
import { FontSize, FontWeight, Palette } from "@/constants/theme";

const meta: Meta<typeof OutlinedText> = {
  title: "Components/Primatives/Typography/OutlinedText",
  component: OutlinedText,
  args: {
    children: "Home Screen Marketing",
    fontSize: FontSize.xl2,
    fill: Palette.white,
    stroke: Palette.brand,
    strokeWidth: 1,
    textAnchor: "middle",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

// Fill

export const FillBrand: Story = {
  args: { fill: Palette.brand, stroke: Palette.slate },
};

export const FillSlate: Story = {
  args: { fill: Palette.slate },
};

export const FillHollow: Story = {
  args: { fill: "none", strokeWidth: 2 },
};

export const FillColors: Story = {
  render: () => (
    <View style={{ padding: 16, gap: 16, backgroundColor: Palette.gray100 }}>
      <OutlinedText fill={Palette.brand}>Brand</OutlinedText>
      <OutlinedText fill={Palette.mint}>Mint</OutlinedText>
      <OutlinedText fill={Palette.lilac}>Lilac</OutlinedText>
      <OutlinedText fill={Palette.sky}>Sky</OutlinedText>
      <OutlinedText fill={Palette.lemon}>Lemon</OutlinedText>
    </View>
  ),
};

// Weight

export const Weights: Story = {
  render: () => (
    <View style={{ padding: 16, gap: 16, backgroundColor: Palette.slate }}>
      <OutlinedText fontFamily={FontWeight.light} fill={Palette.white}>
        Light
      </OutlinedText>
      <OutlinedText fontFamily={FontWeight.normal} fill={Palette.white}>
        Normal
      </OutlinedText>
      <OutlinedText fontFamily={FontWeight.medium} fill={Palette.white}>
        Medium
      </OutlinedText>
      <OutlinedText fontFamily={FontWeight.semibold} fill={Palette.white}>
        Semibold
      </OutlinedText>
      <OutlinedText fontFamily={FontWeight.bold} fill={Palette.white}>
        Bold
      </OutlinedText>
    </View>
  ),
};

// Box

export const BoxFullWidth: Story = {
  args: { boxColor: Palette.brand },
};

export const BoxFullWidthSlate: Story = {
  args: { boxColor: Palette.slate },
};

export const BoxTextFit: Story = {
  args: { boxColor: Palette.brand, boxFit: "text", boxOpacity: 0.5 },
};

export const BoxTextFitSlate: Story = {
  args: { boxColor: Palette.slate, boxFit: "text", boxOpacity: 1 },
};
