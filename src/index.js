//Current Time 

function currentTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[now.getDay()];


  return `${day} ${formatHours()} `;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let twentyFourHour = date.getHours();
  console.log(date);

  if (hour < 10) {
    hour = `0${hour}`
  }
  let mid = "pm";

  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour === 0) {
    hour = 12;
  };

  if (twentyFourHour < 12) {
    mid = "am";
  };
  
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  };

  return `${hour}:${minutes}${mid}`;
}

let displayTime = document.querySelector("h4");
displayTime.innerHTML = currentTime();

// Search Engine 

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");

    if (searchInput.value) {
        city.innerHTML = `${searchInput.value}`; 
    } else {
      alert(`Please enter a city`);
    }

  
  let cityName = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  
  axios.get(`${apiUrl}`).then(getWeather);
}


// Display on launch 

let city = document.querySelector("#city");
city.innerHTML = "Melbourne";
let apiKey = "560ccf0a9b6f4d30ed340bdb4dfaf585";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Melbourne&appid=${apiKey}&units=${units}`
axios.get(`${apiUrl}`).then(getWeather);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);


// Current Temp & Current Location Button Changes

function getCurrentPosition() {
 navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude; 
  let unit = "metric"
  let apiKey = "560ccf0a9b6f4d30ed340bdb4dfaf585";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  axios.get(urlApi).then(getWeather);
}

function getWeather(response) {
  let iconElement = document.querySelector("#weather-icon");
  
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#description").innerHTML = response.data.weather[0].description;

  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like); 

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  
  iconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
}


let currentTempButton = document.querySelector("#current-button");
currentTempButton.addEventListener("click", getCurrentPosition);


//Temperature Conversion
  //Celcius
function celciusConversion(event) {
  event.preventDefault();
  let tempChange = document.querySelector("#temp");
  tempChange.innerHTML = "16°";
}

let celciusChange = document.querySelector("#celcius-link");
celciusChange.addEventListener("click", celciusConversion);

  //Fahrenheit
function fahrenheitConversion(event) {
  event.preventDefault();
  let tempChange = document.querySelector("#temp");
  tempChange.innerHTML = "61°";
}

let fahrenheitChange = document.querySelector("#fahrenheit-link");
fahrenheitChange.addEventListener("click", fahrenheitConversion); 

//Hourly Forecast 

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTMl = null; 
  

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <li>    
        <span id="forecast-day">${formatHours(forecast.dt * 1000)}</span>
        <img 
          src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
          id="forecast-icon"
          alt="weather icon"> 
        <span id="forecast-temp">${Math.round(forecast.main.temp)}°</span>
      </li>
        `;
  }
}

let apiUrl5Day = `https://api.openweathermap.org/data/2.5/forecast?q=Melbourne&appid=${apiKey}&units=${units}`
axios.get(apiUrl5Day).then(displayForecast);
