import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
}: CheckboxProps) {
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor(
    { light: Palette.gray300, dark: Palette.gray600 },
    "icon"
  );

  return (
    <Pressable
      onPress={() => onChange(!checked)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked, disabled }}
      style={({ pressed }) => [
        styles.container,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}
    >
      <View
        style={[
          styles.box,
          { borderColor: checked ? Palette.brand : borderColor },
          checked ? styles.boxChecked : null,
        ]}
      >
        {checked ? <View style={styles.checkmark} /> : null}
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
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: {
    backgroundColor: Palette.brand,
  },
  checkmark: {
    width: 10,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: Palette.white,
    transform: [{ rotate: "-45deg" }, { translateY: -1 }],
  },
  label: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
  },
});
