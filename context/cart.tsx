import React, { createContext, useContext, useState } from 'react';

// shared type
import type { OrderSummaryItem } from '@/components/composites/checkout/order-summary';

type CartContextValue = {
  items: OrderSummaryItem[];
  addToCart: (item: Omit<OrderSummaryItem, 'quantity'>, quantity: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderSummaryItem[]>([]);

  function addToCart(item: Omit<OrderSummaryItem, 'quantity'>, quantity: number) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }

  function updateQuantity(id: string, quantity: number) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
