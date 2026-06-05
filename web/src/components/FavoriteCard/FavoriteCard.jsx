import { useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./FavoriteCard.css";

function FavoriteCard(props) {
  const navigate = useNavigate();

  function goToCity() {
    navigate(`/city/${props.city}`);
  }

  return (
    <div
      className="favorite-card"
      onClick={goToCity}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToCity();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="fav-top">
        <span className="fav-glyph">{props.icon}</span>
        <FavoriteButton city={props.city} />
      </div>

      <div className="fav-temp">
        {props.temp ?? "—"}
        <sup>°</sup>
      </div>
      <div className="fav-city">{props.city ?? "—"}</div>
      <div className="fav-ctry">{props.country ?? "—"}</div>

      <div className="fav-meta">
        <span>
          Feels <b>{props.feelsLike ?? "—"}°</b>
        </span>
        <span>
          Hum <b>{props.humidity ?? "—"}%</b>
        </span>
      </div>
    </div>
  );
}

export default FavoriteCard;
