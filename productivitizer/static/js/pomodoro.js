// Pomodoro functionality


// Set variables
let timerDisplay = document.querySelector('.timer');
let startButton = document.querySelector('.start-button');
let stopButton = document.querySelector('.stop-button');


// 

let PomodoroTimer = {
    // Set variables
    timeLeft: 25 * 60,
    session: 0,
    intervalId: null,

    // Updating the display
    updateTimer: function() {
        if (this.timeLeft === 0){
            this.session++;
            // Long break
            if (this.session === 4) {
                this.timeLeft = 15 * 60;
                this.session = 0;
            } else {
                this.timeLeft = 5 * 60;
            }
        } else {
            this.timeLeft--;
            let minutes =  Math.floor(this.timeLeft / 60);
            let seconds = this.timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    },

    // Start timer
    startTimer: function() {
        this.intervalId = setInterval(this.updateTimer.bind(this), 1000);
    },

    // Stop timer
    stopTimer: function() {
        clearInterval(this.intervalId);
    }
}


startButton.addEventListener('click', () => PomodoroTimer.startTimer());
stopButton.addEventListener('click', () => PomodoroTimer.stopTimer());
