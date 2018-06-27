import SourceVector from 'ol/source/vector';
import LayerVector from 'ol/layer/vector';
import styles from './../styleDefinitions';

function CursorControl(InteractiveMap) {
    const self = this;
    this.InteractiveMap = InteractiveMap;
    this.source = new SourceVector({
        defaultDataProjection : 'pixel'
    });
    this.layer =  new LayerVector({
        source: this.source,
        style: styles.cursor
    });
    this.layerFilter = function(layer) {
        return layer === self.layer;
    }
}

export default CursorControl;