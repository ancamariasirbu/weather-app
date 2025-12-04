import { useState } from "react";
import "./SearchBar.css";
import searchIcon from "../../assets/search-icon-cream.svg";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = value.trim();

    // if empty string, do nothing
    if (!trimmed) return;

    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city-input"></label>

      <input
        className="search-input"
        id="city-input"
        type="text"
        placeholder="Search city…"
        onChange={(e) => setValue(e.target.value)}
      />

      <button className="search-btn" type="submit">
        <img className="search-icon" src={searchIcon} alt="Icon" />
      </button>
    </form>
  );
}

export default SearchBar;
