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

function showWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
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
}

function getForecast(coordinates) {
  let apiKey = "7e320e70b095384fdeef1e450eb06132";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
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
