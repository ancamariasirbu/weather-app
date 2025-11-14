const axios = require("axios");

async function getCurrent(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const { data } = await axios.get(url);
  return data;
}

async function getDaily(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  const { data } = await axios.get(url);
  return data;
}

module.exports = { getCurrent, getDaily };
