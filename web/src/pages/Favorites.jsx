import { useState, useEffect } from "react";
import useFavorites from "../hooks/useFavorites";
import { getBaseUrl } from "../utils/api";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";
import Loader from "../components/Loader/Loader";

function Favorites() {
  const { favorites } = useFavorites();
  const [favWeather, setFavWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (favorites.length === 0) {
      setFavWeather([]);
      return;
    }

    async function loadFavorites() {
      setLoading(true);

      try {
        const results = await Promise.all(
          favorites.map(async (city) => {
            const res = await fetch(`${getBaseUrl()}/api/weather?city=${city}`);
            const json = await res.json();

            if (json.error) {
              return { city, error: true };
            }

            return json;
          })
        );

        setFavWeather(results);
        console.log("Favorite weather data:", results);
      } catch (err) {
        console.error("Failed to load favorite weather:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [favorites]);

  return (
    <div>
      <h1>Favorite Cities</h1>

      {loading && <Loader />}

      {favWeather.map((item) =>
        item.error ? (
          <p key={item.city}>Could not load {item.city}</p>
        ) : (
          <FavoriteCard
            key={item.city}
            city={item.city}
            country={item.country}
            temp={item.temp}
            condition={item.condition}
            icon={item.icon}
          />
        )
      )}
    </div>
  );
}

export default Favorites;
