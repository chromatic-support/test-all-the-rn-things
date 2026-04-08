import React from 'react';
import {
  Image as RNImage,
  type ImageResizeMode,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';

export type ImageVariant = 'default' | 'hero' | 'promo';

export type CalloutPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type ImageProps = {
  uri?: string;
  source?: number | { uri: string };
  width: number;
  height: number;
  accessibilityLabel: string;
  resizeMode?: ImageResizeMode;
  borderRadius?: number;
  background?: string;
  variant?: ImageVariant;
  onFavorite?: () => void;
  isFavorited?: boolean;
  callout?: string;
  calloutPosition?: CalloutPosition;
};

const CALLOUT_POSITION_STYLES: Record<CalloutPosition, object> = {
  'top-left':     { top: Spacing[2], left: Spacing[2] },
  'top-right':    { top: Spacing[2], right: Spacing[2] },
  'bottom-left':  { bottom: Spacing[2], left: Spacing[2] },
  'bottom-right': { bottom: Spacing[2], right: Spacing[2] },
};

export function Image({
  uri,
  source,
  width,
  height,
  accessibilityLabel,
  resizeMode = 'cover',
  borderRadius = 0,
  background = Palette.gray100,
  variant = 'default',
  onFavorite,
  isFavorited = false,
  callout,
  calloutPosition = 'top-left',
}: ImageProps) {
  const resolvedSource = source ?? { uri: uri! };
  const isFullWidth = variant === 'hero' || variant === 'promo';

  return (
    <View
      style={[
        styles.wrapper,
        isFullWidth ? [styles.fullWidthWrapper, { height }] : { width, height },
        { borderRadius, backgroundColor: background },
      ]}
    >
      <RNImage
        source={resolvedSource}
        style={[
          styles.image,
          isFullWidth ? styles.fullWidthImage : { width, height },
          { borderRadius },
        ]}
        resizeMode={resizeMode}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="image"
      />
      {variant === 'hero' && onFavorite ? (
        <Pressable
          onPress={onFavorite}
          accessibilityRole="button"
          accessibilityLabel={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          accessibilityState={{ checked: isFavorited }}
          style={({ pressed }) => [styles.heartButton, pressed ? styles.pressed : null]}
          hitSlop={8}
        >
          {isFavorited ? (
            <View>
              <MaterialIcons name="favorite" size={28} color={Palette.brandDark} />
              <MaterialIcons
                name="favorite-border"
                size={28}
                color={Palette.white}
                style={styles.heartOutline}
              />
            </View>
          ) : (
            <MaterialIcons name="favorite-border" size={28} color={Palette.white} />
          )}
        </Pressable>
      ) : null}
      {callout != null ? (
        <View style={[styles.callout, CALLOUT_POSITION_STYLES[calloutPosition]]}>
          <Text style={styles.calloutText}>{callout}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
  fullWidthWrapper: {
    width: '100%',
  },
  image: {
    position: 'absolute',
  },
  fullWidthImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    bottom: Spacing[3],
    right: Spacing[3],
  },
  pressed: {
    opacity: 0.7,
  },
  heartOutline: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  callout: {
    position: 'absolute',
    backgroundColor: Palette.gray900,
    paddingHorizontal: Spacing[2],
    paddingVertical: Spacing[1],
    borderRadius: 4,
  },
  calloutText: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.semibold,
    color: Palette.white,
  },
});
