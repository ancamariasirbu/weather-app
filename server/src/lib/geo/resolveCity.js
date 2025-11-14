const cities = {
  Berlin: { lat: 52.52, lon: 13.405, country: "DE" },
  Paris: { lat: 48.8566, lon: 2.3522, country: "FR" },
  London: { lat: 51.5072, lon: -0.1276, country: "GB" },
  Madrid: { lat: 40.4168, lon: -3.7038, country: "ES" },
  Rome: { lat: 41.9028, lon: 12.4964, country: "IT" },
};

function resolveCity(name) {
  const city = cities[name];
  if (!city) throw new Error(`City not found: ${name}`);
  return { city: name, ...city };
  
}


module.exports = resolveCity;
