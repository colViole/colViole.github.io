let startTime;
const element = document.querySelector('.homeScreen');

function animateBackground(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;

    const movement = (progress / 20) % element.offsetWidth;
    element.style.backgroundPosition = `-${movement}px 0, ${-movement + element.offsetWidth}px 0`; 

    requestAnimationFrame(animateBackground);
}

requestAnimationFrame(animateBackground);

document.addEventListener("DOMContentLoaded", function () {
    generateTable();
});

// Multiplication Table

function generateTable() {
    let table = document.getElementById("multiplicationTable");

    if (!table) {
        console.error("Table element with ID 'multiplicationTable' not found.");
        return;
    }

    table.innerHTML = ""; 

    for (let row = 0; row <= 12; row++) {
        let tr = document.createElement("tr");

        for (let col = 0; col <= 12; col++) {
            let cell = document.createElement(row === 0 || col === 0 ? "th" : "td");

            if (row === 0 && col === 0) {
                cell.innerHTML = "×";
            } else if (row === 0) {
                cell.innerHTML = col;
            } else if (col === 0) {
                cell.innerHTML = row;
            } else {
                cell.innerHTML = row * col;
            }

            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
}

// Toggle Contents

function bookOfRepetition() {
  let select = document.querySelector('.homeScreen');
  let content = document.querySelector('.repetitionBackground');

  if (select.style.display !== 'none') {
    select.style.display = 'none';
    content.style.display = 'block';
  }

  document.addEventListener("DOMContentLoaded", function () {
  generateTable();
  });
}

// Music

const audio = document.getElementById("bgMusic");
audio.volume = 0.05;

window.addEventListener("load", function () {
    const audio = document.getElementById("bgMusic");
});

