import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// shared component
import { SearchInput } from "@/components/ui/forms/search-input";
// shared component
import { Tag } from "@/components/ui/primatives/tag";
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type MapFilterItem = {
  id: string;
  label: string;
};

export type MapFiltersHeroProps = {
  title?: string;
  searchValue: string;
  onSearchChange: (text: string) => void;
  onSearchClear?: () => void;
  filters: MapFilterItem[];
  activeFilterId?: string;
  onFilterPress: (id: string) => void;
};

export function MapFiltersHero({
  title = "Find Monstera Near You",
  searchValue,
  onSearchChange,
  onSearchClear,
  filters,
  activeFilterId,
  onFilterPress,
}: MapFiltersHeroProps) {
  const textColor = useThemeColor({}, "text");
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <SearchInput
        value={searchValue}
        onChangeText={onSearchChange}
        placeholder="Search locations"
        onClear={onSearchClear}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {filters.map((filter) => (
          <Tag
            key={filter.id}
            label={filter.label}
            selected={filter.id === activeFilterId}
            onPress={() => onFilterPress(filter.id)}
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
    textAlign: "center",
  },
  filters: {
    flexDirection: "row",
    gap: Spacing[2],
  },
});
