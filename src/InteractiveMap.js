var proj = require('./projections');
var ol = require('openlayers');
var mapConstants = require('./mapConstants');
var map_tile_path = "http://devilesk.com/media/images/map/";
var styles = require('./styleDefinitions');
var loadGeoJSON = require('./dataLoader').loadGeoJSON;
var loadJSON = require('./dataLoader').loadJSON;
var loadLayerGroupFromData = require('./dataLoader').loadLayerGroupFromData;
var getJSON = require('./util/getJSON');
var worldToLatLon = require('./conversionFunctions').worldToLatLon;
var getScaledRadius = require('./conversionFunctions').getScaledRadius;

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
    version: '700',
    visionRadius: mapConstants.visionRadius.observer,
    isNight: false,
    isDarkness: false,
    layerFilters: {
        marker: function(layer) {
            var layerDef = layer.get('layerDef');
            return layer.getVisible() && layerDef && (layerDef.group == 'structure' || layerDef.group == 'object');
        }
    }
}

InteractiveMap.map = new ol.Map({
    controls: ol.control.defaults({ attribution: false, rotate: false }),
    interactions: ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false}),
    target: 'map',
    view: InteractiveMap.view
});

InteractiveMap.highlightSource = new ol.source.Vector({
    defaultDataProjection : 'pixel'
});
InteractiveMap.highlightLayer =  new ol.layer.Vector({
    source: InteractiveMap.highlightSource,
    style: styles.highlight
});

InteractiveMap.selectSource = new ol.source.Vector({
    defaultDataProjection : 'pixel'
});
InteractiveMap.selectLayer =  new ol.layer.Vector({
    source: InteractiveMap.selectSource,
    style: styles.select
});

InteractiveMap.rangeSources = {
    dayVision: new ol.source.Vector({
        defaultDataProjection : 'pixel'
    }),
    nightVision: new ol.source.Vector({
        defaultDataProjection : 'pixel'
    }),
    trueSight: new ol.source.Vector({
        defaultDataProjection : 'pixel'
    }),
    attackRange: new ol.source.Vector({
        defaultDataProjection : 'pixel'
    })
}
InteractiveMap.rangeLayers = {
    dayVision: new ol.layer.Vector({
        source: InteractiveMap.rangeSources.dayVision,
        style: styles.dayVision
    }),
    nightVision: new ol.layer.Vector({
        source: InteractiveMap.rangeSources.nightVision,
        style: styles.nightVision
    }),
    trueSight: new ol.layer.Vector({
        source: InteractiveMap.rangeSources.trueSight,
        style: styles.trueSight
    }),
    attackRange: new ol.layer.Vector({
        source: InteractiveMap.rangeSources.attackRange,
        style: styles.attackRange
    })
}

InteractiveMap.getMapData = function (version) {
    return InteractiveMap.data[version || InteractiveMap.version];
}

InteractiveMap.getData = function (version) {
    return InteractiveMap.data[version || InteractiveMap.version].data;
}

InteractiveMap.getOverlayData = function (version) {
    return InteractiveMap.data[version || InteractiveMap.version].data.data;
}

InteractiveMap.getStatData = function (version) {
    return InteractiveMap.data[version || InteractiveMap.version].data.stats;
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

InteractiveMap.setMapLayers = function (version, callback) {
    InteractiveMap.getDataJSON(version, function (data) {
        var currentLayerGroup = InteractiveMap.map.getLayerGroup();
        currentLayerGroup.setVisible(false);
        InteractiveMap.map.setLayerGroup(data.layerGroup);
        InteractiveMap.map.getLayerGroup().setVisible(true);
        if (callback) callback();
    });
}

InteractiveMap.getDataJSON = function (version, callback) {
    if (InteractiveMap.data[version]) {
        callback(InteractiveMap.data[version]);
    }
    else {
        getJSON(InteractiveMap.getMapDataPath(version), function (data) {
            InteractiveMap.data[version] = {
                data: data,
                layerGroup: new ol.layer.Group({
                    title: version + ' Layers',
                    layers: new ol.Collection([
                        InteractiveMap.baseLayerGroup,
                        loadLayerGroupFromData(InteractiveMap.map, data, version, InteractiveMap.getMapLayerIndex(version), InteractiveMap.layerDefs)
                    ])
                })
            };                
            callback(InteractiveMap.data[version]);
        });
    }
}

InteractiveMap.baseLayerGroup = new ol.layer.Group({
    title: 'Base Layers',
    layers: new ol.Collection(InteractiveMap.baseLayers)
});

InteractiveMap.toggleTree = function (feature, dotaProps) {
    var gridXY = InteractiveMap.vs.WorldXYtoGridXY(dotaProps.x, dotaProps.y);
    InteractiveMap.vs.toggleTree(gridXY.x, gridXY.y);
    feature.set('isCut', !feature.get('isCut'));
}

InteractiveMap.checkAndHighlightWard = function (pixel) {
    var feature = InteractiveMap.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        return feature;
    }, {
        layerFilter: InteractiveMap.wardControl.layerFilter
    });
    InteractiveMap.highlightWard(feature);
    return feature;
}

