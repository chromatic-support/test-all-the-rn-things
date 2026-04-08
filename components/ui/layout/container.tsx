import React from 'react';
import { StyleSheet, View } from 'react-native';

// shared theme constants
import { Spacing } from '@/constants/theme';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'full';

export type ContainerProps = {
  children: React.ReactNode;
  size?: ContainerSize;
  padded?: boolean;
};

const MAX_WIDTHS: Record<ContainerSize, number | '100%'> = {
  sm: 480,
  md: 720,
  lg: 1024,
  full: '100%',
};

export function Container({ children, size = 'md', padded = true }: ContainerProps) {
  return (
    <View
      style={[
        styles.container,
        { maxWidth: MAX_WIDTHS[size] },
        padded ? styles.padded : null,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
  padded: {
    paddingHorizontal: Spacing[4],
  },
});
