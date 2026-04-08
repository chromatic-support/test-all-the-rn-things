import { useRouter } from 'expo-router';

// shared component
import { FlavorsMenu } from '@/components/screens/flavors-menu';

export default function FlavorsTab() {
  const router = useRouter();
  return (
    <FlavorsMenu onFlavorPress={(id) => router.push(`/flavors/${id}` as never)} />
  );
}
