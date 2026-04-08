import { useRouter } from 'expo-router';

// shared component
import { Home, type HomeUser } from '@/components/screens/home';
// shared context
import { useUser } from '@/context/user';

export default function HomeTab() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <Home
      user={user as HomeUser}
      onActionPress={(flavorId) =>
        flavorId
          ? router.navigate(`/(tabs)/shop/${flavorId}`)
          : router.navigate('/(tabs)/shop')
      }
      onRedeemRewards={() => router.navigate('/(tabs)/rewards')}
      onRecommendationPress={(flavorId) => router.navigate(`/(tabs)/shop/${flavorId}`)}
    />
  );
}
