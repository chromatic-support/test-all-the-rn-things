import { StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { RewardsScreen } from '@/components/ui/layout/screen-templates/rewards';
// shared theme constants
import { FontSize, FontWeight, Palette } from '@/constants/theme';

const meta: Meta<typeof RewardsScreen> = {
  title: 'Components/Layout/Screen Templates/Rewards',
  component: RewardsScreen,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => (
    <RewardsScreen
      balance={
        <View style={styles.balance}>
          <Text style={styles.label}>points balance</Text>
        </View>
      }
      rewardsOffers={
        <View style={styles.section}>
          <Text style={styles.label}>rewards / offers</Text>
        </View>
      }
      activityHistory={
        <View style={styles.section}>
          <Text style={styles.label}>activity history</Text>
        </View>
      }
    />
  ),
};

const styles = StyleSheet.create({
  balance: {
    width: '100%',
    height: 160,
    backgroundColor: `${Palette.brand}28`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    minHeight: 160,
    backgroundColor: `${Palette.brand}18`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  label: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.medium,
    color: Palette.gray500,
  },
});
