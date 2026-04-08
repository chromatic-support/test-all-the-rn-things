import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// shared component
import { AppShell } from "@/components/ui/layout/app-shell";
// shared theme constants
import { FontSize, FontWeight, Palette } from "@/constants/theme";
// shared component
import {
  PrimaryNav,
  type PrimaryNavItem,
} from "@/components/ui/navigation/primary-nav";
// shared component
import {
  MobileNavDrawer,
  type NavDrawerItem,
} from "@/components/ui/navigation/mobile-nav-drawer";
// shared nav items
import { MONSTERA_ITEMS_BASE } from "@/navigation/nav-items";
// shared component
import { Header } from "@/components/ui/navigation/header";
// shared component
import { Find } from "@/components/screens/find";
// shared component
import { Home, type HomeUser } from "@/components/screens/home";
// shared component
import { FlavorsDetail } from "@/components/screens/flavors-detail";
// mock data
import mockUser from "@/data/mocks/user";
// data
import flavorsData from "@/data/flavors.json";
// story component
import { MonsteraDrawerTitle } from "../navigation/mobile-nav-drawer.stories";
// story component
import {
  MonsteraLogoHeaderComponent,
  WithBackAndActionsComponent,
} from "../navigation/header.stories";
// story component
import { DefaultFooterComponent } from "../navigation/footer.stories";


function SampleContent({ label }: { label: string }) {
  return (
    <View style={styles.content}>
      <Text style={styles.contentLabel}>{label}</Text>
    </View>
  );
}

function MonsteraNavBar({ initialActiveKey = "home" }: { initialActiveKey?: string }) {
  const [activeKey, setActiveKey] = useState(initialActiveKey);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const close = () => setDrawerOpen(false);

  const TRACKED_KEYS = ["home", "flavors", "shop", "find"];
  const drawerItems: NavDrawerItem[] = MONSTERA_ITEMS_BASE.map(
    (item: Omit<NavDrawerItem, "onPress">) => {
      const key = item.label.toLowerCase();
      const tracked = TRACKED_KEYS.includes(key);
      return {
        ...item,
        active: tracked ? activeKey === key : undefined,
        onPress: tracked
          ? () => {
              setActiveKey(key);
              close();
            }
          : close,
      };
    },
  );

  const navItems: PrimaryNavItem[] = [
    {
      key: "flavors",
      label: "Flavors",
      icon: "bubble-chart",
      onPress: () => setActiveKey("flavors"),
    },
    {
      key: "shop",
      label: "Shop",
      icon: "shopping-bag",
      onPress: () => setActiveKey("shop"),
    },
    {
      key: "home",
      label: "Home",
      image: require("../../../assets/img/leaf.png") as number,
      onPress: () => setActiveKey("home"),
    },
    {
      key: "find",
      label: "Find",
      icon: "near-me",
      onPress: () => setActiveKey("find"),
    },
    {
      key: "more",
      label: "More",
      icon: "menu",
      onPress: () => setDrawerOpen(true),
    },
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
}

const meta: Meta<typeof AppShell> = {
  title: "Components/Layout/AppShell",
  component: AppShell,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => (
    <AppShell>
      <SampleContent label="No header or footer" />
    </AppShell>
  ),
};

export const WithNav: Story = {
  render: () => (
    <AppShell nav={<MonsteraNavBar initialActiveKey="find" />}>
      <Find />
    </AppShell>
  ),
};

const MONSTERA_ORIGINAL = flavorsData.find((f: { id: string }) => f.id === "monstera-original")!;

export const WithHeader: Story = {
  render: () => (
    <AppShell header={<Header title={MONSTERA_ORIGINAL.name} onBack={() => {}} />}>
      <FlavorsDetail flavor={MONSTERA_ORIGINAL} />
    </AppShell>
  ),
};

export const WithNavAndHeader: Story = {
  render: () => (
    <AppShell nav={<MonsteraNavBar />} header={<MonsteraLogoHeaderComponent />}>
      <Home user={mockUser as HomeUser} />
    </AppShell>
  ),
};

export const WithNavAndHeaderNoUser: Story = {
  render: () => (
    <AppShell nav={<MonsteraNavBar />} header={<MonsteraLogoHeaderComponent />}>
      <Home />
    </AppShell>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <AppShell
      header={<WithBackAndActionsComponent />}
      footer={<DefaultFooterComponent />}
    >
      <SampleContent label="Content area" />
    </AppShell>
  ),
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${Palette.brand}18`,
  },
  contentLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    opacity: 0.6,
  },
});
