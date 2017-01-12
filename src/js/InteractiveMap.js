var proj = require('./projections');
var ol = require('openlayers');
var mapConstants = require('./mapConstants');
var styles = require('./styleDefinitions');
var loadGeoJSON = require('./dataLoader').loadGeoJSON;
var loadJSON = require('./dataLoader').loadJSON;
var loadLayerGroupFromData = require('./dataLoader').loadLayerGroupFromData;
var getJSON = require('./util/getJSON');
var worldToLatLon = require('./conversionFunctions').worldToLatLon;
var getScaledRadius = require('./conversionFunctions').getScaledRadius;
var QueryString = require('./util/queryString');

function InteractiveMap(map_tile_path) {
    var self = this;
    this.map_tile_path = map_tile_path;
    this.MODE = 'navigation';
    this.layerDefs = require('./layerDefinitions');
    this.baseLayerDefs = require('./baseLayerDefinitions');
    this.view = new ol.View({
        zoom: 0,
        center: mapConstants.imgCenter,
        projection: proj.pixel,
        resolutions: mapConstants.resolutions,
        extent: [0, 0, mapConstants.map_w, mapConstants.map_h]
    });
    this.data = {};
    this.layerIndex = {};
    this.version = '700';
    this.visionRadius = mapConstants.visionRadius.observer;
    this.movementSpeed = mapConstants.defaultMovementSpeed;
    this.isNight = false;
    this.isDarkness = false;
    this.layerFilters = {
        marker: function(layer) {
            var layerDef = layer.get('layerDef');
            return layer.getVisible() && layerDef && (layerDef.group == 'structure' || layerDef.group == 'object');
        }
    };
    this.map = new ol.Map({
        controls: ol.control.defaults({ zoom: false, attribution: false, rotate: false }),
        interactions: ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false}),
        target: 'map',
        view: this.view
    });
    
    this.highlightSource = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    this.highlightLayer =  new ol.layer.Vector({
        source: this.highlightSource,
        style: styles.highlight
    });

    this.selectSource = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    this.selectLayer =  new ol.layer.Vector({
        source: this.selectSource,
        style: styles.select
    });

    this.wardRangeSource = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    this.wardRangeLayer =  new ol.layer.Vector({
        source: this.wardRangeSource
    });

    this.rangeSources = {
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
    this.rangeLayers = {
        dayVision: new ol.layer.Vector({
            source: this.rangeSources.dayVision,
            style: styles.dayVision
        }),
        nightVision: new ol.layer.Vector({
            source: this.rangeSources.nightVision,
            style: styles.nightVision
        }),
        trueSight: new ol.layer.Vector({
            source: this.rangeSources.trueSight,
            style: styles.trueSight
        }),
        attackRange: new ol.layer.Vector({
            source: this.rangeSources.attackRange,
            style: styles.attackRange
        })
    }

    // setup base layers
    this.baseLayers = this.baseLayerDefs.map(function (layerDef) {
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
                url: self.map_tile_path + layerDef.group + '/' + layerDef.id + '/{z}/tile_{x}_{y}.jpg'
            }),
            visible: !!layerDef.visible
        });
        layer.set('layerId', layerDef.group + '-' + layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        return layer;
    });
    
    this.baseLayerGroup = new ol.layer.Group({
        title: 'Base Layers',
        layers: new ol.Collection(this.baseLayers)
    });
}

InteractiveMap.prototype.getMapData = function (version) {
    return this.data[version || this.version];
}

InteractiveMap.prototype.getData = function (version) {
    return this.data[version || this.version].data;
}

InteractiveMap.prototype.getOverlayData = function (version) {
    return this.data[version || this.version].data.data;
}

InteractiveMap.prototype.getStatData = function (version) {
    return this.data[version || this.version].data.stats;
}

InteractiveMap.prototype.getMapLayerIndex = function (version) {
    version = version || this.version;
    if (!this.layerIndex[version]) this.layerIndex[version] = {};
    return this.layerIndex[version];
}

InteractiveMap.prototype.getMapDataPath = function (version) {
    version = version || this.version;
    return 'data/' + version + '/mapdata2.json';
}

InteractiveMap.prototype.setMapLayers = function (version, callback) {
    var self = this;
    this.getDataJSON(version, function (data) {
        var currentLayerGroup = self.map.getLayerGroup();
        currentLayerGroup.setVisible(false);
        self.map.setLayerGroup(data.layerGroup);
        self.map.getLayerGroup().setVisible(true);
        if (callback) callback();
    });
}

