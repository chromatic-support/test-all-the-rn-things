import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, LineHeight } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type TextVariant = 'body' | 'caption' | 'label';

export type TextProps = {
  children: React.ReactNode;
  variant?: TextVariant;
  numberOfLines?: number;
};

export function Text({ children, variant = 'body', numberOfLines }: TextProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <RNText
      style={[styles[variant], { color: textColor }]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
    lineHeight: FontSize.base * LineHeight.normal,
  },
  caption: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.normal,
    lineHeight: FontSize.xs * LineHeight.normal,
    opacity: 0.7,
  },
  label: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
    lineHeight: FontSize.sm * LineHeight.normal,
  },
});
