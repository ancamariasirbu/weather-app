const cities = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Berlin",
  "Sydney",
  "Moscow",
  "Rio de Janeiro",
  "Cape Town",
  "Toronto",
];

export function getRandomCityName() {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}
