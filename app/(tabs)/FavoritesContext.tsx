import React, { createContext, ReactNode, useContext, useState } from "react";
import type { Pokemon } from "./Pokemon";

type FavoritesContextType = {
  favorites: Pokemon[];
  toggleFavorite: (pokemon: Pokemon) => void;
  isFavorite: (pokemon: Pokemon) => boolean;
  favoritesselected: Pokemon[];
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  const isFavorite = (pokemon: Pokemon) =>
    favorites.some(f => f.id === pokemon.id && f.origin === pokemon.origin);

  const toggleFavorite = (pokemon: Pokemon) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === pokemon.id && f.origin === pokemon.origin);
      if (exists) {
        return prev.filter(f => !(f.id === pokemon.id && f.origin === pokemon.origin));
      }
      return [...prev, pokemon];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, favoritesselected: favorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
