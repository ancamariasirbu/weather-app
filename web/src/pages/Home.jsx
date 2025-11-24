import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getBaseUrl } from "../utils/api";
import Loader from "../components/Loader";

function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSearch(cityName) {
    console.log("Searched for:", cityName);
    setCity(cityName);
  }

  useEffect(() => {
    if (!city) return;

    async function loadWeather() {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5s delay

      try {
        const res = await fetch(`${getBaseUrl()}/api/weather?city=${city}`);
        const data = await res.json();

        if (data.error) {
          console.error("Error fetching weather data:", data.error);
          setWeatherData(null);
          return;
        }

        setWeatherData(data);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        setWeatherData(null);
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

      {weatherData === null && city && (
        <p style={{ color: "red" }}>
          City not found. Please check your spelling.
        </p>
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
