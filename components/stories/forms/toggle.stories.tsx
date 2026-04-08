import type { Meta, StoryObj } from "@storybook/react-native";
import { useArgs } from "storybook/preview-api";

// shared component
import { Toggle } from "@/components/ui/forms/toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Forms/Toggle",
  component: Toggle,
  args: {
    label: "Enable notifications",
    value: false,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<typeof args>();
    return (
      <Toggle
        {...args}
        value={value ?? false}
        onValueChange={(val: boolean) => updateArgs({ value: val })}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Off: Story = {};

export const On: Story = {
  args: { value: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledOn: Story = {
  args: { value: true, disabled: true },
};
