import React from 'react';
import { StyleSheet, View, type DimensionValue } from 'react-native';

// shared theme constants
import { Spacing } from '@/constants/theme';

type SpacingKey = keyof typeof Spacing;

export type GridProps = {
  children: React.ReactNode;
  columns?: number;
  gap?: SpacingKey;
  rowGap?: SpacingKey;
  columnGap?: SpacingKey;
};

export function Grid({
  children,
  columns = 2,
  gap,
  rowGap = 4,
  columnGap = 4,
}: GridProps) {
  const resolvedRowGap = gap !== undefined ? Spacing[gap] : Spacing[rowGap];
  const resolvedColumnGap = gap !== undefined ? Spacing[gap] : Spacing[columnGap];

  const items = React.Children.toArray(children);

  return (
    <View style={[styles.grid, { rowGap: resolvedRowGap }]}>
      {items.map((child, index) => (
        <View
          key={index}
          style={[
            styles.cell,
            {
              width: `${100 / columns}%` as DimensionValue,
              paddingRight: (index % columns !== columns - 1) ? resolvedColumnGap / 2 : 0,
              paddingLeft: (index % columns !== 0) ? resolvedColumnGap / 2 : 0,
            },
          ]}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  cell: {
    flexShrink: 0,
  },
});
