import { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useArgs } from 'storybook/preview-api';

// shared component
import { PrimaryNav, type PrimaryNavItem } from '@/components/ui/navigation/primary-nav';
// shared component
import { MobileNavDrawer, type NavDrawerItem } from '@/components/ui/navigation/mobile-nav-drawer';
// story component
import { MonsteraDrawerTitle } from './mobile-nav-drawer.stories';
// shared nav items
import { MONSTERA_ITEMS_BASE } from '@/navigation/nav-items';

const ITEMS: Omit<PrimaryNavItem, 'onPress'>[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'explore', label: 'Explore', icon: 'explore' },
  { key: 'notifications', label: 'Alerts', icon: 'notifications' },
  { key: 'profile', label: 'Profile', icon: 'person' },
];

const meta: Meta<typeof PrimaryNav> = {
  title: 'Components/Navigation/PrimaryNav',
  component: PrimaryNav,
  args: {
    items: ITEMS as PrimaryNavItem[],
    activeKey: 'home',
  },
  render: function Render(args) {
    const [{ activeKey }, updateArgs] = useArgs<typeof args>();
    const items = ITEMS.map((item) => ({
      ...item,
      onPress: () => updateArgs({ activeKey: item.key }),
    }));
    return <PrimaryNav {...args} activeKey={activeKey} items={items} />;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const NoIcons: Story = {
  args: {
    items: ITEMS.map(({ icon: _icon, ...item }) => item) as PrimaryNavItem[],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      { key: 'home', label: 'Home', icon: 'home' },
      { key: 'explore', label: 'Explore', icon: 'explore' },
      { key: 'trending', label: 'Trending', icon: 'trending-up' },
      { key: 'saved', label: 'Saved', icon: 'bookmark' },
      { key: 'profile', label: 'Profile', icon: 'person' },
      { key: 'settings', label: 'Settings', icon: 'settings' },
    ] as PrimaryNavItem[],
    activeKey: 'trending',
  },
};

// --- Monstera Nav ---

export const MonsteraNav: Story = {
  render: function Render() {
    const [activeKey, setActiveKey] = useState('home');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const close = () => setDrawerOpen(false);

    const TRACKED_KEYS = ['home', 'flavors', 'shop', 'find'];
    const drawerItems: NavDrawerItem[] = MONSTERA_ITEMS_BASE.map((item: Omit<NavDrawerItem, 'onPress'>) => {
      const key = item.label.toLowerCase();
      const tracked = TRACKED_KEYS.includes(key);
      return {
        ...item,
        active: tracked ? activeKey === key : undefined,
        onPress: tracked ? () => { setActiveKey(key); close(); } : close,
      };
    });

    const navItems: PrimaryNavItem[] = [
      { key: 'flavors', label: 'Flavors', icon: 'bubble-chart', onPress: () => setActiveKey('flavors') },
      { key: 'shop', label: 'Shop', icon: 'shopping-bag', onPress: () => setActiveKey('shop') },
      { key: 'home', label: 'Home', image: require('../../../assets/img/leaf.png') as number, onPress: () => setActiveKey('home') },
      { key: 'find', label: 'Find', icon: 'near-me', onPress: () => setActiveKey('find') },
      { key: 'more', label: 'More', icon: 'menu', onPress: () => setDrawerOpen(true) },
    ];

    return (
      <View>
        <PrimaryNav items={navItems} activeKey={activeKey} />
        <MobileNavDrawer
          visible={drawerOpen}
          onClose={close}
          items={drawerItems}
          title={<MonsteraDrawerTitle />}
        />
      </View>
    );
  },
};
