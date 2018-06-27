import Observable from 'ol/observable';
import Polygon from 'ol/geom/polygon';
import LinearRing from 'ol/geom/linearring';
import Feature from 'ol/feature';
import getPopupContent from './../getPopupContent';
import styles from './../styleDefinitions';
import mapConstants from './../mapConstants';
import { worldToLatLon } from './../conversion';
import createCirclePointCoords from './../util/createCirclePointCoords';

function InfoControl(InteractiveMap) {
    const self = this;
    this.InteractiveMap = InteractiveMap;
    //this.highlight = null;
    this.lastPointerMoveTime = Date.now();
    this.pointerMoveHandler = function (evt) {
        // When user was dragging map, then coordinates didn't change and there's
        // no need to continue
        if (evt.dragging) {
            return;
        }

        const pixel = self.InteractiveMap.map.getEventPixel(evt.originalEvent);
        
        // if mouse over a building feature, show info and highlight
        let feature = self.InteractiveMap.map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
        }, {
            layerFilter: self.InteractiveMap.layerFilters.marker
        });
        if (feature) {
            if (!self.isActive()) {
                self.displayFeatureInfo(feature, false);
            }
            self.highlight(feature);
        }
        else {
            self.close(false);
    
            // if mouse over a ward feature, highlight
            feature = self.InteractiveMap.checkAndHighlightWard(pixel);
            
            if (feature) {
                self.InteractiveMap.wardControl.showVisibilityInfo(feature.get('visionFeature'));
            }
            // no highlighted feature so unhighlight current feature
            else if (!self.isActive()) {
                self.unhighlight();
            }
        }
    }
    this.pointerMoveListener = null;
    
    this.clickHandler = function (evt) {
        self.unhighlight();
        let feature = self.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return feature;
        }, {
            layerFilter: self.InteractiveMap.layerFilters.marker
        });
        if (feature) {
            if (!feature.get("clicked")) {
                self.InteractiveMap.deselectAll();
                const dotaProps = feature.get('dotaProps');
                if (feature.get('dotaProps').id == "ent_dota_tree") {
                    self.InteractiveMap.treeControl.toggleTree(feature, dotaProps);
                }
                else {
                    self.displayFeatureInfo(feature, true);
                    self.select(feature);
                    self.InteractiveMap.panTo(evt.coordinate);
                }
            }
            else {
                self.InteractiveMap.deselectAll();
                self.close(true);
            }
        }
        else {
            // if clicked a ward feature, highlight
            feature = self.InteractiveMap.checkAndHighlightWard(evt.pixel);
            
            if (feature) {
                const visionFeature = feature.get('visionFeature');
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
                self.unhighlight();            
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
    Observable.unByKey(this.pointerMoveListener);
    this.pointerMoveListener = null;
    Observable.unByKey(this.clickListener);
    this.clickListener = null;
}

InfoControl.prototype.setContent = function (html) {
    this.infoContent.innerHTML = html;
}

InfoControl.prototype.isActive = function () {
    return this.info.classList.contains('active');
}

InfoControl.prototype.open = function (bClicked) {
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
    const self = this;
    this.id = id;
    this.info = document.getElementById(id);
    this.infoContent = document.querySelector('#' + id + ' .message-content');
    this.closeBtn = document.querySelector('#' + id + ' .btn-close');
    this.closeHandler = function (evt) {
        self.close.call(self, true);
    }
    this.closeBtn.addEventListener('click', this.closeHandler, false);
}

InfoControl.prototype.displayFeatureInfo = function (feature, bClicked) {
    this.setContent(getPopupContent(this.InteractiveMap.getStatData(), feature));
    this.open(bClicked);
};

InfoControl.prototype.unhighlight = function (feature) {
    const highlightedFeature = feature || this.InteractiveMap.highlightedFeature;
    if (highlightedFeature && !highlightedFeature.get("clicked")) {
        const dotaProps = highlightedFeature.get('dotaProps');
        if (dotaProps) {
            if (dotaProps.id == 'npc_dota_neutral_spawner') {
                const pullRange = highlightedFeature.get('pullRange');
                if (pullRange) {
                    this.InteractiveMap.getMapLayer('pullRange').getSource().removeFeature(pullRange);
                    highlightedFeature.set("pullRange", null, true);
                }
                const guardRange = highlightedFeature.get('guardRange');
                if (guardRange) {
                    this.InteractiveMap.getMapLayer('pullRange').getSource().removeFeature(guardRange);
                    highlightedFeature.set("guardRange", null, true);
                }
            }
        }
    }
    this.InteractiveMap.unhighlight();
}

InfoControl.prototype.highlight = function (feature) {
    this.unhighlight();
    const dotaProps = feature.get('dotaProps');
    if (dotaProps) {
        if (dotaProps.id == 'npc_dota_neutral_spawner') {
            if (!feature.get('pullRange')) {
                let circle = this.InteractiveMap.getRangeCircle(feature, null, null, null, 400);
                feature.set("guardRange", circle, true);
                this.InteractiveMap.getMapLayer('pullRange').getSource().addFeature(circle);
                
                const center = worldToLatLon([dotaProps.x, dotaProps.y]);
                const pullTiming = mapConstants.pullRangeTiming[dotaProps.pullType];
                const pullMaxCoords = createCirclePointCoords(center[0], center[1], 400 + pullTiming * 350, 360);
                const pullMinCoords = createCirclePointCoords(center[0], center[1], 400 + pullTiming * 270, 360);
                const geom = new Polygon([pullMaxCoords]);
                geom.appendLinearRing(new LinearRing(pullMinCoords));
                circle = new Feature(geom);
                feature.set("pullRange", circle, true);
                this.InteractiveMap.getMapLayer('pullRange').getSource().addFeature(circle);
            }
        }
    }
    this.InteractiveMap.highlight(feature);
}

InfoControl.prototype.select = function (feature) {    
    if (feature && !feature.get("clicked")) {
        if (feature == this.InteractiveMap.highlightedFeature) {
            this.unhighlight();
        }
        this.InteractiveMap.selectSource.addFeature(feature);
        feature.set("clicked", true, true);
    }
}

export default InfoControl;