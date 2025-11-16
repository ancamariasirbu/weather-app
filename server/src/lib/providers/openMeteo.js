const axios = require("axios");

async function getCurrentWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const { data } = await axios.get(url);
  return data;
}

async function getCoordinates(name) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1`;
  const { data } = await axios.get(url);
  return data;
}


async function getDailyForecast(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  const { data } = await axios.get(url);
  return data;
}

module.exports = { getCurrentWeather, getDailyForecast, getCoordinates };
