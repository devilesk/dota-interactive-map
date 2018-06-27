import View from 'ol/view';
import Map from 'ol/map';
import Collection from 'ol/collection';
import SourceVector from 'ol/source/vector';
import TileImage from 'ol/source/tileimage';
import LayerVector from 'ol/layer/vector';
import LayerTile from 'ol/layer/tile';
import LayerGroup from 'ol/layer/group';
import TileGrid from 'ol/tilegrid/tilegrid';
//import proj from 'ol/proj';
import control from 'ol/control';
import interaction from 'ol/interaction';
import Feature from 'ol/feature';
import Circle from 'ol/geom/circle';
import { pixelProj } from './projections';
import mapConstants from './mapConstants';
import styles from './styleDefinitions';
import { loadGeoJSON, loadJSON, loadLayerGroupFromData } from './dataLoader';
import getJSON from './util/getJSON';
import {getScaledRadius, worldToLatLon} from './conversion';
import baseLayerDefinitions from './baseLayerDefinitions';
import layerDefinitions from './layerDefinitions';

function InteractiveMap(map_tile_path) {
    var self = this;
    this.map_tile_path = map_tile_path;
    this.MODE = 'navigation';
    this.layerDefs = layerDefinitions;
    this.baseLayerDefs = baseLayerDefinitions;
    this.view = new View({
        zoom: 0,
        center: mapConstants.imgCenter,
        projection: pixelProj,
        resolutions: mapConstants.resolutions,
        extent: [0, 0, mapConstants.map_w, mapConstants.map_h]
    });
    this.data = {};
    this.layerIndex = {};
    this.version = '715';
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
    this.map = new Map({
        controls: control.defaults({ zoom: false, attribution: false, rotate: false }),
        interactions: interaction.defaults({altShiftDragRotate:false, pinchRotate:false}),
        target: 'map',
        view: this.view
    });
    
    this.highlightSource = new SourceVector({
        defaultDataProjection : 'pixel'
    });
    this.highlightLayer =  new LayerVector({
        source: this.highlightSource,
        style: styles.highlight
    });

    this.selectSource = new SourceVector({
        defaultDataProjection : 'pixel'
    });
    this.selectLayer =  new LayerVector({
        source: this.selectSource,
        style: styles.select
    });

    this.wardRangeSource = new SourceVector({
        defaultDataProjection : 'pixel'
    });
    this.wardRangeLayer =  new LayerVector({
        source: this.wardRangeSource
    });

    this.rangeSources = {
        dayVision: new SourceVector({
            defaultDataProjection : 'pixel'
        }),
        nightVision: new SourceVector({
            defaultDataProjection : 'pixel'
        }),
        trueSight: new SourceVector({
            defaultDataProjection : 'pixel'
        }),
        attackRange: new SourceVector({
            defaultDataProjection : 'pixel'
        })
    }
    this.rangeLayers = {
        dayVision: new LayerVector({
            source: this.rangeSources.dayVision,
            style: styles.dayVision
        }),
        nightVision: new LayerVector({
            source: this.rangeSources.nightVision,
            style: styles.nightVision
        }),
        trueSight: new LayerVector({
            source: this.rangeSources.trueSight,
            style: styles.trueSight
        }),
        attackRange: new LayerVector({
            source: this.rangeSources.attackRange,
            style: styles.attackRange
        })
    }

    // setup base layers
    this.baseLayers = this.baseLayerDefs.map(function (layerDef) {
        var layer = new LayerTile({
            title: layerDef.name,
            type: 'base',
            extent: pixelProj.getExtent(), //proj.pixel.getExtent()
            source: new TileImage({
                tileGrid: new TileGrid({
                    origin: [0, mapConstants.map_h],
                    resolutions: mapConstants.resolutions
                }),
                projection: pixelProj,
                url: self.map_tile_path + layerDef.group + '/' + layerDef.id + '/{z}/tile_{x}_{y}.jpg'
            }),
            visible: !!layerDef.visible
        });
        layer.set('layerId', layerDef.group + '-' + layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        return layer;
    });
    
    this.baseLayerGroup = new LayerGroup({
        title: 'Base Layers',
        layers: new Collection(this.baseLayers)
    });
}

InteractiveMap.prototype.getMapData = function (version) {
    return this.data[version || this.version] || {};
}

InteractiveMap.prototype.getData = function (version) {
    return this.getMapData(version).data || {};
}

InteractiveMap.prototype.getOverlayData = function (version) {
    return this.getData(version).data || {};
}

InteractiveMap.prototype.getStatData = function (version) {
    return this.getData(version).stats || {};
}

InteractiveMap.prototype.getMapLayerIndex = function (version) {
    version = version || this.version;
    if (!this.layerIndex[version]) this.layerIndex[version] = {};
    return this.layerIndex[version];
}

InteractiveMap.prototype.getMapLayer = function (layerId, version) {
    return this.getMapLayerIndex(version)[layerId];
}

InteractiveMap.prototype.getMapDataPath = function (version) {
    version = version || this.version;
    return 'data/' + version + '/mapdata.json';
}

InteractiveMap.prototype.setMapLayers = function (version, callback) {
    var self = this;
    this.getDataJSON(version, function (err, data) {
        if (!err) {
            var currentLayerGroup = self.map.getLayerGroup();
            currentLayerGroup.setVisible(false);
            self.map.setLayerGroup(data.layerGroup);
            self.map.getLayerGroup().setVisible(true);
        }
        if (callback) callback(err);
    });
}

InteractiveMap.prototype.getDataJSON = function (version, callback) {
    var self = this;
    if (this.data[version]) {
        callback(null, self.data[version]);
    }
    else {
        getJSON(self.getMapDataPath(version), function (err, data) {
            if (!err) {
                self.data[version] = {
                    data: data,
                    layerGroup: new LayerGroup({
                        title: version + ' Layers',
                        layers: new Collection([
                            self.baseLayerGroup,
                            loadLayerGroupFromData(self, data, version, self.getMapLayerIndex(version), self.layerDefs)
                        ])
                    })
                };
            }
            callback(err, self.data[version]);
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
    var unitStats = this.getStatData()[unitClass] || {};
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
        if (rangeType && !unitStats.hasOwnProperty(rangeType)) return null;
        
        switch (rangeType) {
            case 'dayVision':
            case 'nightVision':
                radius = unitStats[rangeType];
                if (this.isDarkness) {
                    radius = Math.min(mapConstants.visionRadius.darkness, radius);
                }
            case 'trueSight':
            case 'attackRange':
                radius = unitStats[rangeType];
            break;
            default:
                if (this.isNight) {
                    radius = unitStats.nightVision;
                }
                else {
                    radius = unitStats.dayVision;
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
    var circle = new Feature(new Circle(coordinate, getScaledRadius(radius)));
    return circle;
}

export default InteractiveMap;