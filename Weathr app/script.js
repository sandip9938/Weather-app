let city1 = "aska";
let units = "metric";

// selectors
let city = document.querySelector(".weather_city");
let datetime = document.querySelector(".weather_datetime");
let wetherforcast = document.querySelector(".weather_forcat");
let weathertemp = document.querySelector(".weathertemp");

let weatherminmax = document.querySelector(".wweather_minmax");
let weatherrealfeel = document.querySelector(".weather_realfeel");
let weatherhumidity = document.querySelector(".weather_humidity");
let weatherwind = document.querySelector(".weather_awind");
let weathergauge = document.querySelector(".weather_apressure");

document.querySelector(".weather_search").addEventListener("submit", (e) => {
  let search = document.querySelector(".wetherseachform");
  e.preventDefault();
  city1 = search.value;
  checkweather();
  search.value = " ";
});

document
  .querySelector(".weather_unit_in_celcius")
  .addEventListener("click", () => {
    if (units !== "metric") {
      // change to metric
      units = "metric";
      // get weather forecast
      checkweather();
    }
  });

document.querySelector(".weather_in_fernhit").addEventListener("click", () => {
  if (units !== "imperial") {
    // change to imperial
    units = "imperial";
    // get weather forecast
    checkweather();
  }
});

function converTimestamp(timestamp, timezone) {
  const converTimezone = timezone / 3600;
  const date = new Date(timestamp * 1000);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timezone:
      "Etc/GMT${converTimezone >=0 ? " -
      " : " +
      " }${Math.abs(converTimezone)}",
    hour12: true,
  };
  return date.toLocaleString("en-IN", options);
}

// commits country code
function convertcountrycode(country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}

// const apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function checkweather(){
  const apikey = "c5ba0adb932bff5e86972bb53e4811d9";
  // const response = await fetch(apiurl+ city1 +`&appid=${apikey}`)
  // var data = await response.json()
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${apikey}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      city.innerHTML = `${data.name},${convertcountrycode(data.sys.country)}`;
      datetime.innerHTML = converTimestamp(data.dt, data.timezone);
      wetherforcast.innerHTML = `<p>${data.weather[0].main}`;
      weathertemp.innerHTML = `${data.main.temp.toFixed()}&#176c`;
      weatherminmax.innerHTML = `<p>Min : ${data.main.temp_min.toFixed()}&#176<p>Max : ${data.main.temp_max.toFixed()}&#176`;
      weatherrealfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
      weatherhumidity.innerHTML = `${data.main.humidity.toFixed()}&#176`;
      weatherwind.innerHTML = `${data.main.humidity}km/h`;
      weathergauge.innerHTML = `${data.main.pressure}hpa`;
    });
}

document.body.addEventListener("load", checkweather());
