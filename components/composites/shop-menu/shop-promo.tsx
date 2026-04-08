import React from 'react';
import {
  ImageBackground,
  type ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// shared component
import { Button } from '@/components/ui/primatives/button';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type ShopPromoProps = {
  title: string;
  description: string;
  calloutLabel?: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

export function ShopPromo({ title, description, calloutLabel, image, onPress }: ShopPromoProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleColor = useThemeColor(
    { light: Palette.gray500, dark: Palette.gray400 },
    'icon',
  );
  const cardBg = useThemeColor(
    { light: Palette.gray100, dark: Palette.gray800 },
    'background',
  );

  return (
    <View style={[styles.container, { backgroundColor: cardBg }]}>
      <ImageBackground
        source={image}
        style={styles.imageSection}
        resizeMode="cover"
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <View style={styles.contentSection}>
        {calloutLabel ? (
          <Text style={[styles.callout, { color: subtleColor }]}>{calloutLabel}</Text>
        ) : null}
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <Text style={[styles.description, { color: subtleColor }]} numberOfLines={3}>
          {description}
        </Text>
        <Button label="Shop now" onPress={onPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 160,
  },
  imageSection: {
    flex: 2,
  },
  contentSection: {
    flex: 3,
    padding: Spacing[4],
    gap: Spacing[2],
    justifyContent: 'center',
  },
  callout: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
  },
  title: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.bold,
    lineHeight: FontSize.lg * 1.3,
  },
  description: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    lineHeight: FontSize.sm * 1.5,
  },
});
