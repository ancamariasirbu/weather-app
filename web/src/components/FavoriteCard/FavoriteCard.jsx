import { useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./FavoriteCard.css";

function FavoriteCard(props) {
  let navigate = useNavigate();
  return (
    <div
      className="favorite-card"
      onClick={() => {
        navigate(`/city/${props.city}`);
      }}
      role="button"
      tabIndex={0}
    >
      <div className="current-icon-container">
        <span className="current-icon">{props.icon}</span>
      </div>
      <div className="current-weather-info">
        <p>{props.temp ?? "—"}°C</p>
        <h2 className="favorite-card-city-country">
          {props.city ?? "—"}, {props.country ?? "—"}
        </h2>
      </div>

      <FavoriteButton city={props.city} />
    </div>
  );
}

export default FavoriteCard;
