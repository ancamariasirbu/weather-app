const codeMap = {
  0: { condition: "Clear", icon: "sun" },
  1: { condition: "Mainly clear", icon: "sun" },
  2: { condition: "Partly cloudy", icon: "cloud" },
  3: { condition: "Cloudy", icon: "cloud" },
  45: { condition: "Fog", icon: "fog" },
  51: { condition: "Drizzle", icon: "rain" },
  61: { condition: "Rain", icon: "rain" },
  71: { condition: "Snow", icon: "snow" },
  95: { condition: "Thunderstorm", icon: "storm" },
};

function mapWeather(providerData, cityInfo) {
  const current = providerData.current_weather;
  const mappedCode = codeMap[current.weathercode] || { condition: "Unknown", icon: "unknown" };

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
    icon: mappedCode.icon
  };
}

module.exports = mapWeather;
