const express = require("express");
const router = express.Router();
const createError = require("../lib/createError");
const {
  getDailyForecast,
  getCoordinates,
} = require("../lib/providers/openMeteo");
const mapForecast = require("../lib/mapForecast");
const mapCoordinates = require("../lib/mapCoordinates");
const validateCity = require("../helpers/validateCity");

router.get("/", async (req, res, next) => {
  const cityName = req.query.city;

  if (!cityName) {
    return next(createError("BAD_REQUEST", 400, "city is required"));
  }

  const isValidCity = validateCity(cityName);

  if (!isValidCity) {
    return next(createError("BAD_REQUEST", 400, "city is invalid"));
  }

  try {
    const cityRawData = await getCoordinates(cityName);
    const mappedCityCoordinates = mapCoordinates(cityRawData);

    const openMeteoData = await getDailyForecast(
      mappedCityCoordinates.lat,
      mappedCityCoordinates.lon
    );
    const mappedDailyForecast = mapForecast(
      openMeteoData,
      mappedCityCoordinates
    );

    res.json(mappedDailyForecast);
  } catch (err) {
    return next(createError("PROVIDER_ERROR", 500, err.message));
  }
});
module.exports = router;
