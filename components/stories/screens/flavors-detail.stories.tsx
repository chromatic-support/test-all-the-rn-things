import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { FlavorsDetail } from '@/components/screens/flavors-detail';
import flavorsData from '@/data/flavors.json';

const [
  baeRoot,
  chaiConstellation,
  dateNightSpecial,
  halfMoon,
  monsteraOriginal,
  peachPrincess,
  peruPassion,
  watermelon,
] = flavorsData;

const meta: Meta<typeof FlavorsDetail> = {
  title: 'Screens/FlavorsDetail',
  component: FlavorsDetail,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const BaeRoot: Story = {
  args: { flavor: baeRoot },
};

export const ChaiConstellation: Story = {
  args: { flavor: chaiConstellation },
};

export const DateNightSpecial: Story = {
  args: { flavor: dateNightSpecial },
};

export const HalfMoon: Story = {
  args: { flavor: halfMoon },
};

export const MonsteraOriginal: Story = {
  args: { flavor: monsteraOriginal },
};

export const PeachPrincess: Story = {
  args: { flavor: peachPrincess },
};

export const PeruPassion: Story = {
  args: { flavor: peruPassion },
};

export const Watermelon: Story = {
  args: { flavor: watermelon },
};
