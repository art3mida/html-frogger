class RoadLane {
    constructor(/** @type {CanvasRenderingContext2D} */ context, laneId, laneWidth, carSizeX, carSizeY) {
        this.context = context;
        this.laneId = laneId;
        this.laneWidth = laneWidth;
        this.carSizeX = carSizeX;
        this.carSizeY = carSizeY;
        this.laneColor = 'gray';
        this.laneType = 'road';

        this.laneDirection = this.generateLaneDirection();
        this.laneSpeed = this.generateLaneSpeed();
        this.cars = this.generateCars();
    }

    draw() {
        this.context.fillStyle = this.laneColor;
        this.context.fillRect(0, 0 + this.laneWidth * this.laneId, width, this.laneWidth);

        for (let car of this.cars) {
            car.draw();
        }
    }

    generateCars() {
        const numOfCars = Math.random() > 0.5 ? 2 : 1;
        let cars = [];

        for (let i = 0; i < numOfCars; i++) {
            cars.push(new Car(context, this.laneId, this.laneWidth, this.carSizeX, this.carSizeY,
                this.laneSpeed, this.laneDirection, i * this.generateCarOffset()));
        }
        
        return cars;
    }

    generateLaneDirection() {
        return Math.random() > 0.5 ? 1 : -1;
    }

    // Car speed should be in the interval of [2,5]
    generateLaneSpeed() {
        return Math.random() * 3 + 2;
    }

    // If there are multiple cars on a lane, they need to be drawn at different initial points, 
    // so they don't overlap in the beginning. The offset needs to be somewhere in the interval
    // of [carSizeX, width - carSizeX]. For easier implementation, let's say it's
    // [carSizeX + 20, width/2 + carSizeX + 20];
    // This won't work if we increase the possible number of cars on the road (to more than 2).
    // In that case, we'll need different logic for this.
    generateCarOffset() {
        return Math.random() * (width / 2) + this.carSizeX + 20;
    }

    hasCollisions() {
        for (let car of this.cars) {
            if (car.collidedWithFrog(frog)) return true;
        }

        return false;
    }
    
}