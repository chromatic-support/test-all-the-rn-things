import React from 'react';

// shared component
import { Button } from '@/components/ui/primatives/button';

export type PlaceOrderProps = {
  onPress: () => void;
  disabled?: boolean;
};

export function PlaceOrder({ onPress, disabled = false }: PlaceOrderProps) {
  return (
    <Button
      label="Place Order"
      onPress={onPress}
      disabled={disabled}
    />
  );
}
