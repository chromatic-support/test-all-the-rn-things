import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const textColor = useThemeColor({}, "text");

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        variant === "primary" ? styles.primary : styles.secondary,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: Palette.brand,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Palette.brand,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.semibold,
  },
});
