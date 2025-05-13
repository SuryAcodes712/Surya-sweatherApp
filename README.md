# 🌆 Surya's Weather App

A sleek, cyberpunk-themed weather application that displays real-time weather conditions for any location on Earth.

## 🌟 Features

- 🌡️ Current weather: temperature, humidity, pressure, cloud coverage  
- 📍 Geolocation support: detects and displays your local weather  
- 🔍 Search any city worldwide  
- ⚡ Responsive, cyberpunk-inspired UI  
- 🔒 Privacy-focused location permissions  

---

## ⚙️ Setup Instructions

1. 📥 **Clone the repository**

    ```bash
    git clone https://github.com/SuryAcodes712/Surya-sweatherApp.git
    ```

2. 🗂️ **Create a `config.js` file in the root directory**

3. 🌐 **Open `index.html` in your browser**

---

## 🔑 Get Your API Key

To fetch live weather data, you need a free API key from OpenWeatherMap.

### 📝 Steps:

1. Visit: [https://home.openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up)  
2. Create an account and verify your email  
3. Go to the **API keys** section  
4. Generate a **free API key**  
5. Create a `config.js` file in your project folder and paste the key:

```javascript
// config.js
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
