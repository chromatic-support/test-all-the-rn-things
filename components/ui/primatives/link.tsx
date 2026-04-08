import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type LinkProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function Link({ label, onPress, disabled = false }: LinkProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="link"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.link,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing[1],
  },
  label: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
    textDecorationLine: 'underline',
    textDecorationColor: Palette.brand,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.4,
  },
});
