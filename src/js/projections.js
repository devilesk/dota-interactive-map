import { addProjection, addCoordinateTransforms } from 'ol/proj';
import Projection from 'ol/proj/Projection';
import { latLonToWorld, worldToLatLon } from './conversion';
import mapConstants from './mapConstants';

const pixelProj = new Projection({
    code: 'pixel',
    units: 'pixels',
    extent: [0, 0, mapConstants.map_w, mapConstants.map_h],
});

const dotaProj = new Projection({
    code: 'dota',
    extent: [-8288, -8288, 8288, 8288],
    units: 'units',
});

addProjection(pixelProj);
addCoordinateTransforms('pixel', dotaProj, latLonToWorld, worldToLatLon);

addProjection(dotaProj);
addCoordinateTransforms('dota', pixelProj, worldToLatLon, latLonToWorld);

export { pixelProj, dotaProj };
