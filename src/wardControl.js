var ol = require('openlayers');
var styles = require('./styleDefinitions');

function WardControl(InteractiveMap, throttleTime) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.source = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    this.layer =  new ol.layer.Vector({
        source: this.source
    });
    this.layerFilter = function(layer) {
        return layer === self.layer;
    }
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
            bBuildingHover = true;
            self.highlight(feature);
        }
        else {
            // if mouse over a ward feature, highlight
            var feature = InteractiveMap.checkAndHighlightWard(pixel);
            
            // no highlighted feature so unhighlight current feature
            if (!feature) {
                self.unhighlight();
            }
        }
        
        // vision cursor
        if (Date.now() - self.lastPointerMoveTime < throttleTime || self.InteractiveMap.MODE != 'observer') {
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
        if (feature) {
            self.InteractiveMap.toggle(feature);
            self.InteractiveMap.visionControl.toggleVisionFeature(feature);
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
            }
            else {
                self.addWard(evt.coordinate, self.InteractiveMap.MODE);
                self.InteractiveMap.cursorControl.source.clear(true);
            }
        }
    }
    this.clickListener = null;
}

WardControl.prototype.activate = function () {
    if (!this.pointerMoveListener && this.InteractiveMap.MODE == 'observer') {
        this.pointerMoveListener = this.InteractiveMap.map.on('pointermove', this.pointerMoveHandler);
    }
    else {
        ol.Observable.unByKey(this.pointerMoveListener);
        this.pointerMoveListener = null;
    }
    if (!this.clickListener) {
        this.clickListener = this.InteractiveMap.map.on('click', this.clickHandler);
    }
}

WardControl.prototype.deactivate = function () {
    this.InteractiveMap.unhighlightWard();
    this.InteractiveMap.cursorControl.source.clear(true);
    ol.Observable.unByKey(this.pointerMoveListener);
    this.pointerMoveListener = null;
    ol.Observable.unByKey(this.clickListener);
    this.clickListener = null;
}

WardControl.prototype.addWard = function (coordinate, wardType) {
    console.log('addWard', coordinate, wardType);
    var geom = new ol.geom.Point(coordinate);
    var feature = new ol.Feature(geom);
    feature.set('wardType', wardType, true);
    feature.setStyle(styles[wardType].normal);
    this.source.addFeature(feature);
    if (wardType == 'observer') this.InteractiveMap.visionControl.setVisionFeature(feature, coordinate, wardType);
}

WardControl.prototype.removeWard = function (feature) {
    this.source.removeFeature(feature);
    this.InteractiveMap.visionControl.removeVisionFeature(feature);
}

WardControl.prototype.highlight = function (feature) {
    this.InteractiveMap.cursorControl.source.clear(true);
    this.unhighlight();
    this.InteractiveMap.visionControl.setVisionFeature(feature);
    this.addRangeCircles(feature);
    this.InteractiveMap.highlight(feature);
}

WardControl.prototype.unhighlight = function () {
    var highlightedFeature = this.InteractiveMap.highlightedFeature;
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
        var circle = this.InteractiveMap.getRangeCircle(feature, null, rangeType);
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

module.exports = WardControl;