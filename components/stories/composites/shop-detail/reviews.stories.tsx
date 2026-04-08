import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';

// shared component
import { Reviews } from '@/components/composites/shop-detail/reviews';
// shared theme constants
import { Spacing } from '@/constants/theme';

const meta: Meta<typeof Reviews> = {
  title: 'Composites/ShopDetail/Reviews',
  component: Reviews,
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
    averageRating: 4.2,
    reviewCount: 128,
    onSeeAll: () => {},
  },
};

export const HighRating: Story = {
  args: {
    averageRating: 4.8,
    reviewCount: 342,
    onSeeAll: () => {},
  },
};

export const FewReviews: Story = {
  args: {
    averageRating: 3.5,
    reviewCount: 7,
    onSeeAll: () => {},
  },
};

export const SingleReview: Story = {
  args: {
    averageRating: 5.0,
    reviewCount: 1,
    onSeeAll: () => {},
  },
};

export const NoReviews: Story = {
  args: {
    averageRating: 0,
    reviewCount: 0,
  },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
