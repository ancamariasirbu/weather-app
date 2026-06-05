import { useState } from "react";
import "./SearchBar.css";

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
    <form className="search" onSubmit={handleSubmit}>
      <label htmlFor="city-input" className="visually-hidden">
        Search city
      </label>

      <svg
        className="search-glyph"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <input
        className="search-input"
        id="city-input"
        type="text"
        placeholder="Search city…"
        onChange={(e) => setValue(e.target.value)}
      />

      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
