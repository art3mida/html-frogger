class Car {
    constructor(/** @type {CanvasRenderingContext2D} */ context, laneId, laneWidth, sizeX, sizeY, speed, directionX, offsetX) {
        this.context = context;
        this.laneId = laneId;
        this.laneWidth = laneWidth;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.speed = speed;
        this.directionX = directionX;
        this.offsetX = offsetX;

        this.carColor = 'red';
        this.x = 0;
        this.y = 0;

        this.laneIdToXY();
    }

    laneIdToXY() {
        // We are using -this.sizeX instead of 0, because we want the car to be spawned behind the left edge.
        // If the direction is negative, meaning the car should spawn on the right side, we use width + sizeX.
        // In the end, if this is the second car on the road, we need to offset it.
        this.x = -this.sizeX + (width + this.sizeX) * (this.directionX < 0) + this.offsetX;
        this.y = this.laneWidth * this.laneId;
    }

    draw() {
        this.drawCar();
        this.update();
    }

    drawCar() {
        this.context.fillStyle = this.carColor;
        this.context.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    }

    update() {
        this.isOutOfBounds();
        this.updateX();
    }

    isOutOfBounds() {
        // If the upper right corner has passed the right side (> width),
        // or if it's behind the left side (< 0), minus the additional size od the car.
        if (this.x > width || this.x < -this.sizeX) {
            this.x = -this.sizeX + (width + this.sizeX) * (this.directionX < 0)
        }
    }

    updateX() {
        this.x = this.x + this.speed * this.directionX;
    }

    collidedWithFrog(/** @type {Frog} */ frog) {
        // Right side of the frog is between car edges.
        const collidedWithFrogOnLeftSide = frog.x + frog.size > this.x && frog.x + frog.size < this.x + this.sizeX;
    
        // Left side of the frog is between car edges.
        const collidedWithFrogOnRightSide = frog.x - frog.size > this.x && frog.x - frog.size < this.x + this.sizeX;

        // They can collide only if they are in the same lane.
		if (frog.laneId === this.laneId && (collidedWithFrogOnLeftSide || collidedWithFrogOnRightSide)) {
            return true;
        }

		return false;
	}

}