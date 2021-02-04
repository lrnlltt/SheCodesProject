//Current Time 

function currentTime(timestamp) {
  let now = new Date(timestamp);

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


  return `${day} ${formatHours(timestamp)} `;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let twentyFourHour = date.getHours();

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


// Display on load 

let apiKey = "560ccf0a9b6f4d30ed340bdb4dfaf585";
let units = "metric";
let cityName = "Melbourne";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
axios.get(`${apiUrl}`).then(getWeather);


let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let celsiusTemperature = null; 

// Search Engine 

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");

    if (searchInput.value) {
        city.innerHTML = `${searchInput.value}`; 
    } else {
      alert(`Please enter a city`);
    }
  
  cityName = searchInput.value;
  
  
  axios.get(`${apiUrl}`).then(getWeather);
}


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
  let celsiusTemperature = response.data.main.temp; 
  
  let iconElement = document.querySelector("#weather-icon");

  document.querySelector("#current-time-display").innerHTML = currentTime(response.data.dt * 1000);
  
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);

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
function celsiusConversion(event) {
  event.preventDefault();
  let tempChange = document.querySelector("#temp");
  tempChange.innerHTML = Math.round(celsiusTemperature);
  fahrenheitChange.classList.remove("active");
  celsiusChange.classList.add("active");
}

let celsiusChange = document.querySelector("#celcius-link");
celsiusChange.addEventListener("click", celsiusConversion);

  //Fahrenheit
function fahrenheitConversion(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32; 
  let tempChange = document.querySelector("#temp");
  tempChange.innerHTML = Math.round(fahrenheitTemp);
  celsiusChange.classList.remove("active");
  fahrenheitChange.classList.add("active");
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