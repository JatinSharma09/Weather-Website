const city1 = "Ahmedabad";
const city2 = "bangalore";

async function fetchWeatherData(location, cardId) {
  const url = `https://api.weatherapi.com/v1/current.json?key=31a2270b229745a9b4d164415232710&q=${location}`;

  const response = await fetch(url);
  const data = await response.json();

  const temperature = data.current.temp_c;
  const humidity = data.current.humidity;

  document.getElementById(`city${cardId}`).textContent = data.location.name;
  document.getElementById(`country${cardId}`).textContent = data.location.country;

  const weatherIcon = document.getElementById(`weather-icon${cardId}`);
  weatherIcon.src = `https:${data.current.condition.icon}`;
  weatherIcon.alt = `Weather Icon: ${data.current.condition.text}`;

  document.getElementById(`temperature${cardId}`).textContent = `${temperature}°C`;
  document.getElementById(`description${cardId}`).textContent = `${data.current.condition.text}`;

  console.log(`The current temperature in ${data.location.name} is ${temperature} degrees Celsius.`);
  document.getElementById(`humidity${cardId}`).textContent = `${humidity}%`;
}

function searchWeather() {
  const city = document.querySelector('input[name="city"]').value;
  fetchWeatherData(city, "1");
}

// Fetch weather data for Ahmedabad
fetchWeatherData(city1, "2");

// Fetch weather data for Bangalore
fetchWeatherData(city2, "3");

// for about button link
const aboutButton = document.getElementById("about");
aboutButton.addEventListener("click", function() {
  window.location.href = "https://demo-website.jatinsharma73.repl.co/#about-me";
});

// For Project Button Link
const projectButton = document.getElementById("projects-link");
projectButton.addEventListener("click", function() {
  window.location.href = "https://demo-website.jatinsharma73.repl.co/#projects";
});

// Add a click event listener to the "Contact" link
var contactLink = document.getElementById('contacts');
contactLink.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default behavior of the link
  var contactSection = document.getElementById('contact');
  contactSection.scrollIntoView({ behavior: 'smooth' });
});