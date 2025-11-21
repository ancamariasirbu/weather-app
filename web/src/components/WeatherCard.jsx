import "./WeatherCard.css";
import { useNavigate } from "react-router-dom";

function WeatherCard(props) {
  let navigate = useNavigate();
  return (
    <div
      className="weather-card"
      onClick={() => {
        navigate("/city/${city}");
      }}
      role="button"
      tabIndex={0}
    >
      <h1>{props.temp ?? "—"}°C</h1>
      <h2>
        {props.city ?? "—"}, {props.country ?? "—"}
      </h2>

      <h3>Condition: {props.condition ?? "—"}</h3>

      <p>Feels like: {props.feelsLike ?? "—"}°C</p>
      <p>Wind: {props.windKph ?? "—"} km/h</p>
      <p>Humidity: {props.humidity ?? "—"}%</p>
    </div>
  );
}

export default WeatherCard;
