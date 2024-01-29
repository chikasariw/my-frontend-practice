const countdownDuration = 0.1 * 60;
let countdown = countdownDuration;

function updateCountdown() {
    const minutes = String(Math.floor(countdown / 60)).padStart(2, '0');
    const seconds = String(countdown % 60).padStart(2, '0');

    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    if (countdown <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown-message').style.display = 'block';
    } else {
        countdown--;
    }
}

updateCountdown();

const countdownInterval = setInterval(updateCountdown, 1000);
