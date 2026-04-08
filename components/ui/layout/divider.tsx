import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type DividerProps = {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
};

export function Divider({ label, orientation = 'horizontal' }: DividerProps) {
  const borderColor = useThemeColor(
    { light: Palette.gray200, dark: Palette.gray700 },
    'icon'
  );
  const textColor = useThemeColor({}, 'text');

  if (orientation === 'vertical') {
    return <View style={[styles.vertical, { borderLeftColor: borderColor }]} />;
  }

  if (label) {
    return (
      <View style={styles.row}>
        <View style={[styles.line, { borderBottomColor: borderColor }]} />
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        <View style={[styles.line, { borderBottomColor: borderColor }]} />
      </View>
    );
  }

  return <View style={[styles.horizontal, { borderBottomColor: borderColor }]} />;
}

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  vertical: {
    alignSelf: 'stretch',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  line: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.normal,
    opacity: 0.6,
  },
});
