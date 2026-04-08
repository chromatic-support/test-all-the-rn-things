import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';

export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
};

const VARIANT_CONFIG: Record<BadgeVariant, { backgroundColor: string }> = {
  default: { backgroundColor: Palette.gray200 },
  success: { backgroundColor: Palette.mint },
  error: { backgroundColor: Palette.coral },
  warning: { backgroundColor: Palette.lemon },
  info: { backgroundColor: Palette.sky },
};

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const { backgroundColor } = VARIANT_CONFIG[variant];

  return (
    <View
      style={[styles.badge, { backgroundColor }]}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing[2],
    paddingVertical: 2,
    borderRadius: 99,
  },
  label: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.medium,
    color: Palette.gray800,
  },
});
