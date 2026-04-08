import React from "react";
import { StyleSheet, Text, View } from "react-native";

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type FormFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ label, hint, error, children }: FormFieldProps) {
  const textColor = useThemeColor({}, "text");
  const hintColor = useThemeColor(
    { light: Palette.gray500, dark: Palette.gray400 },
    "icon"
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      {children}
      {hint && !error ? (
        <Text style={[styles.hint, { color: hintColor }]}>{hint}</Text>
      ) : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[2],
  },
  label: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.semibold,
  },
  hint: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  error: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    color: Palette.coralDark,
  },
});
