import type { NavDrawerItem } from '@/components/ui/navigation/mobile-nav-drawer';

export const ITEMS: Omit<NavDrawerItem, 'onPress'>[] = [
  { label: 'Home', icon: 'home', active: true },
  { label: 'Explore', icon: 'explore' },
  { label: 'Notifications', icon: 'notifications' },
  { label: 'Profile', icon: 'person' },
  { label: 'Settings', icon: 'settings' },
];

export const MONSTERA_ITEMS_BASE: Omit<NavDrawerItem, 'onPress'>[] = [
  { label: 'Home', icon: 'home', active: true },
  { label: 'Flavors', icon: 'bubble-chart' },
  { label: 'Shop', icon: 'shopping-bag' },
  { label: 'Find', icon: 'near-me' },
  { label: 'About', icon: 'info-outline' },
  { label: 'Rewards', icon: 'star' },
  { label: 'Cart', icon: 'shopping-cart' },
  { label: 'Contact', icon: 'mail-outline' },
];
