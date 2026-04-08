// shared mock data — screen-specific user fixtures for stories and testing.
import type { RewardsUser } from '@/components/screens/rewards';
import type { HomeUser } from '@/components/screens/home';
import mockUser from '@/data/mocks/user';

// New user who has only received the welcome bonus (250 pts)
// Can redeem: free can (100 pts) ✓ | 4-pack (350 pts) ✗ | 6-pack (500 pts) ✗
export const welcomeUser: RewardsUser = {
  id: 'user-002',
  rewards: {
    pointsBalance: 250,
    history: [
      { type: 'earned', points: 250, description: 'Welcome bonus', date: '2026-03-20' },
    ],
  },
};

// User with purchases, but only non-sale items — triggers reorder action
export const reorderUser: HomeUser = {
  id: mockUser.id,
  rewards: mockUser.rewards,
  purchaseHistory: [
    { itemId: 'monstera-original-can', quantity: 3 },
    { itemId: 'bae-root-can', quantity: 1 },
  ],
};
