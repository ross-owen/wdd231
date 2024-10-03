const spotlight1Section = document.querySelector('#spotlight1');
const spotlight2Section = document.querySelector('#spotlight2');
const spotlight3Section = document.querySelector('#spotlight3');

const levels = ['Silver', 'Gold'];

async function createSpotlights() {
    const response = await fetch('https://ross-owen.github.io/wdd231/chamber/scripts/members.json');
    const members = await response.json();
    displayQualifying(members)
}

function displayQualifying(members) {
    let qualifiers = members.filter((m) => levels.includes(m.membershipLevel));

    if (qualifiers.length > 0) {
        
        const one = getRandom(qualifiers.length, []);
        buildSpotlight(spotlight1Section, members[one]);
        
        if (qualifiers.length > 1) {
            
            const two = getRandom(qualifiers.length, [one]);
            buildSpotlight(spotlight2Section, members[two]);
            
            if (qualifiers.length > 2)
            {
                const three = getRandom(qualifiers.length, [one,  two]);
                buildSpotlight(spotlight3Section, members[three]);
            }
        }
    }
}

function getRandom(max, notThese) {
    let r = Math.floor(Math.random() * max); 
    while (notThese.includes(r)) {
        r = Math.floor(Math.random() * max);
    }
    return r;
}

function buildSpotlight(section, member) {
    section.innerHTML = `
            <h3>${member.name}</h3>
            <h4>${member.tagLine}</h4>
            <div class="spotlight-detail">
                <img src="${member.imageUrl}" alt="${member.name}" width="100">
                <div>
                    <p><strong><small>ADDRESS:</small></strong> ${member.address}</p>
                    <p><strong><small>PHONE:</small></strong> ${member.phone}</p>
                    <p>&nbsp;</p>
                    <p><a href="${member.websiteUrl}" target="_blank">WEBSITE</a></p>
                </div>
            </div>
        `;
}

createSpotlights();
