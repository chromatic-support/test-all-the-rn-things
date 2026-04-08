import type { Meta, StoryObj } from "@storybook/react-native";

// shared component
import { AboutBrandHero } from "@/components/composites/heroes/about-brand";

const meta: Meta<typeof AboutBrandHero> = {
  title: "Composites/Heroes/AboutBrand",
  component: AboutBrandHero,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  args: { tagline: "About Us" },
};

export const NoTagline: Story = {
  args: { tagline: undefined },
};

export const CustomTagline: Story = {
  args: { tagline: "Crafted With Love" },
};
