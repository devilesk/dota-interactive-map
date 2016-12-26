var VisionSimulation = require("dota-vision-simulation");
var key2pt = VisionSimulation.prototype.key2pt;
var xy2key = VisionSimulation.prototype.xy2key;
var xy2pt = VisionSimulation.prototype.xy2pt;

function processNeighbors(grid, lights, components, key, index) {
    var pt = key2pt(key);
    var dirs = [[1, 0], [0, -1], [-1, 0], [0, 1]];
    for (var i = 0; i < dirs.length; i++) {
        var aX = pt.x+dirs[i][0];
        var aY = pt.y+dirs[i][1];
        if (!grid[aX] || !grid[aX][aY]) continue;
        var keyAdj = grid[aX][aY].key
        if (components[keyAdj] || !lights[keyAdj]) continue;
        components[keyAdj] = index;
        processNeighbors(grid, lights, components, keyAdj, index);
    }
}

function getLightUnion(grid, lights) {
    var components = {};
    var index = 1;
    for (var key in lights) {
        if (!components[key]) {
            components[key] = index;
            processNeighbors(grid, lights, components, key, index);
            index++;
        }
    }
    
    var outlines = [];
    for (var i = 1; i < index; i++) {
        outlines.push(getOutline(grid, components, i))
    }
    return outlines;
}

function isSideFree(grid, components, pt, dir) {
    var aX = pt.x+dir[0];
    var aY = pt.y+dir[1];
    if (!grid[aX] || !grid[aX][aY]) return true;
    var keyAdj = grid[aX][aY].key
    return !components[keyAdj];
}

function notSurrounded(grid, components, pt) {
    for (var i = 0; i < 8; i+=2) {
        var aX = pt.x+Math.round(Math.cos(2 * Math.PI - Math.PI/4 * i));
        var aY = pt.y+Math.round(Math.sin(2 * Math.PI - Math.PI/4 * i));
        if (!grid[aX] || !grid[aX][aY]) return i;
        var keyAdj = grid[aX][aY].key
        if (!components[keyAdj]) return i;
    }
    return null;
}

function mod(n, m) {
        return ((n % m) + m) % m;
}

function getOutline(grid, components, index) {
    var outlinePoints = [];
    var startKey;
    var dir = null;
    for (var key in components) {
        var pt = key2pt(key);
        dir = notSurrounded(grid, components, pt);
        if (components[key] == index && dir !== null) {
            startKey = key;
            break;
        }
    }
    var next = processNext(grid, components, startKey, dir);
    while (startKey !== next.key || dir !== next.dir) {
        outlinePoints.push(next.point);
        next = processNext(grid, components, next.key, next.dir);
    }
    outlinePoints.push(next.point);
    return outlinePoints;
}

function checkAdj(grid, components, pt, key, dir, i, adjDir) {
    var aX = pt.x+dir[0];
    var aY = pt.y+dir[1];
    if (!grid[aX] || !grid[aX][aY]) return;
    var ptAdj = grid[pt.x+dir[0]][pt.y+dir[1]];
    if (components[ptAdj.key] == components[key] && isSideFree(grid, components, ptAdj, adjDir)) {
        return {
            key: ptAdj.key,
            dir: i
        }
    }
}

function processNext(grid, components, key, i) {
    var pt = key2pt(key);
    var next;
    
    var x = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * i));
    var y = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * i));
    
    var nI = mod(i+2, 8);
    var nX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * nI));
    var nY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * nI));
    
    var bI = mod(i-1, 8);
    var bX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * bI));
    var bY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * bI));

    if (isSideFree(grid, components, pt, [nX, nY])) {
        return {
            key: key,
            dir: mod(i+2, 8),
            point: xy2pt(pt.x+bX/2, pt.y+bY/2)
        }
    }
    if (!next) next = checkAdj(grid, components, pt, key, [nX, nY], i, [x, y]);
    if (!next) {
        var aI = mod(i + 1, 8);
        var aX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * aI));
        var aY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * aI));
        var pI = mod(i - 2, 8);
        var pX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * pI));
        var pY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * pI));
        next = checkAdj(grid, components, pt, key, [aX, aY], pI, [pX, pY]);
    }
    if (next) {
        next.point = xy2pt(pt.x+bX/2, pt.y+bY/2);
        return next;
    }
    else {
        console.log('error');
    }
}

module.exports = getLightUnion;