const express = require("express");
const router = express.Router();
const createError = require("../lib/createError");
const {
  getCurrentWeather,
  getCoordinates,
} = require("../lib/providers/openMeteo");
const mapWeather = require("../lib/mapWeather");
const mapCoordinates = require("../lib/mapCoordinates");
const validateCity = require("../helpers/validateCity");

// --------------------------
// SIMPLE CACHE (3 min TTL)
// --------------------------
const cache = new Map();
const CACHE_TTL = 3 * 60 * 1000;

function isCacheValid(city) {
  const entry = cache.get(city);
  if (!entry) return false;
  return Date.now() - entry.timestamp < CACHE_TTL;
}

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

    const openMeteoData = await getCurrentWeather(
      mappedCityCoordinates.lat,
      mappedCityCoordinates.lon
    );
    const mappedCurrentWeather = mapWeather(
      openMeteoData,
      mappedCityCoordinates
    );
    res.json(mappedCurrentWeather);
  } catch (err) {
    return next(createError("PROVIDER_ERROR", 500, err.message));
  }
});

// ---------------------------------------------------------
// GET /api/weather/multi?cities=berlin,london,paris
// ---------------------------------------------------------
router.get("/multi", async (req, res, next) => {
  const citiesParam = req.query.cities;

  if (!citiesParam) {
    return next(
      createError("BAD_REQUEST", 400, "cities parameter is required")
    );
  }

  const cities = citiesParam.split(",").map((c) => c.trim().toLowerCase());

  const results = {};

  for (const city of cities) {
    if (!validateCity(city)) {
      results[city] = { error: "Invalid city name" };
      continue;
    }

    // Serve cached version if available
    if (isCacheValid(city)) {
      results[city] = cache.get(city).data;
      continue;
    }

    try {
      const rawCoordinates = await getCoordinates(city);
      const mappedCoords = mapCoordinates(rawCoordinates);

      if (!mappedCoords) {
        results[city] = { error: "City not found" };
        continue;
      }

      const rawWeather = await getCurrentWeather(
        mappedCoords.lat,
        mappedCoords.lon
      );

      const mappedWeather = mapWeather(rawWeather, mappedCoords);

      // 3. Cache result
      cache.set(city, {
        timestamp: Date.now(),
        data: mappedWeather,
      });

      results[city] = mappedWeather;
    } catch (err) {
      results[city] = { error: err.message || "Weather fetch failed" };
    }
  }

  res.json(results);
});

module.exports = router;
