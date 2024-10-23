const nav = document.querySelector('.navigation')
const menuButton = document.querySelector('#menu');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuButton.classList.toggle('open');
});
