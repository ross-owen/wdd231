const params = new URLSearchParams(window.location.search)
if (params && params.size >= 6) {
    document.getElementById('name').textContent = params.get('firstName') + ' ' + params.get('lastName'); 
    document.getElementById('email').textContent = params.get('email');
    document.getElementById('phone').textContent = params.get('mobilePhone');
    document.getElementById('business').textContent = params.get('businessName');
    let date = new Date(Number(params.get('timestamp')));
    document.getElementById('joined').textContent = date.toDateString();
    let color = null;
    const level = params.get('membershipLevel').toLowerCase();
    if (level === 'gold') {
        color = '#ffd700';
    }
    else if (level === 'silver') {
        color = '#c0c0c0';
    }
    else if (level === 'bronze') {
        color = '#cd8532';
    }
    if (color) {
        document.querySelector(".ty-data-body").style.backgroundColor = color;
    }
} else {
    document.getElementById('name').textContent = 'You Faker';
    document.getElementById('email').textContent = 'go-back-again@sad.boy';
    document.getElementById('phone').textContent = '(801) 555-1212';
    document.getElementById('business').textContent = 'Lord Business';
    document.getElementById('joined').textContent = 'Never';
}
