import React, { useState } from 'react';
import { View } from 'react-native';
import { Slot, usePathname, useRouter } from 'expo-router';

// shared component
import { AppShell } from '@/components/ui/layout/app-shell';
// shared component
import { PrimaryNav, type PrimaryNavItem } from '@/components/ui/navigation/primary-nav';
// shared component
import { MobileNavDrawer, type NavDrawerItem } from '@/components/ui/navigation/mobile-nav-drawer';
// shared component
import { Image } from '@/components/ui/primatives/image';
// shared nav items
import { MONSTERA_ITEMS_BASE } from '@/navigation/nav-items';

const PATH_TO_KEY: Record<string, string> = {
  '/': 'home',
  '/flavors': 'flavors',
  '/shop': 'shop',
  '/find': 'find',
  '/about': 'more',
  '/rewards': 'more',
  '/cart': 'more',
  '/contact': 'more',
};

const ITEM_ROUTES: Record<string, string> = {
  home: '/',
  flavors: '/flavors',
  shop: '/shop',
  find: '/find',
  about: '/about',
  rewards: '/rewards',
  cart: '/cart',
  contact: '/contact',
};

function DrawerTitle() {
  return (
    <View style={{ width: 180, height: 80, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../../assets/img/logo-vertical.png')}
        width={180}
        height={180}
        accessibilityLabel="Monstera"
        resizeMode="contain"
        background="transparent"
      />
    </View>
  );
}

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const close = () => setDrawerOpen(false);
  const activeKey = PATH_TO_KEY[pathname] ?? 'home';

  // Cast needed until expo-router regenerates typed routes for new tab files
  const navigate = (path: string) => router.navigate(path as never);

  const navItems: PrimaryNavItem[] = [
    {
      key: 'flavors',
      label: 'Flavors',
      icon: 'bubble-chart',
      onPress: () => navigate('/flavors'),
    },
    {
      key: 'shop',
      label: 'Shop',
      icon: 'shopping-bag',
      onPress: () => navigate('/shop'),
    },
    {
      key: 'home',
      label: 'Home',
      image: require('../../assets/img/leaf.png') as number,
      onPress: () => navigate('/'),
    },
    {
      key: 'find',
      label: 'Find',
      icon: 'near-me',
      onPress: () => navigate('/find'),
    },
    {
      key: 'more',
      label: 'More',
      icon: 'menu',
      onPress: () => setDrawerOpen(true),
    },
  ];

  const drawerItems: NavDrawerItem[] = [
    ...MONSTERA_ITEMS_BASE.map((item) => {
      const key = item.label.toLowerCase();
      const route = ITEM_ROUTES[key];
      return {
        ...item,
        active: activeKey === key,
        onPress: route ? () => { navigate(route); close(); } : close,
      };
    }),
    ...(__DEV__ ? [{ label: 'Storybook', icon: 'book' as const, onPress: () => router.navigate('/storybook') }] : []),
  ];

  const isDetailPage = pathname.startsWith('/flavors/') || pathname.startsWith('/shop/');

  if (isDetailPage) {
    return <Slot />;
  }

  return (
    <AppShell
      nav={
        <View>
          <PrimaryNav items={navItems} activeKey={activeKey} />
          <MobileNavDrawer
            visible={drawerOpen}
            onClose={close}
            items={drawerItems}
            title={<DrawerTitle />}
          />
        </View>
      }
    >
      <Slot />
    </AppShell>
  );
}
