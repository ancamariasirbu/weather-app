// const resolveCity = require("./geo/resolveCity");

// async function handleCityRequest(req, res, handlerFn) {
//   const city = req.query.city;
//   console.log("Incoming city:", city);
//   if (!city) return res.status(400).json({ error: { code: 400, message: "Missing ?city parameter" } });

//   const resolved = resolveCity(city);
//   console.log("Resolved:", resolved);
//   if (!resolved) return res.status(404).json({ error: { code: 404, message: "Unknown city" } });

//   try {
//     const data = await handlerFn(resolved);
//     res.json(data);
//   } catch (err) {
//     console.error("Provider error:", err.message);
//     res.status(502).json({ error: { code: 502, message: "Upstream provider error" } });
//   }
// }

// module.exports = { handleCityRequest };