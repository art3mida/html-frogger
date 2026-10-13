let playButton = document.getElementById("play");

playButton.addEventListener('click', function() {
	newLevel();
	disablePlayButton();
});

function disablePlayButton() {
	playButton.classList = 'hidden';
}

function enablePlayButton() {
	playButton.classList = 'shown';
}