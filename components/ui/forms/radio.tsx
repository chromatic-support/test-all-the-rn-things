import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type RadioProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
};

export function Radio({
  label,
  selected,
  onSelect,
  disabled = false,
}: RadioProps) {
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor(
    { light: Palette.gray300, dark: Palette.gray600 },
    "icon"
  );

  return (
    <Pressable
      onPress={onSelect}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{ checked: selected, disabled }}
      style={({ pressed }) => [
        styles.container,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}
    >
      <View
        style={[
          styles.circle,
          { borderColor: selected ? Palette.brand : borderColor },
        ]}
      >
        {selected ? <View style={styles.dot} /> : null}
      </View>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[3],
    minHeight: 44,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Palette.brand,
  },
  label: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
  },
});
