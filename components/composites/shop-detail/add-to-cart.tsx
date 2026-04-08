import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// shared component
import { Button } from '@/components/ui/primatives/button';
// shared component
import { Stepper } from '@/components/ui/forms/stepper';
// shared theme constants
import { Spacing } from '@/constants/theme';

export type AddToCartProps = {
  onAddToCart: (quantity: number) => void;
};

export function AddToCart({ onAddToCart }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    onAddToCart(quantity);
    setQuantity(1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.stepperRow}>
        <Stepper
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={99}
          accessibilityLabel="Quantity"
        />
      </View>
      <Button label="Add to cart" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[3],
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
