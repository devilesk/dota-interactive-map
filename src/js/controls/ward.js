import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { unByKey } from 'ol/Observable';
import styles from '../styleDefinitions';
import mapConstants from '../mapConstants';
import { latLonToWorld, worldToLatLon } from '../conversion';
import { setQueryString, getParameterByName } from '../util/queryString';

class WardControl {
    constructor(InteractiveMap, throttleTime) {
        this.InteractiveMap = InteractiveMap;
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
        this.pointerMoveListener = null;
        this.clickListener = null;
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
        const info = this.InteractiveMap.controls.info;
        const vs = this.InteractiveMap.vs;
        let lightArea = vs.lightArea;
        let area = vs.area;
        if (feature) {
            const visionData = visionFeature ? visionFeature.get('visionData') : null;
            if (visionData) {
                lightArea = visionData.lightArea;
                area = visionData.area;
                info.setContent(lightArea ? `Visibility: ${(lightArea / area * 100).toFixed()}% ${lightArea}/${area}` : '');
                info.open(bClicked);
            }
            else {
                this.clearInfo();
            }
        }
        else {
            info.setContent(lightArea ? `Visibility: ${(lightArea / area * 100).toFixed()}% ${lightArea}/${area}` : '');
            info.open(bClicked);
        }
    }

    clearInfo(bOverrideActive) {
        this.InteractiveMap.controls.info.setContent('');
        this.InteractiveMap.controls.info.close(bOverrideActive);
    }

    activate() {
        if (!this.pointerMoveListener) {
            this.pointerMoveListener = this.InteractiveMap.map.on('pointermove', (evt) => {
                if (evt.dragging) {
                    return;
                }

                const pixel = this.InteractiveMap.map.getEventPixel(evt.originalEvent);

                // if mouse over a building feature, show info and highlight
                let bBuildingHover = false;
                let feature = this.InteractiveMap.map.forEachFeatureAtPixel(pixel, feature => feature, { layerFilter: this.InteractiveMap.layerFilters.marker });
                if (feature) {
                    bBuildingHover = this.highlight(feature);

                    if (bBuildingHover) {
                        this.showVisibilityInfo();
                    }
                }
                else {
                    // if mouse over a ward feature, highlight
                    feature = this.InteractiveMap.checkAndHighlightWard(pixel);

                    // no highlighted feature so unhighlight current feature
                    if (!feature) {
                        this.unhighlight();
                    }
                    else {
                        this.showVisibilityInfo();
                    }
                }

                // vision cursor
                if (Date.now() - this.lastPointerMoveTime < this.throttleTime) {
                    return;
                }
                this.lastPointerMoveTime = Date.now();
                let hoverFeature;
                if (bBuildingHover) {
                    if (!feature.get('visionFeature')) {
                        hoverFeature = this.InteractiveMap.controls.vision.getVisionFeature(feature);
                    }
                    else {
                        this.InteractiveMap.controls.cursor.source.clear(true);
                    }
                }
                else {
                    hoverFeature = this.InteractiveMap.controls.vision.getVisionFeature(null, evt.coordinate, this.InteractiveMap.visionRadius);
                }
                if (hoverFeature) {
                    this.InteractiveMap.controls.cursor.source.clear(true);
                    this.InteractiveMap.controls.cursor.source.addFeature(hoverFeature);

                    if (!bBuildingHover) {
                        this.showVisibilityInfo();
                    }
                }
                else if (!bBuildingHover) {
                    this.clearInfo();
                }
            });
        }
        if (!this.clickListener) {
            this.clickListener = this.InteractiveMap.map.on('click', (evt) => {
                this.unhighlight();
                let feature = this.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, feature => feature, { layerFilter: this.InteractiveMap.layerFilters.marker });
                if (feature && this.InteractiveMap.hasVisionRadius(feature)) {
                    this.InteractiveMap.toggle(feature);
                    if (this.InteractiveMap.controls.vision.toggleVisionFeature(feature)) {
                        this.showVisibilityInfo();
                    }
                    else {
                        this.clearInfo();
                    }
                    this.InteractiveMap.controls.cursor.source.clear(true);
                }
                else {
                    feature = this.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, feature => feature, { layerFilter: this.layerFilter });
                    if (feature) {
                        this.removeWard(feature);
                        this.clearInfo(true);
                    }
                    else {
                        this.addWard(evt.coordinate, this.InteractiveMap.mode);
                        this.InteractiveMap.controls.cursor.source.clear(true);
                    }
                }
            });
        }
    }

    deactivate() {
        this.InteractiveMap.unhighlightWard();
        this.InteractiveMap.controls.cursor.source.clear(true);
        unByKey(this.pointerMoveListener);
        this.pointerMoveListener = null;
        unByKey(this.clickListener);
        this.clickListener = null;
    }

    parseQueryString() {
        ['observer', 'sentry'].forEach((wardType) => {
            let values = getParameterByName(wardType);
            if (values) {
                values = values.split(';');
                values.forEach((worldXY) => {
                    worldXY = worldXY.split(',');
                    if (worldXY.length == 2) {
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
        if (wardType == 'observer') {
            if (this.InteractiveMap.controls.vision.setVisionFeature(feature, coordinate, wardType)) {
                this.showVisibilityInfo();
            }
        }

        const circle = this.InteractiveMap.getRangeCircle(feature, coordinate, wardType);
        if (circle) {
            circle.setStyle(wardType == 'observer' ? styles.dayVision : styles.trueSight);
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
        const features = this.source.getFeatures();
        features.forEach(feature => this.removeWard(feature, true));
        this.updateQueryString('observer');
        this.updateQueryString('sentry');
    }

    removeWard(feature, bSkipQueryStringUpdate) {
        const wardRange = feature.get('wardRange');
        if (wardRange) {
            // loop to check that feature exists before trying to remove
            this.InteractiveMap.wardRangeSource.forEachFeature((f) => {
                if (f == wardRange) this.InteractiveMap.wardRangeSource.removeFeature(f);
            });
        }
        // loop to check that feature exists before trying to remove
        this.source.forEachFeature((f) => {
            if (f == feature) this.source.removeFeature(f);
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
        const highlightedFeature = feature || this.InteractiveMap.highlightedFeature;
        if (highlightedFeature && !highlightedFeature.get('clicked')) {
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
