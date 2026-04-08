import React from 'react';
import {
  Modal as RNModal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type AlertActionVariant = 'default' | 'destructive' | 'cancel';

export type AlertAction = {
  label: string;
  onPress: () => void;
  variant?: AlertActionVariant;
};

export type AlertProps = {
  visible: boolean;
  title: string;
  message?: string;
  actions: AlertAction[];
  onDismiss?: () => void;
};

export function Alert({ visible, title, message, actions, onDismiss }: AlertProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      accessibilityViewIsModal
    >
      <View style={styles.overlay}>
        {onDismiss ? (
          <Pressable
            style={styles.backdrop}
            onPress={onDismiss}
            accessibilityRole="button"
            accessibilityLabel="Dismiss alert"
          />
        ) : (
          <View style={styles.backdrop} />
        )}
        <View
          style={[styles.container, { backgroundColor, borderColor: textColor }]}
          accessibilityRole="alert"
        >
          <View style={[styles.content, { backgroundColor: Palette.brandLight }]}>
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            {message ? (
              <Text style={[styles.message, { color: textColor }]}>{message}</Text>
            ) : null}
          </View>
          <View style={[styles.actions, { borderTopColor: textColor }]}>
            {actions.map((action, index) => (
              <Pressable
                key={index}
                onPress={action.onPress}
                accessibilityRole="button"
                accessibilityLabel={action.label}
                style={({ pressed }) => [
                  styles.action,
                  { borderColor: textColor },
                  action.variant !== 'destructive' && action.variant !== 'cancel'
                    ? styles.actionDefault
                    : null,
                  pressed ? styles.pressed : null,
                ]}
              >
                <Text
                  style={[
                    styles.actionLabel,
                    { color: textColor },
                    action.variant === 'cancel' ? styles.cancelLabel : null,
                    action.variant !== 'cancel' && action.variant !== 'destructive'
                      ? styles.actionLabelDefault
                      : null,
                  ]}
                >
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
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
    width: '80%',
    maxWidth: 320,
    borderRadius: 14,
    borderWidth: 1.5,
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
  content: {
    padding: Spacing[5],
    alignItems: 'center',
    gap: Spacing[2],
  },
  title: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.semibold,
    textAlign: 'center',
  },
  message: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    textAlign: 'center',
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1.5,
    padding: Spacing[3],
    gap: Spacing[2],
  },
  action: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[2],
    minHeight: 44,
    borderWidth: 1.5,
    borderRadius: 8,
  },
  actionDefault: {
    backgroundColor: Palette.brand,
  },
  actionLabel: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.medium,
  },
  actionLabelDefault: {
    fontFamily: FontWeight.semibold,
  },
  cancelLabel: {
    fontFamily: FontWeight.normal,
  },
  pressed: {
    opacity: 0.7,
  },
});
