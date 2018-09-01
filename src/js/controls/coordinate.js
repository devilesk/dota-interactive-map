import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import { dotaProj } from '../projections';

class CoordinateControl {
    constructor(InteractiveMap, elementId) {
        this.InteractiveMap = InteractiveMap;
        this.createStringXY = createStringXY();
        this.mousePosition = new MousePosition({
            undefinedHTML: '<span></span>',
            coordinateFormat: (coordinate) => {
                return '<div class="coordinate">' + this.createStringXY(coordinate) + '</div>';
            },
            projection: dotaProj,
            target: document.getElementById(elementId)
        });
        this.InteractiveMap.map.addControl(this.mousePosition);
    }
}

export default CoordinateControl;