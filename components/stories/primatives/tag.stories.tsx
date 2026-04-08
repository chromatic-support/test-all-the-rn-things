import { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useArgs } from 'storybook/preview-api';

// shared component
import { Tag, type TagProps } from '@/components/ui/primatives/tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Primatives/Tag',
  component: Tag,
  args: {
    label: 'React Native',
    selected: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Selectable: Story = {
  render: function Render(args: TagProps) {
    const [{ selected }, updateArgs] = useArgs<TagProps>();
    return (
      <Tag
        {...args}
        selected={selected ?? false}
        onPress={() => updateArgs({ selected: !selected })}
      />
    );
  },
};

export const Dismissible: Story = {
  render: function Render(args: TagProps) {
    const [{ label }, updateArgs] = useArgs<TagProps>();
    return (
      <View style={{ padding: 16 }}>
        <Tag
          {...args}
          label={label ?? 'React Native'}
          onDismiss={() => {}}
        />
      </View>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Group: Story = {
  render: function Render() {
    const tags = ['React Native', 'TypeScript', 'Expo', 'Storybook'];
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <View style={{ padding: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            selected={selected.includes(tag)}
            onPress={() =>
              setSelected((prev) =>
                prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
              )
            }
          />
        ))}
      </View>
    );
  },
};
