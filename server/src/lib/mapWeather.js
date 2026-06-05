const mapOwmCondition = require("./owmConditions");

// Format a Unix UTC timestamp (seconds) as local "HH:MM" using the city's
// timezone offset (seconds from UTC, provided by OpenWeatherMap).
function formatLocalTime(unixSeconds, tzOffsetSeconds) {
  if (typeof unixSeconds !== "number") return null;
  const d = new Date((unixSeconds + (tzOffsetSeconds || 0)) * 1000);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

// Input is OpenWeatherMap's /data/2.5/weather response (units=metric).
function mapWeather(providerData, cityInfo) {
  const weather = (providerData.weather && providerData.weather[0]) || {};
  const main = providerData.main || {};
  const wind = providerData.wind || {};
  const { condition, icon } = mapOwmCondition(weather.id);

  return {
    city: cityInfo.city,
    country: cityInfo.country,
    coords: { lat: cityInfo.lat, lon: cityInfo.lon },
    temp: main.temp,
    feelsLike: main.feels_like,
    condition,
    // units=metric returns wind in m/s; convert to km/h.
    windKph: Math.round(wind.speed * 3.6 * 10) / 10,
    humidity: main.humidity,
    sunrise: formatLocalTime(
      providerData.sys && providerData.sys.sunrise,
      providerData.timezone
    ),
    sunset: formatLocalTime(
      providerData.sys && providerData.sys.sunset,
      providerData.timezone
    ),
    icon,
  };
}

module.exports = mapWeather;
