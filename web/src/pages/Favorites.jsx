import { useState, useEffect } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { getBaseUrl } from "../utils/api";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";
import Loader from "../components/Loader/Loader";
import { ErrorText } from "../components/ErrorBanner/ErrorBanner";

export default function Favorites() {
  const { favorites } = useFavorites();

  const [weather, setWeather] = useState({}); // { berlin: {...}, london: {...} }
  const [loading, setLoading] = useState({}); // { berlin: true, london: false }

  useEffect(() => {
    if (favorites.length === 0) {
      setWeather({});
      setLoading({});
      return;
    }

    async function load() {
      const initialLoading = Object.fromEntries(
        favorites.map((c) => [c, true])
      );
      setLoading(initialLoading);

      try {
        const res = await fetch(
          `${getBaseUrl()}/api/weather/multi?cities=${favorites.join(",")}`
        );
        const json = await res.json();

        setWeather(json);
      } catch {
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

  if (favorites.length === 0) {
    return (
      <div>
        <p className="no-favs-text">No favorites yet</p>
      </div>
    );
  }

  return (
    <div className="favorites-grid">
      {favorites.map((city) => {
        const item = weather[city];
        const isLoading = loading[city];

        return (
          <div key={city}>
            {isLoading && <Loader />}

            {!isLoading && item?.error && <ErrorText />}

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
