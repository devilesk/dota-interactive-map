/**
 *  This is a javascript port of https://github.com/initrl/MRPAS-Python
 *  I suspect this code could be a lot shorter & cleaner
 */
    

var Tile = function(){
    this.wall = false;
    this.visible = false;
};

var Map = function(size){
    //size: [x, y]
    this.size = size;
    this.tiles = [];
    for(var x=0;x<this.size[0];x++){
        var row=[];
        for(var y=0;y<this.size[1];y++){
            row.push(new Tile());
        }
        this.tiles.push(row);
    }
};

Map.prototype.get_tile = function(pos){
    if(this.tiles[pos[0]] && this.tiles[pos[0]][pos[1]]){
        return this.tiles[pos[0]][pos[1]];
    }
    return null;
};

Map.prototype.iter = function(callback, context){
  //iterate over all tiles, callbing callback with position & tile
  for(var x=0;x<this.size[0];x++){
      for(var y=0;y<this.size[1];y++){
          callback.apply(context, [[x, y], this.tiles[x][y]]);
      }
  }
};

Map.prototype.reset_visibility = function(){
    //sets all tiles as not visible
    this.iter(function(pos, tile){
           tile.visible = false;   
    });
};

Map.prototype.set_visible = function(pos){
    this.tiles[pos[0]][pos[1]].visible = true;
}

Map.prototype.is_visible = function(pos){
    return this.tiles[pos[0]][pos[1]].visible;
}

