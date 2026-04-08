import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type ProductVariant = {
  id: string;
  label: string;
  price: number;
  salePrice?: number | null;
};

export type ProductVariantsProps = {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
};

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function ProductVariants({ variants, selectedId, onSelect }: ProductVariantsProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleColor = useThemeColor({ light: Palette.gray500, dark: Palette.gray400 }, 'icon');
  const borderColor = useThemeColor({ light: Palette.gray300, dark: Palette.gray600 }, 'icon');
  const cardBg = useThemeColor({ light: Palette.gray100, dark: Palette.gray800 }, 'background');

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: textColor }]}>Select size</Text>
      <View style={styles.row}>
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId;
          return (
            <Pressable
              key={variant.id}
              onPress={() => onSelect(variant.id)}
              accessibilityRole="button"
              accessibilityLabel={
                variant.salePrice != null
                  ? `${variant.label}, ${formatPrice(variant.salePrice)}, on sale`
                  : `${variant.label}, ${formatPrice(variant.price)}`
              }
              accessibilityState={{ selected: isSelected }}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: cardBg, borderColor: isSelected ? Palette.brand : borderColor },
                pressed ? styles.pressed : null,
              ]}
            >
              <Text
                style={[
                  styles.label,
                  { color: textColor, fontFamily: isSelected ? FontWeight.bold : FontWeight.medium },
                ]}
              >
                {variant.label}
              </Text>
              {variant.salePrice != null ? (
                <View style={styles.priceRow}>
                  <Text style={[styles.salePrice, { color: textColor }]}>
                    {formatPrice(variant.salePrice)}
                  </Text>
                  <Text style={[styles.originalPrice, { color: subtleColor }]}>
                    {formatPrice(variant.price)}
                  </Text>
                </View>
              ) : (
                <Text style={[styles.price, { color: textColor }]}>
                  {formatPrice(variant.price)}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[3],
  },
  heading: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  card: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: Spacing[3],
    gap: Spacing[1],
    alignItems: 'center',
  },
  label: {
    fontSize: FontSize.sm,
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1],
  },
  salePrice: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.semibold,
  },
  originalPrice: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.normal,
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  pressed: {
    opacity: 0.8,
  },
});
