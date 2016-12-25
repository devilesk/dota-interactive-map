(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.InteractiveMap = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function ImageHandler(imagePath) {
    this.imagePath = imagePath;
    this.image = null;
}
ImageHandler.prototype.load = function (callback) {
    var self = this;
    this.image = new Image();
    this.image.src = this.imagePath;
    this.image.onload = function () {
        self.canvas = document.createElement("canvas");
        self.canvas.width = self.image.width;
        self.canvas.height = self.image.height;
        self.ctx = self.canvas.getContext("2d");
        self.ctx.drawImage(self.image, 0, 0);
        callback();
    }
}
ImageHandler.prototype.scan = function (offset, width, height, pixelHandler, grid) {
    var imgData = this.ctx.getImageData(offset, 0, width, height);
    var data = imgData.data;

    for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var alpha = data[i+3];
        var x = Math.floor((i/4) % width);
        var y = Math.floor((i/4) / height);
        pixelHandler(x, y, [r, g, b], grid);
    }
}

module.exports = ImageHandler;
},{}],2:[function(require,module,exports){
/*
	This is rot.js, the ROguelike Toolkit in JavaScript.
	Version 0.6~dev, generated on Tue Mar 17 16:16:31 CET 2015.
*/
/**
 * @namespace Top-level ROT namespace
 */
var ROT = {
	/** Directional constants. Ordering is important! */
	DIRS: {
		"4": [
			[ 0, -1],
			[ 1,  0],
			[ 0,  1],
			[-1,  0]
		],
		"8": [
			[ 0, -1],
			[ 1, -1],
			[ 1,  0],
			[ 1,  1],
			[ 0,  1],
			[-1,  1],
			[-1,  0],
			[-1, -1]
		],
		"6": [
			[-1, -1],
			[ 1, -1],
			[ 2,  0],
			[ 1,  1],
			[-1,  1],
			[-2,  0]
		]
	}
};
/**
 * Always positive modulus
 * @param {int} n Modulus
 * @returns {int} this modulo n
 */
Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
}
if (!Object.create) {  
	/**
	 * ES5 Object.create
	 */
	Object.create = function(o) {  
		var tmp = function() {};
		tmp.prototype = o;
		return new tmp();
	};  
}  
/**
 * Sets prototype of this function to an instance of parent function
 * @param {function} parent
 */
Function.prototype.extend = function(parent) {
	this.prototype = Object.create(parent.prototype);
	this.prototype.constructor = this;
	return this;
}
if (typeof window != "undefined") {
	window.requestAnimationFrame =
		window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.oRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function(cb) { return setTimeout(cb, 1000/60); };

	window.cancelAnimationFrame =
		window.cancelAnimationFrame
		|| window.mozCancelAnimationFrame
		|| window.webkitCancelAnimationFrame
		|| window.oCancelAnimationFrame
		|| window.msCancelAnimationFrame
		|| function(id) { return clearTimeout(id); };
}
/**
 * @class Abstract FOV algorithm
 * @param {function} lightPassesCallback Does the light pass through x,y?
 * @param {object} [options]
 * @param {int} [options.topology=8] 4/6/8
 */
ROT.FOV = function(lightPassesCallback, options) {
	this._lightPasses = lightPassesCallback;
	this._options = {
		topology: 8
	}
	for (var p in options) { this._options[p] = options[p]; }
};

/**
 * Compute visibility for a 360-degree circle
 * @param {int} x
 * @param {int} y
 * @param {int} R Maximum visibility radius
 * @param {function} callback
 */
ROT.FOV.prototype.compute = function(x, y, R, callback) {}

/**
 * Return all neighbors in a concentric ring
 * @param {int} cx center-x
 * @param {int} cy center-y
 * @param {int} r range
 */
ROT.FOV.prototype._getCircle = function(cx, cy, r) {
	var result = [];
	var dirs, countFactor, startOffset;

	switch (this._options.topology) {
		case 4:
			countFactor = 1;
			startOffset = [0, 1];
			dirs = [
				ROT.DIRS[8][7],
				ROT.DIRS[8][1],
				ROT.DIRS[8][3],
				ROT.DIRS[8][5]
			]
		break;

		case 6:
			dirs = ROT.DIRS[6];
			countFactor = 1;
			startOffset = [-1, 1];
		break;

		case 8:
			dirs = ROT.DIRS[4];
			countFactor = 2;
			startOffset = [-1, 1];
		break;
	}

	/* starting neighbor */
	var x = cx + startOffset[0]*r;
	var y = cy + startOffset[1]*r;

	/* circle */
	for (var i=0;i<dirs.length;i++) {
		for (var j=0;j<r*countFactor;j++) {
			result.push([x, y]);
			x += dirs[i][0];
			y += dirs[i][1];

		}
	}

	return result;
}
/**
 * @class Precise shadowcasting algorithm
 * @augments ROT.FOV
 */
ROT.FOV.PreciseShadowcasting = function(lightPassesCallback, options) {
	ROT.FOV.call(this, lightPassesCallback, options);
}
ROT.FOV.PreciseShadowcasting.extend(ROT.FOV);

ROT.FOV.PreciseShadowcasting.prototype.compute = function(x, y, R, callback) {
	/* this place is always visible */
	callback(x, y, 0, 1);
    
	callback(x-1, y-1, 0, 1);
	callback(x, y-1, 0, 1);
	callback(x+1, y-1, 0, 1);
	callback(x-1, y, 0, 1);
	callback(x+1, y, 0, 1);
	callback(x-1, y+1, 0, 1);
	callback(x, y+1, 0, 1);
	callback(x+1, y+1, 0, 1);
    
    callback(x-1, y-2, 0, 1);
    callback(x, y-2, 0, 1);
    callback(x+1, y-2, 0, 1);
    callback(x-2, y-1, 0, 1);
    callback(x-2, y, 0, 1);
    callback(x-2, y+1, 0, 1);
    callback(x+2, y-1, 0, 1);
    callback(x+2, y, 0, 1);
    callback(x+2, y+1, 0, 1);
    callback(x-1, y+2, 0, 1);
    callback(x, y+2, 0, 1);
    callback(x+1, y+2, 0, 1);

	/* standing in a dark place. FIXME is this a good idea?  */
	if (!this._lightPasses(x, y)) { return; }
	
	/* list of all shadows */
	var SHADOWS = [];
	var trees = {};
	var cx, cy, blocks, A1, A2, visibility,
        dx, dy, dd, a, b, radius,
        cx2, cy2, dd1,
        obstacleType;

	/* analyze surrounding cells in concentric rings, starting from the center */
	for (var r=1; r<=R; r++) {
        ////console.log('ring', r);
		var neighbors = this._getCircle(x, y, r);
		var neighborCount = neighbors.length;
        trees = {};
		for (var i=0;i<neighborCount;i++) {
			cx = neighbors[i][0];
			cy = neighbors[i][1];
            var key = cx+","+cy;
            //if (key == "44,102") //console.log('KEY', key, !this._lightPasses(cx, cy));
            obstacleType = this.walls[key];
            // if (key == "150,160") //console.log(key, obstacleType);
            // if (key == "151,161") //console.log(key, obstacleType);
            // if (key == "150,161") //console.log(key, obstacleType);
            // if (key == "151,160") //console.log(key, obstacleType);
            if (obstacleType && obstacleType[0] == 'tree') {
                cx2 = obstacleType[1];
                cy2 = obstacleType[2];
                radius = obstacleType[3];
            }
            else {
                cx2 = cx;
                cy2 = cy;
                radius = Math.SQRT2 / 2;
            }
            
            dx = cx2 - x;
            dy = cy2 - y;
            dd = Math.sqrt(dx * dx + dy * dy);
            if (dd > 1/2) {
                a = Math.asin(radius / dd);
                b = Math.atan2(dy, dx),
                A1 = normalize(b - a),
                A2 = normalize(b + a);
                blocks = !this._lightPasses(cx, cy);
                if (obstacleType && obstacleType[0] == 'tree') {
                    dx1 = cx - x;
                    dy1 = cy - y;
                    dd1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                    if (dd1 < dd) {
                        trees[obstacleType[1]+","+obstacleType[2]] = [obstacleType[1], obstacleType[2]];
                    }
                    
                    dx = cx - x;
                    dy = cy - y;
                    dd = Math.sqrt(dx * dx + dy * dy);
                    a = Math.asin(radius / dd);
                    b = Math.atan2(dy, dx),
                    A1 = normalize(b - a),
                    A2 = normalize(b + a);
                    visibility = this._checkVisibility(b, A1, A2, false, SHADOWS);
                    if (visibility) { callback(cx, cy, r, visibility); }
                }
                else {
                    //if (obstacleType) //console.log(obstacleType[0], radius);
                    //console.log('BLOCKS', cx, cy, blocks, b);
                    visibility = this._checkVisibility(b, A1, A2, blocks, SHADOWS);
                    if (visibility) { callback(cx, cy, r, visibility); }
                    if (this.done) return;
                }
            }

		} /* for all cells in this ring */
        
        // apply tree blockers
        for (var k in trees) {
            ////console.log('apply tree');
            cx2 = trees[k][0];
            cy2 = trees[k][1];
            dx = cx2 - x;
            dy = cy2 - y;
            dd = Math.sqrt(dx * dx + dy * dy);
            radius = Math.SQRT2 - .01;
            if (dd > 1/2) {
                a = Math.asin(radius / dd);
                b = Math.atan2(dy, dx),
                A1 = normalize(b - a),
                A2 = normalize(b + a);
                visibility = this._checkVisibility(b, A1, A2, true, SHADOWS);
                if (this.done) return;
            }
        }
	} /* for all rings */
}

/**
 * @param {int[2]} A1 arc start
 * @param {int[2]} A2 arc end
 * @param {bool} blocks Does current arc block visibility?
 * @param {int[][]} SHADOWS list of active shadows
 */
ROT.FOV.PreciseShadowcasting.prototype._checkVisibility = function(b, A1, A2, blocks, SHADOWS) {
    ////console.log('_checkVisibility', b, A1, A2, blocks, SHADOWS);
    // check if target center is inside a shadow
    var visible = !blocks;
    //console.log('_checkVisibility', b, visible);
	for (var i = 0; i < SHADOWS.length; i++) {
		var old = SHADOWS[i];
        if (isBetween(b, old[0], old[1])) {
            if (blocks) {
                ////console.log('blocks but not visible', SHADOWS.length);
                visible = false;
            }
            else {
                //console.log(i, b, JSON.stringify(SHADOWS));
                return false; // not visible, return
            }
        }
	}
    
    if (blocks) {
        if (A1 < 0 && A2 >= 0) {
            //console.log('splitting');
            this._mergeShadows(b, 0, A2, blocks, SHADOWS);
            this.done = false;
            this._mergeShadows(b, A1, 0, blocks, SHADOWS);
        }
        else {
            //console.log('not splitting', blocks, visible, b);
            this._mergeShadows(b, A1, A2, blocks, SHADOWS);
        }
        //console.log('end', A1, A2, JSON.stringify(SHADOWS), !isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]), !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1]));
        if (SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1])) && A1 != SHADOWS[0][0] && A2 != SHADOWS[0][1] ) {
            this.done = true;
        }
    }
    
    return visible;
}

