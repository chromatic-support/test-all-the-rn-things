import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { useArgs } from "storybook/preview-api";

// shared component
import type { ImageProps } from "@/components/ui/primatives/image";
import { Image } from "@/components/ui/primatives/image";

// local asset used for deterministic Chromatic captures
const THREE_CANS = require("@/assets/img/marketing/three-cans.png") as number;

const meta: Meta<typeof Image> = {
  title: "Components/Primatives/Image",
  component: Image,
  args: {
    source: THREE_CANS,
    width: 320,
    height: 200,
    accessibilityLabel: "Three cans",
    resizeMode: "cover",
    borderRadius: 0,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Rounded: Story = {
  args: { borderRadius: 12 },
};

export const Circle: Story = {
  args: {
    width: 80,
    height: 80,
    borderRadius: 40,
    accessibilityLabel: "Avatar",
  },
};

export const Contain: Story = {
  args: { resizeMode: "contain" },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ padding: 16, gap: 12 }}>
      <Image
        source={THREE_CANS}
        width={320}
        height={160}
        accessibilityLabel="Cover"
        resizeMode="cover"
        borderRadius={8}
      />
      <Image
        source={THREE_CANS}
        width={80}
        height={80}
        accessibilityLabel="Avatar"
        borderRadius={40}
      />
    </View>
  ),
};

export const Hero: Story = {
  args: { variant: "hero", height: 300, isFavorited: false },
  render: function Render(args: ImageProps) {
    const [{ isFavorited }, updateArgs] = useArgs<ImageProps>();
    return (
      <Image
        {...args}
        isFavorited={isFavorited}
        onFavorite={() => updateArgs({ isFavorited: !isFavorited })}
      />
    );
  },
};

export const HeroFavorited: Story = {
  args: { variant: "hero", height: 300, isFavorited: true },
  render: function Render(args: ImageProps) {
    const [{ isFavorited }, updateArgs] = useArgs<ImageProps>();
    return (
      <Image
        {...args}
        isFavorited={isFavorited}
        onFavorite={() => updateArgs({ isFavorited: !isFavorited })}
      />
    );
  },
};

export const Promo: Story = {
  args: { variant: "promo", height: 240, callout: "20% off" },
};

export const PromoTopRight: Story = {
  args: { variant: "promo", height: 240, callout: "Fan Favorite", calloutPosition: "top-right" },
};

export const PromoBottomLeft: Story = {
  args: { variant: "promo", height: 240, callout: "On Sale", calloutPosition: "bottom-left" },
};

export const PromoBottomRight: Story = {
  args: { variant: "promo", height: 240, callout: "Limited Edition", calloutPosition: "bottom-right" },
};
