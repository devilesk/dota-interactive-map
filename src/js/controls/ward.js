import SourceVector from 'ol/source/vector';
import LayerVector from 'ol/layer/vector';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import Observable from 'ol/observable';
import styles from './../styleDefinitions';
import mapConstants from './../mapConstants';
import { latLonToWorld, worldToLatLon } from './../conversion';
import { setQueryString, getParameterByName } from './../util/queryString';

function WardControl(InteractiveMap, throttleTime) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.source = new SourceVector({
        defaultDataProjection : 'pixel'
    });
    this.layer =  new LayerVector({
        source: this.source
    });
    this.layerFilter = function(layer) {
        return layer === self.layer;
    }
    
    this.placedWardCoordinates = {
        observer: {},
        sentry: {}
    };
    
    this.lastPointerMoveTime = Date.now();
    this.pointerMoveHandler = function(evt) {
        if (evt.dragging) {
            return;
        }
        
        var pixel = self.InteractiveMap.map.getEventPixel(evt.originalEvent);
        
        // if mouse over a building feature, show info and highlight
        var bBuildingHover = false;
        var feature = self.InteractiveMap.map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
        }, {
            layerFilter: self.InteractiveMap.layerFilters.marker
        });
        if (feature) {
            bBuildingHover = self.highlight(feature);
            
            if (bBuildingHover) {
                self.showVisibilityInfo();
            }
        }
        else {
            // if mouse over a ward feature, highlight
            var feature = InteractiveMap.checkAndHighlightWard(pixel);

            // no highlighted feature so unhighlight current feature
            if (!feature) {
                self.unhighlight();
            }
            else {
                self.showVisibilityInfo();
            }
        }
        
        // vision cursor
        if (Date.now() - self.lastPointerMoveTime < throttleTime) {
            return;
        }
        self.lastPointerMoveTime = Date.now();
        if (bBuildingHover) {
            if (!feature.get('visionFeature')) {
                var hoverFeature = self.InteractiveMap.visionControl.getVisionFeature(feature);
            }
            else {
                self.InteractiveMap.cursorControl.source.clear(true);
            }
        }
        else {
            var hoverFeature = self.InteractiveMap.visionControl.getVisionFeature(null, evt.coordinate, self.InteractiveMap.visionRadius);
        }
        if (hoverFeature) {
            self.InteractiveMap.cursorControl.source.clear(true);
            self.InteractiveMap.cursorControl.source.addFeature(hoverFeature);
            
            if (!bBuildingHover) {
                self.showVisibilityInfo();
            }
        }
        else if (!bBuildingHover) {
            self.clearInfo();
        }
    }
    this.pointerMoveListener = null;
    
    this.clickHandler = function (evt) {
        self.unhighlight();
        var feature = self.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return feature;
        }, {
            layerFilter: self.InteractiveMap.layerFilters.marker
        });
        if (feature && self.InteractiveMap.hasVisionRadius(feature)) {
            self.InteractiveMap.toggle(feature);
            if (self.InteractiveMap.visionControl.toggleVisionFeature(feature)) {
                self.showVisibilityInfo();
            }
            else {
                self.clearInfo();
            }
            self.InteractiveMap.cursorControl.source.clear(true);
        }
        else {
            feature = self.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                return feature;
            }, {
                layerFilter: self.layerFilter
            });
            if (feature) {
                self.removeWard(feature);
                self.clearInfo(true);
            }
            else {
                self.addWard(evt.coordinate, self.InteractiveMap.MODE);
                self.InteractiveMap.cursorControl.source.clear(true);
            }
        }
    }
    this.clickListener = null;
}

WardControl.prototype.toggleAll = function (layer, state) {
    if (state) {
        this.showAll(layer);
    }
    else {
        this.hideAll(layer);
    }
}

WardControl.prototype.showAll = function (layer) {
    var self = this;
    var source = layer.getSource();
    var features = source.getFeatures();
    features.forEach(function (feature) {
        self.InteractiveMap.select(feature);
        self.highlight(feature);
    });
}

WardControl.prototype.hideAll = function (layer) {
    var self = this;
    var source = layer.getSource();
    var features = source.getFeatures();
    features.forEach(function (feature) {
        self.InteractiveMap.deselect(feature);
        self.unhighlight(feature);
    });
}

WardControl.prototype.showVisibilityInfo = function (visionFeature, bClicked) {
    var info = this.InteractiveMap.infoControl;
    var vs = this.InteractiveMap.vs;
    var lightArea = vs.lightArea;
    var area = vs.area;
    if (visionFeature) {
        var visionData = visionFeature.get('visionData');
        if (visionData) {
            lightArea = visionData.lightArea;
            area = visionData.area;
            info.setContent("Visibility: " + (lightArea / area * 100).toFixed() + '% ' + lightArea + "/" + area);
            info.open(bClicked);
        }
    }
    else {
        info.setContent("Visibility: " + (lightArea / area * 100).toFixed() + '% ' + lightArea + "/" + area);
        info.open(bClicked);
    }
}

WardControl.prototype.clearInfo = function (bOverrideActive) {
    this.InteractiveMap.infoControl.setContent("");
    this.InteractiveMap.infoControl.close(bOverrideActive);
}

WardControl.prototype.activate = function () {
    if (!this.pointerMoveListener) {
        this.pointerMoveListener = this.InteractiveMap.map.on('pointermove', this.pointerMoveHandler);
    }
    if (!this.clickListener) {
        this.clickListener = this.InteractiveMap.map.on('click', this.clickHandler);
    }
}

