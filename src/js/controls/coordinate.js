import MousePosition from 'ol/control/mouseposition';
import { createStringXY } from 'ol/coordinate';
import { dotaProj } from '../projections';

class CoordinateControl {
    constructor(InteractiveMap, elementId) {
        this.InteractiveMap = InteractiveMap;
        this.mousePosition = new MousePosition({
            coordinateFormat: createStringXY(),
            projection: dotaProj,
            target: document.getElementById(elementId)
        });
        this.InteractiveMap.map.addControl(this.mousePosition);
    }
}

export default CoordinateControl;