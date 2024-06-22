let search_place = document.getElementById("search");

async function search(loc) {
  let respond = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=374cabdc130843d2b7a161348242006&q=${loc}&days=3`
  );
  if (respond.ok) {
    let data = await respond.json();
    display_today_data(data.location, data.current); // pass the data location of the place , pass the today data (current)=respond
    display_next_days(data.forecast.forecastday); // pass the data of next two day
  }
}

search("cairo"); // defult value of location

search_place.addEventListener("keyup", function (loc) {
  // search in the input for the location
  search(loc.target.value); // it is == search(search_place.value) that take the value when we type in input search
});

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function display_today_data(loc, respond) {
  let new_date = new Date(respond.last_updated);
  cartona = `
        <div class="col-xs-12 col-md-12 col-lg-4">
          <div class="today weather-1">
            <div class="weather-header" id="today">
              <div class="days">${days[new_date.getDay()]}</div>
              <div class="dates">${
                new_date.getDate() + month[new_date.getMonth()]
              }</div>
            </div>
            <div class="weather-content">
              <p class="loc">${loc.name}</p>
              <div class="degree">
                <div class="num">
                  ${respond.temp_c}<sup>o</sup>C
                </div>
                <div class="weather-icon">
                  <img src="https:${respond.condition.icon}" alt="icons">
                </div>
              </div>
              <div class="clear">
              ${respond.condition.text}
              </div>
              <span>
                <img src="images/icon-umberella.png" alt="icon-umberella">
                20%
              </span>
              <span>
                <img src="images/icon-wind.png" alt="icon-wind">
                18km/h
              </span>
              <span>
                <img src="images/icon-compass.png" alt="icon-compass">
                East
              </span>
            </div>
          </div>
        </div>
  `;
  document.getElementById("weather").innerHTML = cartona;
}

function display_next_days(forecastday_info) {
  let cartona = "";
  for (let i = 1; i < forecastday_info.length; i++) {
    let new_next_date = new Date(forecastday_info[i].date);
    cartona += `
        <div class="col-xs-12 col-md-12 col-lg-4 column-${i + 1}">
          <div class="weather-${i + 1}">
            <div class="weather-header" id="today">
              <div class="days mx-auto">${days[new_next_date.getDay()]}</div>
            </div>
            <div class="weather-content">
              <div class="weather-icon">
                <img src="http:${
                  forecastday_info[i].day.condition.icon
                }" alt="condation-icons">
              </div>
              <div class="degree">
                <div class="num">
                  ${forecastday_info[i].day.maxtemp_c}<sup>o</sup>C
                </div>
                <small>
                  ${forecastday_info[i].day.mintemp_c}<sup>o</sup>
                </small>
              </div>
              <div class="clear mt-4">
              ${forecastday_info[i].day.condition.text}
              </div>
            </div>
          </div>
        </div>
    `;
  }
  document.getElementById("weather").innerHTML += cartona;
}
