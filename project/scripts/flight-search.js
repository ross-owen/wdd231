const form = document.getElementById('search-form');
const originAirport = document.getElementById('from-airport');
const destinationAirport = document.getElementById('to-airport');
const departureDate = document.getElementById('departure-date');
const returnDate = document.getElementById('return-date');
const flightSearchResults = document.getElementById('flight-search-results');

// const token = 'duffel_test_KEbi9bubp8Keb-K9Tt6Id-XFP_tPDRqBkAa8bVIkJXz';
// const offerUrl = 'https://api.duffel.com/air/offer_requests?supplier_timeout=2000';
let searchResults = [];

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
            searchFlights().then(searchFlights => {
                // hide spinner?
                // enable button
                console.log('done');
            });
        }
    });

function parseISOLocal(dateAsString) {
    let [y, m, d] = dateAsString.split(/\D/);
    return new Date(y, --m, d);
}

async function searchFlights() {
    searchResults = [];
    // let request = new Request(offerUrl, getOptions());
    const response = await fetch('https://ross-owen.github.io/wdd231/project/scripts/flight-info.json');
    if (response.status === 200) {
        const result = await response.json();
        for (const offer of result.data.offers) {
            let leavingFlight = offer.slices[0].segments[0];
            let returningFlight = offer.slices[1].segments[0];
            let itinerary = {
                originCity: leavingFlight.origin.city_name,
                destinationCity: leavingFlight.destination.city_name,
                departureDate: new Date(leavingFlight.departing_at),
                returningDate: new Date(returningFlight.departing_at),
                layoverCity: 'San Francisco, CA', // default layover city
                totalPrice: offer.total_amount,
            };
            if (offer.slices[0].segments.length > 1) {
                let layover = offer.slices[0].segments[1];
                itinerary.layoverCity = layover.origin.city_name;
                itinerary.destinationCity = layover.destination.city_name;
            }
            searchResults.push(itinerary);

            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${itinerary.originCity}</td>
                <td>
                    ${itinerary.departureDate.toLocaleDateString('en-US')}
                    <br>
                    ${itinerary.departureDate.toLocaleTimeString('en-US')}                    
                </td>
                <td>${itinerary.destinationCity}</td>
                <td>
                    ${itinerary.returningDate.toLocaleDateString('en-US')}
                    <br>
                    ${itinerary.returningDate.toLocaleTimeString('en-US')}                    
                </td>
                <td>${itinerary.layoverCity}</td>
                <td>$${itinerary.totalPrice ?? '0.00'}</td>
            `;
            flightSearchResults.appendChild(row);
        }
    }
}

function createSearchRequest(fromAirport, toAirport, departureDate, returnDate) {
    return JSON.stringify({
        data: {
            slices: [
                {
                    origin: fromAirport,
                    destination: toAirport,
                    departure_date: departureDate
                },
                {
                    origin: toAirport,
                    destination: fromAirport,
                    departure_date: returnDate
                }
            ],
            passengers: [
                {
                    type: 'adult'
                }
            ],
            max_connections: 2,
            cabin_class: 'economy'
        }
    });
}

function getOptions() {
    return {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Accept-Encoding': 'gzip',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Duffel-Version': 'v2',
            'Authorization': `Bearer ${token}`
        },
        body: createSearchRequest(originAirport.value, destinationAirport.value, departureDate.value, returnDate.value)
    };
}