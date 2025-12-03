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
      <h1>{props.temp ?? "—"}°C</h1>
      <h2>
        {props.city ?? "—"}, {props.country ?? "—"}
      </h2>
      <FavoriteButton city={props.city} />
    </div>
  );
}

export default FavoriteCard;
