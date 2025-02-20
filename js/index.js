
// Loading Screen

document.getElementById('section-one').addEventListener('animationend', function() {
    document.getElementById('section-one').style.display = 'none';
    document.getElementById('section-two').style.display = 'grid';

});

// Home Page

let startTime;
const element = document.getElementById('homeScreen');

function animateBackground(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;

    const movement = (progress / 20) % element.offsetWidth;
    element.style.backgroundPosition = `-${movement}px 0, ${-movement + element.offsetWidth}px 0`; 

    requestAnimationFrame(animateBackground);
  }

  requestAnimationFrame(animateBackground);

// Music

const audio = document.getElementById("bgMusic");
audio.volume = 0.05;

window.addEventListener("load", function() {
    let audio = document.getElementById("bg-music");
    audio.play().catch(error => console.log("Autoplay blocked: " + error));
});

function goToAbout() {
    let homeScreen = document.getElementById('homeScreen');
    let about = document.querySelector('.about');

    if (homeScreen.style.display !== 'none') {
        homeScreen.style.display = 'none';
        about.style.display = 'block';
    }
}