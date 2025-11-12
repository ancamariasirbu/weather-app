const express = require("express"); 
const router = express.Router();
const weatherSample = require("../fixtures/weather.sample.json");

router.get("/", (req, res) => {
  res.json(weatherSample);
});

module.exports = router;