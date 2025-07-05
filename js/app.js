// app.js

import { getCityInfo, getWeather } from './api.js';
import {
  getUserInput,
  clearInput,
  displayMainCard,
  updateCityTemperature,
  displayWeatherIcon
} from './ui.js';

/**
 * List of predefined Greek cities to display weather info on page load.
 */
const mainCities = ['Athens', 'Thessaloniki', 'Patras', 'Heraklion'];

/**
 * Main application logic encapsulated in the App object.
 */
export const App = {
  /**
   * Fetches and displays weather data for predefined cities.
   * Runs during initial page load.
   */
  async loadInitialCities() {
    for (const city of mainCities) {
      try {
        const cityData = await getCityInfo(city);
        const weatherData = await getWeather(cityData.lat, cityData.lon);
        updateCityTemperature(city, weatherData.temperature);
        displayWeatherIcon(weatherData.weather, city);
      } catch (error) {
        console.error(`Failed to load data for ${city}:`, error);
      }
    }
  },

  /**
   * Handles user search input to fetch and display weather data for a custom city.
   */
  async searchCityWeather() {
    const city = getUserInput();
    if (!city) return alert("Please enter a city name!");
    clearInput();

    try {
      const cityData = await getCityInfo(city);
      const weatherData = await getWeather(cityData.lat, cityData.lon);

      displayMainCard(cityData.name, weatherData);
      displayWeatherIcon(weatherData.weather, city);
    } catch (error) {
      console.error("Error fetching weather for user input:", error);
      alert("City not found or API error occurred.");
    }
  },

  /**
   * Sets up DOM event listeners for user interactions (e.g. search, close card).
   */
  setupEventListeners() {
    // Handle search button click
    $('#searchBtn').on('click', this.searchCityWeather);

    // Handle close button on weather cards
    $(document).on('click', '.close-btn', function () {
      $(this).closest('.main-card').fadeOut(300, function () {
        $(this).remove();
      });
    });
  },

  /**
   * Initializes the application by loading city data and setting up UI behavior.
   */
  async init() {
    await this.loadInitialCities();
    this.setupEventListeners();
  }
};
