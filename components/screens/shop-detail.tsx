import React, { useState } from 'react';
// shared context
import { useFavorites } from '@/context/favorites';

// shared component (screen template)
import { ShopDetailScreen } from '@/components/ui/layout/screen-templates/shop-detail';
// shared component
import { Image } from '@/components/ui/primatives/image';
// shared component
import { ProductInfo } from '@/components/composites/shop-detail/product-info';
// shared component
import { ProductVariants, type ProductVariant } from '@/components/composites/shop-detail/product-variants';
// shared component
import { Reviews } from '@/components/composites/shop-detail/reviews';
// shared component
import { AddToCart } from '@/components/composites/shop-detail/add-to-cart';
// data
import shopData from '@/data/shop.json';
import flavorsData from '@/data/flavors.json';

const HERO_HEIGHT = 320;

const FLAVOR_IMAGES: Record<string, number> = {
  'bae-root':           require('@/assets/img/flavors/bae-root.png'),
  'chai-constellation': require('@/assets/img/flavors/chai-constellation.png'),
  'date-night-special': require('@/assets/img/flavors/date-night-special.png'),
  'half-moon':          require('@/assets/img/flavors/half-moon.png'),
  'monstera-original':  require('@/assets/img/flavors/monstera-original.png'),
  'peach-princess':     require('@/assets/img/flavors/peach-princess.png'),
  'peru-passion':       require('@/assets/img/flavors/peru-passion.png'),
  'watermelon':         require('@/assets/img/flavors/watermelon.png'),
};

const FLAVOR_LOOKUP = Object.fromEntries(flavorsData.map((f) => [f.id, f]));

export type ShopDetailReviews = {
  averageRating: number;
  reviewCount: number;
};

type Props = {
  flavorId: string;
  reviews?: ShopDetailReviews;
  onAddToCart?: (variantId: string, quantity: number) => void;
  onSeeAllReviews?: () => void;
};

export function ShopDetail({
  flavorId,
  reviews,
  onAddToCart = () => {},
  onSeeAllReviews,
}: Props) {
  const flavor = FLAVOR_LOOKUP[flavorId];
  const flavorShopItems = shopData.filter((item) => item.flavorId === flavorId);

  const variants: ProductVariant[] = flavorShopItems.map((item) => ({
    id: item.id,
    label: item.variantLabel,
    price: item.price,
    salePrice: item.salePrice,
  }));

  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? '');
  const { isFavorited: isFav, toggleFavorite } = useFavorites();
  const isFavorited = isFav(flavorId);

  return (
    <ShopDetailScreen
      image={
        <Image
          source={FLAVOR_IMAGES[flavorId]}
          width={0}
          height={HERO_HEIGHT}
          accessibilityLabel={flavor.name}
          variant="hero"
          isFavorited={isFavorited}
          onFavorite={() => toggleFavorite(flavorId)}
        />
      }
      options={
        <ProductVariants
          variants={variants}
          selectedId={selectedVariantId}
          onSelect={setSelectedVariantId}
        />
      }
      reviews={
        <Reviews
          averageRating={reviews?.averageRating ?? 0}
          reviewCount={reviews?.reviewCount ?? 0}
          onSeeAll={onSeeAllReviews}
        />
      }
      addToCart={
        <AddToCart onAddToCart={(qty) => onAddToCart(selectedVariantId, qty)} />
      }
      info={
        <ProductInfo
          name={flavor.name}
          description={flavor.description}
          tags={flavor.tags}
          calories={flavor.calories}
        />
      }
    />
  );
}
