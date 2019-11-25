import BaseInfoControl from './baseInfo';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import styles from '../definitions/styles';
import mapConstants from '../definitions/mapConstants';
import { getScaledRadius, latLonToWorld, worldToLatLon } from '../conversion';
import { setQueryString, getParameterByName } from '../util/queryString';
import Circle from 'ol/geom/Circle';

class WardControl extends BaseInfoControl {
    constructor(InteractiveMap, element, throttleTime) {
        super(InteractiveMap, element);
        this.throttleTime = throttleTime || 0;
        this.source = new SourceVector({});
        this.layer = new LayerVector({
            title: 'Ward',
            source: this.source,
            zIndex: 130,
        });
        this.layerFilter = layer => layer === this.layer;
        
        this.wardType = 'observer';

        this.placedWardCoordinates = {
            observer: {},
            sentry: {},
        };
        
        this.cursorSource = new SourceVector({});
        this.cursorLayer = new LayerVector({
            source: this.cursorSource,
            style: styles.cursor,
            zIndex: 110,
        });

        this.wardRangeSource = new SourceVector({});
        this.wardRangeLayer = new LayerVector({
            source: this.wardRangeSource,
            zIndex: 160,
        });
        
        this.rangeSources = {
            dayVision: new SourceVector({}),
            nightVision: new SourceVector({}),
            trueSight: new SourceVector({}),
            attackRange: new SourceVector({}),
        };
        this.rangeLayers = {
            dayVision: new LayerVector({
                source: this.rangeSources.dayVision,
                style: styles.dayVision,
                zIndex: 170,
            }),
            nightVision: new LayerVector({
                source: this.rangeSources.nightVision,
                style: styles.nightVision,
                zIndex: 180,
            }),
            trueSight: new LayerVector({
                source: this.rangeSources.trueSight,
                style: styles.trueSight,
                zIndex: 190,
            }),
            attackRange: new LayerVector({
                source: this.rangeSources.attackRange,
                style: styles.attackRange,
                zIndex: 200,
            }),
        };

        this.lastPointerMoveTime = Date.now();
        
        this.InteractiveMap.on('wardType', value => (this.wardType = value));
        this.InteractiveMap.on('version', () => this.reset());
        this.InteractiveMap.on('dayVision', value => this.rangeLayers.dayVision.setVisible(value));
        this.InteractiveMap.on('nightVision', value => this.rangeLayers.nightVision.setVisible(value));
        this.InteractiveMap.on('trueSight', value => this.rangeLayers.trueSight.setVisible(value));
        this.InteractiveMap.on('attackRange', value => this.rangeLayers.attackRange.setVisible(value));
        this.InteractiveMap.on('mode', (value) => {
            if (value === 'ward' || value === 'observer' || value === 'sentry') {
                this.activate();
            }
            else {
                this.deactivate();
            }
        });
        
        this.InteractiveMap.on('layer.ward', value => {
            this.wardRangeLayer.setVisible(value);
            this.layer.setVisible(value);
        });
    }

    get features() {
        return this.source.getFeatures();
    }

    onMapClick(feature, featureType, evt) {
        if (!feature) {
            this.addWard(evt.coordinate, this.wardType);
        }
    }

    onMapHover(feature, featureType, evt) {
        if (!feature) {
            // vision cursor
            if (Date.now() - this.lastPointerMoveTime < this.throttleTime) {
                return;
            }
            this.lastPointerMoveTime = Date.now();
            const hoverFeature = this.InteractiveMap.controls.vision.getVisionFeature(null, evt.coordinate, this.InteractiveMap.controls.vision.visionRadius);
            this.cursorSource.clear(true);
            if (hoverFeature) {
                this.cursorSource.addFeature(hoverFeature);
                this.showVisibilityInfo();
            }
            else {
                this.clear();
            }
        }
    }

    onFeatureSelect(feature, featureType, evt) {
        if (featureType === 'ward') {
            this.removeWard(feature);
            this.InteractiveMap.deselect(feature);
        }
        else if (this.InteractiveMap.controls.vision.hasVisionRadius(feature)) {
            this.showVisibilityInfo();
        }
    }

