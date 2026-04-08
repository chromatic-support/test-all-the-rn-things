import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Platform,
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
// shared safe area hook
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type NavDrawerItem = {
  label: string;
  icon?: React.ComponentProps<typeof MaterialIcons>['name'];
  onPress: () => void;
  active?: boolean;
};

export type MobileNavDrawerProps = {
  visible: boolean;
  onClose: () => void;
  items: NavDrawerItem[];
  title?: React.ReactNode;
};

export function MobileNavDrawer({
  visible,
  onClose,
  items,
  title,
}: MobileNavDrawerProps) {
  const { top: topInset } = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const borderColor = useThemeColor({ light: '#e5e7eb', dark: '#374151' }, 'icon');

  const [modalVisible, setModalVisible] = useState(visible);
  const translateX = useRef(new Animated.Value(DRAWER_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }
  }, [visible, translateX]);

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close navigation drawer"
        />
        <Animated.View
          style={[
            styles.drawer,
            { backgroundColor, borderLeftColor: borderColor, paddingTop: topInset },
            { transform: [{ translateX }] },
          ]}
        >
          <View style={[styles.drawerHeader, { borderBottomColor: borderColor }]}>
            {title ? (
              <Text
                style={[styles.drawerTitle, { color: textColor }]}
                accessibilityRole="header"
              >
                {title}
              </Text>
            ) : null}
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close navigation drawer"
              style={({ pressed }) => [
                styles.closeButton,
                pressed ? styles.pressed : null,
              ]}
            >
              <MaterialIcons name="close" size={24} color={iconColor} />
            </Pressable>
          </View>

          <View style={styles.itemList}>
            {items.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  item.onPress();
                  onClose();
                }}
                accessibilityRole="menuitem"
                accessibilityLabel={item.label}
                accessibilityState={{ selected: item.active }}
                style={({ pressed }) => [
                  styles.navItem,
                  item.active ? styles.navItemActive : null,
                  pressed ? styles.pressed : null,
                ]}
              >
                {item.icon ? (
                  <MaterialIcons
                    name={item.icon}
                    size={22}
                    color={item.active ? Palette.brand : iconColor}
                    style={styles.navIcon}
                  />
                ) : null}
                <Text
                  style={[
                    styles.navLabel,
                    { color: textColor },
                    item.active ? styles.navLabelActive : null,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const DRAWER_WIDTH = 280;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: DRAWER_WIDTH,
    borderLeftWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: -4, height: 0 },
      },
      android: {
        elevation: 8,
      },
      default: {},
    }),
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 56,
  },
  drawerTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.semibold,
    flex: 1,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  itemList: {
    paddingVertical: Spacing[2],
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    minHeight: 48,
  },
  navItemActive: {
    backgroundColor: `${Palette.brand}18`,
  },
  navIcon: {
    marginRight: Spacing[3],
  },
  navLabel: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
  },
  navLabelActive: {
    fontFamily: FontWeight.semibold,
  },
  pressed: {
    opacity: 0.7,
  },
});
