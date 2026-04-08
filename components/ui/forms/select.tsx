import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor(
    { light: Palette.gray300, dark: Palette.gray600 },
    "icon"
  );
  const placeholderColor = useThemeColor(
    { light: Palette.gray400, dark: Palette.gray500 },
    "icon"
  );
  const overlayBackground = useThemeColor(
    { light: Palette.gray900, dark: Palette.black },
    "text"
  );

  const selectedLabel = options.find((o) => o.value === value)?.label ?? null;

  function handleSelect(optValue: string) {
    onChange(optValue);
    setOpen(false);
  }

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        disabled={disabled}
        accessibilityRole="combobox"
        accessibilityLabel={placeholder}
        accessibilityState={{ expanded: open, disabled }}
        style={({ pressed }) => [
          styles.trigger,
          { borderColor, backgroundColor },
          pressed && !disabled ? styles.triggerPressed : null,
          disabled ? styles.disabled : null,
        ]}
      >
        <Text
          style={[
            styles.triggerText,
            { color: selectedLabel ? textColor : placeholderColor },
          ]}
          numberOfLines={1}
        >
          {selectedLabel ?? placeholder}
        </Text>
        <View style={styles.chevron} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: overlayBackground }]}
          onPress={() => setOpen(false)}
          accessibilityRole="button"
          accessibilityLabel="Close"
        />
        <SafeAreaView
          style={[styles.sheet, { backgroundColor }]}
          accessibilityViewIsModal
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item.value)}
                accessibilityRole="menuitem"
                accessibilityLabel={item.label}
                accessibilityState={{ selected: item.value === value }}
                style={({ pressed }) => [
                  styles.option,
                  pressed ? styles.optionPressed : null,
                  item.value === value ? styles.optionSelected : null,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: textColor },
                    item.value === value ? styles.optionTextSelected : null,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            )}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
  },
  triggerPressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  triggerText: {
    flex: 1,
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
  },
  chevron: {
    width: 8,
    height: 8,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: Palette.gray400,
    transform: [{ rotate: "45deg" }, { translateY: -3 }],
    marginLeft: Spacing[2],
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "50%",
    paddingBottom: Spacing[4],
  },
  option: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    minHeight: 44,
    justifyContent: "center",
  },
  optionPressed: {
    backgroundColor: Palette.gray100,
  },
  optionSelected: {
    backgroundColor: Palette.brandLight,
  },
  optionText: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
  },
  optionTextSelected: {
    fontFamily: FontWeight.semibold,
  },
});
