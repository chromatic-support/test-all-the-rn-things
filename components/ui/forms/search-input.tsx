import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

// shared theme constants
import { FontSize, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
};

export function SearchInput({
  value,
  onChangeText,
  placeholder = "Search",
  onClear,
}: SearchInputProps) {
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor(
    { light: Palette.gray200, dark: Palette.gray700 },
    "icon"
  );
  const backgroundColor = useThemeColor(
    { light: Palette.gray100, dark: Palette.gray800 },
    "background"
  );
  const placeholderColor = useThemeColor(
    { light: Palette.gray400, dark: Palette.gray500 },
    "icon"
  );

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="never"
        accessibilityRole="search"
        accessibilityLabel={placeholder}
        style={[styles.input, { color: textColor }]}
      />
      {value.length > 0 && onClear ? (
        <Pressable
          onPress={onClear}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={({ pressed }) => [
            styles.clearButton,
            pressed ? styles.clearPressed : null,
          ]}
        >
          <View style={styles.clearIcon}>
            <View style={[styles.clearLine, styles.clearLine1]} />
            <View style={[styles.clearLine, styles.clearLine2]} />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 44,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: Spacing[3],
    gap: Spacing[2],
  },
  input: {
    flex: 1,
    fontSize: FontSize.base,
    paddingVertical: Spacing[2],
  },
  clearButton: {
    padding: Spacing[1],
  },
  clearPressed: {
    opacity: 0.6,
  },
  clearIcon: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  clearLine: {
    position: "absolute",
    width: 12,
    height: 1.5,
    backgroundColor: Palette.gray400,
    borderRadius: 1,
  },
  clearLine1: {
    transform: [{ rotate: "45deg" }],
  },
  clearLine2: {
    transform: [{ rotate: "-45deg" }],
  },
});
