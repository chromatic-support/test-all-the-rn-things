import React from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type TextFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  accessibilityLabel: string;
  editable?: boolean;
} & Pick<
  TextInputProps,
  | "keyboardType"
  | "autoComplete"
  | "autoCapitalize"
  | "autoCorrect"
  | "secureTextEntry"
  | "returnKeyType"
  | "textContentType"
  | "onSubmitEditing"
>;

export function TextField({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
  editable = true,
  ...rest
}: TextFieldProps) {
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
      editable={editable}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.input,
        { color: textColor, borderColor, backgroundColor },
        !editable ? styles.disabled : null,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
  },
  disabled: {
    opacity: 0.5,
  },
});
