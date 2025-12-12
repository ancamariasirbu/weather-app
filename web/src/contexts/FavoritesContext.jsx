import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "weather:favorites";
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      console.error("Failed to save favorites to localStorage");
    }
  }, [favorites]);

  function normalize(city) {
    return city ? String(city).trim().toLowerCase() : "";
  }

  const add = (city) => {
    const normalizedCity = normalize(city);
    if (!normalizedCity) return;
    setFavorites((prev) =>
      prev.includes(normalizedCity) ? prev : [...prev, normalizedCity]
    );
  };

  const remove = (city) => {
    const normalizedCity = normalize(city);
    if (!normalizedCity) return;
    setFavorites((prev) => prev.filter((item) => item !== normalizedCity));
  };

  const isFavorite = (city) => favorites.includes(normalize(city));

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside <FavoritesProvider>");
  }
  return ctx;
}
