import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useArgs } from 'storybook/preview-api';

// shared component
import { Tooltip, type TooltipProps } from '@/components/ui/overlays/tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Overlays/Tooltip',
  component: Tooltip,
  args: {
    content: 'This is a helpful tip.',
    visible: false,
    placement: 'top',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: function Render(args: TooltipProps) {
    const [{ visible }, updateArgs] = useArgs<TooltipProps>();
    return (
      <View style={styles.center}>
        <Tooltip {...args} visible={visible ?? false}>
          <Pressable
            onPress={() => updateArgs({ visible: !visible })}
            accessibilityRole="button"
            accessibilityLabel="Toggle tooltip"
            style={({ pressed }) => [styles.anchor, pressed ? styles.pressed : null]}
          >
            <Text style={styles.anchorText}>Tap me</Text>
          </Pressable>
        </Tooltip>
      </View>
    );
  },
};

export const Top: Story = {
  render: function Render(args: TooltipProps) {
    const [visible, setVisible] = useState(true);
    return (
      <View style={styles.center}>
        <Tooltip {...args} content="Tooltip above" visible={visible} placement="top">
          <Pressable
            onPress={() => setVisible((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel="Toggle tooltip"
            style={({ pressed }) => [styles.anchor, pressed ? styles.pressed : null]}
          >
            <Text style={styles.anchorText}>Anchor</Text>
          </Pressable>
        </Tooltip>
      </View>
    );
  },
};

export const Bottom: Story = {
  render: function Render(args: TooltipProps) {
    const [visible, setVisible] = useState(true);
    return (
      <View style={styles.center}>
        <Tooltip {...args} content="Tooltip below" visible={visible} placement="bottom">
          <Pressable
            onPress={() => setVisible((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel="Toggle tooltip"
            style={({ pressed }) => [styles.anchor, pressed ? styles.pressed : null]}
          >
            <Text style={styles.anchorText}>Anchor</Text>
          </Pressable>
        </Tooltip>
      </View>
    );
  },
};

export const Left: Story = {
  render: function Render(args: TooltipProps) {
    const [visible, setVisible] = useState(true);
    return (
      <View style={styles.center}>
        <Tooltip {...args} content="Tooltip to the left" visible={visible} placement="left">
          <Pressable
            onPress={() => setVisible((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel="Toggle tooltip"
            style={({ pressed }) => [styles.anchor, pressed ? styles.pressed : null]}
          >
            <Text style={styles.anchorText}>Anchor</Text>
          </Pressable>
        </Tooltip>
      </View>
    );
  },
};

export const Right: Story = {
  render: function Render(args: TooltipProps) {
    const [visible, setVisible] = useState(true);
    return (
      <View style={styles.center}>
        <Tooltip {...args} content="Tooltip to the right" visible={visible} placement="right">
          <Pressable
            onPress={() => setVisible((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel="Toggle tooltip"
            style={({ pressed }) => [styles.anchor, pressed ? styles.pressed : null]}
          >
            <Text style={styles.anchorText}>Anchor</Text>
          </Pressable>
        </Tooltip>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  anchor: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F89980',
    borderRadius: 8,
  },
  anchorText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
