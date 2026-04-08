import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Accordion } from '@/components/ui/primatives/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Primatives/Accordion',
  component: Accordion,
  args: {
    title: 'What is React Native?',
    defaultOpen: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const WithLongContent: Story = {
  args: {
    title: 'How does Expo work?',
    defaultOpen: true,
  },
  render: (args) => (
    <View style={{ padding: 16 }}>
      <Accordion {...args}>
        <Text>
          Expo is an open-source platform for making universal native apps for Android, iOS, and the
          web with JavaScript and React. It provides a set of tools and services built around React
          Native that help you develop, build, deploy, and iterate on your app.
        </Text>
      </Accordion>
    </View>
  ),
};

export const Multiple: Story = {
  render: () => (
    <View style={{ padding: 16, gap: 8 }}>
      <Accordion title="Section one">
        <Text>Content for section one.</Text>
      </Accordion>
      <Accordion title="Section two" defaultOpen>
        <Text>Content for section two.</Text>
      </Accordion>
      <Accordion title="Section three">
        <Text>Content for section three.</Text>
      </Accordion>
    </View>
  ),
};
