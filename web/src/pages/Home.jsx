import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { getBaseUrl } from "../utils/api";
import Loader from "../components/Loader/Loader";
import ErrorBanner from "../components/ErrorBanner/ErrorBanner";

function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
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
        const res = await fetch(`${getBaseUrl()}/api/weather?city=${city}`);
        const data = await res.json();

        if (data.error) {
          console.error("Error fetching weather data:", data.error);
          setWeatherData(null);
          setError(true);
          return;
        }

        setWeatherData(data);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        setWeatherData(null);
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

      {weatherData && !loading && (
        <WeatherCard
          city={weatherData.city}
          country={weatherData.country}
          temp={weatherData.temp}
          feelsLike={weatherData.feelsLike}
          condition={weatherData.condition}
          windKph={weatherData.windKph}
          humidity={weatherData.humidity}
        />
      )}
    </div>
  );
}

export default Home;
