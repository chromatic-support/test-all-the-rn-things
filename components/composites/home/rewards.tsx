import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared component
import { Link } from '@/components/ui/primatives/link';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type HomeRewardsProps = {
  pointsBalance: number;
  rewardThreshold: number;
  onRedeem: () => void;
};

export function HomeRewards({ pointsBalance, rewardThreshold, onRedeem }: HomeRewardsProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleColor = useThemeColor({ light: Palette.gray500, dark: Palette.gray400 }, 'icon');
  const trackColor = useThemeColor({ light: Palette.gray200, dark: Palette.gray700 }, 'icon');
  const cardBg = useThemeColor({ light: Palette.gray100, dark: Palette.gray800 }, 'background');

  const hasReward = pointsBalance >= rewardThreshold;
  const progress = Math.min(pointsBalance / rewardThreshold, 1);
  const pointsToGo = rewardThreshold - pointsBalance;

  return (
    <View style={[styles.container, { backgroundColor: cardBg }]}>
      <Text style={[styles.heading, { color: textColor }]}>My Rewards</Text>
      <View style={styles.header}>
        <Text style={[styles.balance, { color: textColor }]}>
          {pointsBalance.toLocaleString()} pts
        </Text>
        {hasReward ? (
          <Link label="Redeem your reward" onPress={onRedeem} />
        ) : (
          <Text style={[styles.toGo, { color: subtleColor }]}>
            {pointsToGo} pts to next reward
          </Text>
        )}
      </View>
      <View style={[styles.track, { backgroundColor: trackColor }]}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: Spacing[4],
    gap: Spacing[3],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balance: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.bold,
  },
  toGo: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  heading: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.semibold,
    textAlign: 'center',
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Palette.brand,
    borderRadius: 3,
  },
});
