import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// shared component
import { Image } from '@/components/ui/primatives/image';
// shared component
import { Stepper } from '@/components/ui/forms/stepper';
// shared component
import { Icon } from '@/components/ui/primatives/icon';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

const THUMBNAIL_SIZE = 64;

export type OrderSummaryItem = {
  id: string;
  title: string;
  imageSource: number | { uri: string };
  price: number;
  quantity: number;
};

export type OrderSummaryProps = {
  items: OrderSummaryItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export function OrderSummary({ items, onQuantityChange, onRemove }: OrderSummaryProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleColor = useThemeColor(
    { light: Palette.gray500, dark: Palette.gray400 },
    'icon'
  );
  const dividerColor = useThemeColor(
    { light: Palette.gray200, dark: Palette.gray700 },
    'icon'
  );

  return (
    <View>
      <Text style={[styles.heading, { color: textColor }]}>Order Summary</Text>
      <Spacer size={3} />
      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="remove-shopping-cart" size={40} color={Palette.brand} />
          <Text style={[styles.empty, { color: subtleColor }]}>
            Your cart is empty. Add some items to get started!
          </Text>
        </View>
      ) : null}
      <View>
        {items.map((item, index) => (
          <View key={item.id}>
            {index > 0 && (
              <View style={[styles.separator, { backgroundColor: dividerColor }]} />
            )}
            <View style={styles.row}>
              <Image
                source={item.imageSource}
                width={THUMBNAIL_SIZE}
                height={THUMBNAIL_SIZE}
                accessibilityLabel={item.title}
                borderRadius={8}
                resizeMode="cover"
              />
              <View style={styles.info}>
                <Text
                  style={[styles.title, { color: textColor }]}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <View style={styles.meta}>
                  <Text style={[styles.price, { color: subtleColor }]}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                  </Text>
                  <Text style={[styles.qty, { color: subtleColor }]}>
                    Qty: {item.quantity}
                  </Text>
                </View>
              </View>
              <View style={styles.actions}>
                <Stepper
                  value={item.quantity}
                  onChange={(value) => onQuantityChange(item.id, value)}
                  min={1}
                  max={99}
                  accessibilityLabel={`Quantity for ${item.title}`}
                />
                <Pressable
                  onPress={() => onRemove(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${item.title}`}
                  style={({ pressed }) => [pressed && styles.removePressed]}
                >
                  <Icon name="delete-outline" size={22} color={Palette.gray400} />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.semibold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    paddingVertical: Spacing[3],
  },
  info: {
    flex: 1,
    gap: Spacing[1],
  },
  title: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.medium,
  },
  meta: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  price: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  qty: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  removePressed: {
    opacity: 0.5,
  },
  emptyState: {
    alignItems: 'center',
    gap: Spacing[3],
    paddingVertical: Spacing[6],
  },
  empty: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    textAlign: 'center',
  },
});
