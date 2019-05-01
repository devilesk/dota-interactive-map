import { unByKey } from 'ol/Observable';
import Polygon from 'ol/geom/Polygon';
import LinearRing from 'ol/geom/LinearRing';
import Feature from 'ol/Feature';
import getPopupContent from '../getPopupContent';
import styles from '../styleDefinitions';
import mapConstants from '../mapConstants';
import { worldToLatLon } from '../conversion';
import createCirclePointCoords from '../util/createCirclePointCoords';

class InfoControl {
    constructor(InteractiveMap, id) {
        this.InteractiveMap = InteractiveMap;
        // this.highlight = null;
        this.lastPointerMoveTime = Date.now();
        this.pointerMoveListener = null;
        this.clickListener = null;

        this.id = id;
        this.info = InteractiveMap.root.getElementById(id);
        this.infoContent = InteractiveMap.root.querySelector(`#${id} .message-content`);
        this.closeBtn = InteractiveMap.root.querySelector(`#${id} .btn-close`);
        this.closeBtn.addEventListener('click', evt => this.close(true), false);
    }

    get root() {
        this.InteractiveMap.root;
    }

    activate() {
        if (!this.pointerMoveListener) {
            this.pointerMoveListener = this.InteractiveMap.map.on('pointermove', (evt) => {
                // When user was dragging map, then coordinates didn't change and there's
                // no need to continue
                if (evt.dragging) {
                    return;
                }

                const pixel = this.InteractiveMap.map.getEventPixel(evt.originalEvent);

                // if mouse over a building feature, show info and highlight
                let feature = this.InteractiveMap.map.forEachFeatureAtPixel(pixel, feature => feature, { layerFilter: this.InteractiveMap.layerFilters.marker });
                if (feature) {
                    if (!this.isActive()) {
                        this.displayFeatureInfo(feature, false);
                    }
                    this.highlight(feature);
                }
                else {
                    this.close(false);

                    // if mouse over a ward feature, highlight
                    feature = this.InteractiveMap.checkAndHighlightWard(pixel);

                    if (feature) {
                        this.InteractiveMap.controls.ward.showVisibilityInfo(feature);
                    }
                    // no highlighted feature so unhighlight current feature
                    else if (!this.isActive()) {
                        this.unhighlight();
                    }
                }
            });
        }
        if (!this.clickListener) {
            this.clickListener = this.InteractiveMap.map.on('click', (evt) => {
                this.unhighlight();
                let feature = this.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, feature => feature, { layerFilter: this.InteractiveMap.layerFilters.marker });
                if (feature) {
                    if (!feature.get('clicked')) {
                        this.InteractiveMap.deselectAll();
                        const dotaProps = feature.get('dotaProps');
                        if (feature.get('dotaProps').id == 'ent_dota_tree') {
                            this.InteractiveMap.controls.tree.toggleTree(feature, dotaProps);
                        }
                        else {
                            this.displayFeatureInfo(feature, true);
                            this.select(feature);
                            this.InteractiveMap.panTo(evt.coordinate);
                        }
                    }
                    else {
                        this.InteractiveMap.deselectAll();
                        this.close(true);
                    }
                }
                else {
                    // if clicked a ward feature, highlight
                    feature = this.InteractiveMap.checkAndHighlightWard(evt.pixel);

                    if (feature) {
                        const visionFeature = feature.get('visionFeature');
                        if (visionFeature) {
                            this.InteractiveMap.controls.ward.showVisibilityInfo(feature, true);
                        }
                        else {
                            this.close(true);
                        }
                        this.InteractiveMap.panTo(evt.coordinate);
                    }
                    // no highlighted feature so unhighlight current feature
                    else if (!this.isActive()) {
                        this.unhighlight();
                        this.close(true);
                    }
                    this.InteractiveMap.deselectAll();
                }
            });
        }
    }

    deactivate() {
        this.InteractiveMap.unhighlightWard();
        unByKey(this.pointerMoveListener);
        this.pointerMoveListener = null;
        unByKey(this.clickListener);
        this.clickListener = null;
    }

    setContent(html) {
        this.infoContent.innerHTML = html;
    }

    isActive() {
        return this.info.classList.contains('active');
    }

    open(bClicked) {
        this.info.classList.add('slideUp');
        this.info.classList.remove('slideDown');
        if (bClicked) {
            this.info.classList.add('active');
        }
    }

    close(bOverrideActive) {
        if (!this.isActive() || bOverrideActive) {
            this.info.classList.add('slideDown');
            this.info.classList.remove('slideUp');
            this.info.classList.remove('active');
        }
    }

    displayFeatureInfo(feature, bClicked) {
        this.setContent(getPopupContent(this.InteractiveMap.getStatData(), feature));
        this.open(bClicked);
    }

    unhighlight(feature) {
        this.InteractiveMap.unhighlight();
    }

    highlight(feature) {
        this.unhighlight();
        this.InteractiveMap.highlight(feature);
    }

    select(feature) {
        if (feature && !feature.get('clicked')) {
            if (feature == this.InteractiveMap.highlightedFeature) {
                this.unhighlight();
            }
            this.InteractiveMap.selectSource.addFeature(feature);
            feature.set('clicked', true, true);
        }
    }
}

export default InfoControl;
