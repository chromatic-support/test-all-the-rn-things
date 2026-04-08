import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Find } from '@/components/screens/find';
// mock data
import mockLocations from '@/data/mocks/locations';

const meta: Meta<typeof Find> = {
  title: 'Screens/Find',
  component: Find,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const WithResults: Story = {
  args: { locations: mockLocations },
};

export const WithSearch: Story = {
  args: {
    locations: mockLocations,
    initialSearch: 'San Francisco, CA',
  },
};

export const WithRangeFilter: Story = {
  args: {
    locations: mockLocations,
    initialSearch: 'San Francisco, CA',
    initialFilter: '5mi',
  },
};
