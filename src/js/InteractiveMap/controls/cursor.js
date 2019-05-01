import BaseControl from './base';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import styles from '../definitions/styles';

class CursorControl extends BaseControl {
    constructor(InteractiveMap) {
        super(InteractiveMap);
        this.source = new SourceVector({});
        this.layer = new LayerVector({
            source: this.source,
            style: styles.cursor,
        });
        this.layerFilter = layer => layer === this.layer;
    }
}

export default CursorControl;
