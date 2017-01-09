var ol = require('openlayers');
var latLonToWorld = require('./../conversionFunctions').latLonToWorld;
var worldToLatLon = require('./../conversionFunctions').worldToLatLon;
var getTileRadius = require('./../conversionFunctions').getTileRadius;
var getLightUnion = require('./../getLightUnion');
var styles = require('./../styleDefinitions');

function VisionControl(InteractiveMap) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.vs = InteractiveMap.vs;
    this.source = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    this.layer =  new ol.layer.Vector({
        source: this.source,
        style: styles.visionSimulation
    });
}

VisionControl.prototype.getVisionFeature = function (feature, coordinate, radius) {
    var vs = this.vs;

    // get coordinate from feature if not provided
    var worldCoordinate;
    if (!coordinate) {
        var dotaProps = feature.get('dotaProps');
        worldCoordinate = [dotaProps.x, dotaProps.y];
    }
    else {
        worldCoordinate = latLonToWorld(coordinate);
    }
    
    // get radius from feature if not provided
    radius = radius || this.InteractiveMap.getFeatureVisionRadius(feature, dotaProps)
    console.log('getVisionFeature', radius);
    if (radius == null) return;
    
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
        feature.set('visionData', {
            area: vs.area,
            lightArea: vs.lightArea
        }, false);
        return feature;
    }
}

VisionControl.prototype.toggleVisionFeature = function (feature) {
    var visionFeature = feature.get('visionFeature');
    if (visionFeature) {
        this.source.removeFeature(visionFeature);
        feature.set('visionFeature', null);
        return null;
    }
    else {
        return this.setVisionFeature(feature);
    }
}

VisionControl.prototype.removeVisionFeature = function (feature) {
    var visionFeature = feature.get('visionFeature');
    if (visionFeature) {
        this.source.removeFeature(visionFeature);
        feature.set('visionFeature', null);
    }
}

VisionControl.prototype.setVisionFeature = function (feature, coordinate, unitClass) {
    // remove existing visionFeature for feature
    this.removeVisionFeature(feature);
    
    // determine radius according to unit type
    var radius = this.InteractiveMap.getFeatureVisionRadius(feature, feature.get('dotaProps'), unitClass);
    console.log('setVisionFeature', unitClass, radius);
    // create and add vision feature
    visionFeature = this.getVisionFeature(feature, coordinate, radius);
    if (visionFeature) {
        this.source.addFeature(visionFeature);
    }
    feature.set('visionFeature', visionFeature, true);
    return visionFeature;
}


module.exports = VisionControl;