const createCirclePointCoords = (circleCenterX, circleCenterY, circleRadius, pointsToFind) => {
    const angleToAdd = 360 / pointsToFind;
    const coords = [];
    let angle = 0;
    for (let i = 0; i < pointsToFind; i++) {
        angle += angleToAdd;
        const coordX = circleCenterX + circleRadius * Math.cos(angle * Math.PI / 180);
        const coordY = circleCenterY + circleRadius * Math.sin(angle * Math.PI / 180);
        coords.push([coordX, coordY]);
    }
    return coords;
};

export default createCirclePointCoords;
