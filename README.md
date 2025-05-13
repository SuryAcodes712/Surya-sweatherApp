# Surya's Weather App

A sleek, cyberpunk-themed weather application that shows current weather conditions for any location.

## Features

- Current weather data with temperature, humidity, pressure, and cloud coverage
- Geolocation support to automatically show weather for your current location
- Search functionality to find weather for any city worldwide
- Responsive design with a futuristic cyberpunk UI
- Privacy-focused location permission system

## Setup

1. Clone this repository
2. Create a `config.js` file in the root directory (see below)
3. Open `index.html` in your browser

## Configuration

You need to create a `config.js` file with your OpenWeatherMap API key:

```javascript
// Get your API key from https://home.openweathermap.org/api_keys
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

// API URL with your key
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
```

## Getting an API Key

1. Sign up at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)
2. Go to the API keys tab
3. Generate a free API key
4. Copy the key into your `config.js` file

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OpenWeatherMap API
- Geolocation API

## License

MIT

## Screenshots

[Add screenshots of your app here]
