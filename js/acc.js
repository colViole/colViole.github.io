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
