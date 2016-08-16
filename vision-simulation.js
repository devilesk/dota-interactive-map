var CELL = [parseInt(Math.floor(parseInt(document.querySelector("#zoom").value))), parseInt(Math.floor(parseInt(document.querySelector("#zoom").value)))],
    SIZE = [256, 248],
    COLOR_WALL = [40, 40, 40],
    COLOR_FLOOR = [160, 160, 160],
    COLOR_LIGHT = [255, 255, 0],
    COLOR_STUMP = [102, 51, 0],
    COLOR_LIT_STUMP = [167, 173, 47],
    RADIUS = parseInt(Math.floor(parseInt(document.querySelector("#radius").value) / 64)),
    ctx = document.getElementById("canvas").getContext("2d"),
    canvas = document.getElementById("elevation-canvas"),
    elevationCtx = canvas.getContext("2d"),
    walls = {},
    lights = {},
    tree_relations,
    trees,
    tree_blocks = {},
    invalid_blocks = {},
    ent_fow_blocker_nodes,
    ent_fow_blocker_nodes_blocks = {},
    trigger_no_wards_blocks = {},
    tree_elevations = {
        "high2": {},
        "high": {},
        "middle": {},
        "low": {},
        "uber": {}
    },
    elevations,
    elevationImg = new Image();

document.getElementById("zoom").addEventListener("change", function (e){
    CELL = [parseInt(Math.floor(parseInt(document.querySelector("#zoom").value))), parseInt(Math.floor(parseInt(document.querySelector("#zoom").value)))];
    ctx.canvas.width = CELL[0]*SIZE[0];
    ctx.canvas.height = CELL[1]*SIZE[1];
    redraw();
}, false);
document.getElementById("radius").addEventListener("change", function (e){
    RADIUS = parseInt(Math.floor(parseInt(document.getElementById("radius").value) / 64));
}, false);

function getJSON(path, callback) {
    var request = new XMLHttpRequest();
    
    request.open('GET', path, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            callback(data);
        }
        else {
            alert('Error loading page.');
        }
    };
    request.onerror = function () {
        alert('Error loading page.');
    };
    request.send();
    return request;
}

getJSON('vision.json', onVisionDataLoad);
ctx.canvas.width = CELL[0]*SIZE[0];
ctx.canvas.height = CELL[1]*SIZE[1];
ctx.fillStyle = "black";
elevationImg.src = 'elevation.png';
elevationImg.onload = function () {
    canvas.width = elevationImg.width;
    canvas.height = elevationImg.height;
    canvas.getContext('2d').drawImage(elevationImg, 0, 0, elevationImg.width, elevationImg.height);
}

    
function lightPassesCallback(x, y) {
    return (!(x+","+y in walls));
}

function setWalls(obj, index) {
    for (var i =0; i < index.length; i++) {
        obj[index[i][0]+","+index[i][1]] = ['wall', index[i][0], index[i][1], Math.SQRT2 / 2];
    }
}

function toggleTree(x, y) {
    var key = x+","+y;
    
    if (tree_relations[key]) {
        for (var i = 0; i < tree_relations[key].length; i++) {
            if (tree_blocks[tree_relations[key][i]]) {
                delete tree_blocks[tree_relations[key][i]];
            }
            else {
                tree_blocks[tree_relations[key][i]] = 1;
            }
        }
    }
}
    
function onVisionDataLoad(data) {
    tree_relations = data.tree_relations;
    trees = data.trees;
    elevations = data.elevations;
    ent_fow_blocker_nodes = data.ent_fow_blocker_node
    setWalls(tree_blocks, trees);
    setWalls(trigger_no_wards_blocks, data.trigger_no_wards);
    setWalls(ent_fow_blocker_nodes_blocks, data.ent_fow_blocker_node);
    setWalls(invalid_blocks, data.elevations.invalid);
    setWalls(tree_elevations.high, data.tree_elevations.high);
    setWalls(tree_elevations.high2, data.tree_elevations.high2);
    setWalls(tree_elevations.middle, data.tree_elevations.middle);
    setWalls(tree_elevations.low, data.tree_elevations.low);
    setWalls(tree_elevations.uber, data.tree_elevations.uber);
}
    
var toggle = function(x, y, obstacleType, cx, cy, r) {
    var key = x+","+y;
    if (walls[key]) {
        delete walls[key];
    } else {
        walls[key] = [obstacleType, cx, cy, r];
    }
}

