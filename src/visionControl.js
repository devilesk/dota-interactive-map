var ol = require('openlayers');
var latLonToWorld = require('./conversionFunctions').latLonToWorld;
var worldToLatLon = require('./conversionFunctions').worldToLatLon;
var getTileRadius = require('./conversionFunctions').getTileRadius;
var getLightUnion = require('./getLightUnion');

function visionPointerHandler(throttleTime, InteractiveMap, visionSource) {
    var lastPointerMoveTime = Date.now();
    var vs = InteractiveMap.vs;
    return function(evt) {
        if (Date.now() - lastPointerMoveTime < throttleTime) {
            return;
        }
        lastPointerMoveTime = Date.now();
        var feature = getVisionFeature(evt.coordinate, vs, InteractiveMap.visionRadius);
        if (feature) {
            visionSource.clear(true);
            visionSource.addFeature(feature);
        }
    }
}

function getVisionFeature(coordinate, vs, radius) {
    var worldCoordinate = latLonToWorld(coordinate);
    var gridXY = vs.WorldXYtoGridXY(worldCoordinate[0], worldCoordinate[1]);

    if (vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
        vs.updateVisibility(gridXY.x, gridXY.y, getTileRadius(radius));
        
        var outlines = getLightUnion(vs.grid, vs.lights).map(function (ring) {
            return ring.map(function (point) {
                var worldXY = vs.GridXYtoWorldXY(point.x, point.y);
                return worldToLatLon([worldXY.x, worldXY.y]);
            })
        });
        var multiPolygon = new ol.geom.MultiPolygon([outlines], 'XY');
        var feature = new ol.Feature({
            geometry: multiPolygon
        });
        return feature;
    }
}

module.exports = {
    visionPointerHandler: visionPointerHandler,
    getVisionFeature: getVisionFeature
};