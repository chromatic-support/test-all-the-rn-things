import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { MapFiltersHero } from '@/components/composites/heroes/map-filters';
// mock data
import { mockMapFilters } from '@/data/mocks/filters';

const meta: Meta<typeof MapFiltersHero> = {
  title: 'Composites/Heroes/MapFilters',
  component: MapFiltersHero,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    return (
      <MapFiltersHero
        searchValue={search}
        onSearchChange={setSearch}
        onSearchClear={() => setSearch('')}
        filters={mockMapFilters}
        activeFilterId={activeFilter}
        onFilterPress={setActiveFilter}
      />
    );
  },
};

export const WithSearchValue: Story = {
  render: () => {
    const [search, setSearch] = useState('downtown');
    const [activeFilter, setActiveFilter] = useState('all');
    return (
      <MapFiltersHero
        searchValue={search}
        onSearchChange={setSearch}
        onSearchClear={() => setSearch('')}
        filters={mockMapFilters}
        activeFilterId={activeFilter}
        onFilterPress={setActiveFilter}
      />
    );
  },
};

export const WithActiveFilter: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('drive-thru');
    return (
      <MapFiltersHero
        searchValue={search}
        onSearchChange={setSearch}
        onSearchClear={() => setSearch('')}
        filters={mockMapFilters}
        activeFilterId={activeFilter}
        onFilterPress={setActiveFilter}
      />
    );
  },
};

export const NoFilters: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    return (
      <MapFiltersHero
        searchValue={search}
        onSearchChange={setSearch}
        onSearchClear={() => setSearch('')}
        filters={[]}
        onFilterPress={() => {}}
      />
    );
  },
};
