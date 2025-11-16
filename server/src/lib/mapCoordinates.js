function mapCoordinates(paceholderRawCityData) {
  const currentCity = paceholderRawCityData.results[0];

const mapped = {
    city: currentCity.name,
    country: currentCity.country,
    countryCode: currentCity.country_code,
    lat: currentCity.latitude, 
    lon: currentCity.longitude,
  }

  console.log('mapped city:', mapped);
  
  return mapped;
}

module.exports = mapCoordinates;