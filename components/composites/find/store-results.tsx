import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// shared component
import { Icon } from '@/components/ui/primatives/icon';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type StoreLocation = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: string;
};

export type StoreResultsProps = {
  locations: StoreLocation[];
  onLocationPress: (id: string) => void;
  selectedLocationId?: string;
};

export function StoreResults({ locations, onLocationPress, selectedLocationId }: StoreResultsProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleColor = useThemeColor(
    { light: Palette.gray500, dark: Palette.gray400 },
    'icon'
  );
  const dividerColor = useThemeColor(
    { light: Palette.gray200, dark: Palette.gray700 },
    'icon'
  );
  const selectedBg = `${Palette.peachLight}80`;

  return (
    <View>
      <Text style={[styles.heading, { color: textColor }]}>Nearby Locations</Text>
      <Spacer size={3} />
      {locations.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="location-off" size={40} color={Palette.brand} />
          <Text style={[styles.emptyText, { color: subtleColor }]}>
            No locations found. Try adjusting your search or filters.
          </Text>
        </View>
      ) : (
        <View>
          {locations.map((location, index) => (
            <View key={location.id}>
              {index > 0 && (
                <View style={[styles.separator, { backgroundColor: dividerColor }]} />
              )}
              <Pressable
                onPress={() => onLocationPress(location.id)}
                accessibilityRole="button"
                accessibilityLabel={location.name}
                accessibilityState={{ selected: location.id === selectedLocationId }}
                style={({ pressed }) => [
                  styles.row,
                  location.id === selectedLocationId ? { backgroundColor: selectedBg } : null,
                  pressed ? styles.pressed : null,
                ]}
              >
                <Icon name="location-on" size={24} color={Palette.brand} />
                <View style={styles.info}>
                  <Text style={[styles.name, { color: textColor }]}>
                    {location.name}
                  </Text>
                  <Text style={[styles.address, { color: subtleColor }]}>
                    {location.address}
                  </Text>
                </View>
                {location.distance ? (
                  <Text style={[styles.distance, { color: subtleColor }]}>
                    {location.distance}
                  </Text>
                ) : null}
                <Icon name="chevron-right" size={20} />
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.semibold,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    paddingVertical: Spacing[3],
  },
  pressed: {
    opacity: 0.7,
  },
  info: {
    flex: 1,
    gap: Spacing[1],
  },
  name: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.medium,
  },
  address: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  distance: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
  emptyState: {
    alignItems: 'center',
    gap: Spacing[3],
    paddingVertical: Spacing[6],
  },
  emptyText: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    textAlign: 'center',
  },
});
