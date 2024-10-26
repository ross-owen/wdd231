import { searchAirports } from './airport-search.js';
import { searchFlights } from './flight-search.js';

// search for airport fields
const searchAirportBox = document.getElementById('search-box');
const searchAirportButton = document.getElementById('search-button');
const searchAirportDialog = document.getElementById('search-dialog');
const fromAirport = document.getElementById('from-airport');
const toAirport = document.getElementById('to-airport');
const airportType = document.getElementById('search-city');
const airportSearchResults = document.getElementById('airport-search-results');

// search for flights fields
const form = document.getElementById('search-form');
const originAirport = document.getElementById('from-airport');
const destinationAirport = document.getElementById('to-airport');
const departureDate = document.getElementById('departure-date');
const returnDate = document.getElementById('return-date');
const flightSearchResults = document.getElementById('flight-search-results');

// init
let searchingFor = fromAirport;

// event handling
searchAirportButton
    .addEventListener('click', () => searchAirports(airportSearchResults, searchAirportBox.value, selectAirport));

document.getElementById('search-from')
    .addEventListener('click', () => showAirportSearch('Departure'));
document.getElementById('search-to')
    .addEventListener('click', () => showAirportSearch('Destination'));

document.getElementById('search-flights')
    .addEventListener('click', function (event) {

        let depart = parseISOLocal(departureDate.value);
        departureDate.setCustomValidity(depart < new Date() ? 'Departure date is invalid' : '');
        let arrive = parseISOLocal(returnDate.value);
        returnDate.setCustomValidity(arrive <= depart ? 'Return date is invalid' : '');

        if (!form.checkValidity()) {
            form.reportValidity();
        } else {
            event.preventDefault();
            searchFlights(flightSearchResults).then((found) => {
                // hide spinner?
                // enable button
                console.log(found);
            });
        }
    });

function parseISOLocal(dateAsString) {
    let [y, m, d] = dateAsString.split(/\D/);
    return new Date(y, --m, d);
}

function selectAirport(airportCode) {
    searchingFor.value = airportCode;
    searchAirportDialog.close();
}

function showAirportSearch(fromTo) {
    airportType.innerHTML = fromTo;
    searchAirportBox.value = '';
    if (fromTo === 'Departure') {
        searchingFor = fromAirport;
    } else {
        searchingFor = toAirport;
    }
    searchAirportDialog.showModal();
}
