const form = document.getElementById('search-form');
const originAirport = document.getElementById('from-airport');
const destinationAirport = document.getElementById('to-airport');
const departureDate = document.getElementById('departure-date');
const returnDate = document.getElementById('return-date');

const token = 'duffel_test_KEbi9bubp8Keb-K9Tt6Id-XFP_tPDRqBkAa8bVIkJXz';
const offerUrl = 'https://api.duffel.com/air/offer_requests?supplier_timeout=2000';

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
    let request = new Request(offerUrl, getOptions());
    const response = await fetch(request);
    if (response.status === 200) {
        const result = await response.json();
        // TODO: do stuff with the response
        console.log(result);
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
        method: 'POST',
        headers: {
            'Accept-Encoding': 'gzip',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Duffel-Version': 'v2',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': 'http://localhost:63342',
            'Access-Control-Allow-Methods': 'POST, DELETE, PUT, OPTIONS',
            'User-Agent': 'Ross L. Owen | Student @ BYU Idaho'
        },
        body: createSearchRequest(originAirport.value, destinationAirport.value, departureDate.value, returnDate.value)
    };
}

const searchResponse = {
    "data": {
        "offers": [
            {
                "base_amount": "418.20",
                "tax_amount": "75.28",
                "total_amount": "493.48",
                "owner": {
                    "name": "Duffel Airways"
                },
                "slices": [
                    {
                        "segments": [
                            {   // flight out
                                "departing_at": "2025-01-19T13:56:00",
                                "arriving_at": "2025-01-19T18:01:00",
                                "operating_carrier_flight_number": "5524",
                                "duration": "PT7H5M",
                                "origin": {
                                    "name": "Salt Lake City International Airport",
                                    "iata_code": "SLC",
                                    "city_name": "Salt Lake City"
                                },
                                "destination": {
                                    "name": "Lihue Airport",
                                    "iata_code": "LIH",
                                    "city_name": "Lihue"
                                }
                            },
                            {   // return flight
                                "departing_at": "2025-01-28T20:54:00",
                                "arriving_at": "2025-01-29T06:59:00",
                                "operating_carrier_flight_number": "5524",
                                "duration": "PT7H5M",
                                "origin": {
                                    "name": "Lihue Airport",
                                    "iata_code": "LIH",
                                    "city_name": "Lihue"
                                },
                                "destination": {
                                    "name": "Salt Lake City International Airport",
                                    "iata_code": "SLC",
                                    "city_name": "Salt Lake City"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
