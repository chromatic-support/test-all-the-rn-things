import type { Meta, StoryObj } from "@storybook/react-native";
import { useArgs } from "storybook/preview-api";

// shared component
import { Select } from "@/components/ui/forms/select";

const OPTIONS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Mango", value: "mango" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Forms/Select",
  component: Select,
  args: {
    options: OPTIONS,
    value: null,
    placeholder: "Select a fruit",
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<typeof args>();
    return (
      <Select
        {...args}
        value={value ?? null}
        onChange={(val: string) => updateArgs({ value: val })}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Empty: Story = {};

export const WithValue: Story = {
  args: { value: "banana" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
