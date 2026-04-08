import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type BreadcrumbItem = {
  label: string;
  onPress?: () => void;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: string;
};

export function Breadcrumbs({ items, separator = '/' }: BreadcrumbsProps) {
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      accessibilityRole="none"
      accessibilityLabel="Breadcrumb navigation"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <View key={index} style={styles.item}>
            {item.onPress && !isLast ? (
              <Pressable
                onPress={item.onPress}
                accessibilityRole="link"
                accessibilityLabel={item.label}
                style={({ pressed }) => pressed ? styles.pressed : null}
              >
                <Text style={[styles.link, { color: Palette.brand }]}>
                  {item.label}
                </Text>
              </Pressable>
            ) : (
              <Text
                style={[styles.current, { color: isLast ? textColor : Palette.brand }]}
                accessibilityRole="text"
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </Text>
            )}
            {!isLast && (
              <Text style={[styles.separator, { color: iconColor }]}>
                {separator}
              </Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
    flexWrap: 'nowrap',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
  },
  current: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.semibold,
  },
  separator: {
    fontSize: FontSize.sm,
    marginHorizontal: Spacing[2],
  },
  pressed: {
    opacity: 0.7,
  },
});
