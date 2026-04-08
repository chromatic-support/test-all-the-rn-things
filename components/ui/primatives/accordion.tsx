import React, { useState } from 'react';
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) => !prev);
  }

  return (
    <View style={[styles.container, { borderColor: Palette.brandDark, backgroundColor }]}>
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ expanded: open }}
        style={({ pressed }) => [
          styles.header,
          open ? styles.headerOpen : null,
          pressed ? styles.pressed : null,
        ]}
      >
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <MaterialIcons
          name={open ? 'expand-less' : 'expand-more'}
          size={22}
          color={iconColor}
        />
      </Pressable>
      {open ? (
        <View style={[styles.body, { borderTopColor: Palette.brandDark }]}>{children}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    minHeight: 48,
  },
  title: {
    flex: 1,
    fontSize: FontSize.base,
    fontFamily: FontWeight.medium,
  },
  body: {
    borderTopWidth: 1.5,
    padding: Spacing[4],
  },
  headerOpen: {
    backgroundColor: Palette.brandLight,
  },
  pressed: {
    opacity: 0.7,
  },
});
