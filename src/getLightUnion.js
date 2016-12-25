var VisionSimulation = require("dota-vision-simulation");
var key2pt = VisionSimulation.prototype.key2pt;
var xy2key = VisionSimulation.prototype.xy2key;
var xy2pt = VisionSimulation.prototype.xy2pt;

function processNeighbors(lights, components, key, index) {
    var pt = key2pt(key);
    var dirs = ['N', 'E', 'S', 'W'];
    for (var i = 0; i < dirs.length; i++) {
        var keyAdj = getAdjKey(pt, dirs[i]);
        if (components[keyAdj] || !lights[keyAdj]) continue;
        components[keyAdj] = index;
        processNeighbors(lights, components, keyAdj, index);
    }
}

function getLightUnion(lights) {
    var components = {};
    var index = 1;
    for (var key in lights) {
        if (!components[key]) {
            components[key] = index;
            processNeighbors(lights, components, key, index);
            index++;
        }
    }
    
    var outlines = [];
    for (var i = 1; i < index; i++) {
        outlines.push(getOutline(components, i))
    }
    return outlines;
}

function getAdjKey(pt, dir) {
    switch (dir) {
        case 'N':
            return xy2key(pt.x, pt.y+1);
        break;
        case 'E':
            return xy2key(pt.x+1, pt.y);
        break;
        case 'S':
            return xy2key(pt.x, pt.y-1);
        break;
        case 'W':
            return xy2key(pt.x-1, pt.y);
        break;
        case 'NE':
            return xy2key(pt.x+1, pt.y+1);
        break;
        case 'SE':
            return xy2key(pt.x+1, pt.y-1);
        break;
        case 'SW':
            return xy2key(pt.x-1, pt.y-1);
        break;
        case 'NW':
            return xy2key(pt.x-1, pt.y+1);
        break;
    }
}

function isSideFree(components, pt, dir) {
    var keyAdj = getAdjKey(pt, dir);
    return !components[keyAdj];
}

function notSurrounded(components, pt) {
    var dirs = ['N', 'E', 'S', 'W'];
    for (var i = 0; i < dirs.length; i++) {
        var keyAdj = getAdjKey(pt, dirs[i]);
        if (!components[keyAdj]) return dirs[i];
    }
}

function getCornerPoint(pt, dir) {
    switch (dir) {
        case 'N':
            return xy2pt(pt.x-0.5, pt.y+0.5);
        break;
        case 'E':
            return xy2pt(pt.x+0.5, pt.y+0.5);
        break;
        case 'S':
            return xy2pt(pt.x+0.5, pt.y-0.5);
        break;
        case 'W':
            return xy2pt(pt.x-0.5, pt.y-0.5);
        break;
    }
}

function getOutline(components, index) {
    var outlinePoints = [];
    var startKey;
    var dir;
    for (var key in components) {
        var pt = key2pt(key);
        dir = notSurrounded(components, pt);
        if (components[key] == index && dir) {
            startKey = key;
            break;
        }
    }
    var next = processNext(components, startKey, dir);
    while (startKey !== next.key || dir !== next.dir) {
        outlinePoints.push(next.point);
        next = processNext(components, next.key, next.dir)
    }
    outlinePoints.push(next.point);
    return outlinePoints;
}

function checkAdj(components, pt, key, dir, adjDir) {
    var adjKey = getAdjKey(pt, dir);
    var adj = key2pt(adjKey);
    if (components[adjKey] == components[key] && isSideFree(components, adj, adjDir)) {
        return {
            key: adjKey,
            dir: adjDir
        }
    }
}

function processNext(components, key, dir) {
    var pt = key2pt(key);
    var next;
    switch (dir) {
        case 'N':
            if (isSideFree(components, pt, 'E')) {
                return {
                    key: key,
                    dir: 'E',
                    point: getCornerPoint(pt, dir)
                }
            }
            if (!next) next = checkAdj(components, pt, key, 'E', 'N');
            if (!next) next = checkAdj(components, pt, key, 'NE', 'W');
        break;
        case 'E':
            if (isSideFree(components, pt, 'S')) {
                return {
                    key: key,
                    dir: 'S',
                    point: getCornerPoint(pt, dir)
                }
            }
            if (!next) next = checkAdj(components, pt, key, 'S', 'E');
            if (!next) next = checkAdj(components, pt, key, 'SE', 'N');
        break;
        case 'S':
            if (isSideFree(components, pt, 'W')) {
                return {
                    key: key,
                    dir: 'W',
                    point: getCornerPoint(pt, dir)
                }
            }
            if (!next) next = checkAdj(components, pt, key, 'W', 'S');
            if (!next) next = checkAdj(components, pt, key, 'SW', 'E');
        break;
        case 'W':
            if (isSideFree(components, pt, 'N')) {
                return {
                    key: key,
                    dir: 'N',
                    point: getCornerPoint(pt, dir)
                }
            }
            if (!next) next = checkAdj(components, pt, key, 'N', 'W');
            if (!next) next = checkAdj(components, pt, key, 'NW', 'S');
        break;
    }
    if (next) {
        next.point = getCornerPoint(pt, dir);
        return next;
    }
}

module.exports = getLightUnion;