WardControl.prototype.deactivate = function () {
    this.InteractiveMap.unhighlightWard();
    this.InteractiveMap.cursorControl.source.clear(true);
    Observable.unByKey(this.pointerMoveListener);
    this.pointerMoveListener = null;
    Observable.unByKey(this.clickListener);
    this.clickListener = null;
}

WardControl.prototype.parseQueryString = function () {
    var self = this;
    ['observer', 'sentry'].forEach(function (wardType) {
        var values = getParameterByName(wardType);
        if (values) {
            values = values.split(';');
            values.forEach(function (worldXY) {
                worldXY = worldXY.split(',');
                if (worldXY.length == 2) {
                    worldXY = worldXY.map(parseFloat);
                    if (!worldXY.some(isNaN)) {
                        var coordinate = worldToLatLon(worldXY);
                        self.addWard(coordinate, wardType, true);
                    }
                }
            });
        }
        self.updateQueryString(wardType);
    });
}

WardControl.prototype.updateQueryString = function (wardType) {
    var values = Object.keys(this.placedWardCoordinates[wardType]).join(';');
    setQueryString(wardType, values || null);
}

WardControl.prototype.addWard = function (coordinate, wardType, bSkipQueryStringUpdate) {
    if (coordinate[0] < 0 || coordinate[0] > mapConstants.map_w || coordinate[1] < 0 || coordinate[1] > mapConstants.map_h) return;
    var geom = new Point(coordinate);
    var feature = new Feature(geom);
    feature.set('wardType', wardType, true);
    feature.setStyle(styles[wardType].normal);
    this.source.addFeature(feature);
    if (wardType == 'observer') {
        if (this.InteractiveMap.visionControl.setVisionFeature(feature, coordinate, wardType)) {
            this.showVisibilityInfo();
        }
    }
    
    var circle = this.InteractiveMap.getRangeCircle(feature, coordinate, wardType);
    if (circle) {
        circle.setStyle(wardType == 'observer' ? styles.dayVision : styles.trueSight);
        feature.set('wardRange', circle, true);
        this.InteractiveMap.wardRangeSource.addFeature(circle);
    }
    var worldXY = latLonToWorld(coordinate).map(Math.round).join(',');
    this.placedWardCoordinates[wardType][worldXY] = true;
    if (!bSkipQueryStringUpdate) this.updateQueryString(wardType);
}

WardControl.prototype.clearWards = function () {
    var self = this;
    var features = this.source.getFeatures();
    features.forEach(function (feature) {
        self.removeWard(feature, true);
    });
    this.updateQueryString('observer');
    this.updateQueryString('sentry');
}

WardControl.prototype.removeWard = function (feature, bSkipQueryStringUpdate) {
    var self = this;
    var wardRange = feature.get('wardRange');
    if (wardRange) {
        // loop to check that feature exists before trying to remove
        this.InteractiveMap.wardRangeSource.forEachFeature(function (f) {
            if (f == wardRange) self.InteractiveMap.wardRangeSource.removeFeature(f);
        });
    }
    // loop to check that feature exists before trying to remove
    this.source.forEachFeature(function (f) {
        if (f == feature) self.source.removeFeature(f);
    });
    this.InteractiveMap.visionControl.removeVisionFeature(feature);
    
    var worldXY = latLonToWorld(feature.getGeometry().getCoordinates()).map(Math.round).join(',');
    var wardType = feature.get('wardType');
    delete this.placedWardCoordinates[wardType][worldXY];
    if (!bSkipQueryStringUpdate) this.updateQueryString(wardType);
}

WardControl.prototype.highlight = function (feature) {
    this.InteractiveMap.cursorControl.source.clear(true);
    this.unhighlight();
    var visionFeature = this.InteractiveMap.visionControl.setVisionFeature(feature);
    this.addRangeCircles(feature);
    this.InteractiveMap.highlight(feature);
    return visionFeature;
}

WardControl.prototype.unhighlight = function (feature) {
    var highlightedFeature = feature || this.InteractiveMap.highlightedFeature;
    if (highlightedFeature && !highlightedFeature.get("clicked")) {
        this.InteractiveMap.visionControl.removeVisionFeature(highlightedFeature);
        this.removeRangeCircles(highlightedFeature);
    }
    this.InteractiveMap.unhighlight();
}

WardControl.prototype.addRangeCircles = function (feature) {
    this.addRangeCircle(feature, 'dayVision');
    this.addRangeCircle(feature, 'nightVision');
    this.addRangeCircle(feature, 'trueSight');
    this.addRangeCircle(feature, 'attackRange');
}

WardControl.prototype.removeRangeCircles = function (feature) {
    this.removeRangeCircle(feature, 'dayVision');
    this.removeRangeCircle(feature, 'nightVision');
    this.removeRangeCircle(feature, 'trueSight');
    this.removeRangeCircle(feature, 'attackRange');
}

WardControl.prototype.addRangeCircle = function (feature, rangeType) {
    if (!feature.get(rangeType)) {
        var circle = this.InteractiveMap.getRangeCircle(feature, null, null, rangeType);
        if (circle) {
            feature.set(rangeType, circle, true);
            this.InteractiveMap.rangeSources[rangeType].addFeature(circle);
        }
    }
}

WardControl.prototype.removeRangeCircle = function (feature, rangeType) {
    var circle = feature.get(rangeType);
    if (circle) {
        feature.set(rangeType, null, true);
        this.InteractiveMap.rangeSources[rangeType].removeFeature(circle);
    }
}

export default WardControl;