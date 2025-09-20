
let form = document.getElementById("form");
let textinput = document.getElementById("text-input");
let cityName = document.getElementById("cityName");
let details = document.getElementById("details");
let temp = document.getElementById("temp");
let apiKey = "46e47538b2f9db6c8ef36a9850a41ca2";
let h3 = document.getElementById("h3");
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
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  let data = await response.json();
  if (data.cod === "404") {
    alert("city not found");
    return;
  }
  console.log(data);
  cityName.textContent = data.name;
  temp.textContent = Math.round(data.main.temp) + "°C";
  details.innerHTML = `${data.weather[0].description}, Humidity: ${data.main.humidity}%, wind:${data.wind.speed}`;
});

