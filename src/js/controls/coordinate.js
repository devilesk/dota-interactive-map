import MousePosition from 'ol/control/mouseposition';
import coordinate from 'ol/coordinate';
import { dotaProj } from '../projections';

function CoordinateControl(InteractiveMap, elementId) {
    const self = this;
    this.InteractiveMap = InteractiveMap;
    this.mousePosition = new MousePosition({
        coordinateFormat: coordinate.createStringXY(),
        projection: dotaProj,
        target: document.getElementById(elementId),
        undefinedHTML: '&nbsp;'
    });
    this.InteractiveMap.map.addControl(this.mousePosition);
}

export default CoordinateControl;