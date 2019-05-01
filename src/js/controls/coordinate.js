import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import { dotaProj } from '../projections';

class CoordinateControl {
    constructor(InteractiveMap, elementId) {
        this.InteractiveMap = InteractiveMap;
        this.createStringXY = createStringXY();
        this.mousePosition = new MousePosition({
            undefinedHTML: '<span></span>',
            coordinateFormat: coordinate => `<div class="coordinate">${this.createStringXY(coordinate)}</div>`,
            projection: dotaProj,
            target: this.root.getElementById(elementId),
        });
        this.InteractiveMap.map.addControl(this.mousePosition);
    }

    get root() {
        return this.InteractiveMap.root;
    }
}

export default CoordinateControl;
