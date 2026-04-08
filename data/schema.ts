// Raw data shapes matching the JSON files in this directory.
// Component-specific derived types (with ImageSourcePropType, onPress, etc.) live in their component files.

export type Flavor = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  calories: number;
  imageUri: string;
};

export type StoreLocation = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type PromoApplicableItem = {
  itemId: string;
  salePrice: number;
};

export type Promo = {
  id: string;
  flavorId: string;
  title: string;
  description: string;
  discountPercent: number;
  calloutLabel?: string;
  imageUri: string;
  applicableItems: PromoApplicableItem[];
  startDate: string;
  endDate: string;
};

export type Reward = {
  id: string;
  threshold: number;
  label: string;
  description: string;
};

export type ShopItemVariant = 'can' | '4-pack' | '6-pack';

export type ShopItemTag = 'limited' | 'new' | 'sale';

export type ShopItem = {
  id: string;
  flavorId: string;
  name: string;
  variant: ShopItemVariant;
  variantLabel: string;
  price: number;
  salePrice: number | null;
  discountPercent: number | null;
  imageUri: string;
  shopTag?: ShopItemTag;
};

export type Review = {
  id: string;
  flavorId: string;
  reviewerId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string;
};

export type RewardsHistoryEntry = {
  type: 'earned' | 'redeemed';
  points: number;
  description: string;
  date: string;
};

export type UserRewards = {
  pointsBalance: number;
  history: RewardsHistoryEntry[];
};

export type PurchaseHistoryEntry = {
  itemId: string;
  quantity: number;
  orderedAt: string;
  pointsEarned: number;
};

export type UserLocation = {
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export type CreditCard = {
  brand: string;
  last4: string;
  expiry: string;
  nickname: string;
  isDefault: boolean;
};

export type UserWallet = {
  walletLinked: boolean;
  cardOnFile: CreditCard[];
};

export type UserSettings = {
  newsletterSubscribed: boolean;
  notificationsEnabled: boolean;
  location: UserLocation;
  wallet: UserWallet;
};

export type User = {
  id: string;
  name: string;
  email: string;
  rewards: UserRewards;
  purchaseHistory: PurchaseHistoryEntry[];
  favorites: string[];
  settings: UserSettings;
};
