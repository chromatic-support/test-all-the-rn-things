import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared component
import { Image } from '@/components/ui/primatives/image';
// shared component
import { Divider } from '@/components/ui/layout/divider';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';
// shared component
import type { OrderSummaryItem } from '@/components/composites/checkout/order-summary';

const THUMBNAIL_SIZE = 52;

const fmt = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export type CostBreakdown = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export type ShippingSummaryProps = {
  name: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zip: string;
  estimatedDelivery?: string;
  items?: OrderSummaryItem[];
  cost?: CostBreakdown;
};

export function ShippingSummary({
  name,
  street,
  apt,
  city,
  state,
  zip,
  estimatedDelivery,
  items,
  cost,
}: ShippingSummaryProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleColor = useThemeColor({ light: Palette.gray500, dark: Palette.gray400 }, 'icon');
  const dividerColor = useThemeColor({ light: Palette.gray200, dark: Palette.gray700 }, 'icon');

  const cityLine = `${city}, ${state} ${zip}`;

  return (
    <View style={styles.container}>

      <Text style={[styles.heading, { color: textColor }]}>Shipping To</Text>
      <View style={styles.address}>
        <Text style={[styles.name, { color: textColor }]}>{name}</Text>
        <Text style={[styles.line, { color: subtleColor }]}>{street}</Text>
        {apt ? <Text style={[styles.line, { color: subtleColor }]}>{apt}</Text> : null}
        <Text style={[styles.line, { color: subtleColor }]}>{cityLine}</Text>
      </View>
      {estimatedDelivery ? (
        <View style={styles.eta}>
          <Text style={[styles.etaLabel, { color: subtleColor }]}>Estimated delivery</Text>
          <Text style={[styles.etaValue, { color: textColor }]}>{estimatedDelivery}</Text>
        </View>
      ) : null}

      {items && items.length > 0 ? (
        <>
          <Divider />
          <Text style={[styles.heading, { color: textColor }]}>Items</Text>
          <View>
            {items.map((item, index) => (
              <View key={item.id}>
                {index > 0 ? (
                  <View style={[styles.separator, { backgroundColor: dividerColor }]} />
                ) : null}
                <View style={styles.itemRow}>
                  <Image
                    source={item.imageSource}
                    width={THUMBNAIL_SIZE}
                    height={THUMBNAIL_SIZE}
                    accessibilityLabel={item.title}
                    borderRadius={6}
                    resizeMode="cover"
                  />
                  <View style={styles.itemInfo}>
                    <Text style={[styles.itemTitle, { color: textColor }]} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={[styles.line, { color: subtleColor }]}>Qty: {item.quantity}</Text>
                  </View>
                  <Text style={[styles.itemPrice, { color: textColor }]}>
                    {fmt(item.price * item.quantity)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </>
      ) : null}

      {cost ? (
        <>
          <Divider />
          <Text style={[styles.heading, { color: textColor }]}>Cost</Text>
          <View style={styles.costRows}>
            <View style={styles.costRow}>
              <Text style={[styles.costLabel, { color: subtleColor }]}>Subtotal</Text>
              <Text style={[styles.costValue, { color: textColor }]}>{fmt(cost.subtotal)}</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={[styles.costLabel, { color: subtleColor }]}>Shipping</Text>
              <Text style={[styles.costValue, { color: textColor }]}>
                {cost.shipping === 0 ? 'Free' : fmt(cost.shipping)}
              </Text>
            </View>
            <View style={styles.costRow}>
              <Text style={[styles.costLabel, { color: subtleColor }]}>Tax</Text>
              <Text style={[styles.costValue, { color: textColor }]}>{fmt(cost.tax)}</Text>
            </View>
            <View style={[styles.costRow, styles.totalRow]}>
              <Text style={[styles.totalLabel, { color: textColor }]}>Total</Text>
              <Text style={[styles.totalValue, { color: textColor }]}>{fmt(cost.total)}</Text>
            </View>
          </View>
        </>
      ) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[4],
  },
  heading: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.semibold,
  },
  address: {
    gap: Spacing[1],
  },
  name: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.medium,
  },
  line: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  eta: {
    gap: Spacing[1],
  },
  etaLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  etaValue: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.medium,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    paddingVertical: Spacing[2],
  },
  itemInfo: {
    flex: 1,
    gap: Spacing[1],
  },
  itemTitle: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
  },
  itemPrice: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
  },
  costRows: {
    gap: Spacing[2],
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  costLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  costValue: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  totalRow: {
    marginTop: Spacing[1],
  },
  totalLabel: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.semibold,
  },
  totalValue: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.semibold,
  },
});
