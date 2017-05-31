import extent from 'ol/extent';
import Point from 'ol/geom/point';

var getFeatureCenter = function(feature) {
    var ext = feature.getGeometry().getExtent();
    var center = extent.getCenter(ext);
    return new Point(center);
};

export default getFeatureCenter;