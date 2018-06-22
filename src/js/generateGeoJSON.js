var VisionSimulation = require("dota-vision-simulation");
var worlddata = require("dota-vision-simulation/src/worlddata.json");
var union = require("@turf/union");
import { worldToLatLon } from "./conversion";
import fs from 'fs';

var vs = new VisionSimulation(worlddata, "www/img/map_data_715.png", onReady);

function onReady() {
    var t1 = Date.now();
    generateGeoJSON(vs, [vs.gridnav, vs.tools_no_wards], 'no_wards.json');
    console.log('no_wards.json', Date.now() - t1 + 'ms');
    t1 = Date.now();
    generateGeoJSON(vs, [vs.ent_fow_blocker_node], 'ent_fow_blocker_node.json');
    console.log('ent_fow_blocker_node.json', Date.now() - t1 + 'ms');
}

function generateGeoJSON(vs, grids, dst) {
    var result = null;
    grids.forEach(function (data, index) {
        var total = Object.keys(data).length;
        var count = 0;
        for (var i in data) {
            var pt = vs.key2pt(i);
            var worldXY = vs.GridXYtoWorldXY(pt.x, pt.y)
            var poly = {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [worldXY.x - 32, worldXY.y - 32],
                        [worldXY.x - 32, worldXY.y + 32],
                        [worldXY.x + 32, worldXY.y + 32],
                        [worldXY.x + 32, worldXY.y - 32],
                        [worldXY.x - 32, worldXY.y - 32]
                    ]]
                }
            }
            if (result == null) {
                result = poly
            }
            else {
                result = union(result, poly);
            }
            if (count % 200 === 0) {
                console.log('grids', index, '/', grids.length, ', points', count, '/', total);
            }
            count++;
        }        
    });
    //transformData(result);
    
    fs.writeFile(dst, JSON.stringify(result), function (err) {});
}

function transformData(data) {
    for (var i = 0; i < data.geometry.coordinates.length; i++) {
        var polygons = data.geometry.coordinates[i];
        for (var j = 0; j < polygons.length; j++) {
            var polygon = polygons[j];
            for (var k = 0; k < polygon.length; k++) {
                var point = polygon[k];
                var latlon = worldToLatLon(point[0], point[1]);
                point[0] = Math.round(latlon.x);
                point[1] = Math.round(latlon.y);
            }
        }
    }
}