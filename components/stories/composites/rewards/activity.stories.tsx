import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';

// shared component
import { RewardsActivity, type RewardActivityEntry } from '@/components/composites/rewards/activity';
// mock data
import mockUser from '@/data/mocks/user';

const HISTORY: RewardActivityEntry[] = mockUser.rewards.history as RewardActivityEntry[];

const meta: Meta<typeof RewardsActivity> = {
  title: 'Composites/Rewards/Activity',
  component: RewardsActivity,
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

export const Default: Story = {
  args: {
    history: HISTORY,
  },
};

export const OnlyEarned: Story = {
  args: {
    history: HISTORY.filter((entry) => entry.type === 'earned'),
  },
};

export const SingleEntry: Story = {
  args: {
    history: [HISTORY[0]],
  },
};

export const Empty: Story = {
  args: {
    history: [],
  },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
});
