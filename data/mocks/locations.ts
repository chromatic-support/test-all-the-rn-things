// shared mock data — sample store locations for stories and testing.
import type { StoreLocation } from '@/data/schema';

const mockLocations: StoreLocation[] = [
  {
    id: '1',
    name: 'Downtown Location',
    address: '123 Main St, San Francisco, CA 94105',
    latitude: 37.7946,
    longitude: -122.3999,
  },
  {
    id: '2',
    name: 'Mission District',
    address: '456 Valencia St, San Francisco, CA 94110',
    latitude: 37.7599,
    longitude: -122.4148,
  },
  {
    id: '3',
    name: 'Castro Store',
    address: '789 Market St, San Francisco, CA 94114',
    latitude: 37.7609,
    longitude: -122.4350,
  },
  {
    id: '4',
    name: 'North Beach',
    address: '321 Columbus Ave, San Francisco, CA 94133',
    latitude: 37.8060,
    longitude: -122.4103,
  },
];

export default mockLocations;
