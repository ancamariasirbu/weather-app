import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import ForecastList from "../components/ForecastList/ForecastList";
import { getBaseUrl } from "../utils/api";
import Loader from "../components/Loader/Loader";
import ErrorBanner from "../components/ErrorBanner/ErrorBanner";

function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleSearch(cityName) {
    console.log("Searched for:", cityName);
    setCity(cityName);
  }

  useEffect(() => {
    if (!city) return;

    async function loadWeather() {
      setLoading(true);
      setError(false);

      try {
        const resDaily = await fetch(
          `${getBaseUrl()}/api/weather?city=${city}`
        );
        const dataDaily = await resDaily.json();

        const resForecast = await fetch(
          `${getBaseUrl()}/api/forecast?city=${city}`
        );
        const dataForecast = await resForecast.json();

        if (dataDaily.error || dataForecast.error) {
          console.error("Error fetching weather data:", dataDaily.error);
          setWeather(null);
          setForecast(null);
          setError(true);
          return;
        }

        setWeather(dataDaily);
        setForecast(dataForecast);

        setError(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setWeather(null);
        setForecast(null);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [city]);

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <Loader />}

      {error && !loading && (
        <ErrorBanner
          message="City not found. Please try again or check the spelling."
          onRetry={() => setCity({ city })}
        />
      )}

      {weather && !loading && (
        <WeatherCard
          city={weather.city}
          country={weather.country}
          temp={weather.temp}
          feelsLike={weather.feelsLike}
          condition={weather.condition}
          windKph={weather.windKph}
          humidity={weather.humidity}
        />
      )}

      {forecast && !loading && (
        <>
          <h2>5-day Forecast</h2>
          <ForecastList days={forecast.daily} />
          {/* dev-defined prop, forecast.daily comes from backend */}
        </>
      )}
    </div>
  );
}

export default Home;
