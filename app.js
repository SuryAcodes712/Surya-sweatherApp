let valueSearch = document.getElementById('valuewSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

// Replace the url constant
// API URL is now imported from config.js

const setLoading = (isLoading) => {
    if (isLoading) {
        main.classList.add('is-loading');
    } else {
        main.classList.remove('is-loading');
    }
};

let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (valueSearch.value !== '') {
        searchWeather(valueSearch.value);
    }
});

// Add error handling helper
const handleError = (error) => {
    console.error('Error:', error);
    main.classList.add('error');
    setTimeout(() => main.classList.remove('error'), 1000);
};

// Update fetch calls with better error handling
const getWeatherByCoords = (lat, lon) => {
    setLoading(true);
    fetch(`${API_URL}&lat=${lat}&lon=${lon}`)
        .then(response => {
            if (!response.ok) throw new Error('Weather data fetch failed');
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) updateWeatherUI(data);
            else throw new Error(data.message || 'Location not found');
        })
        .catch(handleError)
        .finally(() => setLoading(false));
};

const searchWeather = (cityName) => {
    setLoading(true);
    fetch(`${API_URL}&q=${encodeURIComponent(cityName)}`)
        .then(response => {
            if (!response.ok) throw new Error('Weather data fetch failed');
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) updateWeatherUI(data);
            else throw new Error(data.message || 'City not found');
        })
        .catch(handleError)
        .finally(() => setLoading(false));
};

const updateWeatherUI = (data) => {
    city.querySelector('figcaption').textContent = data.name;
    city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
    
    const temp = Math.round(data.main.temp);
    temperature.querySelector('span:first-child').textContent = temp;
    temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    
    description.textContent = data.weather[0].description;
    clouds.textContent = data.clouds?.all || 0;
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
};

// Function to show location permission dialog
const requestLocationPermission = () => {
    const permissionDialog = document.createElement('div');
    permissionDialog.className = 'permission-dialog';
    permissionDialog.innerHTML = `
        <div class="permission-content">
            <h3>Enable Location Access</h3>
            <p>To show weather for your current location, please allow location access.</p>
            <div class="permission-buttons">
                <button id="allow-always" class="btn btn-primary">Allow while using</button>
                <button id="allow-once" class="btn">Allow this time only</button>
                <button id="deny-location" class="btn btn-outline">Skip</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(permissionDialog);
    
    // Handle allow always button click
    document.getElementById('allow-always').addEventListener('click', () => {
        permissionDialog.remove();
        localStorage.setItem('locationPermissionChoice', 'always');
        getCurrentLocation();
    });
    
    // Handle allow once button click
    document.getElementById('allow-once').addEventListener('click', () => {
        permissionDialog.remove();
        // Don't save to localStorage, so it will ask again next time
        getCurrentLocation();
    });
    
    // Handle deny button click
    document.getElementById('deny-location').addEventListener('click', () => {
        permissionDialog.remove();
        localStorage.setItem('locationPermissionChoice', 'denied');
        searchWeather('Beed'); // Default to Beed if location is denied
    });
};

// Function to get current location with maximum accuracy
const getCurrentLocation = () => {
    if (navigator.geolocation) {
        setLoading(true);
        
        // Create a status message element
        const statusMsg = document.createElement('div');
        statusMsg.className = 'location-status';
        statusMsg.textContent = 'Getting precise location...';
        document.body.appendChild(statusMsg);
        
        // Set timeout to remove status message after 10 seconds
        const statusTimeout = setTimeout(() => {
            if (document.body.contains(statusMsg)) {
                statusMsg.remove();
            }
        }, 10000);
        
        // Use maximum accuracy settings
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Clear status message
                clearTimeout(statusTimeout);
                if (document.body.contains(statusMsg)) {
                    statusMsg.remove();
                }
                
                // Log accuracy for debugging
                console.log(`Location accuracy: ${position.coords.accuracy} meters`);
                
                // Use the coordinates to get weather
                getWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                // Clear status message
                clearTimeout(statusTimeout);
                if (document.body.contains(statusMsg)) {
                    statusMsg.remove();
                }
                
                console.error('Geolocation error:', error.message);
                searchWeather('Beed');
            },
            {
                enableHighAccuracy: true,  // Request the most accurate position available
                timeout: 15000,            // Wait longer for better accuracy (15 seconds)
                maximumAge: 0              // Always get a fresh position, don't use cached
            }
        );
    } else {
        console.log('Geolocation not supported');
        searchWeather('Beed');
    }
};

// Request location permission when page loads
window.addEventListener('load', () => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
        console.log('Geolocation not supported');
        searchWeather('Beed');
        return;
    }
    
    // Check user's saved permission choice
    const permissionChoice = localStorage.getItem('locationPermissionChoice');
    
    if (permissionChoice === 'always') {
        // User has previously chosen to always allow
        getCurrentLocation();
    } else if (permissionChoice === 'denied') {
        // User has previously chosen to deny
        searchWeather('Beed');
    } else {
        // No choice saved or chose 'once' before - show dialog
        requestLocationPermission();
    }
});