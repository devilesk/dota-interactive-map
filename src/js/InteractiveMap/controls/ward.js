import BaseInfoControl from './baseInfo';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import styles from '../definitions/styles';
import mapConstants from '../definitions/mapConstants';
import { latLonToWorld, worldToLatLon } from '../conversion';
import { setQueryString, getParameterByName } from '../util/queryString';

class WardControl extends BaseInfoControl {
    constructor(InteractiveMap, element, throttleTime) {
        super(InteractiveMap, element);
        this.throttleTime = throttleTime;
        this.source = new SourceVector({});
        this.layer = new LayerVector({
            title: 'Ward',
            source: this.source,
        });
        this.layerFilter = layer => layer === this.layer;

        this.placedWardCoordinates = {
            observer: {},
            sentry: {},
        };

        this.lastPointerMoveTime = Date.now();
    }

    get features() {
        return this.source.getFeatures();
    }

    onMapClick(feature, featureType, evt) {
        if (!feature) {
            this.addWard(evt.coordinate, this.InteractiveMap.mode);
        }
    }

    onMapHover(feature, featureType, evt) {
        if (!feature) {
            // vision cursor
            if (Date.now() - this.lastPointerMoveTime < this.throttleTime) {
                return;
            }
            this.lastPointerMoveTime = Date.now();
            const hoverFeature = this.InteractiveMap.controls.vision.getVisionFeature(null, evt.coordinate, this.InteractiveMap.visionRadius);
            if (hoverFeature) {
                this.InteractiveMap.controls.cursor.source.clear(true);
                this.InteractiveMap.controls.cursor.source.addFeature(hoverFeature);
                this.showVisibilityInfo();
            }
        }
    }

    onFeatureSelect(feature, featureType, evt) {
        if (featureType === 'ward') {
            this.removeWard(feature);
            this.InteractiveMap.deselect(feature);
        }
        else if (this.InteractiveMap.hasVisionRadius(feature)) {
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
        console.log('onFeatureUnhighlight', feature, featureType, featureType !== 'ward');
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
        this.features.forEach((feature) => {
            this.InteractiveMap.select(feature);
            this.highlight(feature);
        });
    }

    hideAll(layer) {
        this.features.forEach((feature) => {
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

        const circle = this.InteractiveMap.getRangeCircle(feature, coordinate, wardType);
        if (circle) {
            circle.setStyle(wardType === 'observer' ? styles.dayVision : styles.trueSight);
            feature.set('wardRange', circle, true);
            this.InteractiveMap.wardRangeSource.addFeature(circle);
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
            this.InteractiveMap.wardRangeSource.forEachFeature((f) => {
                if (f === wardRange) this.InteractiveMap.wardRangeSource.removeFeature(f);
            });
        }
        // loop to check that feature exists before trying to remove
        this.source.forEachFeature((f) => {
            if (f === feature) {
                this.source.removeFeature(f);
                console.log('removed feature');
            }
        });
        this.InteractiveMap.controls.vision.removeVisionFeature(feature);

        const worldXY = latLonToWorld(feature.getGeometry().getCoordinates()).map(Math.round).join(',');
        const wardType = feature.get('wardType');
        delete this.placedWardCoordinates[wardType][worldXY];
        if (!bSkipQueryStringUpdate) this.updateQueryString(wardType);
    }

    highlight(feature) {
        this.InteractiveMap.controls.cursor.source.clear(true);
        this.unhighlight();
        const visionFeature = this.InteractiveMap.controls.vision.setVisionFeature(feature);
        this.addRangeCircles(feature);
        this.InteractiveMap.highlight(feature);
        return visionFeature;
    }

    unhighlight(feature) {
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
            const circle = this.InteractiveMap.getRangeCircle(feature, null, null, rangeType);
            if (circle) {
                feature.set(rangeType, circle, true);
                this.InteractiveMap.rangeSources[rangeType].addFeature(circle);
            }
        }
    }

    removeRangeCircle(feature, rangeType) {
        const circle = feature.get(rangeType);
        if (circle) {
            feature.set(rangeType, null, true);
            this.InteractiveMap.rangeSources[rangeType].removeFeature(circle);
        }
    }
}

export default WardControl;
