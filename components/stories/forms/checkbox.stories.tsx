import type { Meta, StoryObj } from "@storybook/react-native";
import { useArgs } from "storybook/preview-api";

// shared component
import { Checkbox } from "@/components/ui/forms/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Forms/Checkbox",
  component: Checkbox,
  args: {
    label: "Accept terms and conditions",
    checked: false,
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs<typeof args>();
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(val: boolean) => updateArgs({ checked: val })}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true },
};
