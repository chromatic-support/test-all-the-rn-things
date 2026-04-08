import React, { createContext, useContext, useEffect, useState } from 'react';

// shared context
import { useUser } from '@/context/user';
// shared utility
import { mockApi } from '@/utils/mock-api';

type FavoritesContextValue = {
  isFavorited: (flavorId: string) => boolean;
  toggleFavorite: (flavorId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue>({
  isFavorited: () => false,
  toggleFavorite: () => {},
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<Set<string>>(
    () => new Set(user.favorites)
  );

  // Sync when the user record refreshes from the server
  useEffect(() => {
    setFavorites(new Set(user.favorites));
  }, [user.favorites]);

  function isFavorited(flavorId: string) {
    return favorites.has(flavorId);
  }

  async function toggleFavorite(flavorId: string) {
    const isCurrently = favorites.has(flavorId);
    // Optimistic update
    setFavorites((prev) => {
      const next = new Set(prev);
      if (isCurrently) { next.delete(flavorId); } else { next.add(flavorId); }
      return next;
    });
    try {
      await mockApi.toggleFavorite(flavorId, !isCurrently);
    } catch {
      // Rollback on failure
      setFavorites((prev) => {
        const rolled = new Set(prev);
        if (isCurrently) { rolled.add(flavorId); } else { rolled.delete(flavorId); }
        return rolled;
      });
    }
  }

  return (
    <FavoritesContext.Provider value={{ isFavorited, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  return useContext(FavoritesContext);
}
