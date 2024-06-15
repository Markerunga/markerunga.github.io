const audioPlayer = document.getElementById('audio-player');
const playButton = document.querySelector('.play-button');

// Initialize the player to paused
audioPlayer.pause();

playButton.addEventListener('click', function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        this.classList.add('playing');
    } else {
        audioPlayer.pause();
        this.classList.remove('playing');
    }
});
