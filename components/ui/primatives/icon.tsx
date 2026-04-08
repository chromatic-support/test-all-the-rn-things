import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type IconProps = {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  size?: number;
  color?: string;
  accessibilityLabel?: string;
};

export function Icon({ name, size = 24, color, accessibilityLabel }: IconProps) {
  const iconColor = useThemeColor({}, 'icon');

  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color ?? iconColor}
      accessibilityLabel={accessibilityLabel}
    />
  );
}
