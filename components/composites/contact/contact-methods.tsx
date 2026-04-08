import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type ContactMethodType = 'email' | 'phone';

export type ContactMethodsProps = {
  method: ContactMethodType;
  onMethodChange: (method: ContactMethodType) => void;
};

const METHODS: { value: ContactMethodType; label: string }[] = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
];

export function ContactMethods({ method, onMethodChange }: ContactMethodsProps) {
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor(
    { light: Palette.gray300, dark: Palette.gray600 },
    'icon'
  );

  return (
    <View style={styles.row} accessibilityRole="radiogroup">
      {METHODS.map((opt) => {
        const selected = method === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onMethodChange(opt.value)}
            accessibilityRole="radio"
            accessibilityLabel={opt.label}
            accessibilityState={{ checked: selected }}
            style={({ pressed }) => [
              styles.option,
              selected
                ? styles.optionSelected
                : [styles.optionUnselected, { borderColor }],
              pressed ? styles.pressed : null,
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: textColor },
                selected ? styles.labelSelected : null,
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  option: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: Spacing[3],
  },
  optionSelected: {
    backgroundColor: Palette.brand,
  },
  optionUnselected: {
    borderWidth: 1.5,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
  },
  labelSelected: {
    fontFamily: FontWeight.semibold,
  },
});
