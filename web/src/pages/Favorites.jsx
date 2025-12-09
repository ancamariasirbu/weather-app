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
    if (favorites.length === 0) {
      setWeather({});
      return;
    }

    async function load() {
      // Set all loading states at once
      const initialLoading = Object.fromEntries(
        favorites.map((c) => [c, true])
      );
      setLoading(initialLoading);

      try {
        const res = await fetch(
          `${getBaseUrl()}/api/weather/multi?cities=${favorites.join(",")}`
        );
        const json = await res.json(); // { berlin: {...}, london: {...} }

        setWeather(json);
      } catch {
        // mark all as error
        const failed = Object.fromEntries(
          favorites.map((c) => [c, { error: true }])
        );
        setWeather(failed);
      } finally {
        const doneLoading = Object.fromEntries(
          favorites.map((c) => [c, false])
        );
        setLoading(doneLoading);
      }
    }

    load();
  }, [favorites]);

  return (
    <div className="favorites-grid">
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
