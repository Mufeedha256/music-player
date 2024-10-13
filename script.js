// Get references to HTML elements
/* eslint-env browser */
"use strict";
document.addEventListener('DOMContentLoaded', function () {
var audio = document.getElementById('audio');
var playButton = document.getElementById('play');
var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');
var songTitle = document.getElementById('song-title');
var imAge =document.getElementById('image');
var progressBar =document.getElementById('progress-bar');
// Song list (you can add more songs)
var songs = [
    { title: "FADED", src: "song1.mp3", pic:"song1.jpg"},
    { title: "STAY", src: "song2.mp3", pic:"song2.jpg"},
    { title: "FALLING DOWN", src: "song3.mp3", pic:"song3.jpg"},
    { title: "RATHER BE", src: "song4.mp3", pic:"song4.jpg"}
];

var currentSongIndex = 0;

// Load song initially
function loadSong(index) {
    songTitle.textContent = songs[index].title;
    imAge.src = songs[index].pic;
    imAge.onerror = function () {
            imAge.src = "default.jpg"; // Path to your default image
        };

    audio.src = songs[index].src;
    progressBar.value = 0;
    updateProgressBarValue(0);
    playButton.innerHTML = '<i class="fas fa-play"></i>';
}

// Play or pause the song
function playPauseSong() {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Play the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
}

// Play the previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
}
audio.addEventListener('timeupdate', function () {
    if (audio.duration) { // Ensure duration is available
        var progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        updateProgressBarValue(progress);
}});
function updateProgressBarValue(value) {
    progressBar.style.setProperty('--value', value); // Update CSS variable for gradient
}
progressBar.addEventListener('input', function () {
    // Calculate the new time based on the slider value
    var newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime; // Set the audio's current time to the new time
    updateProgressBarValue(progressBar.value);
});
// Event listeners for buttons
playButton.addEventListener('click', playPauseSong);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);

// Load the first song when the page loads
loadSong(currentSongIndex);
});
