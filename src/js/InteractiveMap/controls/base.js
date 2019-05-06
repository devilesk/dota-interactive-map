import EventEmitter from 'events';

class BaseControl extends EventEmitter {
    constructor(InteractiveMap) {
        super();
        this.InteractiveMap = InteractiveMap;
        this.activated = false;
        this.featureSelectHandler = this.onFeatureSelect.bind(this);
        this.featureDeselectHandler = this.onFeatureDeselect.bind(this);
        this.featureClickHandler = this.onFeatureClick.bind(this);
        this.featureHighlightHandler = this.onFeatureHighlight.bind(this);
        this.featureUnhighlightHandler = this.onFeatureUnhighlight.bind(this);
        this.mapHoverHandler = this.onMapHover.bind(this);
        this.mapClickHandler = this.onMapClick.bind(this);
    }

    get root() {
        return this.InteractiveMap.root;
    }

    get map() {
        return this.InteractiveMap.map;
    }

    get vs() {
        return this.InteractiveMap.vs;
    }

    activate() {
        if (!this.activated) {
            this.InteractiveMap.on('select', this.featureSelectHandler);
            this.InteractiveMap.on('deselect', this.featureDeselectHandler);
            this.InteractiveMap.on('click', this.featureClickHandler);
            this.InteractiveMap.on('highlight', this.featureHighlightHandler);
            this.InteractiveMap.on('unhighlight', this.featureUnhighlightHandler);
            this.InteractiveMap.on('map.pointermove', this.mapHoverHandler);
            this.InteractiveMap.on('map.click', this.mapClickHandler);
        }
        this.activated = true;
    }

    deactivate() {
        this.InteractiveMap.removeListener('select', this.featureSelectHandler);
        this.InteractiveMap.removeListener('deselect', this.featureDeselectHandler);
        this.InteractiveMap.removeListener('click', this.featureClickHandler);
        this.InteractiveMap.removeListener('highlight', this.featureHighlightHandler);
        this.InteractiveMap.removeListener('unhighlight', this.featureUnhighlightHandler);
        this.InteractiveMap.removeListener('map.pointermove', this.mapHoverHandler);
        this.InteractiveMap.removeListener('map.click', this.mapClickHandler);
        this.activated = false;
    }

    onFeatureSelect(feature, featureType, evt) {

    }

    onFeatureDeselect(feature, featureType, evt) {

    }

    onFeatureClick(feature, featureType, evt) {

    }

    onFeatureHighlight(feature, featureType, evt) {

    }

    onFeatureUnhighlight(feature, featureType, evt) {

    }

    onMapHover(feature, featureType, evt) {

    }

    onMapClick(feature, featureType, evt) {

    }
}

export default BaseControl;