    onFeatureDeselect(feature, featureType, evt) {
        if (featureType !== 'ward') {
            this.clear();
            this.InteractiveMap.controls.vision.removeVisionFeature(feature);
            this.removeRangeCircles(feature);
        }
    }

    onFeatureHighlight(feature, featureType, evt) {
        if (featureType !== 'ward') {
            this.highlight(feature);
        }
    }

    onFeatureUnhighlight(feature, featureType, evt) {
        if (featureType !== 'ward' && !feature.get('clicked')) {
            this.InteractiveMap.controls.vision.removeVisionFeature(feature);
            this.removeRangeCircles(feature);
        }
    }

    toggleAll(layer, state) {
        if (state) {
            this.showAll(layer);
        }
        else {
            this.hideAll(layer);
        }
    }

    showAll(layer) {
        const source = layer.getSource();
        const features = source.getFeatures();
        features.forEach((feature) => {
            this.InteractiveMap.select(feature);
            this.highlight(feature);
        });
    }

    hideAll(layer) {
        const source = layer.getSource();
        const features = source.getFeatures();
        features.forEach((feature) => {
            this.InteractiveMap.deselect(feature);
            this.unhighlight(feature);
        });
    }

    showVisibilityInfo(feature, bClicked) {
        const visionFeature = feature ? feature.get('visionFeature') : null;
        let lightArea = this.vs.lightArea;
        let area = this.vs.area;
        if (feature) {
            const visionData = visionFeature ? visionFeature.get('visionData') : null;
            if (visionData) {
                lightArea = visionData.lightArea;
                area = visionData.area;
                this.display(lightArea ? `Visibility: ${(lightArea / area * 100).toFixed()}% ${lightArea}/${area}` : '', bClicked);
            }
            else {
                this.clear();
            }
        }
        else {
            this.display(lightArea ? `Visibility: ${(lightArea / area * 100).toFixed()}% ${lightArea}/${area}` : '', bClicked);
        }
    }

    parseQueryString() {
        ['observer', 'sentry'].forEach((wardType) => {
            let values = getParameterByName(wardType);
            if (values) {
                values = values.split(';');
                values.forEach((worldXY) => {
                    worldXY = worldXY.split(',');
                    if (worldXY.length === 2) {
                        worldXY = worldXY.map(parseFloat);
                        if (!worldXY.some(isNaN)) {
                            const coordinate = worldToLatLon(worldXY);
                            this.addWard(coordinate, wardType, true);
                        }
                    }
                });
            }
            this.updateQueryString(wardType);
        });
    }

    updateQueryString(wardType) {
        const values = Object.keys(this.placedWardCoordinates[wardType]).join(';');
        setQueryString(wardType, values || null);
    }

    getRangeCircle(feature, coordinate, unitClass, rangeType, radius) {
        const dotaProps = feature.get('dotaProps');
        radius = radius || this.InteractiveMap.controls.vision.getFeatureVisionRadius(feature, dotaProps, unitClass, rangeType);
        if (radius == null) return null;
        if (!coordinate) {
            coordinate = worldToLatLon([dotaProps.x, dotaProps.y]);
        }
        const circle = new Feature(new Circle(coordinate, getScaledRadius(radius)));
        return circle;
    }

    addWard(coordinate, wardType, bSkipQueryStringUpdate) {
        if (coordinate[0] < 0 || coordinate[0] > mapConstants.map_w || coordinate[1] < 0 || coordinate[1] > mapConstants.map_h) return;
        const geom = new Point(coordinate);
        const feature = new Feature(geom);
        feature.set('wardType', wardType, true);
        feature.setStyle(styles[wardType].normal);
        this.source.addFeature(feature);
        if (wardType === 'observer') {
            if (this.InteractiveMap.controls.vision.setVisionFeature(feature, coordinate, wardType)) {
                this.showVisibilityInfo();
            }
        }

        const circle = this.getRangeCircle(feature, coordinate, wardType);
        if (circle) {
            circle.setStyle(wardType === 'observer' ? styles.dayVision : styles.trueSight);
            feature.set('wardRange', circle, true);
            this.wardRangeSource.addFeature(circle);
        }
        const worldXY = latLonToWorld(coordinate).map(Math.round).join(',');
        this.placedWardCoordinates[wardType][worldXY] = true;
        if (!bSkipQueryStringUpdate) this.updateQueryString(wardType);
    }

