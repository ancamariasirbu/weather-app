import { useState, useEffect } from "react";
import useFavorites from "../hooks/useFavorites";
import { getBaseUrl } from "../utils/api";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";
import Loader from "../components/Loader/Loader";

export default function Favorites() {
  const { favorites } = useFavorites();

  const [weather, setWeather] = useState({}); // { berlin: {...}, london: {...} }
  const [loading, setLoading] = useState({}); // { berlin: true, london: false }

  useEffect(() => {
    // Reset state when favorites change
    const initialLoading = Object.fromEntries(
      favorites.map((city) => [city, true])
    );

    const initialWeather = Object.fromEntries(
      favorites.map((city) => [city, null])
    );

    setLoading(initialLoading);
    setWeather(initialWeather);

    // Fetch each city individually
    favorites.forEach(async (city) => {
      try {
        const res = await fetch(`${getBaseUrl()}/api/weather?city=${city}`);
        const json = await res.json();

        setWeather((prev) => ({
          ...prev,
          [city]: json.error ? { error: true } : json,
        }));
      } catch {
        setWeather((prev) => ({
          ...prev,
          [city]: { error: true },
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [city]: false }));
      }
    });
  }, [favorites]);

  return (
    <div>
      <h1>Favorite Cities</h1>

      {favorites.map((city) => {
        const item = weather[city];
        const isLoading = loading[city];

        return (
          <div key={city}>
            {isLoading && <Loader />}

            {!isLoading && item?.error && <p>Could not load {city}</p>}

            {!isLoading && item && !item.error && (
              <FavoriteCard
                city={item.city}
                country={item.country}
                temp={item.temp}
                condition={item.condition}
                icon={item.icon}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
