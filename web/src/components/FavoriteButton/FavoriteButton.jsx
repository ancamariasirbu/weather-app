import "./FavoriteButton.css";
import useFavorites from "../../hooks/useFavorites";

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
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {favorite ? "★" : "☆"}
      </button>
    </div>
  );
}

export default FavoriteButton;
