import { searchAirports } from './airport-search.js';

const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-button');
const searchAirportDialog = document.getElementById('search-dialog');
const fromAirport = document.getElementById('from-airport');
const toAirport = document.getElementById('to-airport');
const airportType = document.getElementById('search-city');
const airportSearchResults = document.getElementById('airport-search-results');
let searchingFor = fromAirport;

searchButton.addEventListener('click', () => searchAirports(airportSearchResults, searchBox.value, selectAirport));

document.getElementById('search-from')
    .addEventListener('click', () => showAirportSearch('Departure'));
document.getElementById('search-to')
    .addEventListener('click', () => showAirportSearch('Destination'));

function selectAirport(airportCode) {
    searchingFor.value = airportCode;
    searchAirportDialog.close();
}

function showAirportSearch(fromTo) {
    airportType.innerHTML = fromTo;
    searchBox.value = '';
    if (fromTo === 'Departure') {
        searchingFor = fromAirport;
    } else {
        searchingFor = toAirport;
    }
    searchAirportDialog.showModal();
}
