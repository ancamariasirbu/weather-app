const express = require("express"); 
const router = express.Router();
// const forecastSample = require("../fixtures/forecast.sample.json");
const createError = require("../lib/createError");
const resolveCity = require("../lib/geo/resolveCity");
const { getDaily } = require("../lib/providers/openMeteo");
const mapForecast = require("../lib/mapForecast");


router.get("/", async (req, res, next) => {
  const cityName = req.query.city;

     if (!cityName) {
    return next(createError("BAD_REQUEST", 400, "city is required"));
  } 


  try {
    const cityInfo = resolveCity(cityName);
    const providerData = await getDaily(cityInfo.lat, cityInfo.lon);
    const mapped = mapForecast(providerData, cityInfo);
    res.json(mapped);
  } catch (err) {
    return next(createError("PROVIDER_ERROR", 500, err.message));
  }
});
module.exports = router;