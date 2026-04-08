import React from 'react';

// shared component (screen template)
import { RewardsScreen } from '@/components/ui/layout/screen-templates/rewards';
// shared component
import { RewardsHero } from '@/components/composites/heroes/rewards';
// shared component
import { RewardsOffers } from '@/components/composites/rewards/offers';
// shared component
import { RewardsActivity, type RewardActivityEntry } from '@/components/composites/rewards/activity';
// data
import rewardsData from '@/data/rewards.json';

export type RewardsUser = {
  id: string;
  rewards: {
    pointsBalance: number;
    history: RewardActivityEntry[];
  };
};

type Props = {
  user: RewardsUser;
  onRedeem?: (offerId: string) => void;
};

export function Rewards({ user, onRedeem = () => {} }: Props) {
  return (
    <RewardsScreen
      balance={
        <RewardsHero points={user.rewards.pointsBalance} />
      }
      rewardsOffers={
        <RewardsOffers
          offers={rewardsData}
          pointsBalance={user.rewards.pointsBalance}
          onRedeem={onRedeem}
        />
      }
      activityHistory={
        <RewardsActivity history={user.rewards.history} />
      }
    />
  );
}
