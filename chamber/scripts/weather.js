const baseUrl = '//api.openweathermap.org/data/2.5';
const apiKey = 'db9de8e006252fe313f38b494f6dfb6a';
const lat = '40.389790398445946';
const lon = '-111.84780798422405';
const currentWeatherUrl = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
const weatherForecastUrl = `${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
const iconBaseUrl = '//openweathermap.org/img/wn/';

const weatherIcon = document.querySelector('#weather-icon');
const currentWeatherDiv = document.querySelector('#weather-detail');
const weatherForecastDiv = document.querySelector('#weather-forecast');

async function getCurrentWeather() {
    const response = await fetch(currentWeatherUrl);

    if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        populateIcon(data.weather[0]);
        populateDetail(data.weather[0], data.main, data.sys);
    }
}

async function getWeatherForecast() {
    const response = await fetch(weatherForecastUrl);

    if (response.status === 200) {
        const data = await response.json();
        populateForecast(data.list);
    }
}

function populateIcon(weather) {
    weatherIcon.src = `${iconBaseUrl}${weather.icon}@2x.png`;
    weatherIcon.alt = weather.main;
}

function populateDetail(weather, main, sys) {
    currentWeatherDiv.innerHTML = `
        <p>${Math.round(main.temp)}&degF ${weather.main}</p>
        <p>High: ${Math.round(main.temp_max)}&deg; F</p>
        <p>Low: ${Math.round(main.temp_min)}&deg; F</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Sunrise: ${getHourMinute(sys.sunrise)}</p>
        <p>Sunset: ${getHourMinute(sys.sunset)}</p>
    `;
}

function getHourMinute(epoch) {
    let date = new Date(0);
    date.setUTCSeconds(epoch);
    return date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
}

function populateForecast(list) {
    if (list.length >= 24) {
        let day1 = -100.0;
        let day2 = -100.0;
        let day3 = -100.0;
        for (let i = 0; i < 24; i++) {
            let temp = list[i].main.temp;
            if (i < 8) {
                if (temp > day1) {
                    day1 = temp;
                }
            } else if (i < 16) {
                if (temp > day2) {
                    day2 = temp;
                }
            } else if (i < 24) {
                if (temp > day3) {
                    day3 = temp;
                }
            }
        }

        const tomorrow = addDay(new Date());
        const day2WeekDay = addDay(tomorrow);
        const day3WeekDay = addDay(day2WeekDay);

        weatherForecastDiv.innerHTML = `
            <p>Tomorrow: <span>${Math.round(day1)}&deg;F</span></p>
            <p>${getWeekday(day2WeekDay)}: <span>${Math.round(day2)}&deg;F</span></p>
            <p>${getWeekday(day3WeekDay)}: <span>${Math.round(day2)}&deg;F</span></p>
        `;
    }
}

function addDay(date) {
    let nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    return nextDay;
}

function getWeekday(date) {
    return date.toLocaleString('en-US', {weekday: 'long'});
}

getCurrentWeather();
getWeatherForecast();
