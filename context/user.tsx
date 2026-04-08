import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

// shared type
import type { User } from '@/data/schema';
// shared utility
import { mockApi } from '@/utils/mock-api';
// fallback — used as initial state before the server responds
import bundledUser from '@/data/mocks/user';

type UserContextValue = {
  user: User;
  refetch: () => Promise<void>;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(bundledUser);

  const refetch = useCallback(async () => {
    try {
      const fresh = await mockApi.getUser();
      setUser(fresh);
    } catch {
      // Mock server not running — stay with current data
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <UserContext.Provider value={{ user, refetch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
