// shared mock data — team member fixtures for stories and testing.
import type { TeamMember } from '@/components/composites/about/team';

const mockTeamMembers: TeamMember[] = [
  { name: 'Alex Kim',      role: 'Founder',    imageSource: require('@/assets/img/flavors/peach-princess.png') },
  { name: 'Jordan Lee',    role: 'Designer',   imageSource: require('@/assets/img/flavors/peru-passion.png') },
  { name: 'Sam Okonkwo',   role: 'Engineer',   imageSource: require('@/assets/img/leaf.png') },
  { name: 'Riley Cruz',    role: 'Marketing',  imageSource: require('@/assets/img/flavors/half-moon.png') },
  { name: 'Morgan Patel',  role: 'Operations', imageSource: require('@/assets/img/marketing/too-many-habibis.png') },
  { name: 'Casey Wu',      role: 'Sales',      imageSource: require('@/assets/img/marketing/watermelon-can-purple.png') },
  { name: 'Drew Nzinga',   role: 'Support',    imageSource: require('@/assets/img/flavors/chai-constellation.png') },
  { name: 'Quinn Russo',   role: 'Finance',    imageSource: require('@/assets/img/marketing/pep-in-your-step.png') },
];

export default mockTeamMembers;