ROT.FOV.PreciseShadowcasting.prototype._mergeShadows = function(b, A1, A2, blocks, SHADOWS) {
    ////console.log('merging', b, A1, A2);
    // check if target first edge is inside a shadow or which shadows it is between
    var index1 = 0,
        edge1 = false,
        firstIndex = 0;
    while (index1 < SHADOWS.length) {
        var old = SHADOWS[index1];
        firstIndex = index1;
        if (isBetween(A1, old[0], old[1])) {
            edge1 = true;
            break;
        }
        if (index1 > 0 && isBetween(A1, SHADOWS[index1 - 1][1], old[0])) {
            edge1 = false;
            break;
        }
        if (!isBefore(A1, old[1])) {
            index1++;
            firstIndex = index1;
            continue;
        }
        if (isBefore(A1, old[0])) {
            break;
        }
        index1++;
    }
    
    // check if target second edge is inside a shadow or which shadows it is between
    var index2 = SHADOWS.length - 1,
        edge2 = false,
        secondIndex = 0;
    while (index2 >= 0) {
        var old = SHADOWS[index2];
        secondIndex = index2;
        ////console.log(A2, old[0], old[1], isBetween(A2, old[0], old[1]))
        if (isBetween(A2, old[0], old[1])) {
            edge2 = true;
            break;
        }
        if (isBefore(A2, old[0])) {
            index2--;
            secondIndex = index2;
            continue;
        }
        if (!isBefore(A2, old[1])) {
            break;
        }
        index2--;
    }
    
    ////console.log(firstIndex, secondIndex, edge1, edge2, A1, A2);
    if (firstIndex == SHADOWS.length && !edge1 && secondIndex == 0 && edge2) firstIndex = 0;
    //if (secondIndex == -1) secondIndex = SHADOWS.length - 1;
    //console.log(firstIndex, secondIndex, edge1, edge2, A1, A2);
    //console.log(JSON.stringify(SHADOWS));
    if (SHADOWS.length == 0) {
        //console.log('empty shadows pushing', [A1, A2]);
        SHADOWS.push([A1, A2]);
    }
    /*else if (SHADOWS.length > 1 && firstIndex == SHADOWS.length && secondIndex == 0 && !edge1 && edge2) {
    
    }*/
    else {
        var new_shadow = [edge1 ? SHADOWS[firstIndex][0] : A1, edge2 ? SHADOWS[secondIndex][1] : A2];
        //console.log('new_shadow', new_shadow);
        secondIndex = Math.max(firstIndex, secondIndex);
        var sum1 = diff_sum(SHADOWS);
        var doShift = false;
        if (isBetween(0, new_shadow[0], new_shadow[1]) && new_shadow[0] != 0 && new_shadow[1] != 0) {
            //console.log('crosses 0');
            SHADOWS.splice(firstIndex, firstIndex == secondIndex && edge1 == edge2 && !edge1 ? 0 : secondIndex - firstIndex + 1, [new_shadow[0], 0]);
            //console.log([new_shadow[0], 0], JSON.stringify(SHADOWS));
            if (SHADOWS[0][0] != 0 && SHADOWS[0][1] != new_shadow[1]) {
                SHADOWS.splice(firstIndex + 1, 0, [0, new_shadow[1]]);
                //console.log([0, new_shadow[1]], JSON.stringify(SHADOWS));
            }
            //console.log(JSON.stringify(SHADOWS));
            doShift = true;
        }
        else {
            SHADOWS.splice(firstIndex, firstIndex == secondIndex && edge1 == edge2 && !edge1 ? 0 : secondIndex - firstIndex + 1, new_shadow);
        }
        var sum2 = diff_sum(SHADOWS);
        //console.log('sum1', sum1, 'sum2', sum2, sum2 < sum1, SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1])));
        if (sum2 < sum1) this.done = true;
        /*if (SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1]))) {
            this.done = true;
        }*/
        if (new_shadow[0] == 0 || doShift) {
            var count = 0;
            //console.log('shifting');
            while (SHADOWS[0][0] != 0) {
                SHADOWS.push(SHADOWS.shift());
                if (count >= SHADOWS.length) break;
                count++;
                //console.log(JSON.stringify(SHADOWS));
            }
            //console.log('end shifting', JSON.stringify(SHADOWS));
        }
        //console.log(JSON.stringify(SHADOWS));
        //console.log(diff_sum(SHADOWS));
    }
}

function isBefore(A1, A2) {
    if (A1 > 0 && A2 < 0) { // A1 in bottom half, A2 in top half
        return true;
    }
    else if (A2 > 0 && A1 < 0) { // A1 in top half, A2 in bottom half
        return false;
    }
    else {
        return A1 < A2;
    }
}

function isAfter(A1, A2) {
    return !isBefore(A1, A2);
}

function isBetween(b, A1, A2) {
    if (A1 < A2) {
        return ((A1 <= b) && (b <= A2));
    }
    else {
        return ((A1 <= b) && (b <= Math.PI)) || ((-Math.PI <= b) && (b <= A2));
    }
}

function normalize(x) {
    if (x > Math.PI) {
        return -(2 * Math.PI - x);
    }
    else if ( x < -Math.PI) {
        return 2 * Math.PI + x;
    }
    else {
        return x;
    }
}

function diff(A1, A2) {
    if (A1 > 0 && A2 < 0) { // A1 in bottom half, A2 in top half
        return Math.abs((Math.PI - A1) - (-Math.PI - A2));
    }
    else if (A2 > 0 && A1 < 0) { // A1 in top half, A2 in bottom half
        return Math.abs(-A1 + A2);
    }
    if (A1 <= 0 && A2 <= 0) { // A1,A2 in bottom half
        if (isAfter(A1, A2)) { // A1 after A2
            return -A1 + Math.PI - (-Math.PI - A2)
        }
        else {
            return Math.abs(A2 - A1);
        }
    }
    else {
        if (isAfter(A1, A2)) {
            return Math.PI + (Math.PI - A1) + A2
        }
        else {
            return Math.abs(A2 - A1);
        }
    }
}

function diff_sum(SHADOWS) {
    var sum = 0;
    for (var i = 0; i < SHADOWS.length; i++) {
        ////console.log(SHADOWS[i][0], SHADOWS[i][1], diff(SHADOWS[i][0], SHADOWS[i][1]));
        sum += diff(SHADOWS[i][0], SHADOWS[i][1]);
    }
    return sum;
}

module.exports = ROT;
},{}],3:[function(require,module,exports){
var ImageHandler = require("./imageHandler.js");
var ROT = require("./rot6.js");

function key2pt(key) {
    var p = key.split(',').map(function (c) { return parseInt(c) });
    return {x: p[0], y: p[1]};
}

function xy2key(x, y) {
    return x + "," + y;
}

function xy2pt(x, y) {
    return {x: x, y: y};
}

function pt2key(pt) {
    return pt.x + "," + pt.y;
}

function getAdjacentCells(data, x, y) {
    var cells = [];
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (0 !== i || 0 !== j) {
                var k = (x + i) + "," + (y + j);
                if (data[k]) {
                    cells.push(data[k]);
                }
            }
        }
    }
    return cells;
}

function generateElevationWalls(data, elevation) {
    var walls = [];
    for (var i in data) {
        var pt = data[i];
        if (pt.z > elevation) {
            var adj = getAdjacentCells(data, pt.x, pt.y);
            for (var j = 0; j < adj.length; j++) {
                if (adj[j].z <= elevation) {
                    walls.push(['wall', pt.x, pt.y, Math.SQRT2 / 2]);
                    break;
                }
            }
        }
    }
    return walls;
}

function setElevationWalls(obj, data, elevation) {
    for (var i = 0; i < data[elevation].length; i++) {
        var el = data[elevation][i];
        obj[el[1] + "," + el[2]] = el;
    }
}

function setWalls(obj, data, id, r) {
    id = id || 'wall';
    r = r || (Math.SQRT2 / 2);
    for (var i in data) {
        obj[i] = [id, data[i].x, data[i].y, r];
    }
}

function setTreeWalls(obj, elevation, tree, tree_elevations, tree_state, tree_blocks) {
    for (var i in tree) {
        if (elevation < tree_elevations[i]) {
            if (tree_state[i]) {
                tree_blocks[i].forEach(function (pt) {
                    obj[pt.x + "," + pt.y] = ['tree', tree[i].x, tree[i].y, Math.SQRT2];
                });
            }
        }
    }
}

function VisionSimulation(worlddata, mapDataImagePath, onReady, opts) {
    var self = this;
    
    this.opts = opts || {},
    this.gridnav = null;
    this.ent_fow_blocker_node = null;
    this.tools_no_wards = null;
    this.elevationGrid = null;
    this.elevationWalls = {};
    this.tree = {}; // center key to point map
    this.tree_blocks = {}; // center to corners map
    this.tree_relations = {}; // corner to center map
    this.tree_elevations = {};
    this.tree_state = {};
    this.walls = {};
    this.radius = this.opts.radius || parseInt(1600 / 64);
    this.lights = {};
    this.worldMinX = worlddata.worldMinX;
    this.worldMinY = worlddata.worldMinY;
    this.worldMaxX = worlddata.worldMaxX;
    this.worldMaxY = worlddata.worldMaxY;
    this.worldWidth = this.worldMaxX - this.worldMinX;
    this.worldHeight = this.worldMaxY - this.worldMinY;
    this.gridWidth = this.worldWidth / 64 + 1;
    this.gridHeight = this.worldHeight / 64 + 1;
    this.ready = false;
    
    this.imageHandler = new ImageHandler(mapDataImagePath);
    this.imageHandler.load(function () {
        self.gridnav = parseImage(self.imageHandler, self.gridWidth * 2, self.gridWidth, self.gridHeight, blackPixelHandler);
        self.ent_fow_blocker_node = parseImage(self.imageHandler, self.gridWidth * 3, self.gridWidth, self.gridHeight, blackPixelHandler);
        self.tools_no_wards = parseImage(self.imageHandler, self.gridWidth * 4, self.gridWidth, self.gridHeight, blackPixelHandler);
        self.elevationGrid = parseImage(self.imageHandler, 0, self.gridWidth, self.gridHeight, elevationPixelHandler);
        elevationValues.forEach(function (elevation) {
            self.elevationWalls[elevation] = generateElevationWalls(self.elevationGrid, elevation);
        });
        parseImage(self.imageHandler, self.gridWidth, self.gridWidth, self.gridHeight, treeElevationPixelHandler);
        self.ready = true;
        onReady();
    });

    function parseImage(imageHandler, offset, width, height, pixelHandler) {
        var grid = {};
        imageHandler.scan(offset, width, height, pixelHandler, grid);
        return grid;
    }

    function blackPixelHandler(x, y, p, grid) {
        var pt = self.ImageXYtoGridXY(x, y);
        if (p[0] === 0) {
            grid[pt.x + "," + pt.y] = pt;
        }
    }

    var elevationValues = [];
    function elevationPixelHandler(x, y, p, grid) {
        var pt = self.ImageXYtoGridXY(x, y);
        pt.z = p[0];
        grid[pt.x + "," + pt.y] = pt;
        if (elevationValues.indexOf(p[0]) == -1) {
            elevationValues.push(p[0]);
        }
    }

    function treeElevationPixelHandler(x, y, p, grid) {
        var pt = self.ImageXYtoGridXY(x, y);
        if (p[1] == 0 && p[2] == 0) {
            // trees are 2x2 in grid
            // tree origins rounded up when converted to grid, so they represent top right corner. subtract 0.5 to get grid origin
            var treeOrigin = {x: pt.x - 0.5, y: pt.y - 0.5};
            var treeElevation = p[0] + 40;
            var kC = pt2key(treeOrigin);
            self.tree[kC] = treeOrigin;
            self.tree_elevations[kC] = treeElevation;
            self.tree_blocks[kC] = [];
            self.tree_state[kC] = true;
            // iterate through tree 2x2 by taking floor and ceil of tree grid origin
            [Math.floor, Math.ceil].forEach(function (i) {
                [Math.floor, Math.ceil].forEach(function (j) {
                    var treeCorner = {x: i(treeOrigin.x), y: j(treeOrigin.y)};
                    var kB = pt2key(treeCorner);
                    self.tree_relations[kB] = treeOrigin;
                    self.tree_blocks[kC].push(treeCorner);
                });
            });
        }
    }

    this.lightPassesCallback = function (x, y) {
        return (!(x+","+y in self.walls));
    }
}
VisionSimulation.prototype.updateVisibility = function (gX, gY, radius) {
    var self = this,
        key = xy2key(gX, gY),
        elevation = this.elevationGrid[key].z,
        fov = new ROT.FOV.PreciseShadowcasting(this.lightPassesCallback, {topology:8});

    radius = radius || self.radius;
    this.walls = {};
    setElevationWalls(this.walls, this.elevationWalls, elevation)
    setWalls(this.walls, this.ent_fow_blocker_node);
    setWalls(this.walls, this.tools_no_wards);
    setTreeWalls(this.walls, elevation, this.tree, this.tree_elevations, this.tree_state, this.tree_blocks);

    fov.walls = this.walls;
    this.lights = {};
    fov.compute(gX, gY, radius, function(x2, y2, r, vis) {
        var key = xy2key(x2, y2);
        var treePt = self.tree_relations[key];
        var treeBlocking = false;
        if (treePt) {
            var treeKey = pt2key(treePt);
            treeBlocking = self.tree_state[treeKey] && self.tree_elevations[treeKey] > elevation;
        }
        if (vis == 1 && !self.ent_fow_blocker_node[key] && !treeBlocking && (gX-x2)*(gX-x2) + (gY-y2)*(gY-y2) < radius * radius) {
            self.lights[key] = 255;
        }
    });
}

VisionSimulation.prototype.isValidXY = function (x, y, bCheckGridnav, bCheckToolsNoWards, bCheckTreeState) {
    var key = xy2key(x, y),
        treeBlocking = false;
        
    if (bCheckTreeState) {
        var treePt = this.tree_relations[key];
        if (treePt) {
            var treeKey = pt2key(treePt);
            treeBlocking = this.tree_state[treeKey];
        }
    }
    
    return (!bCheckGridnav || !this.gridnav[key]) && (!bCheckToolsNoWards || !this.tools_no_wards[key]) && (!bCheckTreeState || !treeBlocking);
}

VisionSimulation.prototype.toggleTree = function (x, y) {
    var key = xy2key(x, y);
    var isTree = !!this.tree_relations[key];
    if (isTree) {
        var pt = this.tree_relations[key];
        var kC = pt2key(pt);
        this.tree_state[kC] = !this.tree_state[kC];
    }
    return isTree;
}
VisionSimulation.prototype.setRadius = function (r) {
    this.radius = r;
}
VisionSimulation.prototype.WorldXYtoGridXY = function (wX, wY, bNoRound) {
    var x = (wX - this.worldMinX) / 64,
        y = (wY - this.worldMinY) / 64;
    if (!bNoRound) {
        x = parseInt(Math.round(x))
        y = parseInt(Math.round(y))
    }
    return {x: x, y: y};
}
VisionSimulation.prototype.GridXYtoWorldXY = function (gX, gY) {
    return {x: gX * 64 + this.worldMinX, y: gY * 64 + this.worldMinY};
}

