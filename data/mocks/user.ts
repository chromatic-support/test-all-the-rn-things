// shared mock data — resolves the active user by activeUserId.
// To switch profiles for testing, change activeUserId in user.json.
import usersData from '@/data/mocks/users.json';
import type { User } from '@/data/schema';

const activeUser = usersData.users.find((u) => u.id === usersData.activeUserId);

if (!activeUser) {
  throw new Error(
    `[mock] No user found with id "${usersData.activeUserId}". Check data/mocks/users.json.`
  );
}

export default activeUser as unknown as User;
