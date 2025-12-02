import { useState, useEffect } from "react";

const STORAGE_KEY = "weather:favorites";

function normalize(city) {
  if (!city) return "";
  return String(city).trim().toLowerCase();
}

function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error("Failed to parse favorites:", err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function add(city) {
    const normalizedCity = normalize(city);
    if (!favorites.includes(normalizedCity)) {
      setFavorites((prev) => [...prev, normalizedCity]);
    }
  }

  function remove(city) {
    const normalizedCity = normalize(city);
    setFavorites((prev) => prev.filter((item) => item !== normalizedCity));
  }

  function isFavorite(city) {
    return favorites.includes(normalize(city));
  }

  return { favorites, add, remove, isFavorite };
}

export default useFavorites;