    updateAllWardVision() {
        this.source.forEachFeature((f) => {
            const wardType = f.get('wardType');
            const coordinate = f.getGeometry().getCoordinates();
            this.InteractiveMap.controls.vision.setVisionFeature(f, coordinate, wardType);
        });
    }

    clearWards() {
        this.features.forEach(feature => this.removeWard(feature, true));
        this.updateQueryString('observer');
        this.updateQueryString('sentry');
    }

    removeWard(feature, bSkipQueryStringUpdate) {
        const wardRange = feature.get('wardRange');
        if (wardRange) {
            // loop to check that feature exists before trying to remove
            this.wardRangeSource.forEachFeature((f) => {
                if (f === wardRange) this.wardRangeSource.removeFeature(f);
            });
        }
        // loop to check that feature exists before trying to remove
        this.source.forEachFeature((f) => {
            if (f === feature) {
                this.source.removeFeature(f);
            }
        });
        this.InteractiveMap.controls.vision.removeVisionFeature(feature);

        const worldXY = latLonToWorld(feature.getGeometry().getCoordinates()).map(Math.round).join(',');
        const wardType = feature.get('wardType');
        delete this.placedWardCoordinates[wardType][worldXY];
        if (!bSkipQueryStringUpdate) this.updateQueryString(wardType);
    }

    highlight(feature) {
        this.cursorSource.clear(true);
        this.unhighlight();
        const visionFeature = this.InteractiveMap.controls.vision.setVisionFeature(feature);
        this.addRangeCircles(feature);
        this.InteractiveMap.highlight(feature);
        return visionFeature;
    }

    unhighlight(feature) {
        const highlightedFeature = feature || this.InteractiveMap.highlightedFeature;
        if (highlightedFeature && !highlightedFeature.get("clicked")) {
            this.InteractiveMap.controls.vision.removeVisionFeature(highlightedFeature);
            this.removeRangeCircles(highlightedFeature);
        }
        this.InteractiveMap.unhighlight();
    }

    addRangeCircles(feature) {
        this.addRangeCircle(feature, 'dayVision');
        this.addRangeCircle(feature, 'nightVision');
        this.addRangeCircle(feature, 'trueSight');
        this.addRangeCircle(feature, 'attackRange');
    }

    removeRangeCircles(feature) {
        this.removeRangeCircle(feature, 'dayVision');
        this.removeRangeCircle(feature, 'nightVision');
        this.removeRangeCircle(feature, 'trueSight');
        this.removeRangeCircle(feature, 'attackRange');
    }

    addRangeCircle(feature, rangeType) {
        if (!feature.get(rangeType)) {
            const circle = this.getRangeCircle(feature, null, null, rangeType);
            if (circle) {
                feature.set(rangeType, circle, true);
                this.rangeSources[rangeType].addFeature(circle);
            }
        }
    }

    removeRangeCircle(feature, rangeType) {
        const circle = feature.get(rangeType);
        if (circle) {
            feature.set(rangeType, null, true);
            this.rangeSources[rangeType].removeFeature(circle);
        }
    }
    
    deactivate() {
        super.deactivate();
        this.InteractiveMap.unhighlightWard();
        this.cursorSource.clear(true);
    }
    
    reset() {
        this.clearWards();
        this.parseQueryString();
    }
    
    setMapLayers() {
        this.InteractiveMap.map.addLayer(this.layer);
        this.InteractiveMap.map.addLayer(this.cursorLayer);
        this.InteractiveMap.map.addLayer(this.wardRangeLayer);
        this.InteractiveMap.map.addLayer(this.rangeLayers.dayVision);
        this.InteractiveMap.map.addLayer(this.rangeLayers.nightVision);
        this.InteractiveMap.map.addLayer(this.rangeLayers.trueSight);
        this.InteractiveMap.map.addLayer(this.rangeLayers.attackRange);
    }
    
    getMapLayers() {
        return [
            this.layer,
            this.cursorLayer,
            this.wardRangeLayer,
            this.rangeLayers.dayVision,
            this.rangeLayers.nightVision,
            this.rangeLayers.trueSight,
            this.rangeLayers.attackRange,
        ];
    }
}

export default WardControl;
