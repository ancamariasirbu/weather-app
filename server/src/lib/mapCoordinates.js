// Turn a 2-letter ISO country code (e.g. "GB") into a full name ("United
// Kingdom") using the built-in Intl API; fall back to the raw code.
let regionNames;
try {
  regionNames = new Intl.DisplayNames(["en"], { type: "region" });
} catch {
  regionNames = null;
}

function fullCountry(code) {
  if (!code) return code;
  try {
    return (regionNames && regionNames.of(code)) || code;
  } catch {
    return code;
  }
}

// Input is OpenWeatherMap's geocoding response: an array of matches.
function mapCoordinates(rawCityData) {
  const currentCity = Array.isArray(rawCityData) ? rawCityData[0] : null;

  if (!currentCity) {
    return null;
  }

  return {
    city: currentCity.name,
    country: fullCountry(currentCity.country),
    countryCode: currentCity.country,
    lat: currentCity.lat,
    lon: currentCity.lon,
  };
}

module.exports = mapCoordinates;
