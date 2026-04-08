import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared component
import { Button } from '@/components/ui/primatives/button';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type RewardOffer = {
  id: string;
  threshold: number;
  label: string;
  description: string;
};

export type RewardsOffersProps = {
  offers: RewardOffer[];
  pointsBalance: number;
  onRedeem: (offerId: string) => void;
};

export function RewardsOffers({ offers, pointsBalance, onRedeem }: RewardsOffersProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleColor = useThemeColor({ light: Palette.gray500, dark: Palette.gray400 }, 'icon');
  const cardBg = useThemeColor({ light: Palette.gray100, dark: Palette.gray800 }, 'background');

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: textColor }]}>Available Rewards</Text>
      <View style={styles.list}>
        {offers.map((offer) => {
          const isAvailable = pointsBalance >= offer.threshold;
          const pointsNeeded = offer.threshold - pointsBalance;
          return (
            <View key={offer.id} style={[styles.card, { backgroundColor: cardBg }]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.label, { color: textColor }]}>{offer.label}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{offer.threshold.toLocaleString()} pts</Text>
                </View>
              </View>
              <Text style={[styles.description, { color: subtleColor }]}>
                {offer.description}
              </Text>
              {isAvailable ? (
                <Button label="Redeem" onPress={() => onRedeem(offer.id)} />
              ) : (
                <Text style={[styles.locked, { color: subtleColor }]}>
                  {pointsNeeded.toLocaleString()} more pts needed
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[3],
  },
  heading: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.semibold,
  },
  list: {
    gap: Spacing[3],
  },
  card: {
    borderRadius: 12,
    padding: Spacing[4],
    gap: Spacing[2],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.bold,
  },
  badge: {
    backgroundColor: Palette.brand,
    paddingHorizontal: Spacing[2],
    paddingVertical: Spacing[1],
    borderRadius: 4,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.semibold,
    color: Palette.gray900,
  },
  description: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    lineHeight: FontSize.sm * 1.5,
  },
  locked: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
});
