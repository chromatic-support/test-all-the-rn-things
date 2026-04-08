import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal as RNModal,
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

export type DrawerPlacement = 'left' | 'right' | 'bottom';

export type DrawerProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  placement?: DrawerPlacement;
};

const SIDE_DRAWER_WIDTH = 320;
const BOTTOM_DRAWER_HEIGHT = Math.round(Dimensions.get('window').height * 0.6);

function getInitialTranslate(placement: DrawerPlacement): number {
  if (placement === 'left') return -SIDE_DRAWER_WIDTH;
  if (placement === 'bottom') return BOTTOM_DRAWER_HEIGHT;
  return SIDE_DRAWER_WIDTH;
}

export function Drawer({
  visible,
  onClose,
  children,
  title,
  placement = 'right',
}: DrawerProps) {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const borderColor = useThemeColor(
    { light: Palette.gray200, dark: Palette.gray700 },
    'icon'
  );

  const [modalVisible, setModalVisible] = useState(visible);
  const translateAnim = useRef(new Animated.Value(getInitialTranslate(placement))).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateAnim, {
        toValue: getInitialTranslate(placement),
        duration: 220,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }
  }, [visible, placement, translateAnim]);

  const isBottom = placement === 'bottom';
  const transform = isBottom
    ? [{ translateY: translateAnim }]
    : [{ translateX: translateAnim }];

  const drawerPositionStyle = isBottom
    ? styles.drawerBottom
    : placement === 'left'
    ? styles.drawerLeft
    : styles.drawerRight;

  const safeAreaPadding = isBottom
    ? { paddingBottom: insets.bottom + Spacing[4] }
    : placement === 'left'
    ? { paddingTop: insets.top }
    : { paddingTop: insets.top };

  return (
    <RNModal
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
          accessibilityLabel="Close drawer"
        />
        <Animated.View
          style={[
            styles.drawer,
            drawerPositionStyle,
            { backgroundColor, borderColor },
            safeAreaPadding,
            { transform },
          ]}
        >
          <View style={[styles.header, { borderBottomColor: borderColor }]}>
            {title ? (
              <Text
                style={[styles.title, { color: textColor }]}
                accessibilityRole="header"
              >
                {title}
              </Text>
            ) : (
              <View style={styles.titleSpacer} />
            )}
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close drawer"
              style={({ pressed }) => [
                styles.closeButton,
                pressed ? styles.pressed : null,
              ]}
            >
              <MaterialIcons name="close" size={24} color={iconColor} />
            </Pressable>
          </View>
          <View style={styles.body}>{children}</View>
        </Animated.View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawer: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 0 },
      },
      android: { elevation: 8 },
      default: {},
    }),
  },
  drawerRight: {
    top: 0,
    bottom: 0,
    right: 0,
    width: SIDE_DRAWER_WIDTH,
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  drawerLeft: {
    top: 0,
    bottom: 0,
    left: 0,
    width: SIDE_DRAWER_WIDTH,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  drawerBottom: {
    left: 0,
    right: 0,
    bottom: 0,
    height: BOTTOM_DRAWER_HEIGHT,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 56,
  },
  title: {
    flex: 1,
    fontSize: FontSize.lg,
    fontFamily: FontWeight.semibold,
  },
  titleSpacer: {
    flex: 1,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  body: {
    flex: 1,
    padding: Spacing[4],
  },
  pressed: {
    opacity: 0.7,
  },
});
