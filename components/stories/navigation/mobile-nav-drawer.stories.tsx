import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Button, View } from "react-native";
import { useArgs } from "storybook/preview-api";

// shared component
import {
  MobileNavDrawer,
  type MobileNavDrawerProps,
  type NavDrawerItem,
} from "@/components/ui/navigation/mobile-nav-drawer";
// shared component
import { Image } from "@/components/ui/primatives/image";
// shared nav items
import { ITEMS, MONSTERA_ITEMS_BASE } from "@/navigation/nav-items";

export function MonsteraDrawerTitle() {
  return (
    <View
      style={{
        width: 180,
        height: 80,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
      <Image
        source={require("../../../assets/img/logo-vertical.png")}
        width={180}
        height={180}
        accessibilityLabel="Monstera"
        resizeMode="contain"
        background="transparent"
      />
    </View>
  );
}

function makeItems(onClose: () => void): NavDrawerItem[] {
  return ITEMS.map((item) => ({ ...item, onPress: onClose }));
}

const meta: Meta<typeof MobileNavDrawer> = {
  title: "Components/Navigation/MobileNavDrawer",
  component: MobileNavDrawer,
  args: {
    visible: false,
    items: ITEMS as NavDrawerItem[],
    title: "My App",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: function Render(args: MobileNavDrawerProps) {
    const [{ visible }, updateArgs] = useArgs<MobileNavDrawerProps>();
    const close = () => updateArgs({ visible: false });
    return (
      <View style={{ padding: 16 }}>
        <Button
          title="Open Drawer"
          onPress={() => updateArgs({ visible: true })}
        />
        <MobileNavDrawer
          {...args}
          visible={visible ?? false}
          items={makeItems(close)}
          onClose={close}
        />
      </View>
    );
  },
};

export const Open: Story = {
  render: function Render(args: MobileNavDrawerProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <MobileNavDrawer
        {...args}
        visible={visible}
        items={makeItems(close)}
        onClose={close}
      />
    );
  },
};

export const OpenNoTitle: Story = {
  render: function Render(args: MobileNavDrawerProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <MobileNavDrawer
        {...args}
        visible={visible}
        title={undefined}
        items={makeItems(close)}
        onClose={close}
      />
    );
  },
};

export const OpenNoIcons: Story = {
  render: function Render(args: MobileNavDrawerProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    const items = ITEMS.map(({ icon: _icon, ...item }) => ({
      ...item,
      onPress: close,
    }));
    return (
      <MobileNavDrawer
        {...args}
        visible={visible}
        items={items}
        onClose={close}
      />
    );
  },
};

export const MonsteraOpen: Story = {
  render: function Render(args: MobileNavDrawerProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return (
      <MobileNavDrawer
        {...args}
        visible={visible}
        title={<MonsteraDrawerTitle />}
        items={MONSTERA_ITEMS_BASE.map((item) => ({ ...item, onPress: close }))}
        onClose={close}
      />
    );
  },
};
