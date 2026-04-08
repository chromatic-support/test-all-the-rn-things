import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';

// shared component
import { HomeRecommendations } from '@/components/composites/home/recommendations';
// mock data
import mockRecommendations from '@/data/mocks/recommendations';

const meta: Meta<typeof HomeRecommendations> = {
  title: 'Composites/Home/Recommendations',
  component: HomeRecommendations,
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
  render: () => <HomeRecommendations items={mockRecommendations} />,
};

export const WithTags: Story = {
  render: () => (
    <HomeRecommendations items={mockRecommendations.filter((item) => item.tag != null)} />
  ),
};

export const SingleItem: Story = {
  render: () => <HomeRecommendations items={mockRecommendations.slice(0, 1)} />,
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
});
