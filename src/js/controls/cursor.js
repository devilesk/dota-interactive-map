import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import styles from '../styleDefinitions';

class CursorControl {
    constructor(InteractiveMap) {
        this.InteractiveMap = InteractiveMap;
        this.source = new SourceVector({});
        this.layer = new LayerVector({
            source: this.source,
            style: styles.cursor,
        });
        this.layerFilter = layer => layer === this.layer;
    }
}

export default CursorControl;
