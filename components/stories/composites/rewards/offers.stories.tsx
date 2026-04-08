import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';

// shared component
import { RewardsOffers, type RewardOffer } from '@/components/composites/rewards/offers';
// data
import rewardsData from '@/data/rewards.json';

const OFFERS: RewardOffer[] = rewardsData;

const meta: Meta<typeof RewardsOffers> = {
  title: 'Composites/Rewards/Offers',
  component: RewardsOffers,
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

// 50 pts — no rewards unlocked yet
export const NoneAvailable: Story = {
  args: {
    offers: OFFERS,
    pointsBalance: 50,
    onRedeem: () => {},
  },
};

// 100 pts — free can unlocked
export const CanRedeemCan: Story = {
  args: {
    offers: OFFERS,
    pointsBalance: 100,
    onRedeem: () => {},
  },
};

// 350 pts — free can and 4-pack unlocked
export const CanRedeemFourPack: Story = {
  args: {
    offers: OFFERS,
    pointsBalance: 350,
    onRedeem: () => {},
  },
};

// 500 pts — all rewards unlocked
export const AllAvailable: Story = {
  args: {
    offers: OFFERS,
    pointsBalance: 500,
    onRedeem: () => {},
  },
};

// mockUser's current balance (340 pts) — can and 4-pack unlocked, 6-pack locked
export const MockUserBalance: Story = {
  args: {
    offers: OFFERS,
    pointsBalance: 340,
    onRedeem: () => {},
  },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
});
