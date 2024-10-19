let lastVisited = Number(localStorage.getItem('lastVisited') ?? new Date().getTime().toString());
let now = new Date().getTime();
localStorage.setItem('lastVisited', now.toString());

const div = document.getElementById('welcome-back');

function showWelcomeBack() {
    let minutes =  Math.round(((now - lastVisited)/1000)/60);
    let note = "Looks like you're new here. Welcome!";
    if (minutes >= 1) {
        note = `Welcome back! You were gone for ${minutes} minutes. We missed you!`;
    }
    div.innerHTML = note;
    animateWelcomeBack();
}

function animateWelcomeBack() {
    div.style.left = '100%';
    setTimeout(animateWelcomeBack, 20);
}

showWelcomeBack();
