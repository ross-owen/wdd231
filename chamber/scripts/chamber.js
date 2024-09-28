const mainNav = document.querySelector('.navigation')
const hamburgerButton = document.querySelector('#menu');

hamburgerButton.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    hamburgerButton.classList.toggle('open');
});

const homeButton = document.querySelector('#home');

homeButton.addEventListener('click', () => {
    homeButton.classList.add('active');
})