VisionSimulation.prototype.GridXYtoImageXY = function (gX, gY) {
    return {x: gX, y: this.gridHeight - gY - 1};
}

VisionSimulation.prototype.ImageXYtoGridXY = function (x, y) {
    return {x: x, y: this.gridHeight - y - 1};
}

VisionSimulation.prototype.WorldXYtoImageXY = function (wX, wY) {
    var pt = this.WorldXYtoGridXY(wX, wY);
    return this.GridXYtoImageXY(pt.x, pt.y);
}

VisionSimulation.prototype.key2pt = key2pt;
VisionSimulation.prototype.xy2key = xy2key;
VisionSimulation.prototype.xy2pt = xy2pt;
VisionSimulation.prototype.pt2key = pt2key;
VisionSimulation.prototype.getAdjacentCells = getAdjacentCells;

module.exports = VisionSimulation;
},{"./imageHandler.js":1,"./rot6.js":2}],4:[function(require,module,exports){
/*
 * @copyright 2016 Sean Connelly (@voidqk), http://syntheti.cc
 * @license MIT
 * @preserve Project Home: https://github.com/voidqk/polybooljs
 */

var BuildLog = require('./lib/build-log');
var Epsilon = require('./lib/epsilon');
var Intersecter = require('./lib/intersecter');
var SegmentChainer = require('./lib/segment-chainer');
var SegmentSelector = require('./lib/segment-selector');

var buildLog = false;
var epsilon = Epsilon();

var PolyBool = {
	// getter/setter for buildLog
	buildLog: function(bl){
		if (bl === true)
			buildLog = BuildLog();
		else if (bl === false)
			buildLog = false;
		return buildLog === false ? false : buildLog.list;
	},
	// getter/setter for epsilon
	epsilon: function(v){
		return epsilon.epsilon(v);
	},

	// core API
	segments: function(poly){
		var i = Intersecter(true, epsilon, buildLog);
		poly.regions.forEach(i.addRegion);
		return {
			segments: i.calculate(poly.inverted),
			inverted: poly.inverted
		};
	},
	combine: function(segments1, segments2){
		var i3 = Intersecter(false, epsilon, buildLog);
		return {
			combined: i3.calculate(
				segments1.segments, segments1.inverted,
				segments2.segments, segments2.inverted
			),
			inverted1: segments1.inverted,
			inverted2: segments2.inverted
		};
	},
	selectUnion: function(combined){
		return {
			segments: SegmentSelector.union(combined.combined, buildLog),
			inverted: combined.inverted1 || combined.inverted2
		}
	},
	selectIntersect: function(combined){
		return {
			segments: SegmentSelector.intersect(combined.combined, buildLog),
			inverted: combined.inverted1 && combined.inverted2
		}
	},
	selectDifference: function(combined){
		return {
			segments: SegmentSelector.difference(combined.combined, buildLog),
			inverted: combined.inverted1 && !combined.inverted2
		}
	},
	selectDifferenceRev: function(combined){
		return {
			segments: SegmentSelector.differenceRev(combined.combined, buildLog),
			inverted: !combined.inverted1 && combined.inverted2
		}
	},
	selectXor: function(combined){
		return {
			segments: SegmentSelector.xor(combined.combined, buildLog),
			inverted: combined.inverted1 !== combined.inverted2
		}
	},
	polygon: function(segments){
		return {
			regions: SegmentChainer(segments.segments, epsilon, buildLog),
			inverted: segments.inverted
		};
	},

	// helper functions for common operations
	union: function(poly1, poly2){
		return operate(poly1, poly2, PolyBool.selectUnion);
	},
	intersect: function(poly1, poly2){
		return operate(poly1, poly2, PolyBool.selectIntersect);
	},
	difference: function(poly1, poly2){
		return operate(poly1, poly2, PolyBool.selectDifference);
	},
	differenceRev: function(poly1, poly2){
		return operate(poly1, poly2, PolyBool.selectDifferenceRev);
	},
	xor: function(poly1, poly2){
		return operate(poly1, poly2, PolyBool.selectXor);
	}
};

function operate(poly1, poly2, selector){
	var seg1 = PolyBool.segments(poly1);
	var seg2 = PolyBool.segments(poly2);
	var comb = PolyBool.combine(seg1, seg2);
	var seg3 = selector(comb);
	return PolyBool.polygon(seg3);
}

if (typeof window === 'object')
	window.PolyBool = PolyBool;

module.exports = PolyBool;

},{"./lib/build-log":5,"./lib/epsilon":6,"./lib/intersecter":7,"./lib/segment-chainer":9,"./lib/segment-selector":10}],5:[function(require,module,exports){
// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// used strictly for logging the processing of the algorithm... only useful if you intend on
// looking under the covers (for pretty UI's or debugging)
//

function BuildLog(){
	var my;
	var nextSegmentId = 0;
	var curVert = false;

	function push(type, data){
		my.list.push({
			type: type,
			data: data ? JSON.parse(JSON.stringify(data)) : void 0
		});
		return my;
	}

	my = {
		list: [],
		segmentId: function(){
			return nextSegmentId++;
		},
		checkIntersection: function(seg1, seg2){
			return push('check', { seg1: seg1, seg2: seg2 });
		},
		segmentChop: function(seg, end){
			push('div_seg', { seg: seg, pt: end });
			return push('chop', { seg: seg, pt: end });
		},
		statusRemove: function(seg){
			return push('pop_seg', { seg: seg });
		},
		segmentUpdate: function(seg){
			return push('seg_update', { seg: seg });
		},
		segmentNew: function(seg, primary){
			return push('new_seg', { seg: seg, primary: primary });
		},
		segmentRemove: function(seg){
			return push('rem_seg', { seg: seg });
		},
		tempStatus: function(seg, above, below){
			return push('temp_status', { seg: seg, above: above, below: below });
		},
		rewind: function(seg){
			return push('rewind', { seg: seg });
		},
		status: function(seg, above, below){
			return push('status', { seg: seg, above: above, below: below });
		},
		vert: function(x){
			if (x === curVert)
				return my;
			curVert = x;
			return push('vert', { x: x });
		},
		log: function(data){
			if (typeof data !== 'string')
				data = JSON.stringify(data, false, '  ');
			return push('log', { txt: data });
		},
		reset: function(){
			return push('reset');
		},
		selected: function(segs){
			return push('selected', { segs: segs });
		},
		chainStart: function(seg){
			return push('chain_start', { seg: seg });
		},
		chainRemoveHead: function(index, pt){
			return push('chain_rem_head', { index: index, pt: pt });
		},
		chainRemoveTail: function(index, pt){
			return push('chain_rem_tail', { index: index, pt: pt });
		},
		chainNew: function(pt1, pt2){
			return push('chain_new', { pt1: pt1, pt2: pt2 });
		},
		chainMatch: function(index){
			return push('chain_match', { index: index });
		},
		chainClose: function(index){
			return push('chain_close', { index: index });
		},
		chainAddHead: function(index, pt){
			return push('chain_add_head', { index: index, pt: pt });
		},
		chainAddTail: function(index, pt){
			return push('chain_add_tail', { index: index, pt: pt, });
		},
		chainConnect: function(index1, index2){
			return push('chain_con', { index1: index1, index2: index2 });
		},
		chainReverse: function(index){
			return push('chain_rev', { index: index });
		},
		chainJoin: function(index1, index2){
			return push('chain_join', { index1: index1, index2: index2 });
		},
		done: function(){
			return push('done');
		}
	};
	return my;
}

module.exports = BuildLog;

},{}],6:[function(require,module,exports){
// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// provides the raw computation functions that takes epsilon into account
//
// zero is defined to be between (-epsilon, epsilon) exclusive
//

function Epsilon(eps){
	if (typeof eps !== 'number')
		eps = 0.0000000001; // sane default? sure why not
	var my = {
		epsilon: function(v){
			if (typeof v === 'number')
				eps = v;
			return eps;
		},
		pointAboveOrOnLine: function(pt, left, right){
			var Ax = left[0];
			var Ay = left[1];
			var Bx = right[0];
			var By = right[1];
			var Cx = pt[0];
			var Cy = pt[1];
			return (Bx - Ax) * (Cy - Ay) - (By - Ay) * (Cx - Ax) >= -eps;
		},
		pointBetween: function(p, left, right){
			// p must be collinear with left->right
			// returns false if p == left, p == right, or left == right
			var d_py_ly = p[1] - left[1];
			var d_rx_lx = right[0] - left[0];
			var d_px_lx = p[0] - left[0];
			var d_ry_ly = right[1] - left[1];

			var dot = d_px_lx * d_rx_lx + d_py_ly * d_ry_ly;
			// if `dot` is 0, then `p` == `left` or `left` == `right` (reject)
			// if `dot` is less than 0, then `p` is to the left of `left` (reject)
			if (dot < eps)
				return false;

			var sqlen = d_rx_lx * d_rx_lx + d_ry_ly * d_ry_ly;
			// if `dot` > `sqlen`, then `p` is to the right of `right` (reject)
			// therefore, if `dot - sqlen` is greater than 0, then `p` is to the right of `right` (reject)
			if (dot - sqlen > -eps)
				return false;

			return true;
		},
		pointsSameX: function(p1, p2){
			return Math.abs(p1[0] - p2[0]) < eps;
		},
		pointsSameY: function(p1, p2){
			return Math.abs(p1[1] - p2[1]) < eps;
		},
		pointsSame: function(p1, p2){
			return my.pointsSameX(p1, p2) && my.pointsSameY(p1, p2);
		},
		pointsCompare: function(p1, p2){
			// returns -1 if p1 is smaller, 1 if p2 is smaller, 0 if equal
			if (my.pointsSameX(p1, p2))
				return my.pointsSameY(p1, p2) ? 0 : (p1[1] < p2[1] ? -1 : 1);
			return p1[0] < p2[0] ? -1 : 1;
		},
		pointsCollinear: function(pt1, pt2, pt3){
			// does pt1->pt2->pt3 make a straight line?
			// essentially this is just checking to see if the slope(pt1->pt2) === slope(pt2->pt3)
			// if slopes are equal, then they must be collinear, because they share pt2
			var dx1 = pt1[0] - pt2[0];
			var dy1 = pt1[1] - pt2[1];
			var dx2 = pt2[0] - pt3[0];
			var dy2 = pt2[1] - pt3[1];
			return Math.abs(dx1 * dy2 - dx2 * dy1) < eps;
		},
		linesIntersect: function(a0, a1, b0, b1){
			// returns false if the lines are coincident (e.g., parallel or on top of each other)
			//
			// returns an object if the lines intersect:
			//   {
			//     pt: [x, y],    where the intersection point is at
			//     alongA: where intersection point is along A,
			//     alongB: where intersection point is along B
			//   }
			//
			//  alongA and alongB will each be one of: -2, -1, 0, 1, 2
			//
			//  with the following meaning:
			//
			//    -2   intersection point is before segment's first point
			//    -1   intersection point is directly on segment's first point
			//     0   intersection point is between segment's first and second points (exclusive)
			//     1   intersection point is directly on segment's second point
			//     2   intersection point is after segment's second point
			var adx = a1[0] - a0[0];
			var ady = a1[1] - a0[1];
			var bdx = b1[0] - b0[0];
			var bdy = b1[1] - b0[1];

			var axb = adx * bdy - ady * bdx;
			if (Math.abs(axb) < eps)
				return false; // lines are coincident

			var dx = a0[0] - b0[0];
			var dy = a0[1] - b0[1];

			var A = (bdx * dy - bdy * dx) / axb;
			var B = (adx * dy - ady * dx) / axb;

			var ret = {
				alongA: 0,
				alongB: 0,
				pt: [
					a0[0] + A * adx,
					a0[1] + A * ady
				]
			};

			// categorize where intersection point is along A and B

			if (A <= -eps)
				ret.alongA = -2;
			else if (A < eps)
				ret.alongA = -1;
			else if (A - 1 <= -eps)
				ret.alongA = 0;
			else if (A - 1 < eps)
				ret.alongA = 1;
			else
				ret.alongA = 2;

			if (B <= -eps)
				ret.alongB = -2;
			else if (B < eps)
				ret.alongB = -1;
			else if (B - 1 <= -eps)
				ret.alongB = 0;
			else if (B - 1 < eps)
				ret.alongB = 1;
			else
				ret.alongB = 2;

			return ret;
		}
	};
	return my;
}

module.exports = Epsilon;

},{}],7:[function(require,module,exports){
// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// this is the core work-horse
//

var LinkedList = require('./linked-list');

function Intersecter(selfIntersection, eps, buildLog){
	// selfIntersection is true/false depending on the phase of the overall algorithm

	//
	// segment creation
	//

	function segmentNew(start, end){
		return {
			id: buildLog ? buildLog.segmentId() : -1,
			start: start,
			end: end,
			myFill: {
				above: null, // is there fill above us?
				below: null  // is there fill below us?
			},
			otherFill: null
		};
	}

	function segmentCopy(start, end, seg){
		return {
			id: buildLog ? buildLog.segmentId() : -1,
			start: start,
			end: end,
			myFill: {
				above: seg.myFill.above,
				below: seg.myFill.below
			},
			otherFill: null
		};
	}

	//
	// event logic
	//

	var event_root = LinkedList.create();

	function eventCompare(p1_isStart, p1_1, p1_2, p2_isStart, p2_1, p2_2){
		// compare the selected points first
		var comp = eps.pointsCompare(p1_1, p2_1);
		if (comp !== 0)
			return comp;
		// the selected points are the same

		if (eps.pointsSame(p1_2, p2_2)) // if the non-selected points are the same too...
			return 0; // then the segments are equal

		if (p1_isStart !== p2_isStart) // if one is a start and the other isn't...
			return p1_isStart ? 1 : -1; // favor the one that isn't the start

		// otherwise, we'll have to calculate which one is below the other manually
		return eps.pointAboveOrOnLine(p1_2,
			p2_isStart ? p2_1 : p2_2, // order matters
			p2_isStart ? p2_2 : p2_1
		) ? 1 : -1;
	}

	function eventAdd(ev, other_pt){
		event_root.insertBefore(ev, function(here){
			// should ev be inserted before here?
			var comp = eventCompare(
				ev  .isStart, ev  .pt,      other_pt,
				here.isStart, here.pt, here.other.pt
			);
			return comp < 0;
		});
	}

	function eventAddSegmentStart(seg, primary){
		var ev_start = LinkedList.node({
			isStart: true,
			pt: seg.start,
			seg: seg,
			primary: primary,
			other: null,
			status: null
		});
		eventAdd(ev_start, seg.end);
		return ev_start;
	}

	function eventAddSegmentEnd(ev_start, seg, primary){
		var ev_end = LinkedList.node({
			isStart: false,
			pt: seg.end,
			seg: seg,
			primary: primary,
			other: ev_start,
			status: null
		});
		ev_start.other = ev_end;
		eventAdd(ev_end, ev_start.pt);
	}

	function eventAddSegment(seg, primary){
		var ev_start = eventAddSegmentStart(seg, primary);
		eventAddSegmentEnd(ev_start, seg, primary);
		return ev_start;
	}

	function eventUpdateEnd(ev, end){
		// slides an end backwards
		//   (start)------------(end)    to:
		//   (start)---(end)

		if (buildLog)
			buildLog.segmentChop(ev.seg, end);

		ev.other.remove();
		ev.seg.end = end;
		ev.other.pt = end;
		eventAdd(ev.other, ev.pt);
	}

	function eventDivide(ev, pt){
		var ns = segmentCopy(pt, ev.seg.end, ev.seg);
		eventUpdateEnd(ev, pt);
		return eventAddSegment(ns, ev.primary);
	}

	function calculate(primaryPolyInverted, secondaryPolyInverted){
		// if selfIntersection is true then there is no secondary polygon, so that isn't used

		//
		// status logic
		//

		var status_root = LinkedList.create();

		function statusCompare(ev1, ev2){
			var a1 = ev1.seg.start;
			var a2 = ev1.seg.end;
			var b1 = ev2.seg.start;
			var b2 = ev2.seg.end;

			if (eps.pointsCollinear(a1, b1, b2)){
				if (eps.pointsCollinear(a2, b1, b2))
					return 1;//eventCompare(true, a1, a2, true, b1, b2);
				return eps.pointAboveOrOnLine(a2, b1, b2) ? 1 : -1;
			}
			return eps.pointAboveOrOnLine(a1, b1, b2) ? 1 : -1;
		}

		function statusFindSurrounding(ev){
			return status_root.findTransition(function(here){
				var comp = statusCompare(ev, here.ev);
				return comp > 0;
			});
		}

		function checkIntersection(ev1, ev2){
			// returns the segment equal to ev1, or false if nothing equal

			var seg1 = ev1.seg;
			var seg2 = ev2.seg;
			var a1 = seg1.start;
			var a2 = seg1.end;
			var b1 = seg2.start;
			var b2 = seg2.end;

			if (buildLog)
				buildLog.checkIntersection(seg1, seg2);

			var i = eps.linesIntersect(a1, a2, b1, b2);

			if (i === false){
				// segments are parallel or coincident

				// if points aren't collinear, then the segments are parallel, so no intersections
				if (!eps.pointsCollinear(a1, a2, b1))
					return false;
				// otherwise, segments are on top of each other somehow (aka coincident)

				if (eps.pointsSame(a1, b2) || eps.pointsSame(a2, b1))
					return false; // segments touch at endpoints... no intersection

				var a1_equ_b1 = eps.pointsSame(a1, b1);
				var a2_equ_b2 = eps.pointsSame(a2, b2);

				if (a1_equ_b1 && a2_equ_b2)
					return ev2; // segments are exactly equal

				var a1_between = !a1_equ_b1 && eps.pointBetween(a1, b1, b2);
				var a2_between = !a2_equ_b2 && eps.pointBetween(a2, b1, b2);

				// handy for debugging:
				// buildLog.log({
				//	a1_equ_b1: a1_equ_b1,
				//	a2_equ_b2: a2_equ_b2,
				//	a1_between: a1_between,
				//	a2_between: a2_between
				// });

				if (a1_equ_b1){
					if (a2_between){
						//  (a1)---(a2)
						//  (b1)----------(b2)
						eventDivide(ev2, a2);
					}
					else{
						//  (a1)----------(a2)
						//  (b1)---(b2)
						eventDivide(ev1, b2);
					}
					return ev2;
				}
				else if (a1_between){
					if (!a2_equ_b2){
						// make a2 equal to b2
						if (a2_between){
							//         (a1)---(a2)
							//  (b1)-----------------(b2)
							eventDivide(ev2, a2);
						}
						else{
							//         (a1)----------(a2)
							//  (b1)----------(b2)
							eventDivide(ev1, b2);
						}
					}

					//         (a1)---(a2)
					//  (b1)----------(b2)
					eventDivide(ev2, a1);
				}
			}
			else{
				// otherwise, lines intersect at i.pt, which may or may not be between the endpoints

				// is A divided between its endpoints? (exclusive)
				if (i.alongA === 0){
					if (i.alongB === -1) // yes, at exactly b1
						eventDivide(ev1, b1);
					else if (i.alongB === 0) // yes, somewhere between B's endpoints
						eventDivide(ev1, i.pt);
					else if (i.alongB === 1) // yes, at exactly b2
						eventDivide(ev1, b2);
				}

				// is B divided between its endpoints? (exclusive)
				if (i.alongB === 0){
					if (i.alongA === -1) // yes, at exactly a1
						eventDivide(ev2, a1);
					else if (i.alongA === 0) // yes, somewhere between A's endpoints (exclusive)
						eventDivide(ev2, i.pt);
					else if (i.alongA === 1) // yes, at exactly a2
						eventDivide(ev2, a2);
				}
			}
			return false;
		}

		//
		// main event loop
		//
		var segments = [];
		while (!event_root.isEmpty()){
			var ev = event_root.getHead();

			if (buildLog)
				buildLog.vert(ev.pt[0]);

			if (ev.isStart){

				if (buildLog)
					buildLog.segmentNew(ev.seg, ev.primary);

				var surrounding = statusFindSurrounding(ev);
				var above = surrounding.before ? surrounding.before.ev : null;
				var below = surrounding.after ? surrounding.after.ev : null;

				if (buildLog){
					buildLog.tempStatus(
						ev.seg,
						above ? above.seg : false,
						below ? below.seg : false
					);
				}

				function checkBothIntersections(){
					if (above){
						var eve = checkIntersection(ev, above);
						if (eve)
							return eve;
					}
					if (below)
						return checkIntersection(ev, below);
					return false;
				}

				var eve = checkBothIntersections();
				if (eve){
					// ev and eve are equal
					// we'll keep eve and throw away ev

					// merge ev.seg's fill information into eve.seg

					if (selfIntersection){
						var toggle; // are we a toggling edge?
						if (ev.seg.myFill.below === null)
							toggle = true;
						else
							toggle = ev.seg.myFill.above !== ev.seg.myFill.below;

						// merge two segments that belong to the same polygon
						// think of this as sandwiching two segments together, where `eve.seg` is
						// the bottom -- this will cause the above fill flag to toggle
						if (toggle)
							eve.seg.myFill.above = !eve.seg.myFill.above;
					}
					else{
						// merge two segments that belong to different polygons
						// each segment has distinct knowledge, so no special logic is needed
						// note that this can only happen once per segment in this phase, because we
						// are guaranteed that all self-intersections are gone
						eve.seg.otherFill = ev.seg.myFill;
					}

					if (buildLog)
						buildLog.segmentUpdate(eve.seg);

					ev.other.remove();
					ev.remove();
				}

				if (event_root.getHead() !== ev){
					// something was inserted before us in the event queue, so loop back around and
					// process it before continuing
					if (buildLog)
						buildLog.rewind(ev.seg);
					continue;
				}

				//
				// calculate fill flags
				//
				if (selfIntersection){
					var toggle; // are we a toggling edge?
					if (ev.seg.myFill.below === null) // if we are a new segment...
						toggle = true; // then we toggle
					else // we are a segment that has previous knowledge from a division
						toggle = ev.seg.myFill.above !== ev.seg.myFill.below; // calculate toggle

					// next, calculate whether we are filled below us
					if (!below){ // if nothing is below us...
						// we are filled below us if the polygon is inverted
						ev.seg.myFill.below = primaryPolyInverted;
					}
					else{
						// otherwise, we know the answer -- it's the same if whatever is below
						// us is filled above it
						ev.seg.myFill.below = below.seg.myFill.above;
					}

					// since now we know if we're filled below us, we can calculate whether
					// we're filled above us by applying toggle to whatever is below us
					if (toggle)
						ev.seg.myFill.above = !ev.seg.myFill.below;
					else
						ev.seg.myFill.above = ev.seg.myFill.below;
				}
				else{
					// now we fill in any missing transition information, since we are all-knowing
					// at this point

					if (ev.seg.otherFill === null){
						// if we don't have other information, then we need to figure out if we're
						// inside the other polygon
						var inside;
						if (!below){
							// if nothing is below us, then we're inside if the other polygon is
							// inverted
							inside =
								ev.primary ? secondaryPolyInverted : primaryPolyInverted;
						}
						else{ // otherwise, something is below us
							// so copy the below segment's other polygon's above
							if (ev.primary === below.primary)
								inside = below.seg.otherFill.above;
							else
								inside = below.seg.myFill.above;
						}
						ev.seg.otherFill = {
							above: inside,
							below: inside
						};
					}
				}

				if (buildLog){
					buildLog.status(
						ev.seg,
						above ? above.seg : false,
						below ? below.seg : false
					);
				}

				// insert the status and remember it for later removal
				ev.other.status = surrounding.insert(LinkedList.node({ ev: ev }));
			}
			else{
				var st = ev.status;

				if (st === null){
					throw new Error('PolyBool: Zero-length segment detected; your epsilon is ' +
						'probably too small or too large');
				}

				// removing the status will create two new adjacent edges, so we'll need to check
				// for those
				if (status_root.exists(st.prev) && status_root.exists(st.next))
					checkIntersection(st.prev.ev, st.next.ev);

				if (buildLog)
					buildLog.statusRemove(st.ev.seg);

				// remove the status
				st.remove();

				// if we've reached this point, we've calculated everything there is to know, so
				// save the segment for reporting
				if (!ev.primary){
					// make sure `seg.myFill` actually points to the primary polygon though
					var s = ev.seg.myFill;
					ev.seg.myFill = ev.seg.otherFill;
					ev.seg.otherFill = s;
				}
				segments.push(ev.seg);
			}

			// remove the event and continue
			event_root.getHead().remove();
		}

		if (buildLog)
			buildLog.done();

		return segments;
	}

	// return the appropriate API depending on what we're doing
	if (!selfIntersection){
		// performing combination of polygons, so only deal with already-processed segments
		return {
			calculate: function(segments1, inverted1, segments2, inverted2){
				// segmentsX come from the self-intersection API, or this API
				// invertedX is whether we treat that list of segments as an inverted polygon or not
				// returns segments that can be used for further operations
				segments1.forEach(function(seg){
					eventAddSegment(seg, true);
				});
				segments2.forEach(function(seg){
					eventAddSegment(seg, false);
				});
				return calculate(inverted1, inverted2);
			}
		};
	}

	// otherwise, performing self-intersection, so deal with regions
	return {
		addRegion: function(region){
			// regions are a list of points:
			//  [ [0, 0], [100, 0], [50, 100] ]
			// you can add multiple regions before running calculate
			var pt1;
			var pt2 = region[region.length - 1];
			for (var i = 0; i < region.length; i++){
				pt1 = pt2;
				pt2 = region[i];

				var forward = eps.pointsCompare(pt1, pt2);
				if (forward === 0) // points are equal, so we have a zero-length segment
					continue; // just skip it

				eventAddSegment(
					segmentNew(
						forward < 0 ? pt1 : pt2,
						forward < 0 ? pt2 : pt1
					),
					true
				);
			}
		},
		calculate: function(inverted){
			// is the polygon inverted?
			// returns segments
			return calculate(inverted, false);
		}
	};
}

module.exports = Intersecter;

},{"./linked-list":8}],8:[function(require,module,exports){
// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// simple linked list implementation that allows you to traverse down nodes and save positions
//

var LinkedList = {
	create: function(){
		var my = {
			root: { root: true, next: null },
			exists: function(node){
				if (node === null || node === my.root)
					return false;
				return true;
			},
			isEmpty: function(){
				return my.root.next === null;
			},
			getHead: function(){
				return my.root.next;
			},
			insertBefore: function(node, check){
				var last = my.root;
				var here = my.root.next;
				while (here !== null){
					if (check(here)){
						node.prev = here.prev;
						node.next = here;
						here.prev.next = node;
						here.prev = node;
						return;
					}
					last = here;
					here = here.next;
				}
				last.next = node;
				node.prev = last;
				node.next = null;
			},
			findTransition: function(check){
				var prev = my.root;
				var here = my.root.next;
				while (here !== null){
					if (check(here))
						break;
					prev = here;
					here = here.next;
				}
				return {
					before: prev === my.root ? null : prev,
					after: here,
					insert: function(node){
						node.prev = prev;
						node.next = here;
						prev.next = node;
						if (here !== null)
							here.prev = node;
						return node;
					}
				};
			}
		};
		return my;
	},
	node: function(data){
		data.prev = null;
		data.next = null;
		data.remove = function(){
			data.prev.next = data.next;
			if (data.next)
				data.next.prev = data.prev;
			data.prev = null;
			data.next = null;
		};
		return data;
	}
};

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// converts a list of segments into a list of regions, while also removing unnecessary verticies
//

function SegmentChainer(segments, eps, buildLog){
	var chains = [];
	var regions = [];

	segments.forEach(function(seg){
		var pt1 = seg.start;
		var pt2 = seg.end;

		if (buildLog)
			buildLog.chainStart(seg);

		// search for two chains that this segment matches
		var first_match = {
			index: 0,
			matches_head: false,
			matches_pt1: false
		};
		var second_match = {
			index: 0,
			matches_head: false,
			matches_pt1: false
		};
		var next_match = first_match;
		function setMatch(index, matches_head, matches_pt1){
			// return true if we've matched twice
			next_match.index = index;
			next_match.matches_head = matches_head;
			next_match.matches_pt1 = matches_pt1;
			if (next_match === first_match){
				next_match = second_match;
				return false;
			}
			next_match = null;
			return true; // we've matched twice, we're done here
		}
		for (var i = 0; i < chains.length; i++){
			var chain = chains[i];
			var head  = chain[0];
			var head2 = chain[1];
			var tail  = chain[chain.length - 1];
			var tail2 = chain[chain.length - 2];
			if (eps.pointsSame(head, pt1)){
				if (setMatch(i, true, true))
					break;
			}
			else if (eps.pointsSame(head, pt2)){
				if (setMatch(i, true, false))
					break;
			}
			else if (eps.pointsSame(tail, pt1)){
				if (setMatch(i, false, true))
					break;
			}
			else if (eps.pointsSame(tail, pt2)){
				if (setMatch(i, false, false))
					break;
			}
		}

		if (next_match === first_match){
			// we didn't match anything, so create a new chain
			chains.push([ pt1, pt2 ]);
			if (buildLog)
				buildLog.chainNew(pt1, pt2);
			return;
		}

		if (next_match === second_match){
			// we matched a single chain

			if (buildLog)
				buildLog.chainMatch(first_match.index);

			// add the other point to the apporpriate end, and check to see if we've closed the
			// chain into a loop

			var index = first_match.index;
			var pt = first_match.matches_pt1 ? pt2 : pt1; // if we matched pt1, then we add pt2, etc
			var addToHead = first_match.matches_head; // if we matched at head, then add to the head

			var chain = chains[index];
			var grow  = addToHead ? chain[0] : chain[chain.length - 1];
			var grow2 = addToHead ? chain[1] : chain[chain.length - 2];
			var oppo  = addToHead ? chain[chain.length - 1] : chain[0];
			var oppo2 = addToHead ? chain[chain.length - 2] : chain[1];

			if (eps.pointsCollinear(grow2, grow, pt)){
				// grow isn't needed because it's directly between grow2 and pt:
				// grow2 ---grow---> pt
				if (addToHead){
					if (buildLog)
						buildLog.chainRemoveHead(first_match.index, pt);
					chain.shift();
				}
				else{
					if (buildLog)
						buildLog.chainRemoveTail(first_match.index, pt);
					chain.pop();
				}
				grow = grow2; // old grow is gone... new grow is what grow2 was
			}

			if (eps.pointsSame(oppo, pt)){
				// we're closing the loop, so remove chain from chains
				chains.splice(index, 1);

				if (eps.pointsCollinear(oppo2, oppo, grow)){
					// oppo isn't needed because it's directly between oppo2 and grow:
					// oppo2 ---oppo--->grow
					if (addToHead){
						if (buildLog)
							buildLog.chainRemoveTail(first_match.index, grow);
						chain.pop();
					}
					else{
						if (buildLog)
							buildLog.chainRemoveHead(first_match.index, grow);
						chain.shift();
					}
				}

				if (buildLog)
					buildLog.chainClose(first_match.index);

				// we have a closed chain!
				regions.push(chain);
				return;
			}

			// not closing a loop, so just add it to the apporpriate side
			if (addToHead){
				if (buildLog)
					buildLog.chainAddHead(first_match.index, pt);
				chain.unshift(pt);
			}
			else{
				if (buildLog)
					buildLog.chainAddTail(first_match.index, pt);
				chain.push(pt);
			}
			return;
		}

		// otherwise, we matched two chains, so we need to combine those chains together

		function reverseChain(index){
			if (buildLog)
				buildLog.chainReverse(index);
			chains[index].reverse(); // gee, that's easy
		}

		function appendChain(index1, index2){
			// index1 gets index2 appended to it, and index2 is removed
			var chain1 = chains[index1];
			var chain2 = chains[index2];
			var tail  = chain1[chain1.length - 1];
			var tail2 = chain1[chain1.length - 2];
			var head  = chain2[0];
			var head2 = chain2[1];

			if (eps.pointsCollinear(tail2, tail, head)){
				// tail isn't needed because it's directly between tail2 and head
				// tail2 ---tail---> head
				if (buildLog)
					buildLog.chainRemoveTail(index1, tail);
				chain1.pop();
				tail = tail2; // old tail is gone... new tail is what tail2 was
			}

			if (eps.pointsCollinear(tail, head, head2)){
				// head isn't needed because it's directly between tail and head2
				// tail ---head---> head2
				if (buildLog)
					buildLog.chainRemoveHead(index2, head);
				chain2.shift();
			}

			if (buildLog)
				buildLog.chainJoin(index1, index2);
			chains[index1] = chain1.concat(chain2);
			chains.splice(index2, 1);
		}

		var F = first_match.index;
		var S = second_match.index;

		if (buildLog)
			buildLog.chainConnect(F, S);

		var reverseF = chains[F].length < chains[S].length; // reverse the shorter chain, if needed
		if (first_match.matches_head){
			if (second_match.matches_head){
				if (reverseF){
					// <<<< F <<<< --- >>>> S >>>>
					reverseChain(F);
					// >>>> F >>>> --- >>>> S >>>>
					appendChain(F, S);
				}
				else{
					// <<<< F <<<< --- >>>> S >>>>
					reverseChain(S);
					// <<<< F <<<< --- <<<< S <<<<   logically same as:
					// >>>> S >>>> --- >>>> F >>>>
					appendChain(S, F);
				}
			}
			else{
				// <<<< F <<<< --- <<<< S <<<<   logically same as:
				// >>>> S >>>> --- >>>> F >>>>
				appendChain(S, F);
			}
		}
		else{
			if (second_match.matches_head){
				// >>>> F >>>> --- >>>> S >>>>
				appendChain(F, S);
			}
			else{
				if (reverseF){
					// >>>> F >>>> --- <<<< S <<<<
					reverseChain(F);
					// <<<< F <<<< --- <<<< S <<<<   logically same as:
					// >>>> S >>>> --- >>>> F >>>>
					appendChain(S, F);
				}
				else{
					// >>>> F >>>> --- <<<< S <<<<
					reverseChain(S);
					// >>>> F >>>> --- >>>> S >>>>
					appendChain(F, S);
				}
			}
		}
	});

	return regions;
}

module.exports = SegmentChainer;

},{}],10:[function(require,module,exports){
// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// filter a list of segments based on boolean operations
//

function select(segments, selection, buildLog){
	var result = [];
	segments.forEach(function(seg){
		var index =
			(seg.myFill.above ? 8 : 0) +
			(seg.myFill.below ? 4 : 0) +
			((seg.otherFill && seg.otherFill.above) ? 2 : 0) +
			((seg.otherFill && seg.otherFill.below) ? 1 : 0);
		if (selection[index] !== 0){
			// copy the segment to the results, while also calculating the fill status
			result.push({
				id: buildLog ? buildLog.segmentId() : -1,
				start: seg.start,
				end: seg.end,
				myFill: {
					above: selection[index] === 1, // 1 if filled above
					below: selection[index] === 2  // 2 if filled below
				},
				otherFill: null
			});
		}
	});

	if (buildLog)
		buildLog.selected(result);

	return result;
}

var SegmentSelector = {
	union: function(segments, buildLog){ // primary | secondary
		// above1 below1 above2 below2    Keep?               Value
		//    0      0      0      0   =>   no                  0
		//    0      0      0      1   =>   yes filled below    2
		//    0      0      1      0   =>   yes filled above    1
		//    0      0      1      1   =>   no                  0
		//    0      1      0      0   =>   yes filled below    2
		//    0      1      0      1   =>   yes filled below    2
		//    0      1      1      0   =>   no                  0
		//    0      1      1      1   =>   no                  0
		//    1      0      0      0   =>   yes filled above    1
		//    1      0      0      1   =>   no                  0
		//    1      0      1      0   =>   yes filled above    1
		//    1      0      1      1   =>   no                  0
		//    1      1      0      0   =>   no                  0
		//    1      1      0      1   =>   no                  0
		//    1      1      1      0   =>   no                  0
		//    1      1      1      1   =>   no                  0
		return select(segments, [
			0, 2, 1, 0,
			2, 2, 0, 0,
			1, 0, 1, 0,
			0, 0, 0, 0
		], buildLog);
	},
	intersect: function(segments, buildLog){ // primary & secondary
		// above1 below1 above2 below2    Keep?               Value
		//    0      0      0      0   =>   no                  0
		//    0      0      0      1   =>   no                  0
		//    0      0      1      0   =>   no                  0
		//    0      0      1      1   =>   no                  0
		//    0      1      0      0   =>   no                  0
		//    0      1      0      1   =>   yes filled below    2
		//    0      1      1      0   =>   no                  0
		//    0      1      1      1   =>   yes filled below    2
		//    1      0      0      0   =>   no                  0
		//    1      0      0      1   =>   no                  0
		//    1      0      1      0   =>   yes filled above    1
		//    1      0      1      1   =>   yes filled above    1
		//    1      1      0      0   =>   no                  0
		//    1      1      0      1   =>   yes filled below    2
		//    1      1      1      0   =>   yes filled above    1
		//    1      1      1      1   =>   no                  0
		return select(segments, [
			0, 0, 0, 0,
			0, 2, 0, 2,
			0, 0, 1, 1,
			0, 2, 1, 0
		], buildLog);
	},
	difference: function(segments, buildLog){ // primary - secondary
		// above1 below1 above2 below2    Keep?               Value
		//    0      0      0      0   =>   no                  0
		//    0      0      0      1   =>   no                  0
		//    0      0      1      0   =>   no                  0
		//    0      0      1      1   =>   no                  0
		//    0      1      0      0   =>   yes filled below    2
		//    0      1      0      1   =>   no                  0
		//    0      1      1      0   =>   yes filled below    2
		//    0      1      1      1   =>   no                  0
		//    1      0      0      0   =>   yes filled above    1
		//    1      0      0      1   =>   yes filled above    1
		//    1      0      1      0   =>   no                  0
		//    1      0      1      1   =>   no                  0
		//    1      1      0      0   =>   no                  0
		//    1      1      0      1   =>   yes filled above    1
		//    1      1      1      0   =>   yes filled below    2
		//    1      1      1      1   =>   no                  0
		return select(segments, [
			0, 0, 0, 0,
			2, 0, 2, 0,
			1, 1, 0, 0,
			0, 1, 2, 0
		], buildLog);
	},
	differenceRev: function(segments, buildLog){ // secondary - primary
		// above1 below1 above2 below2    Keep?               Value
		//    0      0      0      0   =>   no                  0
		//    0      0      0      1   =>   yes filled below    2
		//    0      0      1      0   =>   yes filled above    1
		//    0      0      1      1   =>   no                  0
		//    0      1      0      0   =>   no                  0
		//    0      1      0      1   =>   no                  0
		//    0      1      1      0   =>   yes filled above    1
		//    0      1      1      1   =>   yes filled above    1
		//    1      0      0      0   =>   no                  0
		//    1      0      0      1   =>   yes filled below    2
		//    1      0      1      0   =>   no                  0
		//    1      0      1      1   =>   yes filled below    2
		//    1      1      0      0   =>   no                  0
		//    1      1      0      1   =>   no                  0
		//    1      1      1      0   =>   no                  0
		//    1      1      1      1   =>   no                  0
		return select(segments, [
			0, 2, 1, 0,
			0, 0, 1, 1,
			0, 2, 0, 2,
			0, 0, 0, 0
		], buildLog);
	},
	xor: function(segments, buildLog){ // primary ^ secondary
		// above1 below1 above2 below2    Keep?               Value
		//    0      0      0      0   =>   no                  0
		//    0      0      0      1   =>   yes filled below    2
		//    0      0      1      0   =>   yes filled above    1
		//    0      0      1      1   =>   no                  0
		//    0      1      0      0   =>   yes filled below    2
		//    0      1      0      1   =>   no                  0
		//    0      1      1      0   =>   no                  0
		//    0      1      1      1   =>   yes filled above    1
		//    1      0      0      0   =>   yes filled above    1
		//    1      0      0      1   =>   no                  0
		//    1      0      1      0   =>   no                  0
		//    1      0      1      1   =>   yes filled below    2
		//    1      1      0      0   =>   no                  0
		//    1      1      0      1   =>   yes filled above    1
		//    1      1      1      0   =>   yes filled below    2
		//    1      1      1      1   =>   no                  0
		return select(segments, [
			0, 2, 1, 0,
			2, 0, 0, 1,
			1, 0, 0, 2,
			0, 1, 2, 0
		], buildLog);
	}
};

module.exports = SegmentSelector;

},{}],11:[function(require,module,exports){
var VisionSimulation = require("dota-vision-simulation");
var worlddata = require("./worlddata.json");
var PolyBool = require('polybooljs');

function App(map_tile_path, vision_data_image_path) {
    var self = this,
        IMG_DIR = "img/",
        ENTITIES = {
            observer: {
                icon_path: IMG_DIR + "ward_observer.png",
                radius: 1600
            },
            sentry: {
                icon_path: IMG_DIR + "ward_sentry.png",
                radius: 850
            }
        },
        TOWER_DAY_VISION_RADIUS = 1900,
        TOWER_NIGHT_VISION_RADIUS = 800,
        TOWER_TRUE_SIGHT_RADIUS = 900,
        TOWER_ATTACK_RANGE_RADIUS = 700,
        map_data_path = "data",
        map_data,
        map_w = 16384,
        map_h = 16384,
        map_x_boundaries = [-8475.58617377, 9327.49124559],
        map_y_boundaries = [9028.52473332, -8836.61406266],
        zoomify = new OpenLayers.Layer.Zoomify( "Zoomify", map_tile_path, new OpenLayers.Size( map_w, map_h ) ),
        scale = Math.abs(map_x_boundaries[1] - map_x_boundaries[0])/map_w,
        map = new OpenLayers.Map("map", {
            theme: null,
            maxExtent: new OpenLayers.Bounds(0, 0, map_w, map_h),
            numZoomLevels: 5,
            maxResolution: Math.pow(2, 5-1 ),
            units: "m"
        }),
        layerKeys = ["npc_dota_roshan_spawner","trigger_multiple","ent_dota_tree","dota_item_rune_spawner","dota_item_rune_spawner_bounty","ent_dota_shop","npc_dota_barracks","npc_dota_building","npc_dota_healer","npc_dota_fort","npc_dota_tower"],
        layerNames = {
            npc_dota_roshan_spawner: "Roshan",
            dota_item_rune_spawner: "Runes",
            dota_item_rune_spawner_bounty: "Bounty Runes",
            ent_dota_tree: "Trees",
            npc_dota_healer: "Shrines",
            npc_dota_fort: "Ancients",
            ent_dota_shop: "Shops",
            npc_dota_tower: "Towers",
            npc_dota_barracks: "Barracks",
            npc_dota_building: "Buildings",
            trigger_multiple: "Neutral Camps Spawn Boxes",
            npc_dota_neutral_spawner: "Neutral Camps",
            trigger_no_wards: "Invalid Ward Locations",
            ent_fow_blocker_node: "Vision Blocker"
        },
        baseLayers = [
            new OpenLayers.Layer.TMS('7.00 Default', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('700', 'default')
            }),
            new OpenLayers.Layer.TMS('6.87 Default', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('687', 'default')
            }),
            new OpenLayers.Layer.TMS('6.87 Desert', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('687', 'desert')
            }),
            new OpenLayers.Layer.TMS('6.87 Immortal Gardens', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('687', 'immortalgardens')
            })
        ],
        layerSwitcher = new OpenLayers.Control.LayerSwitcher({
            ascending: false
        }),
        coordinateControl = new OpenLayers.Control.MousePosition(),
        dayRangeLayer = new OpenLayers.Layer.Vector("Day Vision Range"),
        nightRangeLayer = new OpenLayers.Layer.Vector("Night Vision Range"),
        trueSightRangeLayer = new OpenLayers.Layer.Vector("True Sight Range"),
        attackRangeLayer = new OpenLayers.Layer.Vector("Attack Range"),
        polygonLayer = new OpenLayers.Layer.Vector("Drawn Circles"),
        wardVisionLayer = new OpenLayers.Layer.Vector("Ward Vision"),
        visionSimulationLayer = new OpenLayers.Layer.Vector("Ward Vision with Fog"),
        iconLayer = new OpenLayers.Layer.Markers("Placed Wards"),
        renderer = OpenLayers.Util.getParameters(window.location.href).renderer,
        drawControls,
        lastDistance,
        style = {
            lightblue: {
                strokeColor: "#007FFF",
                strokeOpacity: 1,
                strokeWidth: 1,
                fillColor: "#007FFF",
                fillOpacity: .4
            },
            red: {
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWidth: 1,
                fillColor: "#FF0000",
                fillOpacity: .4
            },
            green: {
                strokeColor: "#00FF00",
                strokeOpacity: 1,
                strokeWidth: 1,
                fillColor: "#00FF00",
                fillOpacity: .4
            },
            yellow: {
                strokeColor: "#FFFF00",
                strokeOpacity: 1,
                strokeWidth: 1,
                fillColor: "#FFFF00",
                fillOpacity: .4
            }
        },
        treeMarkers = {};

    /***********************************
     * QUERY STRING FUNCTIONS *
     ***********************************/

    var trim = (function() {
        "use strict";

        function escapeRegex(string) {
            return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
        }

        return function trim(str, characters, flags) {
            flags = flags || "g";
            if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
                throw new TypeError("argument must be string");
            }

            if (!/^[gi]*$/.test(flags)) {
                throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
            }

            characters = escapeRegex(characters);

            return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
        };
    }());

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function setQueryString(key, value) {
        history.replaceState(null, "", updateQueryString(key, value));
    }

    function addQueryStringValue(key, value) {
        console.log('addQueryStringValue', key, value);
        var qs = getParameterByName(key);
        qs = trim(trim(qs, ' ;') + ';' + value, ' ;');
        history.replaceState(null, "", updateQueryString(key, qs));
    }

    function removeQueryStringValue(key, value) {
        console.log('removeQueryStringValue', key, value);
        var qs = getParameterByName(key);
        qs = trim(trim(qs, ' ;').replace(value, '').replace(/;;/g, ''), ' ;');
        history.replaceState(null, "", updateQueryString(key, qs != '' ? qs : null));
    }

    function updateQueryString(key, value, url) {
        if (!url) url = window.location.href;
        var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
            hash;

        if (re.test(url)) {
            if (typeof value !== 'undefined' && value !== null)
                return url.replace(re, '$1' + key + "=" + value + '$2$3');
            else {
                hash = url.split('#');
                url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
                if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                    url += '#' + hash[1];
                return url;
            }
        } else {
            if (typeof value !== 'undefined' && value !== null) {
                var separator = url.indexOf('?') !== -1 ? '&' : '?';
                hash = url.split('#');
                url = hash[0] + separator + key + '=' + value;
                if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                    url += '#' + hash[1];
                return url;
            } else {
                return url;
            }
        }
    }

    /***********************************
     * COORDINATE CONVERSION FUNCTIONS *
     ***********************************/

    function getTileRadius(r) {
        return parseInt(Math.floor(r / 64));
    }

    function lerp(minVal, maxVal, pos_r) {
        return pos_r * (maxVal - minVal) + minVal;
    }

    function reverseLerp(minVal, maxVal, pos) {
        return (pos - minVal) / (maxVal - minVal);
    }

    function latLonToWorld(x, y) {
        var x_r = lerp(map_x_boundaries[0], map_x_boundaries[1], x / map_w),
            y_r = lerp(map_y_boundaries[0], map_y_boundaries[1], (map_h - y) / map_h);

        return {
            x: x_r,
            y: y_r
        };
    }

    function worldToLatLon(x_r, y_r) {
        var x = reverseLerp(map_x_boundaries[0], map_x_boundaries[1], x_r) * map_w,
            y = map_h - reverseLerp(map_y_boundaries[0], map_y_boundaries[1], y_r) * map_h;

        return {
            x: x,
            y: y
        };
    }

    function getScaledRadius(r) {
        return r / (map_x_boundaries[1] - map_x_boundaries[0]) * map_w
    }

    function calculateDistance(order, units, measure) {
        if (order == 1) {
            if (units == "km") {
                return measure * scale * 1000;
            } else {
                return measure * scale;
            }
        } else {
            return measure * scale;
        }
    }

    /********************
     * CONTROL HANDLERS *
     ********************/

    function handleTreeMarkerClick(event) {
        var worldXY = latLonToWorld(event.object.lonlat.lon, event.object.lonlat.lat),
            gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);

        event.object.treeVisible = !event.object.treeVisible
        event.object.setOpacity(event.object.treeVisible ? 1 : .4);
        vs.toggleTree(gridXY.x, gridXY.y);

        if (event.object.treeVisible) {
            removeQueryStringValue('cut_trees', event.object.tree_loc);
        } else {
            addQueryStringValue('cut_trees', event.object.tree_loc);
        }
    }

    function handleTowerMarkerClick(e, skipQueryStringUpdate) {
        console.log('handleTowerMarkerClick');
        var circle,
            feature,
            center;

        if (!e.object.showInfo) {
            center = new OpenLayers.Geometry.Point(e.object.lonlat.lon, e.object.lonlat.lat);

            // day vision circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.day_vision_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle);
            dayRangeLayer.addFeatures(feature);
            e.object.day_vision_feature = feature;

            // true sight circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.true_sight_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle, null, style.lightblue);
            trueSightRangeLayer.addFeatures(feature);
            e.object.true_sight_feature = feature;

            // night vision circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.night_vision_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle);
            nightRangeLayer.addFeatures(feature);
            e.object.night_vision_feature = feature;

            // attack range circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.attack_range_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle, null, style.red);
            attackRangeLayer.addFeatures(feature);
            e.object.attack_range_feature = feature;

            if (!skipQueryStringUpdate) addQueryStringValue("tower_vision", e.object.tower_loc.x + ',' + e.object.tower_loc.y);

            var lonlat = worldToLatLon(e.object.tower_loc.x, e.object.tower_loc.y);
        }
        else {
            dayRangeLayer.removeFeatures(e.object.day_vision_feature);
            nightRangeLayer.removeFeatures(e.object.night_vision_feature);
            trueSightRangeLayer.removeFeatures(e.object.true_sight_feature);
            attackRangeLayer.removeFeatures(e.object.attack_range_feature);

            if (!skipQueryStringUpdate) removeQueryStringValue("tower_vision", e.object.tower_loc.x + ',' + e.object.tower_loc.y);
        }
        e.object.showInfo = !e.object.showInfo;
    }

    function handleWardClick(entityName) {
        return function(event) {
            var latlon = map.getLonLatFromPixel(event.xy),
                marker = placeWard(latlon, entityName);
            addQueryStringValue(marker.ward_type, marker.ward_loc);
        }
    }

    function placeWard(latlon, entityName, qs_value_worldXY) {
        var entity = ENTITIES[entityName],
            marker = createWardMarker(entity.icon_path, latlon),
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(marker.lonlat.lon, marker.lonlat.lat), getScaledRadius(entity.radius), 40),
            feature = new OpenLayers.Feature.Vector(circle);
        iconLayer.addMarker(marker);
        wardVisionLayer.addFeatures(feature);
        marker.radius_feature = feature;
        marker.events.register("mousedown", this, wardMarkerRemove);
        marker.events.register("touchend", this, wardMarkerRemove);
        marker.ward_type = entityName;
        marker.ward_loc = entityName;

        if (qs_value_worldXY == undefined) {
            var worldXY = latLonToWorld(latlon.lon, latlon.lat);
            worldXY.x = worldXY.x.toFixed(0);
            worldXY.y = worldXY.y.toFixed(0);
            marker.ward_loc = worldXY.x + ',' + worldXY.y
        } else {
            marker.ward_loc = qs_value_worldXY;
        }

        if (entityName == 'observer') updateVisibility(latlon, marker, ENTITIES.observer.radius);
        
        return marker;
    }

    function wardMarkerRemove(event) {
        if (event.object.radius_feature) wardVisionLayer.removeFeatures(event.object.radius_feature);
        if (event.object.vision_feature) visionSimulationLayer.removeFeatures(event.object.vision_feature);
        if (event.object.vision_center_feature) visionSimulationLayer.removeFeatures(event.object.vision_center_feature);
        iconLayer.removeMarker(event.object);
        console.log(event.object);
        OpenLayers.Event.stop(event);

        removeQueryStringValue(event.object.ward_type, event.object.ward_loc);
    }

    function handleOnClick(event) {
        console.log('handleOnClick');
    }

    function handleMeasurements(event) {
        var out = "";
        if (event.order == 1) {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units";
        } else {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units<sup>2</" + "sup>";
        }
        document.getElementById("output").innerHTML = out;

        lastDistance = calculateDistance(event.order, event.units, event.measure);
        document.getElementById("traveltime").innerHTML = (lastDistance / document.getElementById("movespeed").value).toFixed(2);

        document.getElementById("traveltime-container").style.display = '';
    }

    function handleCircleMeasurements(event) {
        var element = document.getElementById("output"),
            out = "";

        if (event.order == 1) {
            out += "Radius: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units";
        } else {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units<sup>2</" + "sup>";
        }
        element.innerHTML = out;
    }

    function handleCircleMeasurementsPartial(event) {
        var element = document.getElementById("output"),
            out = "",
            circle,
            feature,
            self = this;

        drawControls["select"].deactivate();
        if (event.order == 1) {
            if (event.measure > 0) {
                if (event.units == "km") {
                    circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(event.geometry.components[0].x, event.geometry.components[0].y), event.measure * 1e3, 30);
                } else {
                    circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(event.geometry.components[0].x, event.geometry.components[0].y), event.measure, 30);
                }
                feature = new OpenLayers.Feature.Vector(circle);
                polygonLayer.removeFeatures(event.geometry.circle_features);
                if ("circle_features" in event.geometry) {
                    event.geometry.circle_features.length = 0;
                    event.geometry.circle_features.push(feature);
                } else {
                    event.geometry.circle_features = [feature];
                }
                feature.measure_control = this;
                feature.is_measuring = true;
                polygonLayer.addFeatures(feature);
                if (event.geometry.components.length > 2) {
                    setTimeout(function() {
                        feature.is_measuring = false;
                        drawControls["select"].activate();
                        self.cancel();
                    }, 0);
                }
            }
            out += "Radius: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units";
        } else {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units<sup>2</" + "sup>";
        }
        element.innerHTML = out;
    }

    function toggleControl() {
        var control;

        for (var key in drawControls) {
            control = drawControls[key];
            console.log(this, this.value, key, this.value == key && this.checked);
            if (this.value == key && this.checked) {
                control.activate();
            } else {
                control.deactivate();
            }
            if ((this.value == "polygonControl" || this.value == "circle") && this.checked) {
                drawControls["select"].activate();
            } else {
                drawControls["select"].deactivate();
            }
        }
        document.getElementById("output").innerHTML = "";

        document.getElementById("traveltime-container").style.display = 'none';
    }

    function addMarker(markers, ll, popupClass, popupContentHTML, closeBox, overflow) {
        var feature = new OpenLayers.Feature(markers, ll),
            marker;

        feature.closeBox = closeBox;
        feature.popupClass = popupClass;
        feature.data.popupContentHTML = popupContentHTML;
        feature.data.overflow = overflow ? "auto" : "hidden";
        marker = feature.createMarker();

        function handleHoverPopup(event) {
            if (this.popup == null) {
                this.popup = this.createPopup(this.closeBox);
                map.addPopup(this.popup);
                this.popup.show();
            } else {
                this.popup.toggle();
            }
            currentPopup = this.popup;
            OpenLayers.Event.stop(event);
        };

        if (markers.name == "Towers") {
            marker.events.register("mouseover", feature, handleHoverPopup);
            marker.events.register("mouseout", feature, handleHoverPopup);
        }
        markers.addMarker(marker);
        return marker;
    }

    function createWardMarker(img, latlon) {
        var size = new OpenLayers.Size(21, 25),
            offset = new OpenLayers.Pixel(-(size.w / 2), -size.h),
            icon = new OpenLayers.Icon(img, size, offset),
            marker = new OpenLayers.Marker(latlon, icon);
        console.log('createWardMarker', latlon);
        return marker;
    }

    // Creates a 64x64 rectangle feature centered at c
    function createTileFeature(c, style) {
        var r1 = worldToLatLon(c.x - 32, c.y - 32),
            r2 = worldToLatLon(c.x - 32, c.y + 32),
            r3 = worldToLatLon(c.x + 32, c.y + 32),
            r4 = worldToLatLon(c.x + 32, c.y - 32),
            box_points = [
                new OpenLayers.Geometry.Point(r1.x, r1.y),
                new OpenLayers.Geometry.Point(r2.x, r2.y),
                new OpenLayers.Geometry.Point(r3.x, r3.y),
                new OpenLayers.Geometry.Point(r4.x, r4.y)
            ],
            box_rect = new OpenLayers.Geometry.LinearRing(box_points),
            box_feature = new OpenLayers.Feature.Vector(box_rect, null, style);

        return box_feature;
    }

    // creates url for tiles. OpenLayers TMS Layer getURL property is set to this
    function getMyURL(patch, baseLayer) {
        return function(bounds) {
            //console.log('getMyURL', baseLayer);
            var res = this.map.getResolution(),
                x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)),
                y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h)),
                z = map.getZoom(),
                path = z + "/tile_" + x + "_" + y + "." + this.type,
                url = this.url;

            if (url instanceof Array) {
                url = this.selectUrl(path, url)
            }
            return url + patch + '/' + baseLayer + '/' + path
        }
    }
    
    function resetMarkerLayers() {
        var data = map_data;
        layerKeys.forEach(function (k) {
            if (data[k]) {
                var layer = map.getLayersByName(layerNames[k])[0];
                map.removeLayer(layer);
                layer.destroy();
            }
        });
        dayRangeLayer.destroyFeatures();
        nightRangeLayer.destroyFeatures();
        trueSightRangeLayer.destroyFeatures();
        attackRangeLayer.destroyFeatures();
        map.events.unregister("changelayer", map, layerChangeHandler);
    }

    function onMapDataLoad(data) {
        var markers = {},
            marker,
            vectorLayer = map.getLayersByName("Placed Wards")[0],
            box_points = [],
            box_rect, box_feature;
        layerKeys.forEach(function (k) {
            console.log('onMapDataLoad', k);
            if (data[k]) {
                // Create markers for non-neutral spawn box and non-tree layers
                if (k != "trigger_multiple" && k != "ent_dota_tree" && k != "trigger_no_wards" && k != "ent_fow_blocker_node") {
                    markers[k] = new OpenLayers.Layer.Markers(layerNames[k]);
                    map.addLayer(markers[k]);
                    markers[k].setVisibility(false);
                    for (var i = 0; i < data[k].length; i++) {
                        var latlon = worldToLatLon(data[k][i].x, data[k][i].y);
                        marker = addMarker(markers[k], new OpenLayers.LonLat(latlon.x, latlon.y), OpenLayers.Popup.FramedCloud, "Click to toggle range overlay", false);
                        marker.day_vision_radius = TOWER_DAY_VISION_RADIUS;
                        marker.night_vision_radius = TOWER_NIGHT_VISION_RADIUS;
                        marker.true_sight_radius = TOWER_TRUE_SIGHT_RADIUS;
                        marker.attack_range_radius = TOWER_ATTACK_RANGE_RADIUS;
                        marker.showInfo = false;

                        if (k == "npc_dota_tower") {
                            console.log('npc_dota_tower');
                            marker.events.register("mousedown", markers[k], handleTowerMarkerClick);
                            marker.events.register("touchend", markers[k], handleTowerMarkerClick);
                            marker.tower_loc = data[k][i];
                        }
                    }
                }
                // Set up tree layer without creating tree markers yet
                else if (k == "ent_dota_tree") {
                    markers[k] = new OpenLayers.Layer.Markers(layerNames[k]);
                    map.addLayer(markers[k]);
                    markers[k].setVisibility(false);
                    markers[k].data = data[k];
                }
                // Create neutral spawn markers and rectangles
                else if (k == "trigger_multiple") {
                    loadJSONData(markers, k, "npc_dota_neutral_spawner_box", data[k]);
                }
            }
        });

        map_data = data;
        
        map.raiseLayer(vectorLayer, map.layers.length);

        // Create tree markers the first time the tree layer is switched to
        map.events.register("changelayer", map, layerChangeHandler);

        parseQueryString();
    }
    
    function layerChangeHandler(event) {
        if (event.property === "visibility" && event.layer.name == layerNames["ent_dota_tree"] && !event.layer.loaded) {
            loadTreeData();
        }

        if (event.property === "visibility") {
            if (event.layer.isBaseLayer) {
                setQueryString('BaseLayer', event.layer.name.replace(/ /g, ''));
            }
            else {
                setQueryString(event.layer.name.replace(/ /g, ''), event.layer.visibility ? true : null);
            }
        }
    }

    function loadTreeData() {
        console.log('start tree load');
        var layer = map.getLayersByName(layerNames["ent_dota_tree"])[0];
        console.log(layer);
        for (var i = 0; i < layer.data.length; i++) {
            var latlon = worldToLatLon(layer.data[i].x, layer.data[i].y);
            marker = addMarker(layer, new OpenLayers.LonLat(latlon.x, latlon.y), OpenLayers.Popup.FramedCloud, "Click to toggle tree as alive or cut-down.<br>This will affect the simulated placed wards vision.<br>Tree coordinate: " + layer.data[i].x + ', ' + layer.data[i].y, false);
            marker.treeVisible = true;
            marker.tree_loc = layer.data[i].x + ',' + layer.data[i].y;
            marker.events.register("mousedown", layer, handleTreeMarkerClick);
            treeMarkers[layer.data[i].x + ',' + layer.data[i].y] = marker;
        }
        layer.loaded = !layer.loaded;
        console.log('end tree load');
    }

    function loadJSONData(markers, k, name, data) {
        markers[name] = new OpenLayers.Layer.Vector(layerNames[k]);
        map.addLayer(markers[name]);
        markers[name].setVisibility(false);
        for (var i = 0; i < data.length; i++) {
            pnt = [];
            for (var j = 0; j < data[i].length; j++) {
                var latlon = worldToLatLon(data[i][j].x, data[i][j].y);
                pnt.push(new OpenLayers.Geometry.Point(latlon.x, latlon.y));
            }


            ln = new OpenLayers.Geometry.LinearRing(pnt);
            pf = new OpenLayers.Feature.Vector(ln, null, style.green);
            markers[name].addFeatures([pf]);
        }
    }

    // Initialize map settings based on query string values
    function parseQueryString() {
        var zoom = getParameterByName('zoom');
        if (zoom) {
            map.zoomTo(parseInt(zoom));
        }
        var worldX = getParameterByName('x');
        var worldY = getParameterByName('y');
        if (worldX && worldY) {
            var lonlat = worldToLatLon(worldX, worldY);
            map.setCenter(new OpenLayers.LonLat(lonlat.x, lonlat.y), undefined, false, false);
        }
        
        var keys = ['observer', 'sentry'];
        for (var i = 0; i < keys.length; i++) {
            var wards = getParameterByName(keys[i])
            if (wards) {
                ward_coordinates = trim(wards, ' ;').split(';')
                ward_coordinates.map(function(el) {
                    var coord = el.split(',');
                    var xy = worldToLatLon(parseFloat(coord[0]), parseFloat(coord[1]));
                    placeWard(new OpenLayers.LonLat(xy.x, xy.y), keys[i], el);
                });
            }
        }
        
        var baseLayerName = getParameterByName('BaseLayer');
        if (baseLayerName) {
            for (var i = 0; i < baseLayers.length; i++) {
                var layer = baseLayers[i];
                var layerName = layer.name.replace(/ /g, '');
                if (baseLayerName === layerName) {
                    map.setBaseLayer(layer);
                    break;
                }
            }
        }
        
        for (k in layerNames) {
            var layerName = layerNames[k].replace(/ /g, '');
            value = getParameterByName(layerName);
            if (value) {
                var layer = map.getLayersByName(layerNames[k])[0];
                console.log(layer, layerNames[k], layerName);
                if (layer) layer.setVisibility(value == "true");
            }
        }

        var tower_vision = getParameterByName('tower_vision');
        if (tower_vision) {
            var layer = map.getLayersByName(layerNames["npc_dota_tower"])[0];
            tower_vision_coordinates = trim(tower_vision, ' ;').split(';')
            console.log('tower_vision', layer);
            console.log(treeMarkers, tower_vision_coordinates);
            for (var i = 0; i < tower_vision_coordinates.length; i++) {
                for (var j = 0; j < layer.markers.length; j++) {
                    if (layer.markers[j].tower_loc.x + ',' + layer.markers[j].tower_loc.y == tower_vision_coordinates[i]) {
                        handleTowerMarkerClick({
                            object: layer.markers[j]
                        }, true);
                    }
                }
            }
        }
    }

    function getJSON(path, callback) {
        console.log('getJSON', path);
        var request = new XMLHttpRequest();

        request.open('GET', path, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                callback(data);
            } else {
                alert('Error loading page.');
            }
        };
        request.onerror = function() {
            alert('Error loading page.');
        };
        request.send();
        return request;
    }

    /********************
     * INITITIALIZATION *
     ********************/
    OpenLayers.ImgPath = IMG_DIR;
    
    // Start setting up the map, adding controls and layers
    baseLayers.forEach(function(layer) {
        map.addLayer(layer);
    });
    map.addLayer(dayRangeLayer);
    map.addLayer(nightRangeLayer);
    map.addLayer(trueSightRangeLayer);
    map.addLayer(attackRangeLayer);
    map.addLayer(polygonLayer);
    map.addLayer(wardVisionLayer);
    map.addLayer(visionSimulationLayer);
    map.addLayer(iconLayer);
    map.addControl(coordinateControl);
    map.addControl(new OpenLayers.Control.TouchNavigation({
        dragPanOptions: {
            enableKinetic: true
        }
    }));
    map.addControl(new OpenLayers.Control.KeyboardDefaults());
    layerSwitcher.onButtonClick = (function (fn) {
        console.log('onButtonClick', fn);
        return function (evt) {
            var button = evt.buttonElement;
            if (button === this.maximizeDiv && isSmallScreen()) {
                minimizeControlList.call(document.getElementById("controls-min"));
            }
            return fn.apply(this, arguments);
        }
    })(layerSwitcher.onButtonClick);
    layerSwitcher.loadContents = function () {
        // layers list div
        this.layersDiv = document.createElement("div");
        this.layersDiv.id = this.id + "_layersDiv";
        OpenLayers.Element.addClass(this.layersDiv, "layersDiv");

        this.baseLbl = document.createElement("div");
        this.baseLbl.innerHTML = OpenLayers.i18n("Base Layer");
        OpenLayers.Element.addClass(this.baseLbl, "baseLbl");

        this.baseLayersDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.baseLayersDiv, "baseLayersDiv");

        this.dataLbl = document.createElement("div");
        this.dataLbl.innerHTML = OpenLayers.i18n("Overlays");
        OpenLayers.Element.addClass(this.dataLbl, "dataLbl");

        this.dataLayersDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.dataLayersDiv, "dataLayersDiv");

        if (this.ascending) {
            this.layersDiv.appendChild(this.baseLbl);
            this.layersDiv.appendChild(this.baseLayersDiv);
            this.layersDiv.appendChild(this.dataLbl);
            this.layersDiv.appendChild(this.dataLayersDiv);
        } else {
            this.layersDiv.appendChild(this.dataLbl);
            this.layersDiv.appendChild(this.dataLayersDiv);
            this.layersDiv.appendChild(this.baseLbl);
            this.layersDiv.appendChild(this.baseLayersDiv);
        }

        this.div.appendChild(this.layersDiv);

        // maximize button div
        this.maximizeDiv = OpenLayers.Util.createAlphaImageDiv(
                                    "OpenLayers_Control_MaximizeDiv",
                                    null,
                                    null,
                                    null,
                                    "absolute");
        OpenLayers.Element.addClass(this.maximizeDiv, "maximizeDiv olButton");
        this.maximizeDiv.style.display = "none";

        this.div.appendChild(this.maximizeDiv);

        // minimize button div
        this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv(
                                    "OpenLayers_Control_MinimizeDiv",
                                    null,
                                    null,
                                    null,
                                    "absolute");
        OpenLayers.Element.addClass(this.minimizeDiv, "minimizeDiv olButton");
        this.minimizeDiv.style.display = "none";

        this.maximizeDiv.innerHTML = '&equiv;';
        this.minimizeDiv.innerHTML = '&times;';
        
        this.div.appendChild(this.minimizeDiv);
    }
    console.log(layerSwitcher.onButtonClick);
    map.addControl(layerSwitcher);
    layerSwitcher.maximizeControl();
    if (!map.getCenter()) {
        map.zoomToMaxExtent();
    }
    
    // create click handler
    OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
        defaultHandlerOptions: {
            single: true,
            "double": false,
            pixelTolerance: 0,
            stopSingle: false,
            stopDouble: false
        },
        initialize: function(options) {
            this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
            OpenLayers.Control.prototype.initialize.apply(this, arguments);
            this.handler = new OpenLayers.Handler.Click(this, {
                click: this.onClick,
                dblclick: this.onDblclick
            }, this.handlerOptions);
        },
        onClick: handleOnClick,
        onDblclick: function(event) {
            var output = document.getElementById(this.key + "Output"),
                msg = "dblclick " + event.xy;
            output.value = output.value + msg + "\n";
        }
    });

    // Controls configuration
    renderer = renderer ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
    drawControls = {
        line: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
            persist: true,
            immediate: true,
            handlerOptions: {
                layerOptions: {
                    renderers: renderer
                }
            }
        }),
        circle: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
            persist: false,
            immediate: true,
            handlerOptions: {
                layerOptions: {
                    renderers: renderer
                }
            }
        }),
        observerclick: new OpenLayers.Control.Click({
            onClick: handleWardClick('observer'),
            handlerOptions: {
                single: true
            }
        }),
        sentryclick: new OpenLayers.Control.Click({
            onClick: handleWardClick('sentry'),
            handlerOptions: {
                single: true
            }
        }),
        polygonControl: new OpenLayers.Control.DrawFeature(polygonLayer, OpenLayers.Handler.RegularPolygon, {
            handlerOptions: {
                sides: 30
            }
        }),
        select: new OpenLayers.Control.SelectFeature(polygonLayer, {
            hover: true,
            highlightOnly: false,
            callbacks: {
                click: function(feature) {
                    var element = document.getElementById("output");
                    if (feature.measure_control && feature.is_measuring) {
                        feature.measure_control.cancel();
                        feature.is_measuring = false;
                        this.highlight(feature);
                    } else {
                        element.innerHTML = "";
                        polygonLayer.removeFeatures(feature);
                    }
                }
            },
            overFeature: function(feature) {
                var element = document.getElementById("output"),
                    out = "Radius: " + (.565352 * Math.sqrt(feature.geometry.getArea()) * scale).toFixed(0) + " units";
                element.innerHTML = out;
                this.highlight(feature);
            },
            outFeature: function(feature) {
                var element = document.getElementById("output");
                element.innerHTML = "";
                this.unhighlight(feature)
            }
        })
    };

    // Add controls to map
    for (var key in drawControls) {
        if (key == "line") {
            drawControls[key].events.on({
                measure: handleMeasurements,
                measurepartial: handleMeasurements
            })
        }
        if (key == "circle") {
            drawControls[key].events.on({
                measure: handleCircleMeasurements,
                measurepartial: handleCircleMeasurementsPartial
            })
        }
        map.addControl(drawControls[key]);
    }

    map.events.register("zoomend", map, function(){
        setQueryString('zoom', map.zoom);
    });

    map.events.register("moveend", map, function(){
        console.log(map);
        var worldXY = latLonToWorld(map.center.lon, map.center.lat);
        setQueryString('x', worldXY.x.toFixed(0));
        setQueryString('y', worldXY.y.toFixed(0));
    });

    // X/Y coordinate update display handler
    coordinateControl.formatOutput = function (lonlat) {
        var worldXY = latLonToWorld(lonlat.lon, lonlat.lat);
        return worldXY.x.toFixed(0) + ', ' + worldXY.y.toFixed(0);
    };
    
    map.events.register("mousemove", map, function(e) {
        if (wardVisionLayer.cursor_marker) {
            wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker);
        }
    
        // create and add cursor marker polygon if in place observer mode
        if (document.getElementById("observerToggle").checked) {
            var lonlat = map.getLonLatFromPixel(e.xy);
            var worldXY = latLonToWorld(lonlat.lon, lonlat.lat);
            var gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);
            var key = vs.pt2key(gridXY);

            var treePt = vs.tree_relations[key];
            var treeBlocking = false;
            if (treePt) {
                var treeKey = vs.pt2key(treePt);
                treeBlocking = vs.tree_state[treeKey];
            }
            var cursor_style = style.green;
            if (!vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
                cursor_style = style.red;
            }
            var box_feature = createTileFeature(vs.GridXYtoWorldXY(gridXY.x, gridXY.y), cursor_style);
            wardVisionLayer.addFeatures([box_feature]);
            wardVisionLayer.cursor_marker = box_feature;
        }
    });

    // Show/hide controls panel
    document.getElementById("controls-max").addEventListener("click", function(e) {
        document.querySelector(".controls").style.display = '';
        document.getElementById("controls-min").style.display = 'block';
        this.style.display = 'none';
        if (isSmallScreen()) {
            layerSwitcher.minimizeControl();
        }
        if (e) e.preventDefault();
    }, false);
    function minimizeControlList(e) {
        document.querySelector(".controls").style.display = 'none';
        document.getElementById("controls-max").style.display = 'block';
        this.style.display = 'none';
        if (e) e.preventDefault();
    }
    document.getElementById("controls-min").addEventListener("click", minimizeControlList, false);
    
    // Check screen size
    function isSmallScreen() {
        return ((window.innerWidth > 0) ? window.innerWidth : screen.width) <= 768;
    }
    // Initially hide controls if screen is small
    if (isSmallScreen()) {
        minimizeControlList.call(document.getElementById("controls-min"));
        layerSwitcher.minimizeControl();
    }

    // Show/hide X/Y coordinate display
    document.getElementById("coordControl").addEventListener("change", function(e) {
        if (this.checked) {
            document.querySelector(".olControlMousePosition").style.display = 'block';
        } else {
            document.querySelector(".olControlMousePosition").style.display = 'none';
        }
    }, false);

    // Update travel time display when movespeed input changes
    document.getElementById("movespeed").addEventListener("change", function(e) {
        document.getElementById("traveltime").innerHTML = (lastDistance / document.getElementById("movespeed").value).toFixed(2);
    }, false);

    // Set up panel radio button toggle handlers
    document.getElementById('noneToggle').addEventListener('click', toggleControl, false);
    document.getElementById('lineToggle').addEventListener('click', toggleControl, false);
    document.getElementById('circleToggle').addEventListener('click', toggleControl, false);
    document.getElementById('observerToggle').addEventListener('click', toggleControl, false);
    document.getElementById('sentryToggle').addEventListener('click', toggleControl, false);
    
    document.getElementById('dataControl').addEventListener('change', function () {
        setQueryString('data', document.getElementById('dataControl').value);
        resetMarkerLayers();
        init();
    }, false);
    
    function init() {
        console.log('init');
        var data = getParameterByName('data');
        if (data) {
            document.getElementById('dataControl').value = data;
        }
        getJSON(map_data_path + document.getElementById('dataControl').value + '.json', onMapDataLoad);
    }

    function updateVisibility(latlon, marker, radius) {
        console.log('updateVisibility ready');
        var worldXY = latLonToWorld(latlon.lon, latlon.lat);
        var gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);
        if (vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
            // create and add center marker polygon
            var box_feature = createTileFeature(vs.GridXYtoWorldXY(gridXY.x, gridXY.y), style.green);
            visionSimulationLayer.addFeatures([box_feature]);
            marker.vision_center_feature = box_feature;
            
            console.log('updating vision simulation', gridXY);
            vs.updateVisibility(gridXY.x, gridXY.y, getTileRadius(radius));
            
            // merge light points into a single polygon
            var polygons = [];
            var union = null;
            var lightPoints = Object.keys(vs.lights).map(function (key) {
                var pt = vs.key2pt(key);
                return vs.GridXYtoWorldXY(pt.x, pt.y);
            });
            for (var i = 0; i < lightPoints.length; i++) {
                var c = lightPoints[i],
                    r1 = worldToLatLon(c.x - 32, c.y - 32),
                    r2 = worldToLatLon(c.x - 32, c.y + 32),
                    r3 = worldToLatLon(c.x + 32, c.y + 32),
                    r4 = worldToLatLon(c.x + 32, c.y - 32);

                polygons.push({
                    regions: [
                        [[r1.x, r1.y], [r2.x, r2.y], [r3.x, r3.y], [r4.x, r4.y]]
                    ],
                    inverted: false // is this polygon inverted?
                });
            }
            
            var segments = PolyBool.segments(polygons[0]);
            for (var i = 1; i < polygons.length; i++){
                var seg2 = PolyBool.segments(polygons[i]);
                var comb = PolyBool.combine(segments, seg2);
                segments = PolyBool.selectUnion(comb);
            }
            var poly = PolyBool.polygon(segments);
            var polygonList = poly.regions.map(function (region) {
                var ring = new OpenLayers.Geometry.LinearRing(
                    region.map(function (pt) {
                        return new OpenLayers.Geometry.Point(pt[0], pt[1]);
                    })
                );
                var polygon = new OpenLayers.Geometry.Polygon([ring]);
                return polygon;
            })
            var multiPolygon = new OpenLayers.Geometry.MultiPolygon(polygonList);
            // add vision polygon to map
            var visionFeature = new OpenLayers.Feature.Vector(multiPolygon, null, style.yellow);
            visionSimulationLayer.addFeatures([visionFeature]);
            marker.vision_feature = visionFeature;
        }
    }
    
    var vs = new VisionSimulation(worlddata, vision_data_image_path, function () {
        init();
    });
}

module.exports = App;
},{"./worlddata.json":12,"dota-vision-simulation":3,"polybooljs":4}],12:[function(require,module,exports){
module.exports={"worldMinX":-8288,"worldMaxX":8288,"worldMinY":-8288,"worldMaxY":8288}
},{}]},{},[11])(11)
});