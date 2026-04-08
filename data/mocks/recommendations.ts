// shared mock data — recommendation item fixtures for stories and testing.
import type { RecommendationItem } from '@/components/composites/home/recommendations';

const mockRecommendations: RecommendationItem[] = [
  {
    id: 'peach-princess',
    name: 'Peach Princess',
    image: require('@/assets/img/flavors/peach-princess.png'),
    tag: 'Fan Favorite',
    onPress: () => {},
  },
  {
    id: 'monstera-original',
    name: 'Monstera Original',
    image: require('@/assets/img/flavors/monstera-original.png'),
    tag: 'Year Round',
    onPress: () => {},
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    image: require('@/assets/img/flavors/watermelon.png'),
    tag: 'Seasonal',
    onPress: () => {},
  },
  {
    id: 'bae-root',
    name: 'Bae Root',
    image: require('@/assets/img/flavors/bae-root.png'),
    onPress: () => {},
  },
  {
    id: 'half-moon',
    name: 'Half Moon',
    image: require('@/assets/img/flavors/half-moon.png'),
    onPress: () => {},
  },
  {
    id: 'date-night-special',
    name: 'Date Night Special',
    image: require('@/assets/img/flavors/date-night-special.png'),
    tag: 'Limited Edition',
    onPress: () => {},
  },
];

export default mockRecommendations;
