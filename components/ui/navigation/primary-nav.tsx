import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type PrimaryNavItem = {
  key: string;
  label: string;
  icon?: React.ComponentProps<typeof MaterialIcons>['name'];
  image?: number | { uri: string };
  onPress: () => void;
};

export type PrimaryNavProps = {
  items: PrimaryNavItem[];
  activeKey: string;
};

type NavItemProps = {
  item: PrimaryNavItem;
  active: boolean;
};

function NavItem({ item, active }: NavItemProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <Pressable
      onPress={item.onPress}
      accessibilityRole="tab"
      accessibilityLabel={item.label}
      accessibilityState={{ selected: active }}
      style={({ pressed }) => [
        styles.tab,
        pressed ? styles.pressed : null,
      ]}
    >
      {item.image ? (
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      ) : item.icon ? (
        <MaterialIcons
          name={item.icon}
          size={22}
          color={active ? Palette.brandDark : textColor}
          style={styles.icon}
        />
      ) : null}
      {!item.image ? (
        <Text
          style={[
            styles.label,
            { color: textColor },
            active ? styles.labelActive : null,
          ]}
        >
          {item.label}
        </Text>
      ) : null}
      {active ? <View style={styles.indicator} /> : null}
    </Pressable>
  );
}

export function PrimaryNav({ items, activeKey }: PrimaryNavProps) {
  const borderColor = useThemeColor({ light: '#e5e7eb', dark: '#374151' }, 'icon');

  return (
    <View style={[styles.container, { backgroundColor: Palette.brandLight, borderBottomColor: borderColor }]}>
      {items.map((item) => (
        <NavItem key={item.key} item={item} active={item.key === activeKey} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing[2],
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing[3],
    paddingBottom: Spacing[2],
    minHeight: 56,
    position: 'relative',
  },
  icon: {
    marginBottom: Spacing[1],
  },
  image: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.normal,
  },
  labelActive: {
    fontFamily: FontWeight.semibold,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: Spacing[3],
    right: Spacing[3],
    height: 2,
    borderRadius: 1,
    backgroundColor: Palette.brandDark,
  },
  pressed: {
    opacity: 0.7,
  },
});
