import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared component
import { Icon } from '@/components/ui/primatives/icon';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type CheckoutHeroProps = {
  title?: string;
  subtitle?: string;
};

export function CheckoutHero({ title = 'Checkout', subtitle }: CheckoutHeroProps) {
  const textColor = useThemeColor({}, 'text');
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Icon name="shopping-cart" size={FontSize.xl2} color={Palette.brand} />
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      </View>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: textColor }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.white,
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[3],
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  title: {
    fontSize: FontSize.xl2,
    fontFamily: FontWeight.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
    lineHeight: FontSize.base * 1.5,
    textAlign: 'center',
    opacity: 0.7,
    marginTop: Spacing[1],
  },
});
