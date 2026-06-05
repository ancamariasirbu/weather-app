import "./FavoriteButton.css";
import { useFavorites } from "../../contexts/FavoritesContext";

function FavoriteButton({ city }) {
  const { isFavorite, add, remove } = useFavorites();
  const favorite = isFavorite(city);

  function handleClick() {
    if (favorite) {
      remove(city);
    } else {
      add(city);
    }
  }

  return (
    <div className="favorite-button">
      <button
        className="favorite-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={favorite}
      >
        {favorite ? "♥" : "♡"}
      </button>
    </div>
  );
}

export default FavoriteButton;
