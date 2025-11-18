require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const weatherRouter = require("./routes/weather");
const forecastRouter = require("./routes/forecast");

const logger = require("./middleware/logger");
const cacheMiddleware = require("./middleware/cache");
const errorHandler = require("./middleware/error");
const limiter = require("./middleware/rateLimiter");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(logger);
app.use("/api", limiter);
app.use(cacheMiddleware);

app.use("/api/weather", weatherRouter);
app.use("/api/forecast", forecastRouter);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.use(errorHandler);

module.exports = app;
