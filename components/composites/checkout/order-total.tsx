import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared theme constants
import { FontSize, FontWeight } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type OrderTotalProps = {
  total: number;
  label?: string;
};

export function OrderTotal({ total, label = 'Order Total' }: OrderTotalProps) {
  const textColor = useThemeColor({}, 'text');

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(total);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <Text style={[styles.amount, { color: textColor }]}>{formatted}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  label: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  amount: {
    fontSize: FontSize.xl,
    fontFamily: FontWeight.bold,
  },
});
