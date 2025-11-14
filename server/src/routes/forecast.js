const express = require("express"); 
const router = express.Router();
// const forecastSample = require("../fixtures/forecast.sample.json");
const resolveCity = require("../lib/geo/resolveCity");
const { getDaily } = require("../lib/providers/openMeteo");
const mapForecast = require("../lib/mapForecast");


router.get("/", async (req, res) => {
  const cityName = req.query.city || "Berlin";

  try {
    const cityInfo = resolveCity(cityName);
    const providerData = await getDaily(cityInfo.lat, cityInfo.lon);
    const mapped = mapForecast(providerData, cityInfo);
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: "PROVIDER_ERROR", message: err.message } });
  }
});
module.exports = router;