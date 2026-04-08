import { useRouter } from 'expo-router';

// shared component
import { ShopMenu } from '@/components/screens/shop-menu';
// data
import promosData from '@/data/promos.json';

const promo = promosData[0];

export default function ShopTab() {
  const router = useRouter();
  return (
    <ShopMenu
      onItemPress={(id) => router.push(`/shop/${id}` as never)}
      onPromoPress={() => router.push(`/shop/${promo.flavorId}` as never)}
    />
  );
}
