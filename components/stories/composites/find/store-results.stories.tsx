import { View, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { StoreResults } from '@/components/composites/find/store-results';
// shared theme constants
import { Spacing } from '@/constants/theme';
// mock data
import mockLocations from '@/data/mocks/locations';

const meta: Meta<typeof StoreResults> = {
  title: 'Composites/Find/StoreResults',
  component: StoreResults,
  args: {
    onLocationPress: () => {},
  },
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
  args: { locations: mockLocations },
};

export const WithDistance: Story = {
  args: {
    locations: mockLocations.map((loc, i) => ({
      ...loc,
      distance: `${(i + 1) * 0.8} mi`,
    })),
  },
};

export const Empty: Story = {
  args: { locations: [] },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
