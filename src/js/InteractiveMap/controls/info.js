import BaseInfoControl from './baseInfo';
import getPopupContent from '../getPopupContent';
import WardControl from './ward';

class InfoControl extends BaseInfoControl {
    constructor(InteractiveMap, element) {
        super(InteractiveMap, element, { open: 'slideUp', close: 'slideDown' });
        
        this.InteractiveMap.on('mode', (value) => {
            if (value === 'navigate') {
                this.activate();
            }
            else {
                this.deactivate();
            }
        });
    }

    onFeatureSelect(feature, featureType, evt) {
        this.displayFeatureInfo(feature, featureType, true);
        if (featureType !== 'tree') {
            this.InteractiveMap.panTo(evt.coordinate);
        }
    }

    onMapClick(feature, featureType, evt) {
        if (!feature) {
            this.clear(true);
        }
    }

    onFeatureHighlight(feature, featureType, evt) {
        this.displayFeatureInfo(feature, featureType);
    }

    onFeatureUnhighlight(feature, featureType, evt) {
        this.clear();
    }

    displayFeatureInfo(feature, featureType, bClicked = false) {
        if (featureType === 'marker') {
            const content = getPopupContent(this.InteractiveMap.statData, feature);
            this.display(content, bClicked);
        }
        else if (featureType === 'ward') {
            WardControl.prototype.showVisibilityInfo.call(this, feature, bClicked);
        }
    }
}

export default InfoControl;
