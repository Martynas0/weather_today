import { api } from "./api";

const display = (function () {
  const userInputForm = document.querySelector("form");
  const tempDisplay = document.querySelector("div.result-temp > ul");
  const windDisplay = document.querySelector("div.result-wind > ul");
  const humidityDisplay = document.querySelector("div.result-humid > ul");
  const locationDisplay = document.querySelector(
    "div.result-container > h2 > span"
  );
  const toggleTempBtn = document.querySelector("button#toggle-temp");
  const displayUnitIcon = document.querySelector("h3 > span");

  let showCelcius = true;
  let currentLocationShowing = "Manchester";

  const toggleTempUnits = () => {
    if (showCelcius) {
      showCelcius = false;
      displayUnitIcon.setAttribute("class", "mdi mdi-temperature-fahrenheit");
    } else {
      showCelcius = true;
      displayUnitIcon.setAttribute("class", "mdi mdi-temperature-celsius");
    }
    api
      .fetchData(showCelcius, currentLocationShowing)
      .then((response) => displayWeather(response));
  };

  const handleForm = (e) => {
    e.preventDefault();
    const location = e.target[0].value;
    api
      .fetchData(showCelcius, location)
      .then((response) => displayWeather(response));
    e.target.reset();
  };

  const displayWeather = (weatherData) => {
    displayTemp(weatherData.twelveHours);
    displayWind(weatherData.twelveHours);
    displayHumidity(weatherData.twelveHours);
    displayLocation(weatherData.loc);
  };

  const displayLocation = (location) => {
    currentLocationShowing = location;
    locationDisplay.textContent = currentLocationShowing;
  };

  const displayTemp = (weatherData) => {
    while (tempDisplay.firstChild) {
      tempDisplay.removeChild(tempDisplay.lastChild);
    }
    console.log(weatherData);
    const nodeList = weatherData.map((item) => {
      const li = document.createElement("li");
      const temp = document.createElement("span");
      const hr = document.createElement("hr");
      const time = document.createElement("span");

      temp.textContent = `${item.temp} ${showCelcius ? "°C" : "°F"}`;
      time.textContent = item.datetime.slice(0, -3);

      li.append(temp, hr, time);
      return li;
    });
    nodeList.forEach((item) => tempDisplay.appendChild(item));
  };

  const displayWind = (weatherData) => {
    while (windDisplay.firstChild) {
      windDisplay.removeChild(windDisplay.lastChild);
    }
    console.log(weatherData);
    const nodeList = weatherData.map((item) => {
      const li = document.createElement("li");
      const wind = document.createElement("span");
      const hr = document.createElement("hr");
      const time = document.createElement("span");

      wind.textContent = `${item.windspeed} m/s`;
      time.textContent = item.datetime.slice(0, -3);

      li.append(wind, hr, time);
      return li;
    });
    nodeList.forEach((item) => windDisplay.appendChild(item));
  };

  const displayHumidity = (weatherData) => {
    while (humidityDisplay.firstChild) {
      humidityDisplay.removeChild(humidityDisplay.lastChild);
    }
    console.log(weatherData);
    const nodeList = weatherData.map((item) => {
      const li = document.createElement("li");
      const humidity = document.createElement("span");
      const hr = document.createElement("hr");
      const time = document.createElement("span");

      humidity.textContent = `${Math.trunc(item.humidity)} %`;
      time.textContent = item.datetime.slice(0, -3);

      li.append(humidity, hr, time);
      return li;
    });
    nodeList.forEach((item) => humidityDisplay.appendChild(item));
  };

  userInputForm.addEventListener("submit", handleForm);
  toggleTempBtn.addEventListener("click", toggleTempUnits);
})();
