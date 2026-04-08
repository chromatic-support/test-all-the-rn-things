import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type ShopItem = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  tag?: string;
  priceRange: { min: number; max: number };
  onPress: () => void;
};

export type ShopItemsProps = {
  items: ShopItem[];
};

function formatPriceRange(min: number, max: number): string {
  return `$${min.toFixed(2)} – $${max.toFixed(2)}`;
}

export function ShopItems({ items }: ShopItemsProps) {
  const textColor = useThemeColor({}, "text");
  const subtleColor = useThemeColor(
    { light: Palette.gray500, dark: Palette.gray400 },
    "icon",
  );
  const cardBg = useThemeColor(
    { light: Palette.gray100, dark: Palette.gray800 },
    "background",
  );

  return (
    <FlatList
      data={items}
      numColumns={3}
      scrollEnabled={false}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          onPress={item.onPress}
          accessibilityRole="button"
          accessibilityLabel={item.name}
          style={({ pressed }) => [
            styles.item,
            { backgroundColor: cardBg },
            pressed ? styles.pressed : null,
          ]}
        >
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
              accessible={false}
            />
            {item.tag ? (
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.itemContent}>
            <Text style={[styles.name, { color: textColor }]} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={[styles.priceRange, { color: subtleColor }]}>
              {formatPriceRange(item.priceRange.min, item.priceRange.max)}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing[2],
  },
  row: {
    gap: Spacing[2],
  },
  item: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 110,
  },
  itemContent: {
    paddingHorizontal: Spacing[2],
    paddingBottom: Spacing[2],
    paddingTop: Spacing[1],
    gap: 1,
  },
  name: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
    textAlign: "center",
  },
  priceRange: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.normal,
    textAlign: "center",
  },
  imageContainer: {
    position: "relative",
  },
  tagBadge: {
    position: "absolute",
    bottom: Spacing[1],
    right: Spacing[1],
    backgroundColor: Palette.gray900,
    paddingHorizontal: Spacing[1],
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.medium,
    color: Palette.white,
  },
  pressed: {
    opacity: 0.75,
  },
});
