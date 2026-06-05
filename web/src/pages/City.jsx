import { useParams, Link } from "react-router-dom";
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
      <div className="page-head">
        <div>
          <div className="page-eyebrow">City forecast</div>
          <h1 className="page-title">{weather?.city ?? cityName}</h1>
        </div>
        <Link to="/favorites" className="page-sub">
          ← Back to favorites
        </Link>
      </div>

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
          sunrise={weather.sunrise}
          sunset={weather.sunset}
          icon={weather.icon}
        />
      )}

      {forecast && !loading && (
        <ForecastList
          days={forecast.daily.slice(0, 5)}
          currentIcon={weather?.icon}
        />
      )}
    </div>
  );
}