InteractiveMap.highlightWard = function (feature) {
    if (feature !== InteractiveMap.highlightedWard) {
        if (InteractiveMap.highlightedWard) {
            InteractiveMap.highlightedWard.setStyle(styles[InteractiveMap.highlightedWard.get('wardType')].normal);
        }
        if (feature) {
            feature.setStyle(styles[feature.get('wardType')][InteractiveMap.MODE == 'navigate' ? 'highlight' : 'remove']);
        }
        InteractiveMap.highlightedWard = feature;
    }
}

InteractiveMap.unhighlightWard = function () {
    if (InteractiveMap.highlightedWard) {
        InteractiveMap.highlightedWard.setStyle(styles[InteractiveMap.highlightedWard.get('wardType')].normal);
    }
    InteractiveMap.highlightedWard = null;
}

InteractiveMap.highlight = function (feature) {
    if (feature !== InteractiveMap.highlightedFeature) {
        if (InteractiveMap.highlightedFeature) {
            InteractiveMap.highlightSource.removeFeature(InteractiveMap.highlightedFeature);
        }
        if (feature) {
            InteractiveMap.highlightSource.addFeature(feature);
        }
        InteractiveMap.highlightedFeature = feature;
    }
}

InteractiveMap.unhighlight = function () {
    if (InteractiveMap.highlightedFeature) {
        InteractiveMap.highlightSource.removeFeature(InteractiveMap.highlightedFeature);
    }
    InteractiveMap.highlightedFeature = null;
}

InteractiveMap.toggle = function (feature) {    
    if (feature) {
        if (feature.get("clicked")) {
            this.deselect(feature);
        }
        else {
            this.select(feature);
        }
    }
}

InteractiveMap.select = function (feature) {    
    if (feature && !feature.get("clicked")) {
        if (feature == InteractiveMap.highlightedFeature) {
            this.unhighlight();
        }
        
        InteractiveMap.selectSource.addFeature(feature);
        feature.set("clicked", true, true);
    }
}

InteractiveMap.deselectAll = function () {
    InteractiveMap.selectSource.getFeatures().forEach(function (feature) {
        feature.set("clicked", false, true);
    });
    InteractiveMap.selectSource.clear();
}
InteractiveMap.deselect = function (feature) {
    if (feature && feature.get("clicked")) {
        if (feature == InteractiveMap.highlightedFeature) {
            this.unhighlight();
        }
        
        InteractiveMap.selectSource.removeFeature(feature);
        feature.set("clicked", false, true);
    }
}

InteractiveMap.getFeatureVisionRadius = function (feature, dotaProps, unitClass, rangeType) {
    dotaProps = dotaProps || feature.get('dotaProps');
    unitClass = unitClass || dotaProps.unitClass;
    var stats = InteractiveMap.getStatData();
    var radius;
    if (unitClass == 'observer') {
        radius = InteractiveMap.visionRadius || mapConstants.visionRadius[unitClass];
    }
    else if (unitClass == 'sentry') {
        radius = mapConstants.visionRadius[unitClass];
    }
    else {
        if (rangeType && !stats[unitClass].hasOwnProperty(rangeType)) return null;
        
        switch (rangeType) {
            case 'dayVision':
            case 'nightVision':
                radius = stats[unitClass][rangeType];
                if (InteractiveMap.isDarkness) {
                    radius = Math.min(mapConstants.visionRadius.darkness, radius);
                }
            case 'trueSight':
            case 'attackRange':
                radius = stats[unitClass][rangeType];
            break;
            default:
                if (InteractiveMap.isNight) {
                    radius = stats[unitClass].nightVision;
                }
                else {
                    radius = stats[unitClass].dayVision;
                }
                if (InteractiveMap.isDarkness) {
                    radius = Math.min(mapConstants.visionRadius.darkness, radius);
                }
            break;
        }
    }
    return radius;
}

InteractiveMap.getRangeCircle = function (feature, coordinate, rangeType) {
    var dotaProps = feature.get('dotaProps');
    var radius = InteractiveMap.getFeatureVisionRadius(feature, dotaProps, null, rangeType);
    if (radius == null) return null;
    if (!coordinate) {
        coordinate = worldToLatLon([dotaProps.x, dotaProps.y]);
    }
    var circle = new ol.Feature(new ol.geom.Circle(coordinate, getScaledRadius(radius)));
    return circle;
}

module.exports = InteractiveMap;