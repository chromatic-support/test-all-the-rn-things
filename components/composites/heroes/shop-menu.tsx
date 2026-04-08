import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// shared component
import { SearchInput } from '@/components/ui/forms/search-input';
// shared component
import { Tag } from '@/components/ui/primatives/tag';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type ShopMenuCategoryItem = {
  id: string;
  label: string;
};

export type ShopMenuHeroProps = {
  title?: string;
  searchValue: string;
  onSearchChange: (text: string) => void;
  onSearchClear?: () => void;
  categories: ShopMenuCategoryItem[];
  activeCategoryId?: string;
  onCategoryPress: (id: string) => void;
};

export function ShopMenuHero({
  title = 'Shop',
  searchValue,
  onSearchChange,
  onSearchClear,
  categories,
  activeCategoryId,
  onCategoryPress,
}: ShopMenuHeroProps) {
  const textColor = useThemeColor({}, 'text');
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <SearchInput
        value={searchValue}
        onChangeText={onSearchChange}
        placeholder="Search products"
        onClear={onSearchClear}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {categories.map((category) => (
          <Tag
            key={category.id}
            label={category.label}
            selected={category.id === activeCategoryId}
            onPress={() => onCategoryPress(category.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.white,
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[3],
    gap: Spacing[3],
  },
  title: {
    fontSize: FontSize.xl2,
    fontFamily: FontWeight.bold,
    lineHeight: FontSize.xl2 * 1.4,
    textAlign: 'center',
  },
  categories: {
    flexDirection: 'row',
    gap: Spacing[2],
  },
});
