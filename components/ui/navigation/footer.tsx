import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type FooterLink = {
  label: string;
  onPress: () => void;
};

export type FooterProps = {
  links?: FooterLink[];
  copyright?: string;
};

export function Footer({ links = [], copyright }: FooterProps) {
  const borderColor = useThemeColor({ light: '#e5e7eb', dark: '#374151' }, 'icon');
  const subtleText = useThemeColor({}, 'icon');

  return (
    <View style={[styles.container, { borderTopColor: borderColor }]}>
      {links.length > 0 && (
        <View style={styles.links}>
          {links.map((link, index) => (
            <Pressable
              key={index}
              onPress={link.onPress}
              accessibilityRole="link"
              accessibilityLabel={link.label}
              style={({ pressed }) => pressed ? styles.pressed : null}
            >
              <Text style={[styles.linkText, { color: Palette.brand }]}>
                {link.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
      {copyright ? (
        <Text style={[styles.copyright, { color: subtleText }]}>{copyright}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    gap: Spacing[3],
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing[4],
  },
  linkText: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
  },
  copyright: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.normal,
  },
  pressed: {
    opacity: 0.7,
  },
});
