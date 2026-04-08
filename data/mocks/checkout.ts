// shared mock data — checkout order items and cost breakdown for stories and testing.
import type { OrderSummaryItem } from '@/components/composites/checkout/order-summary';
import type { CostBreakdown } from '@/components/composites/checkout/shipping-summary';

export const mockOrderItems: OrderSummaryItem[] = [
  {
    id: 'monstera-original-4pack',
    title: 'Monstera Original – 4-Pack',
    imageSource: require('@/assets/img/flavors/monstera-original.png'),
    price: 17.99,
    quantity: 2,
  },
  {
    id: 'peach-princess-can',
    title: 'Peach Princess – Single Can',
    imageSource: require('@/assets/img/flavors/peach-princess.png'),
    price: 3.99,
    quantity: 1,
  },
];

export const mockCostBreakdown: CostBreakdown = {
  subtotal: 39.97,
  shipping: 0,
  tax: 3.50,
  total: 43.47,
};
