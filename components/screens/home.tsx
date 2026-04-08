import React from 'react';
import { Dimensions } from 'react-native';

// shared component (screen template)
import { HomeScreen } from '@/components/ui/layout/screen-templates/home';
// shared component
import { Image } from '@/components/ui/primatives/image';
// shared component
import { HomeAction } from '@/components/composites/home/action';
// shared component
import { HomeRewards } from '@/components/composites/home/rewards';
// shared component
import { HomeRecommendations, type RecommendationItem } from '@/components/composites/home/recommendations';
// data
import shopData from '@/data/shop.json';

const FEATURED_IMAGE = require('@/assets/img/marketing/pep-in-your-step.png');
const FEATURED_HEIGHT = Dimensions.get('window').width;
const REWARD_THRESHOLD = 500;

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

const RECOMMENDATIONS: Omit<RecommendationItem, 'onPress'>[] = [
  { id: 'watermelon',         name: 'Watermelon',         image: FLAVOR_IMAGES['watermelon'],          tag: 'Seasonal' },
  { id: 'bae-root',           name: 'Bae Root',           image: FLAVOR_IMAGES['bae-root'],            tag: 'Fan Favorite' },
  { id: 'half-moon',          name: 'Half Moon',          image: FLAVOR_IMAGES['half-moon'] },
  { id: 'date-night-special', name: 'Date Night Special', image: FLAVOR_IMAGES['date-night-special'],  tag: 'Limited Edition' },
  { id: 'chai-constellation', name: 'Chai Constellation', image: FLAVOR_IMAGES['chai-constellation'],  tag: 'Year Round' },
];

const SHOP_LOOKUP = Object.fromEntries(shopData.map((item) => [item.id, item]));

type PurchaseHistoryEntry = {
  itemId: string;
  quantity: number;
};

export type HomeUser = {
  id: string;
  rewards: {
    pointsBalance: number;
  };
  purchaseHistory: PurchaseHistoryEntry[];
};

type Props = {
  user?: HomeUser | null;
  // flavorId is provided for sale/reorder variants; undefined for first-purchase
  onActionPress?: (flavorId?: string) => void;
  onRedeemRewards?: () => void;
  onRecommendationPress?: (flavorId: string) => void;
};

export function Home({
  user,
  onActionPress = () => {},
  onRedeemRewards = () => {},
  onRecommendationPress = () => {},
}: Props) {
  let action: React.ReactNode;

  if (user && user.purchaseHistory.length > 0) {
    const saleEntry = user.purchaseHistory.find((p) => {
      const shopItem = SHOP_LOOKUP[p.itemId];
      return shopItem?.salePrice != null;
    });

    if (saleEntry) {
      const shopItem = SHOP_LOOKUP[saleEntry.itemId];
      action = (
        <HomeAction
          variant="sale"
          itemName={shopItem.name}
          discountPercent={shopItem.discountPercent!}
          image={FLAVOR_IMAGES[shopItem.flavorId]}
          onPress={() => onActionPress(shopItem.flavorId)}
        />
      );
    } else {
      const frequencyMap = user.purchaseHistory.reduce<Record<string, number>>((acc, p) => {
        acc[p.itemId] = (acc[p.itemId] ?? 0) + p.quantity;
        return acc;
      }, {});
      const topItemId = Object.entries(frequencyMap).sort(([, a], [, b]) => b - a)[0][0];
      const topItem = SHOP_LOOKUP[topItemId];
      action = (
        <HomeAction
          variant="reorder"
          itemName={topItem.name}
          image={FLAVOR_IMAGES[topItem.flavorId]}
          onPress={() => onActionPress(topItem.flavorId)}
        />
      );
    }
  } else {
    action = <HomeAction variant="first-purchase" onPress={() => onActionPress()} />;
  }

  return (
    <HomeScreen
      featured={
        <Image
          source={FEATURED_IMAGE}
          width={0}
          height={FEATURED_HEIGHT}
          accessibilityLabel="Pep in your step promotion"
          variant="promo"
          callout="Limited time only"
        />
      }
      action={action}
      rewards={
        user ? (
          <HomeRewards
            pointsBalance={user.rewards.pointsBalance}
            rewardThreshold={REWARD_THRESHOLD}
            onRedeem={onRedeemRewards}
          />
        ) : undefined
      }
      recommendations={
        <HomeRecommendations
          items={RECOMMENDATIONS.map((item) => ({
            ...item,
            onPress: () => onRecommendationPress(item.id),
          }))}
        />
      }
    />
  );
}
