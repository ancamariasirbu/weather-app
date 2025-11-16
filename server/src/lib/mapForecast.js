const codeMap = {
  0: { condition: "Clear", icon: "sun" },
  1: { condition: "Mainly clear", icon: "sun" },
  2: { condition: "Partly cloudy", icon: "cloud-sun" },
  3: { condition: "Cloudy", icon: "cloud" },
  45: { condition: "Fog", icon: "fog" },
  48: { condition: "Depositing rime fog", icon: "fog-rime" },
  51: { condition: "Light drizzle", icon: "drizzle" },
  53: { condition: "Drizzle", icon: "drizzle" },
  55: { condition: "Dense drizzle", icon: "drizzle-heavy" },
  56: { condition: "Light freezing drizzle", icon: "drizzle-freeze" },
  57: { condition: "Freezing drizzle", icon: "drizzle-freeze-heavy" },
  61: { condition: "Rain", icon: "rain" },
  63: { condition: "Moderate rain", icon: "rain" },
  65: { condition: "Heavy rain", icon: "rain-heavy" },
  66: { condition: "Light freezing rain", icon: "rain-freeze" },
  67: { condition: "Heavy freezing rain", icon: "rain-freeze-heavy" },
  71: { condition: "Snow", icon: "snow" },
  73: { condition: "Moderate snow", icon: "snow" },
  75: { condition: "Heavy snow", icon: "snow-heavy" },
  77: { condition: "Snow grains", icon: "snow-grains" },
  80: { condition: "Rain showers", icon: "rain-showers" },
  81: { condition: "Moderate rain showers", icon: "rain-showers" },
  82: { condition: "Violent rain showers", icon: "rain-showers-heavy" },
  85: { condition: "Snow showers", icon: "snow-showers" },
  86: { condition: "Heavy snow showers", icon: "snow-showers-heavy" },
  95: { condition: "Thunderstorm", icon: "thunderstorm" },
  96: { condition: "Thunderstorm with hail", icon: "thunderstorm-hail" },
  99: { condition: "Severe thunderstorm with hail", icon: "thunderstorm-hail-heavy" },
  default: { condition: "Unknown", icon: "unknown" }
};


function mapForecast(providerData, cityInfo) {
  const { daily } = providerData;

  const dailyMapped = daily.time.map((date, i) => {
    const code = daily.weathercode[i];
    const mappedCode = codeMap[code] || codeMap.default;

    return {
      date,
      min: daily.temperature_2m_min[i],
      max: daily.temperature_2m_max[i],
      condition: mappedCode.condition,
      icon: mappedCode.icon,
    };
  });

  return {
    city: cityInfo.city,
    daily: dailyMapped.slice(0, 5), // first 5 days
  };
}

module.exports = mapForecast;
