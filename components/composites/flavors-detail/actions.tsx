import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type FlavorActionsProps = {
  onFavorite: () => void;
  onShare: () => void;
  onInShop: () => void;
  isFavorited?: boolean;
};

export function FlavorActions({
  onFavorite,
  onShare,
  onInShop,
  isFavorited = false,
}: FlavorActionsProps) {
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor(
    { light: Palette.gray300, dark: Palette.gray600 },
    "icon",
  );

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onFavorite}
        accessibilityRole="button"
        accessibilityLabel={
          isFavorited ? "Saved to favorites" : "Save to favorites"
        }
        accessibilityState={{ selected: isFavorited }}
        style={({ pressed }) => [
          styles.button,
          styles.secondary,
          { borderColor },
          pressed ? styles.pressed : null,
        ]}
      >
        <MaterialIcons
          name={isFavorited ? "bookmark" : "bookmark-border"}
          size={20}
          color={textColor}
        />
        <Text style={[styles.label, { color: textColor }]}>
          {isFavorited ? "Saved" : "Save"}
        </Text>
      </Pressable>

      <Pressable
        onPress={onShare}
        accessibilityRole="button"
        accessibilityLabel="Share"
        style={({ pressed }) => [
          styles.button,
          styles.secondary,
          { borderColor },
          pressed ? styles.pressed : null,
        ]}
      >
        <MaterialIcons name="share" size={20} color={textColor} />
        <Text style={[styles.label, { color: textColor }]}>Share</Text>
      </Pressable>

      <Pressable
        onPress={onInShop}
        accessibilityRole="button"
        accessibilityLabel="Shop this flavor"
        style={({ pressed }) => [
          styles.button,
          styles.primary,
          pressed ? styles.pressed : null,
        ]}
      >
        <MaterialIcons name="storefront" size={20} color={textColor} />
        <Text style={[styles.label, { color: textColor }]}>Shop</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: Spacing[3],
  },
  button: {
    flex: 1,
    minHeight: 56,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing[1],
    paddingTop: Spacing[1],
  },
  primary: {
    backgroundColor: Palette.brand,
  },
  secondary: {
    borderWidth: 1.5,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.semibold,
    textAlign: "center",
    includeFontPadding: false,
  },
});
