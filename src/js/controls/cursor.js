import SourceVector from 'ol/source/vector';
import LayerVector from 'ol/layer/vector';
import styles from './../styleDefinitions';

class CursorControl {
    constructor(InteractiveMap) {
        this.InteractiveMap = InteractiveMap;
        this.source = new SourceVector({
            defaultDataProjection : 'pixel'
        });
        this.layer =  new LayerVector({
            source: this.source,
            style: styles.cursor
        });
        this.layerFilter = layer => layer === this.layer;
    }
}

export default CursorControl;