import { useState } from "react";
import SearchBar from "../components/SearchBar";

function Home() {
  const [city, setCity] = useState("");

  function handleSearch(cityName) {
    console.log("Searched for:", cityName);
    setCity(cityName);
  }

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />

      {/* Temporary output just to verify the component works */}
      {city && <p>Showing weather for: {city}</p>}
    </div>
  );
}

export default Home;
