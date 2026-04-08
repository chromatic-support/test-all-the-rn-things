import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type ContactHeroProps = {
  title?: string;
};

export function ContactHero({ title = 'Contact' }: ContactHeroProps) {
  const textColor = useThemeColor({}, 'text');
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
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
  title: {
    fontSize: FontSize.xl2,
    fontFamily: FontWeight.bold,
    lineHeight: FontSize.xl2 * 1.4,
    textAlign: 'center',
  },
});
