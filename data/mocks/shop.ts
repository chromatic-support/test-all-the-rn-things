// shared mock data — shop product variant fixtures for stories and testing.
import type { ProductVariant } from '@/components/composites/shop-detail/product-variants';

export const peachPrincessVariants: ProductVariant[] = [
  { id: 'peach-princess-can',   label: 'Single Can', price: 4.99,  salePrice: 3.99  },
  { id: 'peach-princess-4pack', label: '4-Pack',     price: 17.99, salePrice: 14.99 },
  { id: 'peach-princess-6pack', label: '6-Pack',     price: 25.99, salePrice: null  },
];

export const monsteraVariants: ProductVariant[] = [
  { id: 'monstera-original-can',   label: 'Single Can', price: 4.99  },
  { id: 'monstera-original-4pack', label: '4-Pack',     price: 17.99 },
  { id: 'monstera-original-6pack', label: '6-Pack',     price: 25.99 },
];
