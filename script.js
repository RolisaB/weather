let form = document.getElementById("form");
let textinput = document.getElementById("text-input");
let cityName = document.getElementById("cityName");
// *** NEW: Targeting the container for the multiple forecast entries ***
let forecastContainer = document.getElementById("forecast-container"); 
let apiKey = "46e47538b2f9db6c8ef36a9850a41ca2";
let h3 = document.getElementById("h3");

// Existing date/time logic (no change needed here)
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
h3.innerHTML = `${day} ${date}, ${month} ${year}`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let city = textinput.value;
  
  // *** CHANGE 1: Swapping /weather for /forecast in the API call ***
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );
  
  let data = await response.json();
  
  if (data.cod === "404") {
    alert("City not found");
    return;
  }
  
  console.log(data);
  
  // Display the city name once
  cityName.textContent = data.city.name;
  
  // Clear the container before adding new forecast data
  forecastContainer.innerHTML = ""; 

  // *** CHANGE 2: Loop through the 'list' array to display the 3-hourly forecast ***
  // OpenWeatherMap's forecast returns 40 entries (5 days * 8 intervals/day)
  data.list.forEach((forecast) => {
    
    // Create a new div element for each forecast interval
    const forecastElement = document.createElement("div");
    forecastElement.className = "forecast-card"; // Add a class for styling
    
    // Format the date/time string provided by the API (dt_txt)
    const forecastDate = new Date(forecast.dt_txt);
    const dayName = days[forecastDate.getDay()];
    const time = forecastDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Populate the element with forecast data
    forecastElement.innerHTML = `
        <p class="forecast-time">${dayName} at ${time}</p>
        <p class="forecast-temp">${Math.round(forecast.main.temp)}°C</p>
        <p class="forecast-desc">${forecast.weather[0].description}</p>
        <p class="forecast-humidity">Humidity: ${forecast.main.humidity}%</p>
        <p class="forecast-wind">Wind: ${forecast.wind.speed} m/s</p>
    `;

    // Append the new element to the main container
    forecastContainer.appendChild(forecastElement);
  });
});
