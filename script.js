function time() {
  let now = new Date();
  let h2 = document.querySelector("h2");
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[now.getDay()];
  h2.innerText = `${day} ${hours}:${minutes}`;
}
time();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showWeather(response) {
  let celsiusTemperature = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("main-icon");
  let windSpeed = response.data.wind.speed;
  let windSpeedMetric = (windSpeed * 3600) / 1000;

  document.querySelector("#location").innerText = response.data.name;
  document.querySelector(
    "#main-temperature"
  ).innerText = `${celsiusTemperature}`;
  document.querySelector("wind-speed").innerText = Math.round(windSpeedMetric);
  document.querySelector("#humidity").innerText = response.data.main.humidity;
  document.querySelector("#weather-description").innerText =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastWeather = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 5) {
      forecast =
        forecastWeather +
        `<div class="col-2">
  <p>${formatDay(day.dt)}</p>
                  <img src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@2x.png" alt="weather-image" /> 
                  
                  <p>${day.weather[0].main}</p>
                  <p>${Math.round(day.temp.min)}°/${Math.round(
          day.temp.max
        )}°</p>
                </div>
              `;
    }
  });
  forecastWeather = forecastWeather + `</div>`;
  forecastElement.innerText = forecastWeather;
}

function getForecast(coordinates) {
  let apiKey = "7e320e70b095384fdeef1e450eb06132";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showCity(city) {
  let apiKey = "7e320e70b095384fdeef1e450eb06132";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  showCity(city);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let searchCity = document.querySelector("#search-location");
searchCity.addEventListener("submit", submitCity);

showCity("new york");
