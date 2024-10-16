let lastVisited = Number(localStorage.getItem('lastVisited') ?? new Date().getTime().toString());
let now = new Date().getTime();
localStorage.setItem('lastVisited', now.toString());

const div = document.getElementById('welcome-back');

function showWelcomeBack() {
    let minutes =  Math.round(((now - lastVisited)/1000)/60);
    if (minutes >= 1) {
        div.innerHTML = `Welcome back! You were gone for ${minutes} minutes. We missed you!`;
        animateWelcomeBack();
    }
}

function animateWelcomeBack() {
    div.style.left = '100%';
    setTimeout(animateWelcomeBack, 20);
}

showWelcomeBack();
