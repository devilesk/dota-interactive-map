import { getCenter } from 'ol/extent';
import Point from 'ol/geom/Point';

const getFeatureCenter = (feature) => {
    const ext = feature.getGeometry().getExtent();
    const center = getCenter(ext);
    return new Point(center);
};

export default getFeatureCenter;
