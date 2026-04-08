import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type RewardsHeroProps = {
  title?: string;
  points?: number;
  pointsLabel?: string;
};

export function RewardsHero({
  title = 'Rewards',
  points = 0,
  pointsLabel = 'points',
}: RewardsHeroProps) {
  const textColor = useThemeColor({}, 'text');
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <View style={styles.balance}>
        <Text style={styles.points}>{points.toLocaleString()}</Text>
        <Text style={styles.pointsLabel}>{pointsLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.brand,
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[6],
    alignItems: 'center',
    gap: Spacing[4],
  },
  title: {
    fontSize: FontSize.xl2,
    fontFamily: FontWeight.bold,
    lineHeight: FontSize.xl2 * 1.4,
    textAlign: 'center',
    color: Palette.white,
  },
  balance: {
    alignItems: 'center',
    gap: Spacing[1],
  },
  points: {
    fontSize: FontSize.xl5,
    fontFamily: FontWeight.bold,
    color: Palette.white,
    lineHeight: FontSize.xl5 * 1.2,
  },
  pointsLabel: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.medium,
    color: Palette.white,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
