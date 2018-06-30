import MousePosition from 'ol/control/mouseposition';
import coordinate from 'ol/coordinate';
import { dotaProj } from '../projections';

class CoordinateControl {
    constructor(InteractiveMap, elementId) {
        this.InteractiveMap = InteractiveMap;
        this.mousePosition = new MousePosition({
            coordinateFormat: coordinate.createStringXY(),
            projection: dotaProj,
            target: document.getElementById(elementId)
        });
        this.InteractiveMap.map.addControl(this.mousePosition);
    }
}

export default CoordinateControl;