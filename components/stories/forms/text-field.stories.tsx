import type { Meta, StoryObj } from "@storybook/react-native";
import { useArgs } from "storybook/preview-api";

// shared component
import { TextField } from "@/components/ui/forms/text-field";

const meta: Meta<typeof TextField> = {
  title: "Components/Forms/TextField",
  component: TextField,
  args: {
    value: "",
    placeholder: "Enter text",
    accessibilityLabel: "Text input",
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<typeof args>();
    return (
      <TextField
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

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: "Hello world" },
};

export const Email: Story = {
  args: {
    placeholder: "Enter your email",
    accessibilityLabel: "Email",
    keyboardType: "email-address",
    autoCapitalize: "none",
    autoCorrect: false,
    autoComplete: "email",
    textContentType: "emailAddress",
  },
};

export const Password: Story = {
  args: {
    placeholder: "Enter your password",
    accessibilityLabel: "Password",
    secureTextEntry: true,
    autoCapitalize: "none",
    autoCorrect: false,
    autoComplete: "password",
    textContentType: "password",
  },
};

export const Disabled: Story = {
  args: {
    value: "Cannot be changed",
    editable: false,
  },
};
