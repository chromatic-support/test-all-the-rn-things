import React, { useState } from 'react';

// shared component
import { FlavorsMenuScreen, type FlavorItem } from '@/components/ui/layout/screen-templates/flavors-menu';
// shared component
import { FlavorsMenuHero, type FlavorsMenuFilterItem } from '@/components/composites/heroes/flavors-menu';
// data
import flavorsData from '@/data/flavors.json';

const FLAVOR_IMAGES: Record<string, number> = {
  'bae-root': require('@/assets/img/flavors/bae-root.png'),
  'chai-constellation': require('@/assets/img/flavors/chai-constellation.png'),
  'date-night-special': require('@/assets/img/flavors/date-night-special.png'),
  'half-moon': require('@/assets/img/flavors/half-moon.png'),
  'monstera-original': require('@/assets/img/flavors/monstera-original.png'),
  'peach-princess': require('@/assets/img/flavors/peach-princess.png'),
  'peru-passion': require('@/assets/img/flavors/peru-passion.png'),
  'watermelon': require('@/assets/img/flavors/watermelon.png'),
};

const FILTERS: FlavorsMenuFilterItem[] = [
  { id: 'all', label: 'All' },
  { id: 'seasonal', label: 'Seasonal' },
  { id: 'year-round', label: 'Year Round' },
  { id: 'fan-favorite', label: 'Fan Favorite' },
  { id: 'limited', label: 'Limited Edition' },
  { id: 'dairy-free', label: 'Dairy-Free' },
];

const FILTER_TAG_MAP: Record<string, string> = {
  'seasonal': 'Seasonal',
  'year-round': 'Year Round',
  'fan-favorite': 'Fan Favorite',
  'limited': 'Limited Edition',
  'dairy-free': 'Dairy-Free',
};

type FlavorsMenuProps = {
  onFlavorPress?: (id: string) => void;
};

export function FlavorsMenu({ onFlavorPress }: FlavorsMenuProps = {}) {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleFlavors =
    activeFilter === 'all'
      ? flavorsData
      : flavorsData.filter((f) => f.tags.includes(FILTER_TAG_MAP[activeFilter] ?? ''));

  const items: FlavorItem[] = visibleFlavors.map((flavor) => ({
    label: flavor.name,
    image: FLAVOR_IMAGES[flavor.id],
    onPress: onFlavorPress ? () => onFlavorPress(flavor.id) : undefined,
  }));

  return (
    <FlavorsMenuScreen
      hero={
        <FlavorsMenuHero
          filters={FILTERS}
          activeFilterId={activeFilter}
          onFilterPress={setActiveFilter}
        />
      }
      items={items}
    />
  );
}
