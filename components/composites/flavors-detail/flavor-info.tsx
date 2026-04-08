import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared component
import { Tag } from '@/components/ui/primatives/tag';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type FlavorInfoProps = {
  name: string;
  description: string;
  tags?: string[];
  calories?: number;
};

export function FlavorInfo({ name, description, tags = [], calories }: FlavorInfoProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleColor = useThemeColor(
    { light: Palette.gray500, dark: Palette.gray400 },
    'icon'
  );

  return (
    <View>
      <Text style={[styles.name, { color: textColor }]}>{name}</Text>
      {calories !== undefined ? (
        <Text style={[styles.calories, { color: subtleColor }]}>{calories} cal</Text>
      ) : null}
      <Spacer size={3} />
      <Text style={[styles.description, { color: subtleColor }]}>{description}</Text>
      {tags.length > 0 ? (
        <>
          <Spacer size={4} />
          <View style={styles.tags}>
            {tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: FontSize.xl2,
    fontFamily: FontWeight.bold,
  },
  calories: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    marginTop: Spacing[1],
  },
  description: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
    lineHeight: FontSize.base * 1.6,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
  },
});
