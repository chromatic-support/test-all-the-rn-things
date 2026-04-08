import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';
// shared component
import { Button } from '@/components/ui/primatives/button';

export type OrderConfirmationProps = {
  orderNumber: string;
  onContinueShopping?: () => void;
};

export function OrderConfirmation({ orderNumber, onContinueShopping }: OrderConfirmationProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleColor = useThemeColor({ light: Palette.gray500, dark: Palette.gray400 }, 'icon');

  return (
    <View style={styles.container}>
      <MaterialIcons name="check-circle" size={64} color={Palette.brand} />
      <Text style={[styles.heading, { color: textColor }]}>Order placed!</Text>
      <Text style={[styles.orderNumber, { color: subtleColor }]}>Order #{orderNumber}</Text>
      <Text style={[styles.message, { color: subtleColor }]}>
        We've received your order and will send a confirmation to your email shortly.
      </Text>
      {onContinueShopping && (
        <View style={styles.action}>
          <Button
            label="Continue shopping"
            onPress={onContinueShopping}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing[3],
    paddingVertical: Spacing[8],
    paddingHorizontal: Spacing[4],
  },
  heading: {
    fontSize: FontSize.xl2,
    fontFamily: FontWeight.bold,
    textAlign: 'center',
  },
  orderNumber: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
    textAlign: 'center',
  },
  message: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    textAlign: 'center',
    lineHeight: 22,
  },
  action: {
    marginTop: Spacing[2],
    width: '100%',
  },
});