InteractiveMap.prototype.getDataJSON = function (version, callback) {
    var self = this;
    if (this.data[version]) {
        callback(self.data[version]);
    }
    else {
        getJSON(self.getMapDataPath(version), function (data) {
            self.data[version] = {
                data: data,
                layerGroup: new ol.layer.Group({
                    title: version + ' Layers',
                    layers: new ol.Collection([
                        self.baseLayerGroup,
                        loadLayerGroupFromData(self, data, version, self.getMapLayerIndex(version), self.layerDefs)
                    ])
                })
            };                
            callback(self.data[version]);
        });
    }
}

InteractiveMap.prototype.panTo = function (coordinate, duration) {
    if (duration == null) duration = 1000;
    this.view.animate({
      center: coordinate,
      duration: 1000
    });
}

InteractiveMap.prototype.checkAndHighlightWard = function (pixel) {
    var self = this;
    var feature = this.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        return feature;
    }, {
        layerFilter: self.wardControl.layerFilter
    });
    this.highlightWard(feature);
    return feature;
}

InteractiveMap.prototype.highlightWard = function (feature) {
    if (feature !== this.highlightedWard) {
        if (this.highlightedWard) {
            this.highlightedWard.setStyle(styles[this.highlightedWard.get('wardType')].normal);
        }
        if (feature) {
            feature.setStyle(styles[feature.get('wardType')][this.MODE == 'navigate' ? 'highlight' : 'remove']);
        }
        this.highlightedWard = feature;
    }
}

InteractiveMap.prototype.unhighlightWard = function () {
    if (this.highlightedWard) {
        this.highlightedWard.setStyle(styles[this.highlightedWard.get('wardType')].normal);
    }
    this.highlightedWard = null;
}

InteractiveMap.prototype.highlight = function (feature) {
    if (feature !== this.highlightedFeature) {
        if (this.highlightedFeature) {
            this.highlightSource.removeFeature(this.highlightedFeature);
        }
        if (feature) {
            this.highlightSource.addFeature(feature);
        }
        this.highlightedFeature = feature;
    }
}

InteractiveMap.prototype.unhighlight = function () {
    if (this.highlightedFeature) {
        this.highlightSource.removeFeature(this.highlightedFeature);
    }
    this.highlightedFeature = null;
}

InteractiveMap.prototype.toggle = function (feature) {    
    if (feature) {
        if (feature.get("clicked")) {
            this.deselect(feature);
            return false;
        }
        else {
            this.select(feature);
            return true;
        }
    }
}

InteractiveMap.prototype.select = function (feature) {    
    if (feature && !feature.get("clicked")) {
        if (feature == this.highlightedFeature) {
            this.unhighlight();
        }
        this.selectSource.addFeature(feature);
        feature.set("clicked", true, true);
    }
}

InteractiveMap.prototype.deselectAll = function () {
    this.selectSource.getFeatures().forEach(function (feature) {
        feature.set("clicked", false, true);
    });
    this.selectSource.clear();
}
InteractiveMap.prototype.deselect = function (feature) {
    if (feature && feature.get("clicked")) {
        if (feature == this.highlightedFeature) {
            this.unhighlight();
        }
        
        this.selectSource.removeFeature(feature);
        feature.set("clicked", false, true);
    }
}

InteractiveMap.prototype.hasVisionRadius = function (feature) {
    return this.getFeatureVisionRadius(feature) != null;
}

InteractiveMap.prototype.getFeatureVisionRadius = function (feature, dotaProps, unitClass, rangeType) {
    dotaProps = dotaProps || feature.get('dotaProps');
    unitClass = unitClass || dotaProps.unitClass;
    var stats = this.getStatData();
    var radius;
    if (unitClass == 'observer') {
        radius = this.visionRadius || mapConstants.visionRadius[unitClass];
        if (this.isDarkness) {
            radius = Math.min(mapConstants.visionRadius.darkness, radius);
        }
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
                if (this.isDarkness) {
                    radius = Math.min(mapConstants.visionRadius.darkness, radius);
                }
            case 'trueSight':
            case 'attackRange':
                radius = stats[unitClass][rangeType];
            break;
            default:
                if (this.isNight) {
                    radius = stats[unitClass].nightVision;
                }
                else {
                    radius = stats[unitClass].dayVision;
                }
                if (this.isDarkness) {
                    radius = Math.min(mapConstants.visionRadius.darkness, radius);
                }
            break;
        }
    }
    return radius;
}

InteractiveMap.prototype.getRangeCircle = function (feature, coordinate, unitClass, rangeType, radius) {
    var dotaProps = feature.get('dotaProps');
    var radius = radius || this.getFeatureVisionRadius(feature, dotaProps, unitClass, rangeType);
    if (radius == null) return null;
    if (!coordinate) {
        coordinate = worldToLatLon([dotaProps.x, dotaProps.y]);
    }
    var circle = new ol.Feature(new ol.geom.Circle(coordinate, getScaledRadius(radius)));
    return circle;
}

module.exports = InteractiveMap;