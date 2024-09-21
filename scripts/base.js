const mainNav = document.querySelector('.navigation')
const hamburgerButton = document.querySelector('#menu');

hamburgerButton.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    hamburgerButton.classList.toggle('open');
});

const homeButton = document.querySelector('#home');
const chamberButton = document.querySelector('#chamber');

homeButton.addEventListener('click', () => {
    homeButton.classList.add('active');
    chamberButton.classList.remove('active');
})

chamberButton.addEventListener('click', () => {
    chamberButton.classList.add('active');
    homeButton.classList.remove('active');
})
