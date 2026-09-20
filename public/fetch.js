
function fetchStats() {
fetch('/api/stats')
.then((response) => response.json())
.then((result) => {

    const timeLeft = document.getElementById('timeLeft');
    const explosionCounter = document.getElementById('explosionCounter');
    timeLeft.textContent = result.timeLeft;
    explosionCounter.textContent = result.explosionCounter;

    const extendButton = document.getElementById('extendButton');
    const reduceButton = document.getElementById('reduceButton');

    extendButton.disabled = result.timerActive;
    reduceButton.disabled = result.timerActive;

});
}

fetchStats();

setInterval(fetchStats, 1000);

function extendTimer() {    

fetch('/api/extend-timer', {method: 'POST'})
.then((response) => response.json())
.then((result) => {

    const timeLeft = document.getElementById('timeLeft');

    timeLeft.textContent = result.timeLeft;

});
}

document.getElementById("extendButton").addEventListener("click", extendTimer);

function reduceTimer() {    

fetch('/api/reduce-timer', {method: 'POST'})
.then((response) => response.json())
.then((result) => {

    const timeLeft = document.getElementById('timeLeft');

    timeLeft.textContent = result.timeLeft;

});
}

document.getElementById("reduceButton").addEventListener("click", reduceTimer);

fetch('/api/explosion-counter')
.then((response) => response.json())
.then((result) => {

    const timeLeft = document.getElementById('explosionCounter');

    timeLeft.textContent = result.explosionCounter;

});

