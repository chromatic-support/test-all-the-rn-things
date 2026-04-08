import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type TagProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onDismiss?: () => void;
  disabled?: boolean;
};

export function Tag({
  label,
  selected = false,
  onPress,
  onDismiss,
  disabled = false,
}: TagProps) {
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor(
    { light: Palette.gray300, dark: Palette.gray600 },
    'icon'
  );

  const content = (
    <>
      <Text
        style={[
          styles.label,
          { color: textColor },
          selected ? styles.labelSelected : null,
        ]}
      >
        {label}
      </Text>
      {onDismiss ? (
        <Pressable
          onPress={onDismiss}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${label}`}
          hitSlop={4}
          style={({ pressed }) => [pressed ? styles.pressed : null]}
        >
          <MaterialIcons name="close" size={14} color={textColor} />
        </Pressable>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected, disabled }}
        style={({ pressed }) => [
          styles.tag,
          { borderColor: selected ? Palette.brand : borderColor },
          selected ? styles.tagSelected : null,
          pressed && !disabled ? styles.pressed : null,
          disabled ? styles.disabled : null,
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.tag,
        { borderColor: selected ? Palette.brand : borderColor },
        selected ? styles.tagSelected : null,
        disabled ? styles.disabled : null,
      ]}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing[1],
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1],
    borderRadius: 99,
    borderWidth: 1,
  },
  tagSelected: {
    backgroundColor: `${Palette.brand}18`,
  },
  label: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  labelSelected: {
    fontFamily: FontWeight.semibold,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
