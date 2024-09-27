const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets)
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        const card =document.createElement('section');
        
        const fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        const dob = document.createElement('div');
        dob.textContent = `Date of Birth: ${prophet.birthdate}`
        const pob = document.createElement('div');
        pob.textContent = `Place of Birth: ${prophet.birthplace}`;
        
        const portrait = document.createElement('img');
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('width', '340')
        portrait.setAttribute('height', '440')
        
        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(pob);
        card.appendChild(portrait)
        
        cards.appendChild(card);
    })
}

getProphetData();
