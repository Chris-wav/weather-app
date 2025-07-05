// api.js

/**
 * API key for OpenWeatherMap requests.
 * Note: In production, this key should be hidden using environment variables or a backend proxy.
 */
const API_KEY = '57f2e066bcd08cba0320252ad713adb0';

/**
 * Fetches geographical information (latitude, longitude, and display name) for a given city.
 * 
 * @param {string} city - The name of the city to search for.
 * @returns {Promise<{lat: number, lon: number, name: string}>} - An object containing geolocation data.
 */
export async function getCityInfo(city) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},GR&limit=5&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data[0]) {
    throw new Error("City not found");
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].local_names?.el || data[0].name
  };
}

/**
 * Fetches current weather information for specific coordinates.
 * 
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Promise<{temperature: number, description: string, feelsLike: number, weather: string}>}
 */
export async function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    temperature: data.current.temp,
    description: data.current.weather[0].description,
    feelsLike: data.current.feels_like,
    weather: data.current.weather[0].main
  };
}
