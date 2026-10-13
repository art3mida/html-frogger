/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('frogger-canvas');

/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const centerX = width / 2;
const centerY = height / 2;

const size = 30;
const step = 2 * size;

let level = 1;

// Time limit in seconds.
const timeLimit = 60;
// let timeLeft = timeLimit;

// The entire map is split into a matrix of blocks of this size. This will
// determine the laneWidth, obstacle array for grass roads, etc.
// TODO: This should probably depend on screen size somehow.
const numOfLanes = 10;
const numOfMiddleLanes = 8;
const blockSize = 60;

const laneWidth = 60;
const carSizeX = laneWidth * 2;
const carSizeY = laneWidth;

const grassToRoadLaneRatio = 0.2;
const obstacleToClearGrassRatio = 0.2;
// let lanes = generateMap();

//let score = 0;
const initialFrogLocationX = centerX;
const initialFrogLocationY = (numOfMiddleLanes + 1) * laneWidth + size;
// let frog = new Frog(context, initialFrogLocationX, initialFrogLocationY, size, step, lanes, score);

let frog, lanes, score, timeLeft;

function newLevel() {
	if (level === 1) {
		score = 0;
	} else {
		score = frog.score + timeLeft;
	}

	timeLeft = timeLimit;
	lanes = generateMap();
	frog = new Frog(context, initialFrogLocationX, initialFrogLocationY, size, step, lanes, score);

	let gameInterval = setInterval(
		function () {
			context.clearRect(0, 0, width, height);
			for (let lane of lanes) {
				lane.draw();
			}
	
			frog.draw();
	
			// Score must be printed before collision checks so that it's not modified after ending
			// the game interval (in that one final loop).
			printTime();
			printScore();
	
			// Checking for collisions only on the lane where the frog currently is.
			if (timeLeft === 0 || (lanes[frog.laneId].laneType === 'road' && lanes[frog.laneId].hasCollisions())) {
				frog.die();
				console.log('Collided on lane ' + frog.laneId);
				gameOver(gameInterval, timer);
			}
	
			if (frog.laneId === 0) {
				levelCompleted(gameInterval, timer);
			}
	
		},
		10
	);
	
	let timer = setInterval(
		function() {
			timeLeft -= 1;
		},
		1000
	);
}

function printTime() {
	context.font = '30px Arcade';
	context.textAlign = 'center';
	context.fillStyle = 'black';
	context.fillText(`time left: ${timeLeft}`, width / 8, laneWidth / 2);
}

function printScore() {
	context.font = '30px Arcade';
	context.textAlign = 'center';
	context.fillStyle = 'black';
	context.fillText(`score: ${score + frog.score}`, width - width / 8, laneWidth / 2);
}

function levelCompleted(interval, timer) {
	clearInterval(interval);
	clearInterval(timer);

	score += timeLeft + frog.score;
	level += 1;
	
	setTimeout (function () {
		context.clearRect(0, 0, width, height);
		context.font = '80px Arcade';
		context.textAlign = 'center';
		context.strokeStyle = 'black';
		context.strokeText('Level completed!', width / 2, height / 4);
		context.strokeText(`Current score: ${score}`, width / 2, height / 2);

		// TODO: The button should say 'next level' here.
		enablePlayButton();
	}, 1000);
}

function gameOver(interval, timer) {
	clearInterval(interval);
	clearInterval(timer);

	score += frog.score;

	// Allow some time for the player to see what happened.
	setTimeout (function() {
		context.clearRect(0, 0, width, height);
		context.font = '80px Arcade';
		context.textAlign = 'center';
		context.strokeStyle = 'black';
		context.strokeText('Game over!', width / 2, height / 4);
		context.strokeText(`Final score: ${score}`, width / 2, height / 2);

		// TODO: Add reseting.
	}, 1000);
}