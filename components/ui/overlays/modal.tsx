import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
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

export type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export function Modal({ visible, onClose, children, title }: ModalProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const borderColor = useThemeColor(
    { light: Palette.gray200, dark: Palette.gray700 },
    'icon'
  );

  const [modalVisible, setModalVisible] = useState(visible);
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.92,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 160,
          useNativeDriver: true,
        }),
      ]).start(() => setModalVisible(false));
    }
  }, [visible, scaleAnim, opacityAnim]);

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
          accessibilityLabel="Close modal"
        />
        <Animated.View
          style={[
            styles.container,
            { backgroundColor, borderColor },
            { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
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
              accessibilityLabel="Close modal"
              style={({ pressed }) => [
                styles.closeButton,
                pressed ? styles.pressed : null,
              ]}
            >
              <MaterialIcons name="close" size={22} color={iconColor} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    width: '90%',
    maxWidth: 480,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 8 },
      default: {},
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 52,
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
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  body: {
    padding: Spacing[4],
  },
  pressed: {
    opacity: 0.7,
  },
});
