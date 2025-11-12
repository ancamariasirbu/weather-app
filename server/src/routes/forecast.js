const express = require("express"); 
const router = express.Router();
const forecastSample = require("../fixtures/forecast.sample.json");

router.get("/", (req, res) => {
  res.json(forecastSample);
});


module.exports = router;