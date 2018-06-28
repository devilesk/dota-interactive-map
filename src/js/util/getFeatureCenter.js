import extent from 'ol/extent';
import Point from 'ol/geom/point';

const getFeatureCenter = feature => {
    const ext = feature.getGeometry().getExtent();
    const center = extent.getCenter(ext);
    return new Point(center);
};

export default getFeatureCenter;