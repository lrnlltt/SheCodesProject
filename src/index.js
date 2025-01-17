//Current Time 

function currentTime(timestamp) {
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

  return `${formatDate(timestamp)} ${hour}:${minutes}${mid}`;
}

function formatDate(timestamp) {
  
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

  return `${day}`;
}



// Search Engine 

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(`${apiUrl}`).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");
    if (searchInput.value) {
        city.innerHTML = `${searchInput.value}`; 
    } else {
      alert(`Please enter a city`);
    }
  
  search(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let apiKey = "560ccf0a9b6f4d30ed340bdb4dfaf585"


// Current Temp & Current Location Button Changes

function getCurrentPosition() {
 navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(urlApi).then(getWeather);
}

function getWeather(response) {
  let iconElement = document.querySelector("#weather-icon");
  let city = response.data.name;

  celsiusTemperature = response.data.main.temp; 

  document.querySelector("#current-time-display").innerHTML = currentTime(response.data.dt * 1000);
  
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#city").innerHTML = city;

  document.querySelector("#description").innerHTML = response.data.weather[0].description;

  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like); 

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  
  iconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);


  let apiUrl5Day = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl5Day).then(displayForecast);
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

let celsiusTemperature = null; 

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



//Daily Forecast 

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null; 
  let forecast = null; 

  for (let index = 0; index < 42; index+= 7) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <div>    
        <span id="forecast-day">${formatDate(forecast.dt * 1000)}</span>
        <img 
          src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
          id="forecast-icon"
          alt="weather icon"> 
        <span id="forecast-temp">${Math.round(forecast.main.temp)}°</span>
      </div>
        `;
  }
}



//On load

search("Melbourne");