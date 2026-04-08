import React, { useMemo, useState } from "react";

// shared component (screen template)
import { ShopMenuScreen } from "@/components/ui/layout/screen-templates/shop-menu";
// shared component
import {
  ShopMenuHero,
  type ShopMenuCategoryItem,
} from "@/components/composites/heroes/shop-menu";
// shared component
import {
  ShopItems,
  type ShopItem,
} from "@/components/composites/shop-menu/shop-items";
// shared component
import { ShopPromo } from "@/components/composites/shop-menu/shop-promo";
// shared component
import { Pagination } from "@/components/ui/navigation/pagination";
// data
import flavorsData from "@/data/flavors.json";
import promosData from "@/data/promos.json";
import shopData from "@/data/shop.json";

const PAGE_SIZE = 6;

const FLAVOR_IMAGES: Record<string, number> = {
  "bae-root": require("@/assets/img/flavors/bae-root.png"),
  "chai-constellation": require("@/assets/img/flavors/chai-constellation.png"),
  "date-night-special": require("@/assets/img/flavors/date-night-special.png"),
  "half-moon": require("@/assets/img/flavors/half-moon.png"),
  "monstera-original": require("@/assets/img/flavors/monstera-original.png"),
  "peach-princess": require("@/assets/img/flavors/peach-princess.png"),
  "peru-passion": require("@/assets/img/flavors/peru-passion.png"),
  watermelon: require("@/assets/img/flavors/watermelon.png"),
};

const PROMO_IMAGE = require("@/assets/img/marketing/too-many-habibis.png");

const FLAVOR_LOOKUP = Object.fromEntries(flavorsData.map((f) => [f.id, f]));

const CATEGORIES: ShopMenuCategoryItem[] = [
  { id: "all", label: "All" },
  { id: "seasonal", label: "Seasonal" },
  { id: "year-round", label: "Year Round" },
  { id: "fan-favorite", label: "Fan Favorite" },
  { id: "limited", label: "Limited Edition" },
  { id: "dairy-free", label: "Dairy-Free" },
];

const CATEGORY_TAG_MAP: Record<string, string> = {
  seasonal: "Seasonal",
  "year-round": "Year Round",
  "fan-favorite": "Fan Favorite",
  limited: "Limited Edition",
  "dairy-free": "Dairy-Free",
};

// Derive one entry per flavor with price range from all its variants
const ALL_FLAVOR_ITEMS: Omit<ShopItem, "onPress">[] = (() => {
  const seen = new Set<string>();
  const result: Omit<ShopItem, "onPress">[] = [];

  for (const item of shopData) {
    if (seen.has(item.flavorId)) continue;
    seen.add(item.flavorId);

    const variants = shopData.filter((v) => v.flavorId === item.flavorId);
    const prices = variants.map((v) => v.salePrice ?? v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const shopTag = variants.find((v) => "shopTag" in v && v.shopTag)?.shopTag;

    result.push({
      id: item.flavorId,
      name: item.name,
      image: FLAVOR_IMAGES[item.flavorId],
      tag: shopTag,
      priceRange: { min, max },
    });
  }

  return result;
})();

const promo = promosData[0];

type Props = {
  onItemPress?: (flavorId: string) => void;
  onPromoPress?: () => void;
};

export function ShopMenu({ onItemPress, onPromoPress = () => {} }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = ALL_FLAVOR_ITEMS;

    if (activeCategory !== "all") {
      const tag = CATEGORY_TAG_MAP[activeCategory];
      result = result.filter((item) =>
        FLAVOR_LOOKUP[item.id]?.tags.includes(tag),
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((item) => item.name.toLowerCase().includes(q));
    }

    return result;
  }, [activeCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function handleCategoryPress(id: string) {
    setActiveCategory(id);
    setPage(1);
  }

  function handleSearchChange(text: string) {
    setSearch(text);
    setPage(1);
  }

  const items: ShopItem[] = pageItems.map((item) => ({
    ...item,
    onPress: () => onItemPress?.(item.id),
  }));

  return (
    <ShopMenuScreen
      hero={
        <ShopMenuHero
          searchValue={search}
          onSearchChange={handleSearchChange}
          onSearchClear={() => handleSearchChange("")}
          categories={CATEGORIES}
          activeCategoryId={activeCategory}
          onCategoryPress={handleCategoryPress}
        />
      }
      items={<ShopItems items={items} />}
      pagination={
        totalPages > 1 ? (
          <Pagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        ) : null
      }
      promo={
        <ShopPromo
          title={promo.title}
          description={promo.description}
          calloutLabel={promo.calloutLabel}
          image={PROMO_IMAGE}
          onPress={onPromoPress}
        />
      }
    />
  );
}