Map.prototype.is_transparent = function(pos){
    return !this.tiles[pos[0]][pos[1]].wall;
}

    
function compute_quadrant(map, position, maxRadius, dx, dy){

    var startAngle = new Array();
    startAngle[99]=undefined;
    var endAngle = startAngle.slice(0);
    //octant: vertical edge:
    var iteration = 1;
    var done = false;
    var totalObstacles = 0;
    var obstaclesInLastLine = 0;
    var minAngle = 0.0;
    var x = 0.0;
    var y = position[1] + dy;
    var c;
    var wsize = map.size;
    
    var slopesPerCell, halfSlopes, processedCell, minx, maxx, pos, visible, 
        startSlope, centerSlope, endSlope, idx;
    //do while there are unblocked slopes left and the algo is within
    // the map's boundaries
    //scan progressive lines/columns from the PC outwards
    if( (y < 0) || (y >= wsize[1]))  done = true;
    while(!done){
        //process cells in the line
        slopesPerCell = 1.0 / (iteration + 1);
        halfSlopes = slopesPerCell * 0.5;
        processedCell = parseInt(minAngle / slopesPerCell);
        minx = Math.max(0, position[0] - iteration);
        maxx = Math.min(wsize[0] - 1, position[0] + iteration);
        done = true;
        x = position[0] + (processedCell * dx);
        while((x >= minx) && (x <= maxx)){
            pos = [x, y];
            visible = true;
            startSlope = processedCell * slopesPerCell;
            centreSlope = startSlope + halfSlopes;
            endSlope = startSlope + slopesPerCell;
            if((obstaclesInLastLine > 0) && (!map.is_visible(pos))){
                idx = 0;
                while(visible && (idx < obstaclesInLastLine)){
                    if(map.is_transparent(pos)){
                        if((centreSlope > startAngle[idx]) && (centreSlope < endAngle[idx]))
                            visible = false;
                    }
                    else if ((startSlope >= startAngle[idx]) && (endSlope <= endAngle[idx]))
                            visible = false;
                    if(visible && ( (!map.is_visible([x, y-dy])) ||
                              (!map.is_transparent([x, y-dy])))
                              && ((x - dx >= 0) && (x - dx < wsize[0]) &&
                              ((!map.is_visible([x-dx, y-dy]))
                               || (!map.is_transparent([x-dx, y-dy])))))
                        visible = false;
                    idx += 1;
               }
            }
            if(visible){
                map.set_visible(pos);
                done = false;
                //if the cell is opaque, block the adjacent slopes
                if(!map.is_transparent(pos)){
                    if(minAngle >= startSlope) minAngle = endSlope;
                    else{
                        startAngle[totalObstacles] = startSlope;
                        endAngle[totalObstacles] = endSlope;
                        totalObstacles += 1;
                    }
                }
            }
            processedCell += 1;
            x += dx;
        }
        if(iteration == maxRadius) done = true;
        iteration += 1
        obstaclesInLastLine = totalObstacles;
        y += dy;
        if((y < 0) || (y >= wsize[1])) done = true;
        if(minAngle == 1.0) done = true;
    }
    
    //octant: horizontal edge
    iteration = 1; //iteration of the algo for this octant
    done = false;
    totalObstacles = 0;
    obstaclesInLastLine = 0;
    minAngle = 0.0;
    x = (position[0] + dx); //the outer slope's coordinates (first processed line)
    y = 0;
    //do while there are unblocked slopes left and the algo is within the map's boundaries
    //scan progressive lines/columns from the PC outwards
    if((x < 0) || (x >= wsize[0])) done = true;
    while(!done){
        //process cells in the line
        slopesPerCell = 1.0 / (iteration + 1);
        halfSlopes = slopesPerCell * 0.5;
        processedCell = parseInt(minAngle / slopesPerCell);
        miny = Math.max(0, position[1] - iteration);
        maxy = Math.min(wsize[1] - 1, position[1] + iteration);
        done = true;
        y = position[1] + (processedCell * dy);
        while((y >= miny) && (y <= maxy)){
            //calculate slopes per cell
            pos = [x, y];
            visible = true;
            startSlope = (processedCell * slopesPerCell);
            centreSlope = startSlope + halfSlopes;
            endSlope = startSlope + slopesPerCell;
            if((obstaclesInLastLine > 0) && (!map.is_visible(pos))){
                idx = 0;
                while(visible && (idx < obstaclesInLastLine)){
                    if(map.is_transparent(pos)){
                        if((centreSlope > startAngle[idx]) && (centreSlope < endAngle[idx])) visible = false;
                    }
                    else if((startSlope >= startAngle[idx]) && (endSlope <= endAngle[idx])) visible = false;
                           
                    if(visible && (!map.is_visible([x-dx, y]) ||
                            (!map.is_transparent([x-dx, y]))) &&
                            ((y - dy >= 0) && (y - dy < wsize[1]) &&
                             ((!map.is_visible([x-dx, y-dy])) ||
                              (!map.is_transparent([x-dx, y-dy]))))) visible = false;
                    idx += 1;
               }
            }
            if(visible){
                map.set_visible(pos);
                done = false;
                //if the cell is opaque, block the adjacent slopes
                if(!map.is_transparent(pos)){
                    if(minAngle >= startSlope) minAngle = endSlope;
                    else{
                        startAngle[totalObstacles] = startSlope;
                        endAngle[totalObstacles] = endSlope;
                        totalObstacles += 1;
                    }
                }
            }
            processedCell += 1;
            y += dy;
        }
        if(iteration == maxRadius) done = true;
        iteration += 1;
        obstaclesInLastLine = totalObstacles;
        x += dx;
        if((x < 0) || (x >= wsize[0])) done = true;
        if(minAngle == 1.0) done = true;
    }
}    ;    


function compute(map, position, vision_range){
        map.reset_visibility();
        map.set_visible(position); //player can see himself
        //compute the 4 quadrants of the map
        this.compute_quadrant(map, position, vision_range, 1, 1);
        this.compute_quadrant(map, position, vision_range, 1, -1);
        this.compute_quadrant(map, position, vision_range, -1, 1);
        this.compute_quadrant(map, position, vision_range, -1, -1);
};

if(exports !== undefined){
    exports.compute = compute;
    exports.Map = Map;
    exports.Tile = Tile;
    exports.compute_quadrant = compute_quadrant;       
}