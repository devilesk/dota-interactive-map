import BaseControl from './base';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import { dotaProj } from '../definitions/projections';

class CoordinateControl extends BaseControl {
    constructor(InteractiveMap, elementId) {
        super(InteractiveMap);
        this.createStringXY = createStringXY();
        this.mousePosition = new MousePosition({
            undefinedHTML: '<span></span>',
            coordinateFormat: coordinate => `<div class="coordinate">${this.createStringXY(coordinate)}</div>`,
            projection: dotaProj,
            target: this.root.getElementById(elementId),
        });
        this.map.addControl(this.mousePosition);
    }
}

export default CoordinateControl;
