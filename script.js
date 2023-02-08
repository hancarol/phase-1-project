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

function getForecast(coordinates) {
  let apiKey = "7e320e70b095384fdeef1e450eb06132";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
}
function showCity(city) {
  let apiKey = "7e320e70b095384fdeef1e450eb06132";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
}
