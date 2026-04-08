import React from 'react';

// shared component
import { FlavorsDetailScreen } from '@/components/ui/layout/screen-templates/flavors-detail';
// shared component
import { Image } from '@/components/ui/primatives/image';
// shared component
import { FlavorInfo } from '@/components/composites/flavors-detail/flavor-info';
// shared component
import { FlavorActions } from '@/components/composites/flavors-detail/actions';
// shared context
import { useFavorites } from '@/context/favorites';

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

export type Flavor = {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  calories?: number;
};

type Props = {
  flavor: Flavor;
  onShare?: () => void;
  onInShop?: () => void;
};

export function FlavorsDetail({ flavor, onShare, onInShop }: Props) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(flavor.id);

  return (
    <FlavorsDetailScreen
      image={
        <Image
          source={FLAVOR_IMAGES[flavor.id]}
          width={0}
          height={320}
          variant="hero"
          accessibilityLabel={flavor.name}
          isFavorited={favorited}
          onFavorite={() => toggleFavorite(flavor.id)}
        />
      }
      info={
        <FlavorInfo
          name={flavor.name}
          description={flavor.description}
          tags={flavor.tags}
          calories={flavor.calories}
        />
      }
      actions={
        <FlavorActions
          isFavorited={favorited}
          onFavorite={() => toggleFavorite(flavor.id)}
          onShare={onShare ?? (() => {})}
          onInShop={onInShop ?? (() => {})}
        />
      }
    />
  );
}
