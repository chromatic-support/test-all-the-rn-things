// shared mock data — filter and category fixtures for hero component stories and testing.
import type { MapFilterItem } from '@/components/composites/heroes/map-filters';
import type { FlavorsMenuFilterItem } from '@/components/composites/heroes/flavors-menu';
import type { ShopMenuCategoryItem } from '@/components/composites/heroes/shop-menu';

export const mockMapFilters: MapFilterItem[] = [
  { id: 'all',   label: 'All' },
  { id: '5mi',   label: 'Within 5 miles' },
  { id: '10mi',  label: 'Within 10 miles' },
  { id: '25mi',  label: 'Within 25 miles' },
  { id: '50mi',  label: 'Within 50 miles' },
];

export const mockFlavorsMenuFilters: FlavorsMenuFilterItem[] = [
  { id: 'all',        label: 'All' },
  { id: 'seasonal',   label: 'Seasonal' },
  { id: 'classic',    label: 'Classic' },
  { id: 'caffeinated', label: 'Caffeinated' },
  { id: 'decaf',      label: 'Decaf' },
  { id: 'limited',    label: 'Limited Edition' },
];

export const mockShopCategories: ShopMenuCategoryItem[] = [
  { id: 'all',          label: 'All' },
  { id: 'new',          label: 'New' },
  { id: 'sale',         label: 'Sale' },
  { id: 'limited-time', label: 'Limited Time' },
  { id: 'merch',        label: 'Merch' },
  { id: 'seasonal',     label: 'Seasonal' },
];
