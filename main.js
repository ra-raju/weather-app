document.getElementById('submit').addEventListener('click', async () => {
  const input = document.getElementById('input');
  const inputValue = input.value;
  input.value = '';

  if (inputValue == '' || inputValue.length < 4 || inputValue == ' ') {
    alert('nothing found');
  } else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=3294b910dc006b006b6f33bb71419fe1`;

    const res = await fetch(url);
    const data = await res.json();
    showData(data);
  }
});

const showData = (weatherData) => {
  console.log(weatherData);

  displayData(weatherData);
};

const sunriseTime = (time) => {
  const timeNum = parseInt(time);

  const date = new Date(timeNum * 1000);
  console.log(date);
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let indicator = 'AM';

  if (hour == 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour = hour - 12;
    indicator = 'PM';
  }
  if (hour < 10) {
    hour = '0' + hour;
  }

  if (min < 10) {
    min = '0' + min;
  }
  if (sec < 10) {
    sec = '0' + sec;
  }

  return `${hour}: ${min}: ${sec} ${indicator}`;
};

const currentLocation = navigator.geolocation.getCurrentPosition(function (
  position
) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  // console.log(lat, lon)

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=3294b910dc006b006b6f33bb71419fe1`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => currentWeather(data));
});

const currentWeather = (current) => {
  console.log(current);
  displayData(current);
};

function displayData(data) {
  const weatherIcon = document.querySelector('.icon');
  const iconCode = `${data.weather[0].icon}`;
  console.log(iconCode);

  weatherIcon.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  const temp = document.querySelector('.temp');
  const tempReal = document.querySelector('.temp-real');
  tempReal.style.display = 'block';
  temp.innerText = `${Math.round(data.main.temp)}`;
  const situation = document.querySelector('.situation');
  situation.innerText = `${data.weather[0].main}`;

  const cityName = document.querySelector('.city-name');
  cityName.innerText = `${data.name}, ${data.sys.country}`;

  const feelTemp = document.querySelector('.feel-like');
  feelTemp.innerText = `${Math.round(data.main.feels_like)}`;

  const lowTemp = document.querySelector('.low-temp');
  lowTemp.innerText = `${Math.round(data.main.temp_min)}`;

  const maxTemp = document.querySelector('.high-temp');
  maxTemp.innerText = `${Math.round(data.main.temp_max)}`;

  const pressure = document.querySelector('.pressure-temp');
  pressure.innerText = `${Math.round(data.main.pressure)}`;

  const sunrise = document.querySelector('.sunrise-time');
  sunrise.innerText = sunriseTime(`${data.sys.sunrise}`);

  const sunset = document.querySelector('.sunset-time');
  sunset.innerText = sunriseTime(`${data.sys.sunset}`);
}
