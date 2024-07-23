const apiKey = '31a2270b229745a9b4d164415232710';
const locationInput = document.getElementById('location');
const suggestionsContainer = document.getElementById('suggestions');
const searchButton = document.getElementById('search');

locationInput.addEventListener('input', async () => {
    const query = locationInput.value;

    if (query.length < 3) {
        suggestionsContainer.classList.add('hidden');
        return;
    }

    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`);
    const suggestions = await response.json();

    displaySuggestions(suggestions);
});

function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';

    if (suggestions.length === 0) {
        suggestionsContainer.classList.add('hidden');
        return;
    }

    suggestions.forEach(suggestion => {
        const item = document.createElement('li');
        item.className = 'suggestion-item';
        item.textContent = `${suggestion.name}, ${suggestion.country}`;
        item.addEventListener('click', () => {
            locationInput.value = suggestion.name;
            suggestionsContainer.classList.add('hidden');
        });

        suggestionsContainer.appendChild(item);
    });

    suggestionsContainer.classList.remove('hidden');
}

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!locationInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.classList.add('hidden');
    }
});



window.addEventListener('DOMContentLoaded', () => {
    // async function getWeatherData(cityName, apiKey) {
    //     console.log(cityName);
    //     const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&days=2`);
    //     const data = await response.json();
    //     console.log(data);

    //     //Display weather data
    //     const location = document.getElementById('city_name');
    //     location.innerText = `${data.location.name}, ${data.location.country}`;

    //     const description = document.getElementById('description');
    //     description.innerText = data.current.condition.text;

    //     const temperature = document.getElementById('main-temp');
    //     temperature.innerText = `${Math.round(data.current.temp_c)}°C`;

    //     const weather_pic = document.getElementById('weather_pic');
    //     weather_pic.src = `https:${data.current.condition.icon}`;
    //     weather_pic.alt = `Weather Icon: ${data.current.condition.text}`;

    // }

    async function getForecastData(cityName, apiKey) {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`);
        const data = await response.json();
        console.log(data);

        //Display weather data
        const location = document.getElementById('city_name');
        location.innerText = `${data.location.name}, ${data.location.country}`;

        const description = document.getElementById('description');
        description.innerText = data.current.condition.text;

        const temperature = document.getElementById('main-temp');
        temperature.innerText = `${Math.round(data.current.temp_c)}°C`;

        const weather_pic = document.getElementById('weather_pic');
        weather_pic.src = `https:${data.current.condition.icon}`;
        weather_pic.alt = `Weather Icon: ${data.current.condition.text}`;

        // getting current time 
        const currentHour = new Date().getHours();
        console.log(currentHour);

        //Display forecast hours
        for (let i = 1; i <= 3; i++) {
            const hourlyElement = document.getElementById(`hour${i}`);
            let forecastData;

            if (currentHour + i < 24) {
                // Data is still within today's forecast
                forecastData = data.forecast.forecastday[0].hour[currentHour + i];
            } else {
                // Data is in tomorrow's forecast
                forecastData = data.forecast.forecastday[1].hour[(currentHour + i) - 24];
            }

            hourlyElement.innerText = forecastData ? forecastData.time.slice(11, 16) : 'N/A';
        }

        // Displaying forecast images and temprature 
        for (let i = 1; i <= 3; i++) {
            const hourlyElement = document.getElementById(`hour${i}`);
            const hourlyImgElement = document.getElementById(`hour-img-${i}`);
            const hourlyTempElement = document.getElementById(`hourly-temp-${i}`);
            let forecastData;

            if (currentHour + i < 24) {
                // Data is still within today's forecast
                forecastData = data.forecast.forecastday[0].hour[currentHour + i];
            } else {
                // Data is in tomorrow's forecast
                forecastData = data.forecast.forecastday[1].hour[(currentHour + i) - 24];
            }

            if (forecastData) {
                hourlyElement.innerText = forecastData.time.slice(11, 16);
                hourlyImgElement.src = `https:${forecastData.condition.icon}`;
                hourlyImgElement.alt = `Weather Icon: ${forecastData.condition.text}`;
                hourlyTempElement.innerText = `${Math.round(forecastData.temp_c)}°C`;
            } else {
                hourlyElement.innerText = 'N/A';
                hourlyImgElement.src = '';
                hourlyImgElement.alt = '';
                hourlyTempElement.innerText = '';
            }
        }

        // Writing for loop to show next 3 days avg forecast
        for (let i = 0; i <= 2; i++) {

            const dailyImgElement = document.getElementById(`daily-img-${i}`);
            const dailyDescElement = document.getElementById(`desc-${i}`);
            const dailyTempElement = document.getElementById(`daily-temp-${i}`);

            dailyImgElement.src = `https:${data.forecast.forecastday[i].day.condition.icon}`;
            dailyImgElement.alt = `Weather Icon: ${data.forecast.forecastday[i].day.condition.icon}`;
            dailyDescElement.innerText = data.forecast.forecastday[i].day.condition.text;
            dailyTempElement.innerText = `${Math.round(data.forecast.forecastday[i].day.avgtemp_c)}/             
            ${Math.round(data.forecast.forecastday[i].day.mintemp_c)}°C`;

        }
        const dailyDateElement = document.getElementById(`date-next`);
        dailyDateElement.innerText = data.forecast.forecastday[2].date.slice(5, 10);


    }

    // Showing weather
    const search = document.getElementById('search');
    search.addEventListener("click", function () {
        const cityName = document.getElementById('location').value;
        // getWeatherData(cityName, apiKey);
        getForecastData(cityName, apiKey);
    });


    async function getWeatherData(city) {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        const data = await response.json();
        return data;
    }

    function updateCard(cardId, weatherData) {
        const iconElement = document.getElementById(`icon-${cardId}`);
        const cityNameElement = document.getElementById(`city-name-${cardId}`);
        const timeElement = document.getElementById(`time-${cardId}`);
        const tempElement = document.getElementById(`temp-${cardId}`);

        // Update the elements with weather data
        iconElement.src = `https:${weatherData.current.condition.icon}`;
        cityNameElement.textContent = weatherData.location.name;
        timeElement.textContent = new Date(weatherData.location.localtime).toLocaleTimeString();
        tempElement.textContent = `${weatherData.current.temp_c}°C`;
    }

    async function updateWeatherCards() {
        const cities = ['New York', 'London', 'Tokyo', 'Sydney']; // Add or modify your city list

        for (let i = 0; i < cities.length; i++) {
            const weatherData = await getWeatherData(cities[i]);
            updateCard(i + 1, weatherData); // cardId starts from 1
        }
    }

    // Call the function to update the cards when the page loads or at a regular interval
    updateWeatherCards();


});
// this will toggle nav menu in mobile mode
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('nav-toggle').addEventListener('click', function () {
      var menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
      
    });
  });
