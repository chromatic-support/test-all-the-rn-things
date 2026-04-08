import { View, StyleSheet } from "react-native";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-native";
import { useArgs } from "storybook/preview-api";

// shared component
import { Radio } from "@/components/ui/forms/radio";
// shared theme constants
import { Spacing } from "@/constants/theme";

const meta: Meta<typeof Radio> = {
  title: "Components/Forms/Radio",
  component: Radio,
  args: {
    label: "Option A",
    selected: false,
  },
  render: function Render(args) {
    const [{ selected }, updateArgs] = useArgs<typeof args>();
    return (
      <Radio
        {...args}
        selected={selected}
        onSelect={() => updateArgs({ selected: true })}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledSelected: Story = {
  args: { selected: true, disabled: true },
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    const options = [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
      { value: "c", label: "Option C" },
    ];
    return (
      <View style={styles.group}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            label={opt.label}
            selected={value === opt.value}
            onSelect={() => setValue(opt.value)}
          />
        ))}
      </View>
    );
  },
};

const styles = StyleSheet.create({
  group: {
    gap: Spacing[2],
  },
});
