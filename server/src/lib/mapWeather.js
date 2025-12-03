const codeMap = {
  0: { condition: "Clear", icon: "☀️" },
  1: { condition: "Mainly clear", icon: "☀️" },
  2: { condition: "Partly cloudy", icon: "⛅" },
  3: { condition: "Cloudy", icon: "☁️" },
  45: { condition: "Fog", icon: "🌫️" },
  48: { condition: "Depositing rime fog", icon: "🌫️" },
  51: { condition: "Light drizzle", icon: "🌦️" },
  53: { condition: "Drizzle", icon: "🌧️" },
  55: { condition: "Dense drizzle", icon: "🌧️" },
  56: { condition: "Light freezing drizzle", icon: "🌧️" },
  57: { condition: "Freezing drizzle", icon: "🌧️" },
  61: { condition: "Rain", icon: "🌧️" },
  63: { condition: "Moderate rain", icon: "🌧️" },
  65: { condition: "Heavy rain", icon: "🌧️" },
  66: { condition: "Light freezing rain", icon: "🌧️" },
  67: { condition: "Heavy freezing rain", icon: "🌧️" },
  71: { condition: "Snow", icon: "❄️" },
  73: { condition: "Moderate snow", icon: "❄️" },
  75: { condition: "Heavy snow", icon: "❄️" },
  77: { condition: "Snow grains", icon: "❄️" },
  80: { condition: "Rain showers", icon: "🌦️" },
  81: { condition: "Moderate rain showers", icon: "🌧️" },
  82: { condition: "Violent rain showers", icon: "⛈️" },
  85: { condition: "Snow showers", icon: "❄️" },
  86: { condition: "Heavy snow showers", icon: "❄️" },
  95: { condition: "Thunderstorm", icon: "⛈️" },
  96: { condition: "Thunderstorm with hail", icon: "⛈️" },
  99: { condition: "Severe thunderstorm with hail", icon: "⛈️" },
  default: { condition: "Unknown", icon: "unknown" },
};

function mapWeather(providerData, cityInfo) {
  const current = providerData.current_weather;
  const code = current.weathercode;
  const mappedCode = codeMap[code] || {
    condition: "Unknown",
    icon: "unknown",
  };

  return {
    city: cityInfo.city,
    country: cityInfo.country,
    coords: { lat: cityInfo.lat, lon: cityInfo.lon },
    temp: current.temperature,
    feelsLike: current.temperature, // Open-Meteo doesn’t provide "feels like" — reuse temp
    condition: mappedCode.condition,
    windKph: current.windspeed,
    humidity: 70, // Open-Meteo doesn’t return this, so fake it for now
    sunrise: "07:00",
    sunset: "16:30",
    icon: mappedCode.icon,
  };
}

module.exports = mapWeather;