function redraw() {
    var t1 = Date.now();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "rgb("+COLOR_FLOOR.join(",")+")";
    ctx.fillRect(0,0, CELL[0]*SIZE[0], CELL[1]*SIZE[1]);
    for (var x=0;x<SIZE[0];x++) {
        for (var y=0;y<SIZE[1];y++) {
            var key = x+","+y,
                light = lights[key],
                c = [];
                
            if (light) {
                c = COLOR_LIGHT;
                if (tree_relations[key] && !tree_blocks[key]) {
                    c = COLOR_LIT_STUMP;
                }
                ctx.fillStyle = "rgb("+c.join(",")+")";
                ctx.fillRect(x*CELL[0], y*CELL[1], CELL[0], CELL[1]);
            }
            else if (!light && tree_relations[key]) {
                c = tree_blocks[key] ? [0,255,0] : COLOR_STUMP;
                ctx.fillStyle = "rgb("+c.join(",")+")";
                ctx.fillRect(x*CELL[0], y*CELL[1], CELL[0], CELL[1]);
            }
            else if (!light && invalid_blocks[key]) {
                c = COLOR_WALL;
                ctx.fillStyle = "rgb("+c.join(",")+")";
                ctx.fillRect(x*CELL[0], y*CELL[1], CELL[0], CELL[1]);
            }
        }
    }
    var t2 = Date.now();
    document.querySelector("#draw").innerHTML = t2-t1;
}
    
var updateVisibility = function(x, y) {
    var elevation = getElevation(x, y),
        elevationBelow = getElevationBelow(elevation),
        key = x+","+y,
        fov = new ROT.FOV.PreciseShadowcasting(lightPassesCallback, {topology:8});

    if (elevation == "invalid" || tree_blocks[key]) {
        console.log('invalid');
        walls = {};
        setWalls(walls, tree_blocks);
        setWalls(walls, ent_fow_blocker_nodes);
        redraw();
        return
    }
    else {
        walls = {};
        setWalls(walls, elevations[elevation]);
        setWalls(walls, ent_fow_blocker_nodes);
        addTreeWalls(walls, elevation);
        if (elevationBelow != 'invalid') addTreeWalls(walls, elevationBelow);
    }
    
    var t1 = Date.now();
    fov.walls = walls;
    lights = {};
    fov.compute(x, y, RADIUS, function(x2, y2, r, vis) {
        var key = x2+","+y2;
        if (vis == 1 && !ent_fow_blocker_nodes_blocks[key] && (!tree_blocks[key] || !tree_elevations[elevation][key]) && (x-x2)*(x-x2) + (y-y2)*(y-y2) < RADIUS * RADIUS) {
            lights[key] = 255;
        }
    });
    var t2 = Date.now();
    document.querySelector("#fov").innerHTML = t2-t1;

    redraw();
}

var getCoords = function(e) {
    var x = e.clientX+document.body.scrollLeft - ctx.canvas.offsetLeft - ctx.canvas.clientLeft;
    var y = e.clientY+document.body.scrollTop - ctx.canvas.offsetTop - ctx.canvas.clientTop
    return [Math.floor(x/CELL[0]), Math.floor(y/CELL[1])];
}    

ctx.canvas.addEventListener("mousemove", function(e) {
    var coords = getCoords(e);
    document.querySelector("#x-coord").innerHTML = coords[0];
    document.querySelector("#y-coord").innerHTML = coords[1];
    updateVisibility(coords[0], coords[1]);
});

ctx.canvas.addEventListener("click", function(e) {
    var coords = getCoords(e);
    var key = coords[0]+","+coords[1];
    if (tree_relations[key]) {
        for (var i = 0; i < tree_relations[key].length; i++) {
            if (tree_blocks[tree_relations[key][i]]) {
                delete tree_blocks[tree_relations[key][i]];
            }
            else {
                tree_blocks[tree_relations[key][i]] = 1;
            }
        }
    }

    updateVisibility(coords[0], coords[1]);
});

var img = $('#elevation')[0];
var canvas = $('#elevation-canvas')[0];
canvas.width = img.width;
canvas.height = img.height;
canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    function getElevation(x, y) {
        var key = x+","+y,
            imgd = elevationCtx.getImageData(x, y, 1, 1),
            pix = imgd.data;
        if (trigger_no_wards_blocks[key]) {
            return "invalid"
        }
        if (pix[0] == 255 && pix[1] == 255 && pix[2] == 255) {
            return "invalid"
        }
        if (pix[0] == 153) {
            return "high"
        }
        if (pix[0] == 102) {
            return "middle"
        }
        if (pix[0] == 51) {
            return "low"
        }
        if (pix[0] == 204) {
            return "high2"
        }
        if (pix[0] == 255) {
            return "uber"
        }
        console.log(x, y, pix);
    }
    
    function getElevationBelow(elevation) {
        if (elevation == "invalid" || elevation == "low") {
            return "invalid"
        }
        if (elevation == "middle") return "low";
        if (elevation == "high") return "middle";
        if (elevation == "high2") return "high";
        if (elevation == "uber") return "high2";
    }
    
    function addTreeWalls(walls, elevation) {
        for (key in tree_elevations[elevation]) {
            if (tree_blocks[key]) {
                skey = key.split(',');
                x = parseFloat(skey[0]);
                y = parseFloat(skey[1]);
                var t = tree_relations[key];
                c = [0,0];
                for (var i = 0; i < t.length; i++) {
                    c[0] += parseFloat(t[i].split(',')[0]);
                    c[1] += parseFloat(t[i].split(',')[1]);
                }
                c = [c[0]/t.length, c[1]/t.length];
                walls[key] = ['tree', c[0], c[1], Math.SQRT2];
                walls[c[0]+","+c[1]] = ['tree', c[0], c[1], Math.SQRT2];
            }
        }
    }