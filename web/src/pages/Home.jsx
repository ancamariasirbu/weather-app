import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import ForecastList from "../components/ForecastList/ForecastList";
import Loader from "../components/Loader/Loader";
import { ErrorBanner } from "../components/ErrorBanner/ErrorBanner";
import { getRandomCityName } from "../utils/getRandomCityName";

import useCityWeather from "../hooks/useCityWeather";

function Home() {
  const [city, setCity] = useState(getRandomCityName() || "");

  const { weather, forecast, loading, error } = useCityWeather(city);

  function handleSearch(cityName) {
    setCity(cityName);
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {loading && <Loader />}

      {error && !loading && (
        <ErrorBanner
          message="City not found. Please try again or check the spelling."
          onRetry={() => setCity(city)}
        />
      )}

      {weather && !loading && !error && (
        <WeatherCard
          city={weather.city}
          country={weather.country}
          temp={weather.temp}
          feelsLike={weather.feelsLike}
          condition={weather.condition}
          windKph={weather.windKph}
          humidity={weather.humidity}
          sunrise={weather.sunrise}
          sunset={weather.sunset}
          icon={weather.icon}
        />
      )}

      {forecast && !loading && !error && (
        <ForecastList
          days={forecast.daily.slice(0, 5)}
          currentIcon={weather?.icon}
        />
      )}
    </div>
  );
}

export default Home;
