// Purpose: Canonical Storybook CSF (Component Story Format) using named exports
// Use when: Creating stories for standard React + TypeScript components
// Notes:
// - Uses named exports (no default export for stories)
// - Uses typed Meta and StoryObj
// - Uses args for controls
// - Keeps stories simple and composable

import type { Meta, StoryObj } from "@storybook/react-native";
// @ts-expect-error: this is an example path, error expected
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Primatives/Button",
  component: Button,
  args: {
    children: "Button",
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

export const WithCustomLabel: Story = {
  args: {
    children: "Click me",
  },
};
