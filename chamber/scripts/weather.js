const baseUrl = '//api.openweathermap.org/data/2.5';
const apiKey = 'db9de8e006252fe313f38b494f6dfb6a';
const lat = '40.389790398445946';
const lon = '-111.84780798422405';
const currentWeatherUrl = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

const currentWeatherDiv = document.querySelector('#current-weather');
const weatherForecastDiv = document.querySelector('#weather-forecast');

async function getCurrentWeather() {
    const response = await fetch(currentWeatherUrl);
    if (response.status === 200) {
        const data = await response.json();
        console.log(data);
    }
}

getCurrentWeather();
