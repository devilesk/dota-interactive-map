import proj from 'ol/proj';
import Projection from 'ol/proj/projection';
import {latLonToWorld, worldToLatLon} from './conversion';
import mapConstants from './mapConstants';

var pixelProj = new Projection({
    code: 'pixel',
    units: 'pixels',
    extent: [0, 0, mapConstants.map_w, mapConstants.map_h]
});

var dotaProj = new Projection({
    code: 'dota',
    extent: [-8288, -8288, 8288, 8288],
    units: 'units'
});

proj.addProjection(pixelProj);
proj.addCoordinateTransforms('pixel', dotaProj, latLonToWorld, worldToLatLon);

proj.addProjection(dotaProj);
proj.addCoordinateTransforms('dota', pixelProj, worldToLatLon, latLonToWorld);

export { pixelProj, dotaProj };