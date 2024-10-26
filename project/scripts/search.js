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
const itineraryDialog = document.getElementById('itinerary-dialog');

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
            searchFlights(flightSearchResults, showFlightModal).then((found) => {
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

function showFlightModal(itinerary) {
    itineraryDialog.innerHTML = `
        <h2>Layover In ${itinerary.layoverCity} for $${itinerary.totalPrice}</h2>
        <div class="card-content">
            <div class="data-group">
                <div class="data-field">
                    <span class="field-label">From City:</span>
                    <div class="field-value">${itinerary.originCity}</div>
                </div>
                <div class="data-field">
                    <span class="field-label">Layover City:</span>
                    <div class="field-value">${itinerary.layoverCity}</div>
                </div>
                <div class="data-field">            
                    <span class="field-label">Detination City:</span>
                    <div class="field-value">${itinerary.destinationCity}</div>
                </div>
            </div>
            <hr>
            <div class="data-group">
                <div class="data-field">
                    <span class="field-label">Departure Date:</span>
                    <div class="field-value">
                        ${itinerary.departureDate.toLocaleDateString('en-US')}
                        <br>
                        ${itinerary.departureDate.toLocaleTimeString('en-US')}                    
                    </div>
                </div>
                <div class="data-field">
                    <span class="field-label">Return Date:</span>
                    <div class="field-value">
                        ${itinerary.returningDate.toLocaleDateString('en-US')}
                        <br>
                        ${itinerary.returningDate.toLocaleTimeString('en-US')}                    
                    </div>
                </div>
            </div>
            <hr>
            <div class="data-group">
                <div class="data-field">
                    <span class="field-label">Total Price:</span>
                    <div class="field-value">$${itinerary.totalPrice}</div>
                </div>
                <div class="data-field share-button">
                    <a class="button" target="_blank" href="share.html?d-city=${itinerary.originCity}&a-city=${itinerary.destinationCity}&d-date=${itinerary.departureDate.toLocaleDateString('en-US')}&r-date=${itinerary.returningDate.toLocaleDateString('en-US')}&l-city=${itinerary.layoverCity}&price=${itinerary.totalPrice}">Share On Site</a>
                </div>
            </div>
        </div>    
    `;
    itineraryDialog.showModal();
}
