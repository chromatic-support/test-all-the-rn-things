import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared safe area hook
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ToastVariant = 'info' | 'success' | 'error' | 'warning';
export type ToastPosition = 'top' | 'bottom';

export type ToastProps = {
  visible: boolean;
  message: string;
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number;
  onDismiss: () => void;
};

type VariantConfig = {
  backgroundColor: string;
  iconName: React.ComponentProps<typeof MaterialIcons>['name'];
};

const VARIANT_CONFIG: Record<ToastVariant, VariantConfig> = {
  info: { backgroundColor: Palette.sky, iconName: 'info-outline' },
  success: { backgroundColor: Palette.mint, iconName: 'check-circle-outline' },
  error: { backgroundColor: Palette.coral, iconName: 'error-outline' },
  warning: { backgroundColor: Palette.lemon, iconName: 'warning' },
};

const DEFAULT_DURATION = 3000;

export function Toast({
  visible,
  message,
  variant = 'info',
  position = 'bottom',
  duration = DEFAULT_DURATION,
  onDismiss,
}: ToastProps) {
  const insets = useSafeAreaInsets();
  const exitTranslate = position === 'top' ? -80 : 80;
  const translateY = useRef(new Animated.Value(exitTranslate)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [isShown, setIsShown] = useState(visible);

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: exitTranslate,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setIsShown(false);
        onDismiss();
      }
    });
  }, [translateY, opacity, exitTranslate, onDismiss]);

  useEffect(() => {
    if (!visible) return;

    setIsShown(true);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, dismiss, translateY, opacity]);

  if (!isShown) return null;

  const config = VARIANT_CONFIG[variant];
  const positionStyle =
    position === 'top'
      ? { top: insets.top + Spacing[3] }
      : { bottom: insets.bottom + Spacing[3] };

  return (
    <Animated.View
      style={[
        styles.toast,
        positionStyle,
        { backgroundColor: config.backgroundColor },
        { opacity, transform: [{ translateY }] },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <MaterialIcons
        name={config.iconName}
        size={20}
        color={Palette.gray800}
        style={styles.icon}
      />
      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>
      <Pressable
        onPress={dismiss}
        accessibilityRole="button"
        accessibilityLabel="Dismiss notification"
        style={({ pressed }) => [styles.dismissButton, pressed ? styles.pressed : null]}
      >
        <MaterialIcons name="close" size={18} color={Palette.gray600} />
      </Pressable>
    </Animated.View>
  );
}

// Note: Toast uses absolute positioning and must be rendered at the root of the screen
// so it appears above all other content.
const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: Spacing[4],
    right: Spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderRadius: 12,
    gap: Spacing[2],
    ...Platform.select({
      ios: {
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 4 },
      default: {},
    }),
  },
  icon: {
    flexShrink: 0,
  },
  message: {
    flex: 1,
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
    color: Palette.gray800,
  },
  dismissButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    flexShrink: 0,
  },
  pressed: {
    opacity: 0.7,
  },
});

// Wrap a screen's root View with position: 'relative' (default) and render
// <Toast /> as the last child so it layers above all other content.
export function ToastContainer({ children }: { children: React.ReactNode }) {
  return <View style={containerStyles.root}>{children}</View>;
}

const containerStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
