import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';

// shared component
import { HomeRewards } from '@/components/composites/home/rewards';

const meta: Meta<typeof HomeRewards> = {
  title: 'Composites/Home/Rewards',
  component: HomeRewards,
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

export const BelowThreshold: Story = {
  args: {
    pointsBalance: 340,
    rewardThreshold: 500,
    onRedeem: () => {},
  },
};

export const NearThreshold: Story = {
  args: {
    pointsBalance: 460,
    rewardThreshold: 500,
    onRedeem: () => {},
  },
};

export const RewardReady: Story = {
  args: {
    pointsBalance: 500,
    rewardThreshold: 500,
    onRedeem: () => {},
  },
};

export const HighBalance: Story = {
  args: {
    pointsBalance: 1250,
    rewardThreshold: 500,
    onRedeem: () => {},
  },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
});
