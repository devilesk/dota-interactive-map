import SourceVector from 'ol/source/vector';
import LayerVector from 'ol/layer/vector';
import { latLonToWorld, worldToLatLon, getTileRadius } from './../conversionFunctions';
import getLightUnion from './../getLightUnion';
import styles from './../styleDefinitions';
import MultiPolygon from 'ol/geom/multipolygon';
import Feature from 'ol/feature';

function VisionControl(InteractiveMap) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.vs = InteractiveMap.vs;
    this.source = new SourceVector({
        defaultDataProjection : 'pixel'
    });
    this.layer =  new LayerVector({
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
        var multiPolygon = new MultiPolygon([outlines], 'XY');
        var feature = new Feature({
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
    // create and add vision feature
    visionFeature = this.getVisionFeature(feature, coordinate, radius);
    if (visionFeature) {
        this.source.addFeature(visionFeature);
    }
    feature.set('visionFeature', visionFeature, true);
    return visionFeature;
}


export default VisionControl;