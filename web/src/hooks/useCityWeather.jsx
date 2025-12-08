import { useState, useEffect } from "react";
import { getBaseUrl } from "../utils/api";

function useCityWeather(city) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
          setWeather(null);
          setForecast(null);
          setError(true);
          return;
        }

        setWeather(dataDaily);
        setForecast(dataForecast);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [city]);

  return { weather, forecast, loading, error };
}

export default useCityWeather;
