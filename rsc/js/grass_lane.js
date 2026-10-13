class GrassLane {
    constructor(/** @type {CanvasRenderingContext2D} */ context, laneId, laneWidth, blockSize, obstacleToClearGrassRatio) {
        this.context = context;
        this.laneId = laneId;
        this.laneWidth = laneWidth;
        this.blockSize = blockSize;
        this.obstacleToClearGrassRatio = obstacleToClearGrassRatio;
        this.laneColor = 'lightgreen';
        this.laneType = 'grass';
        this.obstacleColor = 'darkgrey';

        this.numOfBlocks = width / blockSize;
        this.obstacleMargin = 5;
        this.obstacles = this.generateObstacles();
    }

    draw() {
        this.context.fillStyle = this.laneColor;
        this.context.fillRect(0, 0 + this.laneWidth * this.laneId, width, this.laneWidth);

        this.drawObstacles();
    }

    drawObstacles() {
        this.context.fillStyle = this.obstacleColor;
        for (let i = 0; i < this.numOfBlocks; i++) {
            if (this.obstacles[i]) {
                this.context.fillRect(0 + i * this.blockSize + this.obstacleMargin,
                    this.laneWidth * this.laneId + this.obstacleMargin,
                    this.blockSize - this.obstacleMargin * 2,
                    this.laneWidth - this.obstacleMargin * 2);
            }
        }
    }

    generateObstacles() {
        let obstacles = new Array(this.numOfBlocks).fill(false);

        // If this is 0, it means it's one of the border lanes, on which there should be no obstacles.
        if (this.obstacleToClearGrassRatio === 0) {
            return obstacles;
        }

        for (let i = 0; i < this.numOfBlocks; i++) {
            const obstacleGen = Math.random();
            obstacles[i] = obstacleGen < this.obstacleToClearGrassRatio;
        }

        return obstacles;
    }
}