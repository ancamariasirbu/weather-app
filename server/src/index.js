require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

const weatherRouter = require("./routes/weather");
const forecastRouter = require("./routes/forecast");

const cacheMiddleware = require("./middleware/cache");


app.use(cors({
  origin: "http://localhost:5173"
}));

app.use('/api/weather', cacheMiddleware, weatherRouter);
app.use('/api/forecast', cacheMiddleware, forecastRouter);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server" });
})



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
