import BaseControl from './base';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import { latLonToWorld, worldToLatLon, getTileRadius } from '../conversion';
import getLightUnion from '../getLightUnion';
import styles from '../definitions/styles';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Feature from 'ol/Feature';
import mapConstants from '../definitions/mapConstants';

class VisionControl extends BaseControl {
    constructor(InteractiveMap) {
        super(InteractiveMap);
        this.source = new SourceVector({});
        this.layer = new LayerVector({
            source: this.source,
            style: styles.visionSimulation,
            zIndex: 120,
        });
        this.visionRadius = mapConstants.visionRadius.observer;
        this.isNight = false;
        this.isDarkness = false;
        
        this.InteractiveMap.on('isNight', value => (this.isNight = value));
        this.InteractiveMap.on('isDarkness', value => (this.isDarkness = value));
        this.InteractiveMap.on('visionRadius', value => (this.visionRadius = value));
        this.InteractiveMap.on('layer.vision', value => this.layer.setVisible(value));
    }

    getVisionFeature(feature, coordinate, radius) {
        // get coordinate from feature if not provided
        let worldCoordinate;
        let dotaProps;
        if (!coordinate) {
            dotaProps = feature.get('dotaProps');
            worldCoordinate = [dotaProps.x, dotaProps.y];
        }
        else {
            worldCoordinate = latLonToWorld(coordinate);
        }

        // get radius from feature if not provided
        radius = radius || this.getFeatureVisionRadius(feature, dotaProps);
        if (radius == null) return;

        const gridXY = this.vs.WorldXYtoGridXY(worldCoordinate[0], worldCoordinate[1]);
        if (this.vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
            this.vs.updateVisibility(gridXY.x, gridXY.y, getTileRadius(radius));

            const outlines = getLightUnion(this.vs.grid, this.vs.lights)
                .map(ring => ring.map((point) => {
                    const worldXY = this.vs.GridXYtoWorldXY(point.x, point.y);
                    return worldToLatLon([worldXY.x, worldXY.y]);
                }));
            const multiPolygon = new MultiPolygon([outlines], 'XY');
            const feature = new Feature({ geometry: multiPolygon });
            feature.set('visionData', {
                area: this.vs.area,
                lightArea: this.vs.lightArea,
            }, false);
            return feature;
        }
    }

    toggleVisionFeature(feature) {
        const visionFeature = feature.get('visionFeature');
        if (visionFeature) {
            this.source.removeFeature(visionFeature);
            feature.set('visionFeature', null);
            return null;
        }

        return this.setVisionFeature(feature);
    }

    removeVisionFeature(feature) {
        const visionFeature = feature.get('visionFeature');
        if (visionFeature) {
            this.source.removeFeature(visionFeature);
            feature.set('visionFeature', null);
        }
    }

    setVisionFeature(feature, coordinate, unitClass) {
        // remove existing visionFeature for feature
        this.removeVisionFeature(feature);

        // determine radius according to unit type
        const radius = this.getFeatureVisionRadius(feature, feature.get('dotaProps'), unitClass);
        // create and add vision feature
        const visionFeature = this.getVisionFeature(feature, coordinate, radius);
        if (visionFeature) {
            this.source.addFeature(visionFeature);
        }
        feature.set('visionFeature', visionFeature, true);
        return visionFeature;
    }

    hasVisionRadius(feature) {
        return this.getFeatureVisionRadius(feature) != null;
    }

    getFeatureVisionRadius(feature, dotaProps, unitClass, rangeType) {
        dotaProps = dotaProps || feature.get('dotaProps');
        unitClass = unitClass || dotaProps.unitClass;
        const unitStats = this.InteractiveMap.statData[unitClass] || {};
        let radius;
        if (unitClass === 'observer') {
            radius = this.visionRadius || mapConstants.visionRadius[unitClass];
            if (this.isDarkness) {
                radius = Math.min(mapConstants.visionRadius.darkness, radius);
            }
        }
        else if (unitClass === 'sentry') {
            radius = mapConstants.visionRadius[unitClass];
        }
        else {
            if (rangeType && !unitStats.hasOwnProperty(rangeType)) return null;

            switch (rangeType) {
            case 'dayVision':
            case 'nightVision':
                radius = unitStats[rangeType];
                if (this.isDarkness) {
                    radius = Math.min(mapConstants.visionRadius.darkness, radius);
                }
            case 'trueSight':
            case 'attackRange':
                radius = unitStats[rangeType];
                break;
            default:
                if (this.isNight) {
                    radius = unitStats.nightVision;
                }
                else {
                    radius = unitStats.dayVision;
                }
                if (this.isDarkness) {
                    radius = Math.min(mapConstants.visionRadius.darkness, radius);
                }
                break;
            }
        }
        return radius;
    }
    
    setMapLayers() {
        this.InteractiveMap.map.addLayer(this.layer);
    }
    
    getMapLayers() {
        return [this.layer];
    }
}

export default VisionControl;
