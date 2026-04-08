import { useRouter } from 'expo-router';

// shared component
import { Checkout } from '@/components/screens/checkout';
// shared context
import { useCart } from '@/context/cart';
// shared context
import { useUser } from '@/context/user';
// shared utility
import { mockApi } from '@/utils/mock-api';

export default function CartTab() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const { user, refetch } = useUser();

  const wallet = user.settings.wallet;
  const savedCards = wallet.walletLinked ? wallet.cardOnFile : [];

  async function handlePlaceOrder() {
    clearCart();
    await refetch();
  }

  return (
    <Checkout
      items={items}
      onQuantityChange={updateQuantity}
      onRemove={removeItem}
      onPlaceOrder={handlePlaceOrder}
      onContinueShopping={() => router.navigate('/(tabs)/shop')}
      onRemoveCard={async (last4) => { await mockApi.removeCard(last4); await refetch(); }}
      initialMethod={savedCards.length > 0 ? 'card-on-file' : 'new-credit-card'}
      savedCards={savedCards}
    />
  );
}
