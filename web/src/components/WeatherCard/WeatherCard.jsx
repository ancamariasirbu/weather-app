import "./WeatherCard.css";
// import { useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

function WeatherCard(props) {
  // let navigate = useNavigate();
  return (
    <div
      className="weather-card"
      // onClick={() => {
      //   navigate(`/city/${props.city}`);
      // }}
      // role="button"
      // tabIndex={0}
    >
      <div className="weather-icon-container">
        <span className="weather-icon">{props.icon}</span>
      </div>
      <div className="weather-info">
        <p>Today</p>
        <div className="location-heading">
          <h1>{props.city ?? "—"},</h1>
          <h2>{props.country ?? "—"}</h2>
        </div>
        <div className="temp-cond-row">
          <h3>{props.temp ?? "—"}°C,</h3>
          <div>{props.condition}</div>
        </div>

        <p>Feels like: {props.feelsLike ?? "—"}°C</p>
        <p>Wind: {props.windKph ?? "—"} km/h</p>
        <p>Humidity: {props.humidity ?? "—"}%</p>
      </div>

      <FavoriteButton city={props.city} />
    </div>
  );
}

export default WeatherCard;
