import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// shared component
import { Link } from '@/components/ui/primatives/link';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type ReviewsProps = {
  averageRating: number;
  reviewCount: number;
  onSeeAll?: () => void;
};

export function Reviews({ averageRating, reviewCount, onSeeAll }: ReviewsProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleColor = useThemeColor({ light: Palette.gray500, dark: Palette.gray400 }, 'icon');

  const hasReviews = reviewCount > 0;
  const reviewLabel = reviewCount === 1 ? 'review' : 'reviews';

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: textColor }]}>Reviews</Text>
      {hasReviews ? (
        <>
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={20} color={Palette.brand} />
            <Text style={[styles.rating, { color: textColor }]}>
              {averageRating.toFixed(1)}
            </Text>
          </View>
          <Text style={[styles.count, { color: subtleColor }]}>
            {reviewCount.toLocaleString()} {reviewLabel}
          </Text>
          {onSeeAll ? <View><Link label="See all" onPress={onSeeAll} /></View> : null}
        </>
      ) : (
        <Text style={[styles.empty, { color: subtleColor }]}>No reviews yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[1],
    alignItems: 'center',
  },
  heading: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
    marginBottom: Spacing[1],
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1],
  },
  rating: {
    fontSize: FontSize.xl,
    fontFamily: FontWeight.bold,
  },
  count: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    textAlign: 'center',
  },
  empty: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    textAlign: 'center',
  },
});
