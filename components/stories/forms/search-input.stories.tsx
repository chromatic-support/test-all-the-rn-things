import type { Meta, StoryObj } from "@storybook/react-native";
import { useArgs } from "storybook/preview-api";

// shared component
import { SearchInput } from "@/components/ui/forms/search-input";

const meta: Meta<typeof SearchInput> = {
  title: "Components/Forms/SearchInput",
  component: SearchInput,
  args: {
    value: "",
    placeholder: "Search",
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<typeof args>();
    return (
      <SearchInput
        {...args}
        value={value ?? ""}
        onChangeText={(val: string) => updateArgs({ value: val })}
        onClear={() => updateArgs({ value: "" })}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Empty: Story = {};

export const WithValue: Story = {
  args: { value: "React Native" },
};
