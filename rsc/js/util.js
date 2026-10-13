function generateMap() {
    let lanes = [];

    // First lane is an empty, grass lane.
    lanes.push(new GrassLane(context, 0, laneWidth, blockSize, 0));
    
    for (let i = 1; i <= numOfMiddleLanes; i++) {
        const laneGen = Math.random();
        if (laneGen < grassToRoadLaneRatio) {
            lanes.push(new GrassLane(context, i, laneWidth, blockSize, obstacleToClearGrassRatio));
        } else {
            lanes.push(new RoadLane(context, i, laneWidth, carSizeX, carSizeY));
        }
    }

    // Last lane is an empty, grass road.
    lanes.push(new GrassLane(context, 9, laneWidth, blockSize, 0));

    return lanes;
}