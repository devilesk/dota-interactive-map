var proj = require('./projections');
var ol = require('openlayers');
var mapConstants = require('./mapConstants');
var map_tile_path = "http://devilesk.com/media/images/map/";

var InteractiveMap = {
    MODE: 'navigation',
    layerDefs: require('./layerDefinitions'),
    baseLayerDefs: require('./baseLayerDefinitions'),
    view: new ol.View({
        zoom: 0,
        center: mapConstants.imgCenter,
        projection: proj.pixel,
        resolutions: mapConstants.resolutions
    }),
    data: {},
    layerIndex: {},
    version: '700'
}

InteractiveMap.getMapLayerIndex = function (version) {
    version = version || InteractiveMap.version;
    if (!InteractiveMap.layerIndex[version]) InteractiveMap.layerIndex[version] = {};
    return InteractiveMap.layerIndex[version];
}

InteractiveMap.getMapDataPath = function (version) {
    version = version || InteractiveMap.version;
    return 'data/' + version + '/mapdata2.json';
}

// setup base layers
InteractiveMap.baseLayers = InteractiveMap.baseLayerDefs.map(function (layerDef) {
    var layer = new ol.layer.Tile({
        title: layerDef.name,
        type: 'base',
        extent: proj.pixel.getExtent(),
        source: new ol.source.TileImage({
            tileGrid: new ol.tilegrid.TileGrid({
                origin: [0, mapConstants.map_h],
                resolutions: mapConstants.resolutions
            }),
            projection: proj.pixel,
            url: map_tile_path + layerDef.group + '/' + layerDef.id + '/{z}/tile_{x}_{y}.jpg'
        }),
        visible: !!layerDef.visible
    });
    layer.set('layerId', layerDef.group + '-' + layerDef.id, true);
    layer.set('layerDef', layerDef, true);
    return layer;
});

InteractiveMap.baseLayerGroup = new ol.layer.Group({
    title: 'Base Layers',
    layers: new ol.Collection(InteractiveMap.baseLayers)
});

module.exports = InteractiveMap;