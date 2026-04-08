import type { Meta, StoryObj } from "@storybook/react-native";

// shared component
import { Button } from "@/components/ui/primatives/button";

const meta: Meta<typeof Button> = {
  title: "Components/Primatives/Button",
  component: Button,
  args: {
    label: "Button",
    onPress: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    variant: "secondary",
    disabled: true,
  },
};
