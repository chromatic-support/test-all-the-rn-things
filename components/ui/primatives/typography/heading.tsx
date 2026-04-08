import React from 'react';
import { Text } from 'react-native';

// shared theme constants
import { Headings } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = {
  level?: HeadingLevel;
  children: React.ReactNode;
};

export function Heading({ level = 1, children }: HeadingProps) {
  const textColor = useThemeColor({}, 'text');
  const style = Headings[`h${level}` as keyof typeof Headings];

  return (
    <Text
      style={[style, { color: textColor }]}
      accessibilityRole="header"
    >
      {children}
    </Text>
  );
}
