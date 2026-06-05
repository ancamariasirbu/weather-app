import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { getBaseUrl } from "../utils/api";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";
import Loader from "../components/Loader/Loader";
import { ErrorText } from "../components/ErrorBanner/ErrorBanner";

function FavoritesHeader({ count }) {
  return (
    <div className="page-head">
      <div>
        <div className="page-eyebrow">Saved cities</div>
        <h1 className="page-title">
          Favorites <span className="count">· {count}</span>
        </h1>
        <div className="page-sub">Tap a card for the full forecast</div>
      </div>
    </div>
  );
}

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
        <FavoritesHeader count={0} />
        <div className="empty-state">
          <div className="empty-emoji">🌥️</div>
          <p>No favorites yet</p>
          <Link to="/" className="empty-cta">
            Search a city to add one
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FavoritesHeader count={favorites.length} />

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
                  feelsLike={item.feelsLike}
                  humidity={item.humidity}
                  icon={item.icon}
                />
              )}
            </div>
          );
        })}

        <Link to="/" className="favorite-add">
          <span className="favorite-add-plus">+</span>
          <span>Search to add a city</span>
        </Link>
      </div>
    </div>
  );
}
