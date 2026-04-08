import { useLocalSearchParams, useRouter } from 'expo-router';

// shared component
import { AppShell } from '@/components/ui/layout/app-shell';
// shared component
import { Header } from '@/components/ui/navigation/header';
// shared component
import { FlavorsDetail } from '@/components/screens/flavors-detail';
// data
import flavorsData from '@/data/flavors.json';

export default function FlavorDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const flavor = flavorsData.find((f) => f.id === id);

  if (!flavor) {
    return null;
  }

  return (
    <AppShell header={<Header title={flavor.name} onBack={() => router.back()} />}>
      <FlavorsDetail flavor={flavor} />
    </AppShell>
  );
}
