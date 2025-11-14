const express = require("express"); 
const router = express.Router();
// const weatherSample = require("../fixtures/weather.sample.json");
const resolveCity = require("../lib/geo/resolveCity");
const { getCurrent } = require("../lib/providers/openMeteo");
const mapWeather = require("../lib/mapWeather");


router.get("/", async (req, res) => {
  const cityName = req.query.city || "Berlin";

  try {
    const cityInfo = resolveCity(cityName);
    const providerData = await getCurrent(cityInfo.lat, cityInfo.lon);
    const mapped = mapWeather(providerData, cityInfo);
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: "PROVIDER_ERROR", message: err.message } });
  }
});

module.exports = router;