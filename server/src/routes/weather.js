const express = require("express"); 
const router = express.Router();
// const weatherSample = require("../fixtures/weather.sample.json");
const createError = require("../lib/createError");
const resolveCity = require("../lib/geo/resolveCity");
const { getCurrent } = require("../lib/providers/openMeteo");
const mapWeather = require("../lib/mapWeather");


router.get("/", async (req, res, next) => {
  const cityName = req.query.city;

   if (!cityName) {
    return next(createError("BAD_REQUEST", 400, "city is required"));
  } 


  try {
    const cityInfo = resolveCity(cityName);
    const providerData = await getCurrent(cityInfo.lat, cityInfo.lon);
    const mapped = mapWeather(providerData, cityInfo);
    res.json(mapped);
  } catch (err) {
    return next(createError("PROVIDER_ERROR", 500, err.message));
  }
});

module.exports = router;