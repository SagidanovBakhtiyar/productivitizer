// Declaring global variable
var time = 25 * 60;
var timerInterval;
var currentMode = "pomodoro";
var MODES = {
    pomodoro: 25,
    short: 5,
    long: 15,
}
const DEFAULT_MODES = {
    pomodoro: 25,
    short: 5,
    long: 15,
}
var totalBreaks = 0;
const alarmSound = new Audio('/static/alarm.mp3');


// Pomodoro modes 
document.querySelectorAll("#modes button")
    .forEach(button => {
        button.addEventListener('click', handleModeButtons)
    });


// Custom duration control
document.querySelectorAll("#duration-control input")
    .forEach(function(input) {
        input.addEventListener('change', durationControlHandler);
        input.value = '';
    })

function durationControlHandler(event) {
    // trim deletes spaces between numbers
    var value = event.target.value.trim(); 
    var durationId = event.target.dataset.durationId;

    // Custom duration validation
    if (value != '' && !isNaN(value) && Number.isInteger(parseFloat(value)) && parseInt(value) >= 0 && parseInt(value) != 0) {
        MODES[durationId] = parseInt(value);
    } else {
        MODES[durationId] = DEFAULT_MODES[durationId];
    }

    resetTimer();
}

function handleModeButtons(event) {
    switchMode(event.target.dataset.modeId);
}

function updateControlButtons(isrunning) {
    var start_button = document.querySelector(".timer-control.start");
    var pause_button = document.querySelector(".timer-control.pause");
    
    if(isrunning) {
        start_button.disabled = true;
        pause_button.disabled = false;
    } else {
        start_button.disabled = false;
        pause_button.disabled = true;
    }
}

function updateButtonStyles() {
    // Remove active class from all buttons
    document.querySelectorAll("#modes button").forEach(button => {
        button.classList.remove('active');
    });
    // Add active class to the button corresponding to the current mode
    document.querySelector(`#modes button[data-mode-id="${currentMode}"]`).classList.add('active');
}

function switchMode(mode) {
    currentMode = mode;
    resetTimer();
    updateButtonStyles()
}

// Start timer takes updateTimer function and execute it every second
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
    updateControlButtons(true);
}


// Stup the timer
function pauseTimer() {
    clearInterval(timerInterval);
    updateControlButtons(false);
}


// updateTimer function decriments and prints time to console
function updateTimer() {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").textContent = minutes + ":" + seconds;
    document.title = `${minutes}:${seconds} - Pomodoro`

    if(time <= 0) {
        pauseTimer();
        alarmSound.play();
        alert("Time's up!");
        alarmSound.pause();
        alarmSound.currentTime = 0;
        nextMode();
        resetTimer();
    }
    time -= 1;
}


// Next mode function implementation
function nextMode() {
    if(currentMode == "pomodoro") {
        totalBreaks += 1;
        if(totalBreaks % 4 == 0) {
            switchMode("long");
        } else {
            switchMode("short");
        }
    } else {
        switchMode("pomodoro")
    }
}

function resetTimer() {
    time = MODES[currentMode] * 60;
    clearInterval(timerInterval);
    updateTimer();
    updateControlButtons(false);
}




