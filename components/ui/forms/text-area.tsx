import React from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type TextAreaProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  numberOfLines?: number;
  maxLength?: number;
  accessibilityLabel: string;
  editable?: boolean;
} & Pick<TextInputProps, "returnKeyType" | "autoCapitalize" | "autoCorrect">;

export function TextArea({
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
  maxLength,
  accessibilityLabel,
  editable = true,
  ...rest
}: TextAreaProps) {
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor(
    { light: Palette.gray300, dark: Palette.gray600 },
    "icon"
  );
  const backgroundColor = useThemeColor({}, "background");
  const placeholderColor = useThemeColor(
    { light: Palette.gray400, dark: Palette.gray500 },
    "icon"
  );

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      numberOfLines={numberOfLines}
      maxLength={maxLength}
      editable={editable}
      multiline
      textAlignVertical="top"
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.input,
        {
          color: textColor,
          borderColor,
          backgroundColor,
          minHeight: numberOfLines * 24 + Spacing[3] * 2,
        },
        !editable ? styles.disabled : null,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[3],
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
  },
  disabled: {
    opacity: 0.5,
  },
});
