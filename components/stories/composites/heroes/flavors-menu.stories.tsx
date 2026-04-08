import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { FlavorsMenuHero } from '@/components/composites/heroes/flavors-menu';
// mock data
import { mockFlavorsMenuFilters } from '@/data/mocks/filters';

const meta: Meta<typeof FlavorsMenuHero> = {
  title: 'Composites/Heroes/FlavorsMenu',
  component: FlavorsMenuHero,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => {
    const [activeFilter, setActiveFilter] = useState('all');
    return (
      <FlavorsMenuHero
        filters={mockFlavorsMenuFilters}
        activeFilterId={activeFilter}
        onFilterPress={setActiveFilter}
      />
    );
  },
};

export const WithActiveFilter: Story = {
  render: () => {
    const [activeFilter, setActiveFilter] = useState('seasonal');
    return (
      <FlavorsMenuHero
        filters={mockFlavorsMenuFilters}
        activeFilterId={activeFilter}
        onFilterPress={setActiveFilter}
      />
    );
  },
};
