import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type HeaderAction = {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  accessibilityLabel: string;
  onPress: () => void;
};

export type HeaderBackground = 'brand' | 'brandLight' | 'brandDark';

export type HeaderProps = {
  title: string;
  titleComponent?: React.ReactNode;
  onBack?: () => void;
  rightActions?: HeaderAction[];
  background?: HeaderBackground;
};

const BRAND_COLORS: Record<HeaderBackground, string> = {
  brand: Palette.brand,
  brandLight: Palette.brandLight,
  brandDark: Palette.brandDark,
};

export function Header({ title, titleComponent, onBack, rightActions = [], background }: HeaderProps) {
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({ light: '#e5e7eb', dark: '#374151' }, 'icon');
  const themeBackground = useThemeColor({}, 'background');
  const backgroundColor = background ? BRAND_COLORS[background] : themeBackground;

  return (
    <View style={[styles.container, { backgroundColor, borderBottomColor: borderColor }]}>
      <View style={styles.row}>
        <View style={styles.leading}>
          {onBack ? (
            <Pressable
              onPress={onBack}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={({ pressed }) => [styles.iconButton, pressed ? styles.pressed : null]}
            >
              <MaterialIcons name="arrow-back" size={24} color={textColor} />
            </Pressable>
          ) : (
            <View style={styles.iconPlaceholder} />
          )}
        </View>

        {titleComponent ? (
          <View style={styles.titleContainer}>{titleComponent}</View>
        ) : (
          <Text
            style={[styles.title, { color: textColor }]}
            numberOfLines={1}
            accessibilityRole="header"
          >
            {title}
          </Text>
        )}

        <View style={styles.trailing}>
          {rightActions.map((action, index) => (
            <Pressable
              key={index}
              onPress={action.onPress}
              accessibilityRole="button"
              accessibilityLabel={action.accessibilityLabel}
              style={({ pressed }) => [styles.iconButton, pressed ? styles.pressed : null]}
            >
              <MaterialIcons name={action.icon} size={24} color={textColor} />
            </Pressable>
          ))}
          {rightActions.length === 0 && <View style={styles.iconPlaceholder} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: Spacing[2],
  },
  leading: {
    width: 44,
    alignItems: 'flex-start',
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 44,
    justifyContent: 'flex-end',
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  iconPlaceholder: {
    width: 44,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSize.base,
    fontFamily: FontWeight.semibold,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
