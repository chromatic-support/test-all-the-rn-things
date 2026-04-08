import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

// shared theme constants
import { Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type CardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
};

export function Card({ children, onPress, accessibilityLabel }: CardProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor(
    { light: Palette.gray200, dark: Palette.gray700 },
    'icon'
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor, borderColor },
          pressed ? styles.pressed : null,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor, borderColor }]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing[4],
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  pressed: {
    opacity: 0.85,
  },
});
