import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type ToggleProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
};

export function Toggle({
  label,
  value,
  onValueChange,
  disabled = false,
}: ToggleProps) {
  const textColor = useThemeColor({}, "text");

  return (
    <View
      style={[styles.container, disabled ? styles.disabled : null]}
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value, disabled }}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: Palette.gray300, true: Palette.brand }}
        thumbColor={Palette.white}
        ios_backgroundColor={Palette.gray300}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
    gap: Spacing[3],
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    flex: 1,
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
  },
});
