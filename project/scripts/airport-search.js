export async function searchAirports(airportSearchResults, searchTerm, selectionCallback) {
    airportSearchResults.innerHTML = '';

    const searchByNameUrl = "https://airports15.p.rapidapi.com/airports?page=1&page_size=20&sorted_by=name&name=";
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6f9865ea24msh2bf6421e368af87p1899c3jsn2be62ac917e3',
            'x-rapidapi-host': 'airports15.p.rapidapi.com'
        }
    };

    try {
        const uri = encodeURI(searchByNameUrl + searchTerm);
        const response = await fetch(uri, options);
        if (response.status === 200) {
            const result = await response.json();
            if (result && result.data && result.data.length > 0) {
                populateAirports(result.data, airportSearchResults, selectionCallback);
            }
        }
    } catch (error) {
        console.error(error);
    }

}

function populateAirports(airports, airportSearchResults, selectionCallback) {
    let table = document.createElement('table');
    table.innerHTML = `
        <tbody>
            <tr>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>Name</th>
                <th>Map</th>
            </tr>
        </tbody>
    `
    for (const airport of airports) {
        if (airport.iata_code !== '') {
            let row = document.createElement('tr');
            let col1 = document.createElement('td');
            let pickMe = document.createElement('img');
            pickMe.classList.add('pick-me');
            pickMe.src = 'images/pick-me.svg';
            pickMe.title = 'Select';
            pickMe.width = 16;
            pickMe.height = 16;
            pickMe.addEventListener('click', () => {
                selectionCallback(airport.iata_code);
            });
            col1.appendChild(pickMe);

            let col2 = document.createElement("td");
            col2.innerHTML = `<td>${airport.iata_code}</td>`;
            let col3 = document.createElement("td");
            col3.innerHTML = `<td>${airport.name}</td>`;
            let col4 = document.createElement("td");
            col4.innerHTML = `<td class="map"><a href="https://maps.google.com/?q=${airport.lat},${airport.lon}" target="_blank"><img src="images/google-map.svg" alt="${airport.city}" title="${airport.city}" width="16" height="16"></a></td>`;

            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);

            table.appendChild(row);
        }
    }
    airportSearchResults.appendChild(table);
}
