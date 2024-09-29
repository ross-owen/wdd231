const gridView = document.querySelector('#grid-view');
const listView = document.querySelector('#list-view');

const gridViewButton = document.querySelector('#grid-view-button');
gridViewButton.addEventListener('click', (e) => {
    gridView.style.display = 'grid';
    listView.style.display = 'none';
});

const listViewButton = document.querySelector('#list-view-button');
listViewButton.addEventListener('click', (e) => {
    listView.style.display = 'block';
    gridView.style.display = 'none';
});

async function getMemberData() {
    const response = await fetch('https://ross-owen.github.io/wdd231/chamber/scripts/members.json');
    const data = await response.json();
    displayMembers(data)
}

const displayMembers = (members) => {
    members.forEach((member) => {
        buildGridView(member);
    });
    buildListView(members);
}

function buildGridView(member) {
    const card = document.createElement('section');
    card.classList.add('member');

    const logoWrapper = document.createElement('div');
    logoWrapper.classList.add('logo-wrapper')
    const logo = document.createElement('img');
    logo.setAttribute('src', member.imageUrl);
    logo.setAttribute('alt', `${member.name}`);
    logo.setAttribute('width', '320');
    logo.setAttribute('height', '180');
    logo.setAttribute('loading', 'lazy');
    logoWrapper.appendChild(logo);

    const businessName = document.createElement('h2');
    businessName.textContent = `${member.name}`;

    const address = document.createElement('div');
    address.textContent = member.address;

    const phone = document.createElement('div');
    phone.textContent = member.phone;

    const website = document.createElement("div");
    website.classList.add('website')
    const webLink = document.createElement('a');
    webLink.href = member.websiteUrl;
    webLink.textContent = member.websiteUrl;
    website.appendChild(webLink);

    const membership = document.createElement('div');
    membership.textContent = `Membership: ${member.membershipLevel}`;


    card.appendChild(logoWrapper);
    card.appendChild(businessName);
    card.appendChild(address);
    card.appendChild(phone)
    card.appendChild(website)
    card.appendChild(membership)

    gridView.appendChild(card);
}

function buildListView(members) {
    let table = document.createElement('table');
    table.innerHTML = `
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Website</th>
                </tr>
            </tbody>
        `;
    for (const member of members) {
        let row = document.createElement('tr');
        row.innerHTML = `
                <td>${member.name}</td>
                <td>
                    ${member.address}
                </td>
                <td>
                    ${member.phone}
                </td>
                <td>${member.websiteUrl}</td>
            `;
        table.appendChild(row);
    }
    listView.appendChild(table);
}

getMemberData();
