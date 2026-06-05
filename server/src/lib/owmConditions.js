// Maps an OpenWeatherMap weather condition id to a short label + emoji icon.
// Ranges per https://openweathermap.org/weather-conditions
function mapOwmCondition(id) {
  if (id >= 200 && id < 300) return { condition: "Thunderstorm", icon: "⛈️" };
  if (id >= 300 && id < 400) return { condition: "Drizzle", icon: "🌦️" };
  if (id >= 500 && id < 600) {
    return id >= 502
      ? { condition: "Heavy rain", icon: "🌧️" }
      : { condition: "Rain", icon: "🌧️" };
  }
  if (id >= 600 && id < 700) return { condition: "Snow", icon: "❄️" };
  if (id >= 700 && id < 800) return { condition: "Fog", icon: "🌫️" };
  if (id === 800) return { condition: "Clear", icon: "☀️" };
  if (id === 801 || id === 802) return { condition: "Partly cloudy", icon: "⛅" };
  if (id === 803 || id === 804) return { condition: "Cloudy", icon: "☁️" };
  return { condition: "Unknown", icon: "🌡️" };
}

module.exports = mapOwmCondition;
