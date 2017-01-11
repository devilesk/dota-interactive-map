var getFeatureCenter = function(feature) {
    var extent = feature.getGeometry().getExtent();
    var center = ol.extent.getCenter(extent);
    return new ol.geom.Point(center);
};

module.exports = getFeatureCenter;