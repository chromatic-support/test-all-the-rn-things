import type { StoreLocation } from '@/components/composites/find/store-results';

const RANGE_MILES: Record<string, number> = {
  all: 250,
  '5mi': 5,
  '10mi': 10,
  '25mi': 25,
  '50mi': 50,
};

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type Coordinates = { latitude: number; longitude: number };

async function geocodeLocation(query: string): Promise<Coordinates | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'test-all-the-rn-things/1.0',
      },
    });
    if (!response.ok) {
      console.warn('[find] Nominatim returned', response.status);
      return null;
    }
    const results: { lat: string; lon: string }[] = await response.json();
    if (!results.length) {
      console.warn('[find] Nominatim returned no results for:', query);
      return null;
    }
    return { latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) };
  } catch (e) {
    console.warn('[find] Geocoding failed:', e);
    return null;
  }
}

function textSearch(locations: StoreLocation[], query: string): StoreLocation[] {
  const q = query.toLowerCase();
  return locations.filter(({ name, address }) =>
    `${name} ${address}`.toLowerCase().includes(q)
  );
}

/**
 * Geocodes the search query, calculates the distance from that point to each
 * store location using the haversine formula, and returns locations within the
 * selected range sorted nearest-first.
 *
 * Falls back to text search against name + address if geocoding is unavailable.
 * When search is empty, all locations are returned without distance values.
 * Range filtering only applies when a geocoded origin is resolved.
 */
export async function findNearbyLocations(
  search: string,
  locations: StoreLocation[],
  rangeFilter: string,
  { textSearchOnly = false }: { textSearchOnly?: boolean } = {}
): Promise<StoreLocation[]> {
  const query = search.trim();

  if (!query) {
    return locations.map(({ distance: _, ...rest }) => rest);
  }

  if (textSearchOnly) {
    return textSearch(locations, query);
  }

  const maxRange = RANGE_MILES[rangeFilter] ?? Infinity;
  const origin = await geocodeLocation(query);

  if (!origin) {
    return textSearch(locations, query);
  }

  return locations
    .map((location) => {
      const miles = haversineDistance(
        origin.latitude,
        origin.longitude,
        location.latitude,
        location.longitude
      );
      return { ...location, distance: `${miles.toFixed(1)} mi` };
    })
    .filter(({ distance }) => parseFloat(distance!) <= maxRange)
    .sort((a, b) => parseFloat(a.distance!) - parseFloat(b.distance!));
}
