function createCirclePointCoords(circleCenterX, circleCenterY, circleRadius, pointsToFind) {
    var angleToAdd = 360/pointsToFind;
    var coords = [];  
    var angle = 0;
    for (var i=0;i<pointsToFind;i++){
        angle = angle+angleToAdd;
        var coordX = circleCenterX + circleRadius * Math.cos(angle*Math.PI/180);
        var coordY = circleCenterY + circleRadius * Math.sin(angle*Math.PI/180);
        coords.push([coordX,coordY]);
    }
    return coords;
}

module.exports = createCirclePointCoords;