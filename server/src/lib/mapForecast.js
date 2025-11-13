const codeMap = {
  0: { condition: "Clear", icon: "sun" },
  1: { condition: "Mainly clear", icon: "sun" },
  2: { condition: "Partly cloudy", icon: "cloud" },
  3: { condition: "Cloudy", icon: "cloud" },
  61: { condition: "Rain", icon: "rain" },
  71: { condition: "Snow", icon: "snow" },
};

function mapForecast(providerData, cityInfo) {
  const { daily } = providerData;

  const dailyMapped = daily.time.map((date, i) => {
    const code = daily.weathercode[i];
    const mappedCode = codeMap[code] || { condition: "Unknown", icon: "unknown" };

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
