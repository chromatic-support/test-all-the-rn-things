import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, StyleSheet, View } from 'react-native';
import Reanimated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// shared theme constants
import { Palette } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

// --- Spinner ---

export type SpinnerProps = {
  size?: 'small' | 'large';
  color?: string;
};

export function Spinner({ size = 'large', color }: SpinnerProps) {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <ActivityIndicator
      size={size}
      color={color ?? tintColor}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    />
  );
}

// --- Skeleton ---

export type SkeletonProps = {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
};

export function Skeleton({ width, height, borderRadius = 6 }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.skeleton, { width, height, borderRadius, opacity }]}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    />
  );
}

// --- ProgressBar ---

export type ProgressBarProps = {
  progress: number; // 0–1
  color?: string;
};

export function ProgressBar({ progress, color }: ProgressBarProps) {
  const tintColor = useThemeColor({}, 'tint');
  const trackColor = useThemeColor(
    { light: Palette.gray200, dark: Palette.gray700 },
    'icon'
  );
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const widthPct = useSharedValue(clampedProgress * 100);

  useEffect(() => {
    widthPct.value = withTiming(clampedProgress * 100, { duration: 300 });
  }, [clampedProgress, widthPct]);

  const animatedFill = useAnimatedStyle(() => ({
    width: `${widthPct.value}%`,
  }));

  return (
    <View
      style={[styles.track, { backgroundColor: trackColor }]}
      accessibilityRole="progressbar"
      accessibilityLabel={`${Math.round(clampedProgress * 100)}% complete`}
    >
      <Reanimated.View
        style={[styles.fill, animatedFill, { backgroundColor: color ?? tintColor }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Palette.gray200,
  },
  track: {
    height: 6,
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 99,
  },
});
