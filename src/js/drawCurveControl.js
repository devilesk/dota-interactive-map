var ol = require('openlayers');
var latLonToWorld = require('./conversionFunctions').latLonToWorld;
var worldToLatLon = require('./conversionFunctions').worldToLatLon;
var getTileRadius = require('./conversionFunctions').getTileRadius;
var getLightUnion = require('./getLightUnion');
var styles = require('./styleDefinitions');
var bezier = require("@turf/bezier");

function DrawCurveControl(InteractiveMap) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    map = InteractiveMap.map;
    this.vs = InteractiveMap.vs;
    this.source = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    this.layer =  new ol.layer.Vector({
        source: this.source,
        style: styles.visionSimulation
    });
    map.addLayer(this.layer);
    var format = new ol.format.GeoJSON();
    var sketch;
    geometryFunction = function(coordinates, geometry) {
        if (!geometry) {
            geometry = new ol.geom.LineString(null);
        }

        var line = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": coordinates
            }
        };
        var curved = bezier(line);
        geometry.setCoordinates(curved["geometry"]["coordinates"]);
        sketch = geometry.simplify(10);
        //console.log(format.writeFeatureObject(geometry));
        return sketch;
    };

    draw = new ol.interaction.Draw({
        source: this.source,
        type: 'LineString',
        geometryFunction: geometryFunction
    });
    var self;
    draw.on('drawend',
        function() {
            console.log('drawend', sketch);
            var feature = new ol.Feature({geometry: sketch});
            console.log(JSON.stringify(format.writeFeatureObject(feature)));
            self.InteractiveMap.wardRangeSource.addFeature(feature);
            sketch = null;
            
        }, self);
    map.addInteraction(draw);
}

module.exports = DrawCurveControl;