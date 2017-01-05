var getPopupContent = require('./getPopupContent');
var styles = require('./styleDefinitions');

function InfoControl(InteractiveMap) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.highlight = null;
    this.lastPointerMoveTime = Date.now();
    this.pointerMoveHandler = function (evt) {
        // When user was dragging map, then coordinates didn't change and there's
        // no need to continue
        if (evt.dragging) {
            return;
        }
        console.log('info pointer');
        var pixel = self.InteractiveMap.map.getEventPixel(evt.originalEvent);
        
        // if mouse over a building feature, show info and highlight
        var feature = self.InteractiveMap.map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
        }, {
            layerFilter: self.InteractiveMap.layerFilters.marker
        });
        if (feature) {
            if (!self.isActive()) {
                self.displayFeatureInfo(feature, false);
            }
            self.InteractiveMap.highlight(feature);
        }
        else {
            self.close(false);
    
            // if mouse over a ward feature, highlight
            var feature = self.InteractiveMap.checkAndHighlightWard(pixel);
            
            if (feature) {
                self.InteractiveMap.wardControl.showVisibilityInfo(feature.get('visionFeature'));
            }
            // no highlighted feature so unhighlight current feature
            else if (!self.isActive()) {
                self.InteractiveMap.unhighlight();
            }
        }
    }
    this.pointerMoveListener = null;
    
    this.clickHandler = function (evt) {
        self.InteractiveMap.unhighlight();
        var feature = self.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return feature;
        }, {
            layerFilter: self.InteractiveMap.layerFilters.marker
        });
        if (feature) {
            if (!feature.get("clicked")) {
                self.InteractiveMap.deselectAll();
                var dotaProps = feature.get('dotaProps');
                if (feature.get('dotaProps').id == "ent_dota_tree") {
                    self.InteractiveMap.toggleTree(feature, dotaProps);
                }
                else {
                    self.displayFeatureInfo(feature, true);
                    self.InteractiveMap.select(feature);
                    self.InteractiveMap.panTo(evt.coordinate);
                }
            }
            else {
                console.log('click close');
                self.InteractiveMap.deselectAll();
                self.close(true);
            }
        }
        else {
            // if clicked a ward feature, highlight
            var feature = self.InteractiveMap.checkAndHighlightWard(evt.pixel);
            
            if (feature) {
                var visionFeature = feature.get('visionFeature');
                if (visionFeature) {
                    self.InteractiveMap.wardControl.showVisibilityInfo(feature.get('visionFeature'), true);
                }
                else {
                    self.close(true);
                }
                self.InteractiveMap.panTo(evt.coordinate);
            }
            // no highlighted feature so unhighlight current feature
            else if (!self.isActive()) {
                self.InteractiveMap.unhighlight();            
                self.close(true);
            }
            self.InteractiveMap.deselectAll();
        }
    }
    this.clickListener = null;
}

InfoControl.prototype.activate = function () {
    if (!this.pointerMoveListener) {
        this.pointerMoveListener = this.InteractiveMap.map.on('pointermove', this.pointerMoveHandler);
    }
    if (!this.clickListener) {
        this.clickListener = this.InteractiveMap.map.on('click', this.clickHandler);
    }
}

InfoControl.prototype.deactivate = function () {
    this.InteractiveMap.unhighlightWard();
    ol.Observable.unByKey(this.pointerMoveListener);
    this.pointerMoveListener = null;
    ol.Observable.unByKey(this.clickListener);
    this.clickListener = null;
}

InfoControl.prototype.setContent = function (html) {
    this.infoContent.innerHTML = html;
}

InfoControl.prototype.isActive = function () {
    return this.info.classList.contains('active');
}

InfoControl.prototype.open = function (bClicked) {
    console.log('open', bClicked);
    this.info.classList.add('slideUp');
    this.info.classList.remove('slideDown');
    if (bClicked) {
        this.info.classList.add('active');
    }
}

InfoControl.prototype.close = function (bOverrideActive) {
    if (!this.isActive() || bOverrideActive) {
        this.info.classList.add('slideDown');
        this.info.classList.remove('slideUp');
        this.info.classList.remove('active');
    }
}

InfoControl.prototype.initialize = function (id) {
    var self = this;
    this.id = id;
    this.info = document.getElementById(id);
    this.infoContent = document.querySelector('#' + id + ' .info-content');
    this.closeBtn = document.querySelector('#' + id + ' .close.btn');
    this.closeHandler = function (evt) {
        self.close.call(self, true);
    }
    this.closeBtn.addEventListener('click', this.closeHandler, false);
}

InfoControl.prototype.displayFeatureInfo = function (feature, bClicked) {
    this.setContent(getPopupContent(this.InteractiveMap.getMapData(), feature));
    this.open(bClicked);
};

module.exports = InfoControl;