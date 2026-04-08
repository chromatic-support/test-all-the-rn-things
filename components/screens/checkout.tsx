import React, { useRef, useState } from 'react';

// shared component
import { CheckoutScreen as CheckoutTemplate } from '@/components/ui/layout/screen-templates/checkout';
// shared component
import { CheckoutHero } from '@/components/composites/heroes/checkout';
// shared component
import { OrderSummary } from '@/components/composites/checkout/order-summary';
import type { OrderSummaryItem } from '@/components/composites/checkout/order-summary';
// shared component
import { DeliveryAddress } from '@/components/composites/checkout/delivery-address';
import type { AddressValues } from '@/components/composites/checkout/delivery-address';
// shared component
import { PaymentMethod } from '@/components/composites/checkout/payment-method';
import type { NewCardInfo, PaymentMethodType, SavedCard } from '@/components/composites/checkout/payment-method';
// shared component
import { OrderTotal } from '@/components/composites/checkout/order-total';
// shared component
import { PlaceOrder } from '@/components/composites/checkout/place-order';
// shared component
import { OrderConfirmation } from '@/components/composites/checkout/order-confirmation';
// shared component
import { ShippingSummary } from '@/components/composites/checkout/shipping-summary';
import type { CostBreakdown } from '@/components/composites/checkout/shipping-summary';
// shared utility
import { calculateOrderTotal } from '@/utils/checkout';
// shared utility
import { mockApi } from '@/utils/mock-api';

type DeliveryAddressValues = {
  initialName?: string;
  initialStreet?: string;
  initialApt?: string;
  initialCity?: string;
  initialState?: string | null;
  initialZip?: string;
};

type ConfirmedOrderData = {
  items: OrderSummaryItem[];
  address: AddressValues | null;
  cost: CostBreakdown;
};

type CheckoutProps = {
  // Controlled mode — used when cart state is managed externally
  items?: OrderSummaryItem[];
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onPlaceOrder?: () => void;
  onContinueShopping?: () => void;
  onRemoveCard?: (last4: string) => void;
  // Uncontrolled mode — used by stories
  initialItems?: OrderSummaryItem[];
  initialMethod?: PaymentMethodType;
  initialAddress?: DeliveryAddressValues;
  savedCards?: SavedCard[];
  // Pre-populate confirmation state — used by stories to show post-order view
  initialOrderNumber?: string;
  initialCost?: CostBreakdown;
  initialConfirmedAddress?: AddressValues;
};

export function Checkout({
  items: controlledItems,
  onQuantityChange: controlledOnQuantityChange,
  onRemove: controlledOnRemove,
  onPlaceOrder,
  onContinueShopping,
  onRemoveCard,
  initialItems = [],
  initialMethod = 'new-credit-card',
  initialAddress,
  savedCards,
  initialOrderNumber,
  initialCost,
  initialConfirmedAddress,
}: CheckoutProps = {}) {
  const [localItems, setLocalItems] = useState<OrderSummaryItem[]>(initialItems);
  const [method, setMethod] = useState<PaymentMethodType>(initialMethod);
  const [orderNumber, setOrderNumber] = useState<string | null>(initialOrderNumber ?? null);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrderData | null>(
    initialOrderNumber && initialCost
      ? {
          items: initialItems,
          address: initialConfirmedAddress ?? null,
          cost: initialCost,
        }
      : null
  );

  // Capture the latest form values without causing re-renders on every keystroke
  const addressRef = useRef<AddressValues | null>(null);
  const newCardRef = useRef<NewCardInfo | null>(null);

  const isControlled = controlledItems !== undefined;
  const items = isControlled ? controlledItems : localItems;

  function handleQuantityChange(id: string, quantity: number) {
    if (isControlled) {
      controlledOnQuantityChange?.(id, quantity);
    } else {
      setLocalItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  }

  function handleRemove(id: string) {
    if (isControlled) {
      controlledOnRemove?.(id);
    } else {
      setLocalItems((prev) => prev.filter((item) => item.id !== id));
    }
  }

  const hasItems = items.length > 0;

  async function handlePlaceOrder() {
    // Snapshot items before onPlaceOrder clears the cart
    const itemsSnapshot = [...items];
    const addressSnapshot = addressRef.current;

    try {
      const result = await mockApi.placeOrder({
        items: itemsSnapshot.map((item) => ({
          itemId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: addressSnapshot
          ? {
              name: addressSnapshot.name,
              street: addressSnapshot.street,
              apt: addressSnapshot.apt || undefined,
              city: addressSnapshot.city,
              state: addressSnapshot.state ?? '',
              zip: addressSnapshot.zip,
            }
          : null,
        paymentMethod: method,
      });
      setOrderNumber(result.orderNumber);
      setConfirmedOrder({ items: itemsSnapshot, address: addressSnapshot, cost: result.cost });
      // Save card if the user opted in
      const cardInfo = newCardRef.current;
      if (method === 'new-credit-card' && cardInfo?.saveCard && cardInfo.last4.length === 4) {
        try {
          await mockApi.addCard({ ...cardInfo, isDefault: false });
        } catch {
          // Don't block order confirmation if card save fails
        }
      }
    } catch {
      // Server unavailable — fall back to local order number, no cost breakdown
      setOrderNumber(Math.random().toString(36).slice(2, 10).toUpperCase());
    }
    onPlaceOrder?.();
  }

  return (
    <CheckoutTemplate
      hero={<CheckoutHero />}
      orderSummary={
        <OrderSummary
          items={items}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      }
      deliveryAddress={
        hasItems ? (
          <DeliveryAddress
            {...initialAddress}
            onAddressChange={(values) => { addressRef.current = values; }}
          />
        ) : undefined
      }
      paymentMethod={
        hasItems ? (
          <PaymentMethod
            method={method}
            onMethodChange={setMethod}
            savedCards={savedCards}
            onNewCardChange={(card) => { newCardRef.current = card; }}
            onRemoveCard={onRemoveCard}
          />
        ) : undefined
      }
      orderTotal={hasItems ? <OrderTotal total={calculateOrderTotal(items)} /> : undefined}
      placeOrder={hasItems ? <PlaceOrder onPress={handlePlaceOrder} /> : undefined}
      confirmation={
        orderNumber ? (
          <OrderConfirmation
            orderNumber={orderNumber}
            onContinueShopping={onContinueShopping}
          />
        ) : undefined
      }
      shippingSummary={
        confirmedOrder ? (
          <ShippingSummary
            name={confirmedOrder.address?.name ?? ''}
            street={confirmedOrder.address?.street ?? ''}
            apt={confirmedOrder.address?.apt || undefined}
            city={confirmedOrder.address?.city ?? ''}
            state={confirmedOrder.address?.state ?? ''}
            zip={confirmedOrder.address?.zip ?? ''}
            items={confirmedOrder.items}
            cost={confirmedOrder.cost}
          />
        ) : undefined
      }
    />
  );
}
