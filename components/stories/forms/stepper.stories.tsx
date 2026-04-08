import type { Meta, StoryObj } from "@storybook/react-native";
import { useArgs } from "storybook/preview-api";

// shared component
import { Stepper } from "@/components/ui/forms/stepper";

const meta: Meta<typeof Stepper> = {
  title: "Components/Forms/Stepper",
  component: Stepper,
  args: {
    value: 1,
    min: 0,
    step: 1,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<typeof args>();
    return (
      <Stepper
        {...args}
        value={value ?? 1}
        onChange={(val: number) => updateArgs({ value: val })}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const AtMinimum: Story = {
  args: { value: 0 },
};

export const AtMaximum: Story = {
  args: { value: 10, max: 10 },
};

export const Disabled: Story = {
  args: { disabled: true },
};
