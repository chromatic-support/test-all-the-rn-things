// shared component
import { Rewards, type RewardsUser } from '@/components/screens/rewards';
// shared context
import { useUser } from '@/context/user';

export default function RewardsTab() {
  const { user } = useUser();
  return <Rewards user={user as RewardsUser} />;
}
