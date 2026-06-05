const axios = require("axios");

// OpenWeatherMap authenticates per API key (tied to your account), not per IP,
// so it isn't affected by shared-host IP rate limits the way Open-Meteo was.
const BASE = "https://api.openweathermap.org";

function apiKey() {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error("OPENWEATHER_API_KEY is not set");
  }
  return key;
}

// 10s timeout so a hung upstream fails fast instead of hanging the request.
const client = axios.create({ timeout: 10000 });

async function getCoordinates(name) {
  const url = `${BASE}/geo/1.0/direct?q=${encodeURIComponent(
    name
  )}&limit=1&appid=${apiKey()}`;
  const { data } = await client.get(url);
  return data; // array of matches (empty if none found)
}

async function getCurrentWeather(lat, lon) {
  const url = `${BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey()}`;
  const { data } = await client.get(url);
  return data;
}

async function getDailyForecast(lat, lon) {
  // 5 day / 3 hour forecast (free tier). Aggregated into days in mapForecast.
  const url = `${BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey()}`;
  const { data } = await client.get(url);
  return data;
}

module.exports = { getCurrentWeather, getDailyForecast, getCoordinates };
