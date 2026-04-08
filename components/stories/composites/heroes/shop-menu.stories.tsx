import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { ShopMenuHero } from '@/components/composites/heroes/shop-menu';
// mock data
import { mockShopCategories } from '@/data/mocks/filters';

const meta: Meta<typeof ShopMenuHero> = {
  title: 'Composites/Heroes/ShopMenu',
  component: ShopMenuHero,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    return (
      <ShopMenuHero
        searchValue={search}
        onSearchChange={setSearch}
        onSearchClear={() => setSearch('')}
        categories={mockShopCategories}
        activeCategoryId={activeCategory}
        onCategoryPress={setActiveCategory}
      />
    );
  },
};

export const WithSearchValue: Story = {
  render: () => {
    const [search, setSearch] = useState('cold brew');
    const [activeCategory, setActiveCategory] = useState('all');
    return (
      <ShopMenuHero
        searchValue={search}
        onSearchChange={setSearch}
        onSearchClear={() => setSearch('')}
        categories={mockShopCategories}
        activeCategoryId={activeCategory}
        onCategoryPress={setActiveCategory}
      />
    );
  },
};

export const WithActiveCategory: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('new');
    return (
      <ShopMenuHero
        searchValue={search}
        onSearchChange={setSearch}
        onSearchClear={() => setSearch('')}
        categories={mockShopCategories}
        activeCategoryId={activeCategory}
        onCategoryPress={setActiveCategory}
      />
    );
  },
};

export const CustomTitle: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    return (
      <ShopMenuHero
        title="Our Shop"
        searchValue={search}
        onSearchChange={setSearch}
        onSearchClear={() => setSearch('')}
        categories={mockShopCategories}
        activeCategoryId={activeCategory}
        onCategoryPress={setActiveCategory}
      />
    );
  },
};
