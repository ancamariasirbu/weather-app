import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getBaseUrl } from "../utils/api";

function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  function handleSearch(cityName) {
    console.log("Searched for:", cityName);
    setCity(cityName);
  }

  useEffect(() => {
    if (!city) return;

    async function loadWeather() {
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
      }
    }

    loadWeather();
  }, [city]);

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />

      {/* {city && !weatherData && <p>Loading weather for: {city}…</p>} */}

      {weatherData === null && city && (
        <p style={{ color: "red" }}>
          City not found. Please check your spelling.
        </p>
      )}

      {weatherData && (
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
