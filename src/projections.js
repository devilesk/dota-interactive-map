var ol = require('openlayers');
var conversionFunctions = require('./conversionFunctions');
var mapConstants = require('./mapConstants');

var pixelProj = new ol.proj.Projection({
    code: 'pixel',
    units: 'pixels',
    extent: [0, 0, mapConstants.map_w, mapConstants.map_h]
});

var dotaProj = new ol.proj.Projection({
    code: 'dota',
    extent: [-8288, -8288, 8288, 8288],
    units: 'units'
});

ol.proj.addProjection(pixelProj);
ol.proj.addCoordinateTransforms('pixel', dotaProj, conversionFunctions.latLonToWorld, conversionFunctions.worldToLatLon);

ol.proj.addProjection(dotaProj);
ol.proj.addCoordinateTransforms('dota', pixelProj, conversionFunctions.worldToLatLon, conversionFunctions.latLonToWorld);

module.exports = {
    pixel: pixelProj,
    dota: dotaProj
}