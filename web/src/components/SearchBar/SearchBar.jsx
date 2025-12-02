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
    <form onSubmit={handleSubmit}>
      <label htmlFor="city-input"></label>

      <input
        id="city-input"
        type="text"
        placeholder="Search city…"
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
