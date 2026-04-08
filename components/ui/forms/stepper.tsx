import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  accessibilityLabel?: string;
};

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  accessibilityLabel = "Stepper",
}: StepperProps) {
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor(
    { light: Palette.brand, dark: Palette.brandLight },
    "tint"
  );

  const canDecrement = !disabled && value > min;
  const canIncrement = !disabled && value < max;

  function decrement() {
    if (canDecrement) onChange(value - step);
  }

  function increment() {
    if (canIncrement) onChange(value + step);
  }

  return (
    <View
      style={[styles.container, { borderColor }]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
    >
      <Pressable
        onPress={decrement}
        disabled={!canDecrement}
        accessibilityRole="button"
        accessibilityLabel="Decrease"
        accessibilityState={{ disabled: !canDecrement }}
        style={({ pressed }) => [
          styles.button,
          pressed && canDecrement ? styles.buttonPressed : null,
          !canDecrement ? styles.buttonDisabled : null,
        ]}
      >
        <Text style={[styles.buttonIcon, { color: textColor }]}>−</Text>
      </Pressable>

      <Text style={[styles.value, { color: textColor }]}>{value}</Text>

      <Pressable
        onPress={increment}
        disabled={!canIncrement}
        accessibilityRole="button"
        accessibilityLabel="Increase"
        accessibilityState={{ disabled: !canIncrement }}
        style={({ pressed }) => [
          styles.button,
          pressed && canIncrement ? styles.buttonPressed : null,
          !canIncrement ? styles.buttonDisabled : null,
        ]}
      >
        <Text style={[styles.buttonIcon, { color: textColor }]}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Palette.brandLight,
  },
  buttonPressed: {
    backgroundColor: Palette.brand,
  },
  buttonDisabled: {
    opacity: 0.35,
  },
  buttonIcon: {
    fontSize: FontSize.xl,
    fontFamily: FontWeight.normal,
  },
  value: {
    minWidth: Spacing[8],
    textAlign: "center",
    fontSize: FontSize.base,
    fontFamily: FontWeight.semibold,
    paddingHorizontal: Spacing[4],
  },
});
