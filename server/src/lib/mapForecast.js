const mapOwmCondition = require("./owmConditions");

function pad(n) {
  return String(n).padStart(2, "0");
}

// OpenWeatherMap's free forecast is 5 days in 3-hour steps. Collapse those
// steps into one entry per local day: min/max across the day, and the
// condition/icon from the step closest to local noon (most representative).
function mapForecast(providerData, cityInfo) {
  const tz = (providerData.city && providerData.city.timezone) || 0;
  const list = providerData.list || [];

  const byDate = new Map();

  for (const entry of list) {
    const local = new Date((entry.dt + tz) * 1000);
    const dateKey = `${local.getUTCFullYear()}-${pad(
      local.getUTCMonth() + 1
    )}-${pad(local.getUTCDate())}`;
    const noonDiff = Math.abs(local.getUTCHours() - 12);

    let day = byDate.get(dateKey);
    if (!day) {
      day = { min: Infinity, max: -Infinity, noonDiff: Infinity, noonEntry: null };
      byDate.set(dateKey, day);
    }

    day.min = Math.min(day.min, entry.main.temp_min);
    day.max = Math.max(day.max, entry.main.temp_max);
    if (noonDiff < day.noonDiff) {
      day.noonDiff = noonDiff;
      day.noonEntry = entry;
    }
  }

  const daily = Array.from(byDate.entries()).map(([date, day]) => {
    const id =
      day.noonEntry &&
      day.noonEntry.weather &&
      day.noonEntry.weather[0] &&
      day.noonEntry.weather[0].id;
    const { condition, icon } = mapOwmCondition(id);

    return {
      date,
      min: Math.round(day.min * 10) / 10,
      max: Math.round(day.max * 10) / 10,
      condition,
      icon,
    };
  });

  return {
    city: cityInfo.city,
    daily,
  };
}

module.exports = mapForecast;
