class Frog {
    constructor(/** @type {CanvasRenderingContext2D} */ context, x, y, size, laneWidth, lanes) {
		this.context = context;
		this.x = x;
		this.y = y;
		this.size = size;
        this.laneWidth = laneWidth;
		this.lanes = lanes;

        this.step = laneWidth;
		this.alive = true;
        this.laneId = 9;

		// TODO: This is the middle lane. Parametrize this somehow.
		this.rowId = 7;

		this.frogColor = 'green';
		this.score = 0;

		// Farthest lane reached.
		this.minLaneReached = numOfLanes - 1;
		this.keyHandler();
	}

	draw() {
		this.drawFrog();
	}

	drawFrog() {
        this.context.fillStyle = this.frogColor;
		this.context.beginPath();
        this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();
	}

	keyHandler() {
		let self = this;
		window.addEventListener('keydown', function(event) {
			if (event.key === 'ArrowUp' && !self.isTileAnObstacle(self.rowId, self.laneId - 1)) {
				self.y -= self.step;
                self.laneId -= 1;

				if (self.minLaneReached > self.laneId) {
					self.score += 10;
					self.minLaneReached = self.laneId;
					console.log(self.score);
				}
			}
			else if (event.key === 'ArrowDown' && !self.isTileAnObstacle(self.rowId, self.laneId + 1)) {
				self.y += self.step;
                self.laneId += 1;
			}
			else if (event.key === 'ArrowLeft' && !self.isTileAnObstacle(self.rowId - 1, self.laneId)) {
				self.x -= self.step;
				self.rowId -= 1;
			}
			else if (event.key === 'ArrowRight' && !self.isTileAnObstacle(self.rowId + 1, self.laneId)) {
				self.x += self.step;
				self.rowId += 1;
			}
		});
	}

	isTileAnObstacle(x, y) {
		return this.lanes[y].laneType === 'grass' && this.lanes[y].obstacles[x];
	}

    die() {
        this.alive = false;
    }
}