import { TextInput, StyleSheet } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native";

// shared component
import { FormField } from "@/components/ui/forms/form-field";
// shared theme constants
import { Palette, Spacing } from "@/constants/theme";

const styles = StyleSheet.create({
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Palette.gray300,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
  },
});

const emailInput = (
  <TextInput
    placeholder="Enter your email"
    keyboardType="email-address"
    autoCapitalize="none"
    style={styles.input}
    accessibilityLabel="Email address"
  />
);

const meta: Meta<typeof FormField> = {
  title: "Components/Forms/FormField",
  component: FormField,
  args: {
    label: "Email address",
  },
  render: (args) => <FormField {...args}>{emailInput}</FormField>,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: "We'll never share your email with anyone.",
  },
};

export const WithError: Story = {
  args: {
    error: "Please enter a valid email address.",
  },
};
