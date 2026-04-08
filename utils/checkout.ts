import type { OrderSummaryItem } from '@/components/composites/checkout/order-summary';

export function calculateOrderTotal(items: OrderSummaryItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
