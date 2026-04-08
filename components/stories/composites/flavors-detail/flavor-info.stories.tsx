import { View, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { FlavorInfo } from '@/components/composites/flavors-detail/flavor-info';
// shared theme constants
import { Spacing } from '@/constants/theme';

const meta: Meta<typeof FlavorInfo> = {
  title: 'Composites/FlavorsDetail/FlavorInfo',
  component: FlavorInfo,
  decorators: [
    (Story) => (
      <View style={styles.wrapper}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  args: {
    name: 'Peach Mango',
    description:
      'A bright and tropical blend of sun-ripened peaches and juicy mango. Sweet, refreshing, and perfect for any time of day.',
    tags: ['Seasonal', 'Fan Favorite'],
    calories: 120,
  },
};

export const WithManyTags: Story = {
  args: {
    name: 'Mint Chip',
    description:
      'Cool peppermint swirled with rich chocolate chips. A classic combination that never goes out of style.',
    tags: ['Year Round', 'Contains Dairy', 'Contains Gluten'],
    calories: 210,
  },
};

export const NoTagsNoCalories: Story = {
  args: {
    name: 'Strawberry Lemon',
    description:
      'Tangy lemon meets sweet strawberry in this vibrant, crowd-pleasing flavor.',
  },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
