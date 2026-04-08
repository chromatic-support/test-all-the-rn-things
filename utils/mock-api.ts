/**
 * Typed client for the local mock server (scripts/mock-server.mjs).
 * Only used in development — the server runs at localhost:3001.
 */

import type { User } from '@/data/schema';
import type { SavedCard } from '@/components/composites/checkout/payment-method';

const BASE_URL = 'http://localhost:3001';

export type MockOrderItem = {
  itemId: string;
  title: string;
  price: number;
  quantity: number;
};

export type MockShippingAddress = {
  name: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zip: string;
};

export type PlaceOrderPayload = {
  items: MockOrderItem[];
  shippingAddress: MockShippingAddress | null;
  paymentMethod: string;
};

export type PlaceOrderResult = {
  orderId: string;
  orderNumber: string;
  pointsEarned: number;
  cost: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`[mock-api] ${res.status} ${init?.method ?? 'GET'} ${path}`);
  }
  return res.json() as Promise<T>;
}

export const mockApi = {
  getUser: () =>
    apiFetch<User>('/api/user'),

  toggleFavorite: (flavorId: string, add: boolean) =>
    apiFetch<{ favorites: string[] }>('/api/user/favorites', {
      method: 'PATCH',
      body: JSON.stringify({ flavorId, action: add ? 'add' : 'remove' }),
    }),

  addCard: (card: SavedCard) =>
    apiFetch<{ wallet: User['settings']['wallet'] }>('/api/user/wallet', {
      method: 'PATCH',
      body: JSON.stringify({ action: 'add', card }),
    }),

  removeCard: (last4: string) =>
    apiFetch<{ wallet: User['settings']['wallet'] }>('/api/user/wallet', {
      method: 'PATCH',
      body: JSON.stringify({ action: 'remove', last4 }),
    }),

  placeOrder: (payload: PlaceOrderPayload) =>
    apiFetch<PlaceOrderResult>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getOrders: () =>
    apiFetch<unknown[]>('/api/orders'),
};
