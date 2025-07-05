// ui.js

/**
 * Retrieves and trims the user input from the search field.
 * 
 * @returns {string} - The city name entered by the user.
 */
export function getUserInput() {
  return $('#cityInput').val().trim();
}

/**
 * Clears the search input field after submission.
 */
export function clearInput() {
  $('#cityInput').val('');
}

/**
 * Updates the temperature text for a given city card.
 * 
 * @param {string} city - The city name (used to target the correct DOM element).
 * @param {number} temp - The temperature value to display.
 */
export function updateCityTemperature(city, temp) {
  $(`.temp-${city.toLowerCase()}`).text(`${Math.round(temp)}°C`);
}

/**
 * Displays the main weather card for the user-selected city.
 * 
 * @param {string} cityName - The display name of the city.
 * @param {{temperature: number, description: string, feelsLike: number}} weatherData - Weather data for the city.
 */
export function displayMainCard(cityName, weatherData) {
  $('#userCity').removeClass('main-card');
  $('#userCity').html(`
    <button class="close-btn">✕</button>
    <h1 class="city-title">${cityName}</h1>
    <p class="info">${Math.round(weatherData.temperature)}°C</p>
    <p class="info">Feels like: ${Math.round(weatherData.feelsLike)}°C</p>
    <p class="info desc-${cityName.toLowerCase()}">--</p>
  `);
  $('#userCity').addClass('main-card');
  displayWeatherIcon(weatherData.weather, cityName);
}

/**
 * Displays an appropriate weather icon next to the description based on weather status.
 * 
 * @param {string} weather - The general weather condition (e.g. "Clear", "Rain").
 * @param {string} cityName - The city name used to target the correct icon placeholder.
 */
export function displayWeatherIcon(weather, cityName) {
  const iconBasePath = './icons/';
  let icon = '';

  switch (weather) {
    case 'Clear':
      icon = '2682848_day_forecast_sun_sunny_weather_icon.png';
      break;
    case 'Clouds':
      icon = '2682850_cloud_clouds_cloudy_forecast_weather_icon.png';
      break;
    case 'Rain':
      icon = '2682834_cloud_day_forecast_rain_rainy_icon.png';
      break;
    default:
      return; // No icon for unknown weather
  }

  $(`.desc-${cityName.toLowerCase()}`).after(`<img src="${iconBasePath}${icon}" height="40" width="40">`);
}
