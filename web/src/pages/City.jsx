import { useParams } from "react-router-dom";
import useCityWeather from "../hooks/useCityWeather";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import ForecastList from "../components/ForecastList/ForecastList";
import Loader from "../components/Loader/Loader";
import { ErrorText } from "../components/ErrorBanner/ErrorBanner";

export default function CityPage() {
  const { cityName } = useParams();

  const { weather, forecast, loading, error } = useCityWeather(cityName);

  return (
    <div>
      {loading && <Loader />}

      {error && !loading && <ErrorText />}

      {weather && !loading && (
        <WeatherCard
          city={weather.city}
          country={weather.country}
          temp={weather.temp}
          feelsLike={weather.feelsLike}
          condition={weather.condition}
          windKph={weather.windKph}
          humidity={weather.humidity}
          icon={weather.icon}
        />
      )}

      {forecast && !loading && <ForecastList days={forecast.daily.slice(1)} />}
    </div>
  );
}
