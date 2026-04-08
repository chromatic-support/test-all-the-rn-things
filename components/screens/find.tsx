import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

// shared component
import { FindScreen as FindTemplate } from '@/components/ui/layout/screen-templates/find';
// shared component
import { MapFiltersHero } from '@/components/composites/heroes/map-filters';
import type { MapFilterItem } from '@/components/composites/heroes/map-filters';
// shared component
import { FindMap } from '@/components/composites/find/map';
// shared component
import { StoreResults } from '@/components/composites/find/store-results';
import type { StoreLocation } from '@/components/composites/find/store-results';
// shared utility
import { findNearbyLocations } from '@/utils/find';
// data
import DEFAULT_LOCATIONS from '@/data/locations.json';

const DEFAULT_FILTERS: MapFilterItem[] = [
  { id: 'all', label: 'All' },
  { id: '5mi', label: 'Within 5 miles' },
  { id: '10mi', label: 'Within 10 miles' },
  { id: '25mi', label: 'Within 25 miles' },
  { id: '50mi', label: 'Within 50 miles' },
];

const SEARCH_DEBOUNCE_MS = 400;
const IS_ANDROID = Platform.OS === 'android';

type FindProps = {
  locations?: StoreLocation[];
  initialSearch?: string;
  initialFilter?: string;
};

export function Find({
  locations = DEFAULT_LOCATIONS,
  initialSearch = '',
  initialFilter = 'all',
}: FindProps = {}) {
  const [search, setSearch] = useState(initialSearch);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [filteredLocations, setFilteredLocations] = useState<StoreLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>();

  useEffect(() => {
    if (!search.trim()) {
      setFilteredLocations([]);
      setSelectedLocationId(undefined);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        // Android: skip geocoding (expo-location unreliable on emulators) and
        // use text search only. iOS uses the platform geocoder for distance search.
        const results = await findNearbyLocations(search, locations, activeFilter, {
          textSearchOnly: IS_ANDROID,
        });
        if (!cancelled) {
          setFilteredLocations(results);
          if (results.length === 0) setSelectedLocationId(undefined);
        }
      } catch {
        if (!cancelled) setFilteredLocations([]);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search, activeFilter, locations]);

  return (
    <FindTemplate
      hero={
        <MapFiltersHero
          searchValue={search}
          onSearchChange={setSearch}
          onSearchClear={() => setSearch('')}
          filters={DEFAULT_FILTERS}
          activeFilterId={activeFilter}
          onFilterPress={setActiveFilter}
        />
      }
      map={
        IS_ANDROID ? undefined : (
          <FindMap
            locations={filteredLocations}
            selectedLocationId={selectedLocationId}
            onLocationPress={setSelectedLocationId}
          />
        )
      }
      results={
        <StoreResults
          locations={filteredLocations}
          selectedLocationId={selectedLocationId}
          onLocationPress={setSelectedLocationId}
        />
      }
    />
  );
}
