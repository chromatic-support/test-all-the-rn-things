import { useLocalSearchParams, useRouter } from 'expo-router';

// shared component
import { AppShell } from '@/components/ui/layout/app-shell';
// shared component
import { Header } from '@/components/ui/navigation/header';
// shared component
import { ShopDetail } from '@/components/screens/shop-detail';
// shared context
import { useCart } from '@/context/cart';
// data
import flavorsData from '@/data/flavors.json';
import shopData from '@/data/shop.json';
// shared utility
import { getFlavorReviewSummary } from '@/utils/reviews';

const FLAVOR_LOOKUP = Object.fromEntries(flavorsData.map((f) => [f.id, f]));
const SHOP_ITEM_LOOKUP = Object.fromEntries(shopData.map((item) => [item.id, item]));

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

export default function ShopDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();

  const flavor = FLAVOR_LOOKUP[id];

  if (!flavor) {
    return null;
  }

  function handleAddToCart(variantId: string, quantity: number) {
    const shopItem = SHOP_ITEM_LOOKUP[variantId];
    if (!shopItem) return;

    addToCart(
      {
        id: variantId,
        title: `${shopItem.name} – ${shopItem.variantLabel}`,
        imageSource: FLAVOR_IMAGES[shopItem.flavorId],
        price: shopItem.salePrice ?? shopItem.price,
      },
      quantity
    );
  }

  return (
    <AppShell header={<Header title={flavor.name} onBack={() => router.back()} />}>
      <ShopDetail flavorId={id} reviews={getFlavorReviewSummary(id)} onAddToCart={handleAddToCart} />
    </AppShell>
  );
}
