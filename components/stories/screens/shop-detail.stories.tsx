import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { ShopDetail } from '@/components/screens/shop-detail';

const meta: Meta<typeof ShopDetail> = {
  title: 'Screens/ShopDetail',
  component: ShopDetail,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

// Peach Princess — has sale pricing on can + 4-pack, popular flavor
export const PeachPrincess: Story = {
  render: () => (
    <ShopDetail
      flavorId="peach-princess"
      reviews={{ averageRating: 4.6, reviewCount: 214 }}
    />
  ),
};

// Monstera Original — no sale, flagship year-round flavor
export const MonsteraOriginal: Story = {
  render: () => (
    <ShopDetail
      flavorId="monstera-original"
      reviews={{ averageRating: 4.2, reviewCount: 89 }}
    />
  ),
};

// Half Moon — 6-pack on sale only
export const HalfMoon: Story = {
  render: () => (
    <ShopDetail
      flavorId="half-moon"
      reviews={{ averageRating: 4.4, reviewCount: 57 }}
    />
  ),
};

// Date Night Special — premium pricing, limited edition, no sale
export const DateNightSpecial: Story = {
  render: () => (
    <ShopDetail
      flavorId="date-night-special"
      reviews={{ averageRating: 4.9, reviewCount: 42 }}
    />
  ),
};

// Watermelon — seasonal, dairy-free, no reviews yet
export const Watermelon: Story = {
  render: () => (
    <ShopDetail
      flavorId="watermelon"
      reviews={{ averageRating: 4.3, reviewCount: 61 }}
    />
  ),
};

// Bae Root — year-round fan favorite
export const BaeRoot: Story = {
  render: () => (
    <ShopDetail
      flavorId="bae-root"
      reviews={{ averageRating: 4.5, reviewCount: 103 }}
    />
  ),
};

// Chai Constellation — year-round, contains dairy
export const ChaiConstellation: Story = {
  render: () => (
    <ShopDetail
      flavorId="chai-constellation"
      reviews={{ averageRating: 4.7, reviewCount: 138 }}
    />
  ),
};

// Peru Passion — limited edition
export const PeruPassion: Story = {
  render: () => (
    <ShopDetail
      flavorId="peru-passion"
      reviews={{ averageRating: 4.8, reviewCount: 29 }}
    />
  ),
};
