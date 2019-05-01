import mapConstants from './mapConstants';

export const lerp = (minVal, maxVal, pos_r) => pos_r * (maxVal - minVal) + minVal;

export const reverseLerp = (minVal, maxVal, pos) => (pos - minVal) / (maxVal - minVal);

export const latLonToWorld = (coordinate) => {
    const x_r = lerp(mapConstants.map_x_boundaries[0], mapConstants.map_x_boundaries[1], coordinate[0] / mapConstants.map_w);
    const y_r = lerp(mapConstants.map_y_boundaries[0], mapConstants.map_y_boundaries[1], (mapConstants.map_h - coordinate[1]) / mapConstants.map_h);
    return [x_r, y_r];
};

export const worldToLatLon = (coordinate) => {
    const x = reverseLerp(mapConstants.map_x_boundaries[0], mapConstants.map_x_boundaries[1], coordinate[0]) * mapConstants.map_w;
    const y = mapConstants.map_h - reverseLerp(mapConstants.map_y_boundaries[0], mapConstants.map_y_boundaries[1], coordinate[1]) * mapConstants.map_h;
    return [x, y];
};

export const getTileRadius = r => parseInt(Math.floor(r / 64));

export const getScaledRadius = r => r / (mapConstants.map_x_boundaries[1] - mapConstants.map_x_boundaries[0]) * mapConstants.map_w;

export const calculateDistance = (order, units, measure) => {
    if (order == 1) {
        if (units == 'km') {
            return measure * mapConstants.scale * 1000;
        }
        return measure * mapConstants.scale;
    }
    return measure * mapConstants.scale;
};
