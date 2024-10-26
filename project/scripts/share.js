let sharedItineraries = JSON.parse(localStorage.getItem('sharedItineraries') ?? "[]");

const sharedTable = document.getElementById('shared-data');
const shareDialog = document.getElementById('share-flight');

document.getElementById('share-now').addEventListener('click', (e) => {
    shareDialog.showModal();
})

function storeSharedItinerary() {
    const params = new URLSearchParams(window.location.search);
    if (params && params.size === 6) {
        let share = {
            originCity: params.get('d-city'),
            destinationCity: params.get('a-city'),
            departureDate: params.get('d-date'),
            returningDate: params.get('r-date'),
            layoverCity: params.get('l-city'),
            totalPrice: params.get('price') ?? "0.00"
        }
        sharedItineraries.push(share);
        localStorage.setItem('sharedItineraries', JSON.stringify(sharedItineraries));
        window.location.href = window.location.origin + window.location.pathname;
    }
}

function loadSharedItineraries() {
    if (sharedItineraries.length === 0) {
        document.querySelectorAll('.data-sharing').forEach(e => e.style.display = 'none');
    } else {
        document.querySelectorAll('.data-sharing').forEach(e => e.style.display = '');
        for (const share of sharedItineraries) {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${share.originCity}</td>
                <td>${share.departureDate}</td>
                <td>${share.destinationCity}</td>
                <td>${share.returningDate}</td>
                <td>${share.layoverCity}</td>
                <td>$${share.totalPrice ?? '0.00'}</td>
            `;
            sharedTable.appendChild(row);
        }
    }
}

storeSharedItinerary();
loadSharedItineraries();
