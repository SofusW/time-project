const express = require('express');

const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');

});

let timeLeft = 3600;
let explosionCounter = 0;

let timerActive = true;
let hasExplodedToday = false;

app.get('/api/stats', (req, res) => {

    res.send({

        timeLeft: timeLeft,
        explosionCounter: explosionCounter,
        timerActive: !timerActive,
        hasExplodedToday: hasExplodedToday

    });

});

setInterval( () => {
    
    let currentTime = new Date();
    let timerStart = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 1, 30); 
    let timerEnd = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 11, 45);

    if(currentTime > timerStart && currentTime < timerEnd && !hasExplodedToday) {
        timerActive = true;
    } else {
        timerActive = false;
    }

    if(timerActive) {

    timeLeft--
    
    if(timeLeft <= 0) {

        timeLeft = 0;
        explosionCounter++;
        hasExplodedToday = true;

    }} 
    
    else if(currentTime.getHours() === 0 && currentTime.getMinutes() === 0 && currentTime.getSeconds() === 0) {
        
        timeLeft = 3600;
        hasExplodedToday = false;


    } else if(currentTime < timerEnd) {

    }
    
}, 1000);

app.post('/api/extend-timer', (req, res) =>  {

    timeLeft += 60;

    res.send({timeLeft});

});

app.post('/api/reduce-timer', (req, res) =>  {

    timeLeft -= 60;

    if(timeLeft < 0) {
        
        timeLeft = 0;

    };

    res.send({timeLeft});

});

app.listen(8080, () => {

    console.log('Houston, we do not have a problem. Port: ', 8080);

})

