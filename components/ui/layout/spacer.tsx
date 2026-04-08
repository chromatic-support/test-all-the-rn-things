import React from 'react';
import { View } from 'react-native';

// shared theme constants
import { Spacing } from '@/constants/theme';

export type SpacerSize = keyof typeof Spacing;

export type SpacerProps = {
  size?: SpacerSize;
  axis?: 'vertical' | 'horizontal';
  color?: string;
};

export function Spacer({ size = 4, axis = 'vertical', color }: SpacerProps) {
  const value = Spacing[size];
  return (
    <View
      style={[
        axis === 'horizontal' ? { width: value } : { height: value },
        color ? { backgroundColor: color } : null,
      ]}
    />
  );
}
