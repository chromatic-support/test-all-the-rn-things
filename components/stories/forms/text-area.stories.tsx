import type { Meta, StoryObj } from "@storybook/react-native";
import { useArgs } from "storybook/preview-api";

// shared component
import { TextArea } from "@/components/ui/forms/text-area";

const meta: Meta<typeof TextArea> = {
  title: "Components/Forms/TextArea",
  component: TextArea,
  args: {
    value: "",
    placeholder: "Enter a description…",
    accessibilityLabel: "Description",
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<typeof args>();
    return (
      <TextArea
        {...args}
        value={value ?? ""}
        onChangeText={(val: string) => updateArgs({ value: val })}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Empty: Story = {};

export const WithValue: Story = {
  args: {
    value:
      "This is some multi-line content that has already been entered into the text area.",
  },
};

export const Tall: Story = {
  args: { numberOfLines: 8 },
};

export const Disabled: Story = {
  args: {
    value: "This field cannot be edited.",
    editable: false,
  },
};
