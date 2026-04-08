import React from 'react';
import { StyleSheet, View, type FlexStyle } from 'react-native';

// shared theme constants
import { Spacing } from '@/constants/theme';

type SpacingKey = keyof typeof Spacing;

export type StackProps = {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  gap?: SpacingKey;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
};

const ALIGN_MAP: Record<NonNullable<StackProps['align']>, FlexStyle['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const JUSTIFY_MAP: Record<NonNullable<StackProps['justify']>, FlexStyle['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export function Stack({
  children,
  direction = 'vertical',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
}: StackProps) {
  return (
    <View
      style={[
        styles.stack,
        {
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap: Spacing[gap],
          alignItems: ALIGN_MAP[align],
          justifyContent: JUSTIFY_MAP[justify],
          flexWrap: wrap ? 'wrap' : 'nowrap',
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    width: '100%',
  },
});
