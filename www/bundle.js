(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var proj = require('./projections');
var ol = (typeof window !== "undefined" ? window['ol'] : typeof global !== "undefined" ? global['ol'] : null);
var mapConstants = require('./mapConstants');
var map_tile_path = "http://devilesk.com/media/images/map/";
var styles = require('./styleDefinitions');
var loadGeoJSON = require('./dataLoader').loadGeoJSON;
var loadJSON = require('./dataLoader').loadJSON;
var loadLayerGroupFromData = require('./dataLoader').loadLayerGroupFromData;
var getJSON = require('./util/getJSON');
var latLonToWorld = require('./conversionFunctions').latLonToWorld;
var worldToLatLon = require('./conversionFunctions').worldToLatLon;
var getScaledRadius = require('./conversionFunctions').getScaledRadius;
var QueryString = require('./util/queryString');
var getFeatureCenter = require('./util/getFeatureCenter');

var InteractiveMap = {
    MODE: 'navigation',
    layerDefs: require('./layerDefinitions'),
    baseLayerDefs: require('./baseLayerDefinitions'),
    view: new ol.View({
        zoom: 0,
        center: mapConstants.imgCenter,
        projection: proj.pixel,
        resolutions: mapConstants.resolutions,
        extent: [0, 0, mapConstants.map_w, mapConstants.map_h]
    }),
    data: {},
    layerIndex: {},
    version: '700',
    visionRadius: mapConstants.visionRadius.observer,
    movementSpeed: mapConstants.defaultMovementSpeed,
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

InteractiveMap.wardRangeSource = new ol.source.Vector({
    defaultDataProjection : 'pixel'
});
InteractiveMap.wardRangeLayer =  new ol.layer.Vector({
    source: InteractiveMap.wardRangeSource
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
                        loadLayerGroupFromData(InteractiveMap, data, version, InteractiveMap.getMapLayerIndex(version), InteractiveMap.layerDefs)
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

InteractiveMap.panTo = function (coordinate, duration) {
    if (duration == null) duration = 1000;
    InteractiveMap.view.animate({
      center: coordinate,
      duration: 1000
    });
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
            return false;
        }
        else {
            this.select(feature);
            return true;
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

InteractiveMap.hasVisionRadius = function (feature) {
    return InteractiveMap.getFeatureVisionRadius(feature) != null;
}

InteractiveMap.getFeatureVisionRadius = function (feature, dotaProps, unitClass, rangeType) {
    dotaProps = dotaProps || feature.get('dotaProps');
    unitClass = unitClass || dotaProps.unitClass;
    var stats = InteractiveMap.getStatData();
    var radius;
    if (unitClass == 'observer') {
        radius = InteractiveMap.visionRadius || mapConstants.visionRadius[unitClass];
        if (InteractiveMap.isDarkness) {
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

InteractiveMap.getRangeCircle = function (feature, coordinate, unitClass, rangeType, radius) {
    var dotaProps = feature.get('dotaProps');
    var radius = radius || InteractiveMap.getFeatureVisionRadius(feature, dotaProps, unitClass, rangeType);
    if (radius == null) return null;
    if (!coordinate) {
        coordinate = worldToLatLon([dotaProps.x, dotaProps.y]);
    }
    var circle = new ol.Feature(new ol.geom.Circle(coordinate, getScaledRadius(radius)));
    return circle;
}

module.exports = InteractiveMap;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./baseLayerDefinitions":2,"./conversionFunctions":12,"./dataLoader":13,"./layerDefinitions":17,"./mapConstants":18,"./projections":19,"./styleDefinitions":20,"./util/getFeatureCenter":23,"./util/getJSON":24,"./util/queryString":25}],2:[function(require,module,exports){
(function (global){
var ol = (typeof window !== "undefined" ? window['ol'] : typeof global !== "undefined" ? global['ol'] : null);

var layerDefinitions = [
    {
        id: 'default',
        name: 'Default',
        group: '700'
    },
    {
        id: 'journey',
        name: 'New Journey',
        group: '700'
    },
    {
        id: 'default',
        name: 'Default',
        group: '687'
    },
    {
        id: 'desert',
        name: 'Desert',
        group: '687'
    },
    {
        id: 'immortalgardens',
        name: 'Immortal Gardens',
        group: '687'
    }
];

module.exports = layerDefinitions;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
var mapConstants = require('./../mapConstants');
var styles = require('./../styleDefinitions');

function CreepControl(InteractiveMap) {
    this.InteractiveMap = InteractiveMap;
    this.postComposeListener = null;
    this.postComposeHandler = this.animateCreeps.bind(this);
    this.playbackSpeed = 1;
    this.paused = true;
    this.pauseTime = null;
    this.title = 'Lane Animation';
}

CreepControl.prototype.show = function (message) {
    console.log('show', message);
    this.setContent(message);
    this.info.classList.remove('slideUp');
    this.info.classList.add('slideDown');
}

CreepControl.prototype.setContent = function (html) {
    this.infoContent.innerHTML = html;
}

CreepControl.prototype.open = function () {
    this.info.classList.add('slideDown');
    this.info.classList.remove('slideUp');
}

CreepControl.prototype.close = function () {
    this.info.classList.add('slideUp');
    this.info.classList.remove('slideDown');
}

CreepControl.prototype.initialize = function (id) {
    var self = this;
    this.id = id;
    this.info = document.getElementById(id);
    this.infoContent = document.querySelector('#timer-time');
    this.playPauseBtn = document.querySelector('#timer-playPause');
    this.playPauseHandler = function (evt) {
        self.playPause.call(self, true);
    }
    this.playPauseBtn.addEventListener('click', this.playPauseHandler, false);
    
    this.stopBtn = document.querySelector('#timer-stop');
    this.stopHandler = function (evt) {
        self.stop.call(self, true);
    }
    this.stopBtn.addEventListener('click', this.stopHandler, false);
    
    this.fasterBtn = document.querySelector('#timer-faster');
    this.fasterHandler = function (evt) {
        self.faster.call(self, true);
    }
    this.fasterBtn.addEventListener('click', this.fasterHandler, false);
    
    this.slowerBtn = document.querySelector('#timer-slower');
    this.slowerHandler = function (evt) {
        self.slower.call(self, true);
    }
    this.slowerBtn.addEventListener('click', this.slowerHandler, false);
}

CreepControl.prototype.slower = function () {
    var oldVal = this.playbackSpeed;
    this.playbackSpeed = Math.max(1, this.playbackSpeed - 1);
    this.updatePlayback(oldVal, this.playbackSpeed);
    console.log(this.playbackSpeed);
}

CreepControl.prototype.faster = function () {
    var oldVal = this.playbackSpeed;
    this.playbackSpeed += 1;
    this.updatePlayback(oldVal, this.playbackSpeed);
    console.log(this.playbackSpeed);
}

CreepControl.prototype.updatePlayback = function (oldVal, newVal) {
    var features = this.InteractiveMap.getMapLayerIndex()['npc_dota_spawner'].getSource().getFeatures();
    var elapsedTime = this.currentTime - this.startTime;
    var adjustedElapsedTime = elapsedTime * oldVal / newVal;
    this.startTime = this.currentTime - adjustedElapsedTime;
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        var waveTimes = feature.get('waveTimes');
        if (waveTimes) {
            var j = waveTimes.length;
            while (j--) {
                var elapsedTime = this.currentTime - waveTimes[j];
                var adjustedElapsedTime = elapsedTime * oldVal / newVal;
                waveTimes[j] = this.currentTime - adjustedElapsedTime;
            }
        }
    }
}

CreepControl.prototype.start = function () {
    if (!this.postComposeListener) {
        console.log('activate');
        this.postComposeListener = this.InteractiveMap.map.on('postcompose', this.postComposeHandler);
    }
    if (this.paused) this.playPause();
    this.InteractiveMap.map.render();
}

CreepControl.prototype.stop = function () {
    ol.Observable.unByKey(this.postComposeListener);
    this.postComposeListener = null;
    var features = this.InteractiveMap.getMapLayerIndex()['npc_dota_spawner'].getSource().getFeatures();
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        feature.set('waveTimes', null, true);
    }
    this.startTime = null;
    if (!this.paused) this.playPause();
    this.pauseTime = null;
    this.InteractiveMap.map.render();
    this.setContent(this.title);
}

CreepControl.prototype.playPause = function () {
    console.log('playPause', this.paused);
    this.paused = !this.paused;
    if (this.paused) {
        this.playPauseBtn.classList.add('icon-play');
        this.playPauseBtn.classList.remove('icon-pause');
    }
    else {
        this.playPauseBtn.classList.add('icon-pause');
        this.playPauseBtn.classList.remove('icon-play');
        this.start();
    }
}

CreepControl.prototype.activate = function () {
    this.InteractiveMap.toggleLayerMenuOption('npc_dota_spawner', true);
    this.InteractiveMap.toggleLayerMenuOption('path_corner', true);
    this.show(this.title);
}

CreepControl.prototype.deactivate = function () {
    this.InteractiveMap.toggleLayerMenuOption('npc_dota_spawner', false);
    this.InteractiveMap.toggleLayerMenuOption('path_corner', false);
    this.stop();
    this.close();
}

function getDistance(speed, elapsedTime) {
    return speed * elapsedTime / 1000 * mapConstants.scale;
}

function getElapsedDistance(id, elapsedTime, playbackSpeed, bNoAdjust) {
    elapsedTime = elapsedTime * playbackSpeed;
    var base = mapConstants.creepBaseMovementSpeed;
    if (bNoAdjust) return getDistance(base, elapsedTime);
    switch (id) {
        case 'npc_dota_spawner_good_bot':
            if (elapsedTime < 10000) {
                return getDistance(base * 1.25, elapsedTime);
            }
            else {
                return getDistance(base * 1.25, 10000) + getDistance(base, elapsedTime - 10000);
            }
        break;
        case 'npc_dota_spawner_bad_top':
            if (elapsedTime < 2000) {
                return getDistance(base * 1.25, elapsedTime);
            }
            else {
                return getDistance(base * 1.25, 2000) + getDistance(base, elapsedTime - 2000);
            }
        break;
        case 'npc_dota_spawner_good_top':
            if (elapsedTime < 2000) {
                return getDistance(base * 0.75, elapsedTime);
            }
            else {
                return getDistance(base * 0.75, 2000) + getDistance(base, elapsedTime - 2000);
            }
        break;
        case 'npc_dota_spawner_bad_bot':
            if (elapsedTime < 22000) {
                return getDistance(base * 0.75, elapsedTime);
            }
            else {
                return getDistance(base * 0.75, 22000) + getDistance(base, elapsedTime - 22000);
            }
        break;
        default:
            return getDistance(base, elapsedTime);
        break;
    }
}

CreepControl.prototype.animateCreeps = function (event) {
    var vectorContext = event.vectorContext;
    var frameState = event.frameState;
    this.currentTime = frameState.time;
    var features = this.InteractiveMap.getMapLayerIndex()['npc_dota_spawner'].getSource().getFeatures();
    var pathLayer = this.InteractiveMap.getMapLayerIndex()['path_corner'];
    if (!this.startTime) this.startTime = this.currentTime;
    if (this.paused) {
        if (this.pauseTime == null) this.pauseTime = frameState.time;
        this.currentTime = this.pauseTime;
    }
    else {
        if (this.pauseTime != null) {
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                var waveTimes = feature.get('waveTimes');
                if (waveTimes) {
                    var j = waveTimes.length;
                    while (j--) {
                        waveTimes[j] += (this.currentTime - this.pauseTime);
                    }
                }
            }
            this.startTime += (this.currentTime - this.pauseTime);
            this.pauseTime = null;
        }
    }
    //console.log('InteractiveMap.getMapLayerIndex()', InteractiveMap.getMapLayerIndex());
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        var id = feature.getId();
        var pathFeature = pathLayer.getSource().getFeatureById(id);
        //console.log('npc_dota_spawner feature', feature, pathFeature);
        var waveTimes = feature.get('waveTimes');
        if (!waveTimes) {
            waveTimes = [this.currentTime];
            feature.set('waveTimes', waveTimes, true);
        }
        if (this.currentTime - waveTimes[waveTimes.length - 1] >= 30000 / this.playbackSpeed) {
            waveTimes.push(this.currentTime);
        }
        var j = waveTimes.length;
        while (j--) {                
            var path = feature.get('path');
            if (!path) {
                var path = pathFeature.getGeometry().clone();
                var coords = path.getCoordinates();
                coords[0] = feature.getGeometry().getCoordinates();
                path.setCoordinates(coords);
                feature.set('path', path, true);
            }
            var pathLength = path.getLength();
            var coords = path.getCoordinates();
            var elapsedTime = this.currentTime - waveTimes[j];
            var elapsedDistance = getElapsedDistance(id, elapsedTime, this.playbackSpeed);
            var elapsedFraction = Math.max(0, elapsedDistance / pathLength);
            if (elapsedFraction >= 1) {
                var endPoint = coords[coords.length - 1];
                waveTimes.splice(j, 1);
            }
            else {
                var endPoint = path.getCoordinateAt(elapsedFraction);
            }

            var point = new ol.geom.Circle(endPoint);
            vectorContext.setStyle(styles.creepColor(feature));
            vectorContext.drawCircle(point);
        }
    }
    var timeText = (((this.currentTime - this.startTime) % (60000 / this.playbackSpeed)) / 1000 * this.playbackSpeed).toFixed(1) + 's';
    if (this.playbackSpeed > 1) timeText += ', ' + this.playbackSpeed + 'x'
    this.setContent(timeText);
    frameState.animate = true;
}

module.exports = CreepControl;
},{"./../mapConstants":18,"./../styleDefinitions":20}],4:[function(require,module,exports){
(function (global){
var ol = (typeof window !== "undefined" ? window['ol'] : typeof global !== "undefined" ? global['ol'] : null);
var styles = require('./../styleDefinitions');

function CursorControl(InteractiveMap) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.source = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    this.layer =  new ol.layer.Vector({
        source: this.source,
        style: styles.cursor
    });
    this.layerFilter = function(layer) {
        return layer === self.layer;
    }
}


module.exports = CursorControl;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./../styleDefinitions":20}],5:[function(require,module,exports){
var getPopupContent = require('./../getPopupContent');
var styles = require('./../styleDefinitions');
var mapConstants = require('./../mapConstants');
var worldToLatLon = require('./../conversionFunctions').worldToLatLon;
var createCirclePointCoords = require('./../util/createCirclePointCoords');

function InfoControl(InteractiveMap) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    //this.highlight = null;
    this.lastPointerMoveTime = Date.now();
    this.pointerMoveHandler = function (evt) {
        // When user was dragging map, then coordinates didn't change and there's
        // no need to continue
        if (evt.dragging) {
            return;
        }

        var pixel = self.InteractiveMap.map.getEventPixel(evt.originalEvent);
        
        // if mouse over a building feature, show info and highlight
        var feature = self.InteractiveMap.map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
        }, {
            layerFilter: self.InteractiveMap.layerFilters.marker
        });
        if (feature) {
            if (!self.isActive()) {
                self.displayFeatureInfo(feature, false);
            }
            console.log(self);
            self.highlight(feature);
        }
        else {
            self.close(false);
    
            // if mouse over a ward feature, highlight
            var feature = self.InteractiveMap.checkAndHighlightWard(pixel);
            
            if (feature) {
                self.InteractiveMap.wardControl.showVisibilityInfo(feature.get('visionFeature'));
            }
            // no highlighted feature so unhighlight current feature
            else if (!self.isActive()) {
                self.unhighlight();
            }
        }
    }
    this.pointerMoveListener = null;
    
    this.clickHandler = function (evt) {
        self.unhighlight();
        var feature = self.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return feature;
        }, {
            layerFilter: self.InteractiveMap.layerFilters.marker
        });
        if (feature) {
            if (!feature.get("clicked")) {
                self.InteractiveMap.deselectAll();
                var dotaProps = feature.get('dotaProps');
                if (feature.get('dotaProps').id == "ent_dota_tree") {
                    self.InteractiveMap.treeControl.toggleTree(feature, dotaProps);
                }
                else {
                    self.displayFeatureInfo(feature, true);
                    self.select(feature);
                    self.InteractiveMap.panTo(evt.coordinate);
                }
            }
            else {
                self.InteractiveMap.deselectAll();
                self.close(true);
            }
        }
        else {
            // if clicked a ward feature, highlight
            var feature = self.InteractiveMap.checkAndHighlightWard(evt.pixel);
            
            if (feature) {
                var visionFeature = feature.get('visionFeature');
                if (visionFeature) {
                    self.InteractiveMap.wardControl.showVisibilityInfo(feature.get('visionFeature'), true);
                }
                else {
                    self.close(true);
                }
                self.InteractiveMap.panTo(evt.coordinate);
            }
            // no highlighted feature so unhighlight current feature
            else if (!self.isActive()) {
                self.unhighlight();            
                self.close(true);
            }
            self.InteractiveMap.deselectAll();
        }
    }
    this.clickListener = null;
}

InfoControl.prototype.activate = function () {
    if (!this.pointerMoveListener) {
        this.pointerMoveListener = this.InteractiveMap.map.on('pointermove', this.pointerMoveHandler);
    }
    if (!this.clickListener) {
        this.clickListener = this.InteractiveMap.map.on('click', this.clickHandler);
    }
}

InfoControl.prototype.deactivate = function () {
    this.InteractiveMap.unhighlightWard();
    ol.Observable.unByKey(this.pointerMoveListener);
    this.pointerMoveListener = null;
    ol.Observable.unByKey(this.clickListener);
    this.clickListener = null;
}

InfoControl.prototype.setContent = function (html) {
    this.infoContent.innerHTML = html;
}

InfoControl.prototype.isActive = function () {
    return this.info.classList.contains('active');
}

InfoControl.prototype.open = function (bClicked) {
    this.info.classList.add('slideUp');
    this.info.classList.remove('slideDown');
    if (bClicked) {
        this.info.classList.add('active');
    }
}

InfoControl.prototype.close = function (bOverrideActive) {
    if (!this.isActive() || bOverrideActive) {
        this.info.classList.add('slideDown');
        this.info.classList.remove('slideUp');
        this.info.classList.remove('active');
    }
}

InfoControl.prototype.initialize = function (id) {
    var self = this;
    this.id = id;
    this.info = document.getElementById(id);
    this.infoContent = document.querySelector('#' + id + ' .message-content');
    this.closeBtn = document.querySelector('#' + id + ' .btn-close');
    this.closeHandler = function (evt) {
        self.close.call(self, true);
    }
    this.closeBtn.addEventListener('click', this.closeHandler, false);
}

InfoControl.prototype.displayFeatureInfo = function (feature, bClicked) {
    this.setContent(getPopupContent(this.InteractiveMap.getMapData(), feature));
    this.open(bClicked);
};

InfoControl.prototype.unhighlight = function (feature) {
    var highlightedFeature = feature || this.InteractiveMap.highlightedFeature;
    if (highlightedFeature && !highlightedFeature.get("clicked")) {
        var dotaProps = highlightedFeature.get('dotaProps');
        if (dotaProps) {
            if (dotaProps.id == 'npc_dota_neutral_spawner') {
                var pullRange = highlightedFeature.get('pullRange');
                if (pullRange) {
                    console.log('unhighlight', highlightedFeature, pullRange);
                    this.InteractiveMap.getMapLayerIndex()['pullRange'].getSource().removeFeature(pullRange);
                    highlightedFeature.set("pullRange", null, true);
                }
                var guardRange = highlightedFeature.get('guardRange');
                if (guardRange) {
                    console.log('unhighlight', highlightedFeature, guardRange);
                    this.InteractiveMap.getMapLayerIndex()['pullRange'].getSource().removeFeature(guardRange);
                    highlightedFeature.set("guardRange", null, true);
                }
            }
        }
    }
    this.InteractiveMap.unhighlight();
}

InfoControl.prototype.highlight = function (feature) {
    this.unhighlight();
    var dotaProps = feature.get('dotaProps');
    if (dotaProps) {
        if (dotaProps.id == 'npc_dota_neutral_spawner') {
            if (!feature.get('pullRange')) {
                var circle = this.InteractiveMap.getRangeCircle(feature, null, null, null, 400);
                feature.set("guardRange", circle, true);
                this.InteractiveMap.getMapLayerIndex()['pullRange'].getSource().addFeature(circle);
                
                var center = worldToLatLon([dotaProps.x, dotaProps.y]);
                var pullTiming = mapConstants.pullRangeTiming[dotaProps.pullType];
                var pullMaxCoords = createCirclePointCoords(center[0], center[1], 400 + pullTiming * 350, 360);
                var pullMinCoords = createCirclePointCoords(center[0], center[1], 400 + pullTiming * 270, 360);
                var geom = new ol.geom.Polygon([pullMaxCoords]);
                geom.appendLinearRing(new ol.geom.LinearRing(pullMinCoords));
                var circle = new ol.Feature(geom);
                feature.set("pullRange", circle, true);
                console.log('unhighlight', feature, circle);
                this.InteractiveMap.getMapLayerIndex()['pullRange'].getSource().addFeature(circle);
            }
        }
    }
    this.InteractiveMap.highlight(feature);
}

InfoControl.prototype.select = function (feature) {    
    if (feature && !feature.get("clicked")) {
        if (feature == this.InteractiveMap.highlightedFeature) {
            this.unhighlight();
        }
        this.InteractiveMap.selectSource.addFeature(feature);
        feature.set("clicked", true, true);
    }
}

module.exports = InfoControl;
},{"./../conversionFunctions":12,"./../getPopupContent":15,"./../mapConstants":18,"./../styleDefinitions":20,"./../util/createCirclePointCoords":21}],6:[function(require,module,exports){
var styles = require('./../styleDefinitions');

function MeasureControl(InteractiveMap) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.map = InteractiveMap.map;
    this.info = InteractiveMap.infoControl;
    this.source = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    
    this.layer =  new ol.layer.Vector({
        source: this.source
    });

    /**
     * Currently drawn feature.
     * @type {ol.Feature}
     */
    var sketch;

    /**
     * The help tooltip element.
     * @type {Element}
     */
    var helpTooltipElement;

    /**
     * Overlay to show the help messages.
     * @type {ol.Overlay}
     */
    var helpTooltip;

    /**
     * The measure tooltip element.
     * @type {Element}
     */
    var measureTooltipElement;

    /**
     * Overlay to show the measurement.
     * @type {ol.Overlay}
     */
    var measureTooltip;
    
    /**
     * Message to show when the user is drawing a polygon.
     * @type {string}
     */
    var continuePolygonMsg = 'Click to continue drawing the polygon';
    
    /**
     * Message to show when the user is drawing a line.
     * @type {string}
     */
    var continueLineMsg = 'Click to continue drawing the line';
    
    /**
     * Handle pointer move.
     * @param {ol.MapBrowserEvent} evt The event.
     */
    var pointerMoveHandler = function(evt) {
        if (evt.dragging) {
            return;
        }
        /** @type {string} */
        var helpMsg = 'Click to start drawing';

        if (sketch) {
            var geom = (sketch.getGeometry());
            if (geom instanceof ol.geom.Polygon) {
                helpMsg = continuePolygonMsg;
            } else if (geom instanceof ol.geom.LineString) {
                helpMsg = continueLineMsg;
            }
        }

        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);

        helpTooltipElement.classList.remove('hidden');
    };
    
    var pointerMoveListener;
    var mouseOutHandler = function() {
        helpTooltipElement.classList.add('hidden');
    };

    this.type = 'line';

    var draw; // global so we can remove it later


    /**
     * Format length output.
     * @param {ol.geom.LineString} line The line.
     * @return {string} The formatted length.
     */
    var formatLength = function(line) {
        var length = Math.round(line.getLength());
        var output;
        output = 'Distance: ' + length + ' ' + 'units<br>Travel Time: ' + (length / self.InteractiveMap.movementSpeed).toFixed(2) + 's at ' + self.InteractiveMap.movementSpeed + 'ms';
        return output;
    };
    
    var formatRadius = function(circle) {
        var length = Math.round(circle.getRadius());
        var output;
        output = 'Radius: ' + length + ' ' + 'units<br>Area: ' + (Math.PI * length * length).toFixed(2) + ' units<sup>2</sup>';
        return output;
    };


    /**
     * Format area output.
     * @param {ol.geom.Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    var formatArea = function(polygon) {
        var area = polygon.getArea();
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    };
    var self = this;
    function addInteraction() {
        var type = (self.type == 'circle' ? 'Circle' : 'LineString');
        draw = new ol.interaction.Draw({
            source: self.source,
            type: /** @type {ol.geom.GeometryType} */ (type),
            style: styles.measure
        });
        self.map.addInteraction(draw);

        //createMeasureTooltip();
        createHelpTooltip();

        var listener;
        draw.on('drawstart',
            function(evt) {
                self.source.clear(true);
                self.info.setContent("");
                self.info.close(true);
                // set sketch
                sketch = evt.feature;
                /** @type {ol.Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function(evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof ol.geom.Circle) {
                        output = formatRadius(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    } else if (geom instanceof ol.geom.LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    self.info.setContent(output);
                    self.info.open(true);
                    //measureTooltipElement.innerHTML = output;
                    //measureTooltip.setPosition(tooltipCoord);
                });
            }, self);

        draw.on('drawend',
            function() {
                //measureTooltipElement.className = 'tooltip tooltip-static';
                //measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                //measureTooltipElement = null;
                //createMeasureTooltip();
                ol.Observable.unByKey(listener);
            }, self);
    }


    /**
     * Creates a new help tooltip
     */
    function createHelpTooltip() {
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'tooltip hidden';
        helpTooltip = new ol.Overlay({
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        self.map.addOverlay(helpTooltip);
    }


    /**
     * Creates a new measure tooltip
     */
    function createMeasureTooltip() {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'tooltip tooltip-measure';
        measureTooltip = new ol.Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        self.map.addOverlay(measureTooltip);
    }

    this.change = function (type) {
        self.type = type;
        ol.Observable.unByKey(pointerMoveListener);
        self.map.getViewport().removeEventListener('mouseout', mouseOutHandler);
        self.map.removeInteraction(draw);
        self.source.clear(true);
        addInteraction.call(this);
        this.active = true;
    }
    
    this.active = false;
    this.activate = function () {
        if (!this.active) {
            pointerMoveListener = self.map.on('pointermove', pointerMoveHandler);
            self.map.getViewport().addEventListener('mouseout', mouseOutHandler);
            addInteraction();
        }
        this.active = true;
    }
    
    this.deactivate = function () {
        ol.Observable.unByKey(pointerMoveListener);
        self.map.getViewport().removeEventListener('mouseout', mouseOutHandler);
        self.map.removeInteraction(draw);
        self.source.clear(true);
        this.active = false;
    }
}

module.exports = MeasureControl;
},{"./../styleDefinitions":20}],7:[function(require,module,exports){
function MenuPanel(panelId, openId, closeId, fullscreen) {
    this.panelId = panelId;
    this.openId = openId;
    this.closeId = closeId;
    this.fullscreen = fullscreen;
    this.initialize();
}
MenuPanel.prototype.initialize = function () {
    this.panel = document.getElementById(this.panelId);
    this.openBtn = document.getElementById(this.openId);
    this.closeBtn = document.getElementById(this.closeId);
    
    this.openBtn.addEventListener("click", this.open.bind(this), false);
    this.closeHandler = this.close.bind(this);
    this.closeBtn.addEventListener("click", this.closeHandler, false);
}
MenuPanel.prototype.open = function (evt) {
    this.panel.classList.add('expand-horizontal');
    this.panel.classList.remove('collapsed-horizontal');
    this.openBtn.classList.add('collapsed-horizontal');
    this.openBtn.classList.remove('expand-horizontal');
    this.otherMenu.close(evt);
}
MenuPanel.prototype.close = function (evt) {
    this.panel.classList.remove('expand-horizontal');
    this.panel.classList.add('collapsed-horizontal');
    this.openBtn.classList.remove('collapsed-horizontal');
    this.openBtn.classList.add('expand-horizontal');
    console.log('menu close', evt);
}
MenuPanel.prototype.createToggle = function (layerDef, handler) {
    var toggle = document.createElement('div');
        toggle.classList.add('btn-toggle');
        
    var toggleCb = document.createElement('input');
        toggleCb.setAttribute("type", "checkbox");
        toggleCb.id = 'toggle-' + layerDef.id;
        toggleCb.addEventListener("change", handler, false);
    toggle.appendChild(toggleCb);

    var toggleLbl = document.createElement('label');
        toggleLbl.setAttribute("for", toggleCb.id);
    toggle.appendChild(toggleLbl);
    
    return toggle;
}
MenuPanel.prototype.createMenuPanelItem = function (InteractiveMap, layerDef, handler, inputType, inputName) {
    var optionId = layerDef.id;
    
    var menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.classList.add(inputName || 'data-layer');
        
    var menuItemCb = document.createElement('input');
        menuItemCb.setAttribute("type", inputType || "checkbox");
        if (inputType == "radio") {
            optionId = layerDef.group + '-' + layerDef.id;
            menuItemCb.setAttribute("name", inputName);
            menuItemCb.setAttribute("value", optionId);
        }
        menuItemCb.id = 'option-' + optionId;
        menuItemCb.setAttribute("data-layer-id", optionId);
        menuItemCb.addEventListener("change", handler, false);
    menuItem.appendChild(menuItemCb);
    
    var menuItemLbl = document.createElement('label');
        menuItemLbl.classList.add('checkbox');
        menuItemLbl.setAttribute("for", menuItemCb.id);
        menuItemLbl.innerHTML = layerDef.name;
    menuItem.appendChild(menuItemLbl);
    
    if (layerDef.toggle) {
        function toggleHandler() {
            console.log('toggled', layerDef);
            var layer = InteractiveMap.getMapLayerIndex()[layerDef.id];
            if (layerDef.id == 'ent_dota_tree') {
                InteractiveMap.treeControl.toggleAllTrees(this.checked);
            }
            else {
                InteractiveMap.wardControl.toggleAll(layer, this.checked);
            }
        }
        var toggle = MenuPanel.prototype.createToggle(layerDef, toggleHandler);
        menuItem.appendChild(toggle);
    }
    
    return menuItem;
}

function MenuControl(InteractiveMap) {
    this.InteractiveMap = InteractiveMap;
    this.leftPanel = new MenuPanel("menu-left", "menu-left-open-btn", "menu-left-close-btn");
    this.rightPanel = new MenuPanel("menu-right", "menu-right-open-btn", "menu-right-close-btn");
    this.leftPanel.otherMenu = this.rightPanel;
    this.rightPanel.otherMenu = this.leftPanel;
}
MenuControl.prototype.initialize = function (layerToggleHandler, baseLayerToggleHandler) {
    var self = this;
    this.InteractiveMap.layerDefs.forEach(function (layerDef) {
        var group = layerDef.group;
        var menu = document.querySelector('#' + group + '-menu');
        var menuItem = MenuPanel.prototype.createMenuPanelItem(self.InteractiveMap, layerDef, layerToggleHandler);
        menu.appendChild(menuItem);
    });

    this.InteractiveMap.baseLayerDefs.forEach(function (layerDef) {
        var group = layerDef.group;
        var menu = document.querySelector('#base-' + group + '-menu');
        var menuItem = MenuPanel.prototype.createMenuPanelItem(self.InteractiveMap, layerDef, baseLayerToggleHandler, 'radio', 'base-layer');
        menu.appendChild(menuItem);
    });
}

module.exports = MenuControl;
},{}],8:[function(require,module,exports){
var styles = require('./../styleDefinitions');

function NotificationControl() {
    this.timer = null;
}

NotificationControl.prototype.show = function (message) {
    this.setContent(message);
    this.info.classList.remove('slideUp');
    this.info.classList.add('slideDown');
    clearTimeout(this.timer);
    var self = this;
    this.timer = setTimeout(function () {
        self.info.classList.add('slideUp');
        self.info.classList.remove('slideDown');
    }, 1500);
}

NotificationControl.prototype.setContent = function (html) {
    this.infoContent.innerHTML = html;
}

NotificationControl.prototype.open = function () {
    this.info.classList.add('slideDown');
    this.info.classList.remove('slideUp');
}

NotificationControl.prototype.close = function () {
    this.info.classList.add('slideUp');
    this.info.classList.remove('slideDown');
}

NotificationControl.prototype.initialize = function (id) {
    var self = this;
    this.id = id;
    this.info = document.getElementById(id);
    this.infoContent = document.querySelector('#' + id + ' .message-content');
}

module.exports = NotificationControl;
},{"./../styleDefinitions":20}],9:[function(require,module,exports){
var QueryString = require('./../util/queryString');

function TreeControl(InteractiveMap) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.allTreesCutState = false;
}

TreeControl.prototype.updateQueryString = function () {
    var self = this;
    var keys = ['cut_trees', 'uncut_trees'];
    var layer = this.InteractiveMap.getMapLayerIndex()['ent_dota_tree'];
    var source = layer.getSource();
    var features = source.getFeatures();
    var values = features.filter(function (feature) {
        return !!feature.get('isCut') != self.allTreesCutState;
    }).map(function (feature) {
        var dotaProps = feature.get('dotaProps');
        return dotaProps.x + ',' + dotaProps.y;
    }).join(';');
    QueryString.setQueryString(keys[this.allTreesCutState ? 1 : 0], values || null);
    QueryString.setQueryString(keys[this.allTreesCutState ? 0 : 1], null);
    document.getElementById('toggle-ent_dota_tree').checked = this.allTreesCutState;
}

TreeControl.prototype.parseQueryString = function () {
    var self = this;
    var layer = this.InteractiveMap.getMapLayerIndex()['ent_dota_tree'];
    var source = layer.getSource();
    var features = source.getFeatures();
    var treeMap = {};
    features.forEach(function (feature) {
        var dotaProps = feature.get('dotaProps');
        var worldXY = dotaProps.x + ',' + dotaProps.y;
        treeMap[worldXY] = feature;
    });
    ['uncut_trees', 'cut_trees'].forEach(function (treeCutState, index) {
        var values = QueryString.getParameterByName(treeCutState);
        if (values) {
            console.log(treeCutState, values, index, !index);
            self.toggleAllTrees(!index, true);
            values = values.split(';');
            values.forEach(function (worldXY) {
                var feature = treeMap[worldXY];
                if (feature) {
                    if (!!feature.get('isCut') == !index) {
                        self.toggleTree(feature, feature.get('dotaProps'), true)
                    }
                }
            });
        }
    });
    this.updateQueryString();
}

TreeControl.prototype.toggleTree = function (feature, dotaProps, bSkipQueryStringUpdate) {
    var gridXY = this.InteractiveMap.vs.WorldXYtoGridXY(dotaProps.x, dotaProps.y);
    this.InteractiveMap.vs.toggleTree(gridXY.x, gridXY.y);
    feature.set('isCut', !feature.get('isCut'));
    if (!bSkipQueryStringUpdate) this.updateQueryString();
}

TreeControl.prototype.toggleAllTrees = function (state, bSkipQueryStringUpdate) {
    var self = this;
    this.allTreesCutState = state;
    var layer = this.InteractiveMap.getMapLayerIndex()['ent_dota_tree'];
    var source = layer.getSource();
    var features = source.getFeatures();
    features.forEach(function (feature) {
        if (!!feature.get('isCut') != state) {
            self.toggleTree(feature, feature.get('dotaProps'), true);
        }
    });
    if (!bSkipQueryStringUpdate) this.updateQueryString();
}

module.exports = TreeControl;
},{"./../util/queryString":25}],10:[function(require,module,exports){
(function (global){
var ol = (typeof window !== "undefined" ? window['ol'] : typeof global !== "undefined" ? global['ol'] : null);
var latLonToWorld = require('./../conversionFunctions').latLonToWorld;
var worldToLatLon = require('./../conversionFunctions').worldToLatLon;
var getTileRadius = require('./../conversionFunctions').getTileRadius;
var getLightUnion = require('./../getLightUnion');
var styles = require('./../styleDefinitions');

function VisionControl(InteractiveMap) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.vs = InteractiveMap.vs;
    this.source = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    this.layer =  new ol.layer.Vector({
        source: this.source,
        style: styles.visionSimulation
    });
}

VisionControl.prototype.getVisionFeature = function (feature, coordinate, radius) {
    var vs = this.vs;

    // get coordinate from feature if not provided
    var worldCoordinate;
    if (!coordinate) {
        var dotaProps = feature.get('dotaProps');
        worldCoordinate = [dotaProps.x, dotaProps.y];
    }
    else {
        worldCoordinate = latLonToWorld(coordinate);
    }
    
    // get radius from feature if not provided
    radius = radius || this.InteractiveMap.getFeatureVisionRadius(feature, dotaProps)
    console.log('getVisionFeature', radius);
    if (radius == null) return;
    
    var gridXY = vs.WorldXYtoGridXY(worldCoordinate[0], worldCoordinate[1]);
    if (vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
        vs.updateVisibility(gridXY.x, gridXY.y, getTileRadius(radius));
        
        var outlines = getLightUnion(vs.grid, vs.lights).map(function (ring) {
            return ring.map(function (point) {
                var worldXY = vs.GridXYtoWorldXY(point.x, point.y);
                return worldToLatLon([worldXY.x, worldXY.y]);
            })
        });
        var multiPolygon = new ol.geom.MultiPolygon([outlines], 'XY');
        var feature = new ol.Feature({
            geometry: multiPolygon
        });
        feature.set('visionData', {
            area: vs.area,
            lightArea: vs.lightArea
        }, false);
        return feature;
    }
}

VisionControl.prototype.toggleVisionFeature = function (feature) {
    var visionFeature = feature.get('visionFeature');
    if (visionFeature) {
        this.source.removeFeature(visionFeature);
        feature.set('visionFeature', null);
        return null;
    }
    else {
        return this.setVisionFeature(feature);
    }
}

VisionControl.prototype.removeVisionFeature = function (feature) {
    var visionFeature = feature.get('visionFeature');
    if (visionFeature) {
        this.source.removeFeature(visionFeature);
        feature.set('visionFeature', null);
    }
}

VisionControl.prototype.setVisionFeature = function (feature, coordinate, unitClass) {
    // remove existing visionFeature for feature
    this.removeVisionFeature(feature);
    
    // determine radius according to unit type
    var radius = this.InteractiveMap.getFeatureVisionRadius(feature, feature.get('dotaProps'), unitClass);
    console.log('setVisionFeature', unitClass, radius);
    // create and add vision feature
    visionFeature = this.getVisionFeature(feature, coordinate, radius);
    if (visionFeature) {
        this.source.addFeature(visionFeature);
    }
    feature.set('visionFeature', visionFeature, true);
    return visionFeature;
}


module.exports = VisionControl;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./../conversionFunctions":12,"./../getLightUnion":14,"./../styleDefinitions":20}],11:[function(require,module,exports){
(function (global){
var ol = (typeof window !== "undefined" ? window['ol'] : typeof global !== "undefined" ? global['ol'] : null);
var styles = require('./../styleDefinitions');
var mapConstants = require('./../mapConstants');
var latLonToWorld = require('./../conversionFunctions').latLonToWorld;
var worldToLatLon = require('./../conversionFunctions').worldToLatLon;
var QueryString = require('./../util/queryString');

function WardControl(InteractiveMap, throttleTime) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.source = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    this.layer =  new ol.layer.Vector({
        source: this.source
    });
    this.layerFilter = function(layer) {
        return layer === self.layer;
    }
    
    this.placedWardCoordinates = {
        observer: {},
        sentry: {}
    };
    
    this.lastPointerMoveTime = Date.now();
    this.pointerMoveHandler = function(evt) {
        if (evt.dragging) {
            return;
        }
        
        var pixel = self.InteractiveMap.map.getEventPixel(evt.originalEvent);
        
        // if mouse over a building feature, show info and highlight
        var bBuildingHover = false;
        var feature = self.InteractiveMap.map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
        }, {
            layerFilter: self.InteractiveMap.layerFilters.marker
        });
        if (feature) {
            bBuildingHover = self.highlight(feature);
            
            if (bBuildingHover) {
                self.showVisibilityInfo();
            }
        }
        else {
            // if mouse over a ward feature, highlight
            var feature = InteractiveMap.checkAndHighlightWard(pixel);

            // no highlighted feature so unhighlight current feature
            if (!feature) {
                self.unhighlight();
            }
            else {
                self.showVisibilityInfo();
            }
        }
        
        // vision cursor
        if (Date.now() - self.lastPointerMoveTime < throttleTime) {
            return;
        }
        self.lastPointerMoveTime = Date.now();
        if (bBuildingHover) {
            if (!feature.get('visionFeature')) {
                var hoverFeature = self.InteractiveMap.visionControl.getVisionFeature(feature);
            }
            else {
                self.InteractiveMap.cursorControl.source.clear(true);
            }
        }
        else {
            var hoverFeature = self.InteractiveMap.visionControl.getVisionFeature(null, evt.coordinate, self.InteractiveMap.visionRadius);
        }
        if (hoverFeature) {
            self.InteractiveMap.cursorControl.source.clear(true);
            self.InteractiveMap.cursorControl.source.addFeature(hoverFeature);
            
            if (!bBuildingHover) {
                self.showVisibilityInfo();
            }
        }
        else if (!bBuildingHover) {
            self.clearInfo();
        }
    }
    this.pointerMoveListener = null;
    
    this.clickHandler = function (evt) {
        self.unhighlight();
        var feature = self.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return feature;
        }, {
            layerFilter: self.InteractiveMap.layerFilters.marker
        });
        if (feature && self.InteractiveMap.hasVisionRadius(feature)) {
            self.InteractiveMap.toggle(feature);
            if (self.InteractiveMap.visionControl.toggleVisionFeature(feature)) {
                self.showVisibilityInfo();
            }
            else {
                self.clearInfo();
            }
            self.InteractiveMap.cursorControl.source.clear(true);
        }
        else {
            feature = self.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                return feature;
            }, {
                layerFilter: self.layerFilter
            });
            if (feature) {
                self.removeWard(feature);
                self.clearInfo(true);
            }
            else {
                self.addWard(evt.coordinate, self.InteractiveMap.MODE);
                self.InteractiveMap.cursorControl.source.clear(true);
            }
        }
    }
    this.clickListener = null;
}

WardControl.prototype.toggleAll = function (layer, state) {
    if (state) {
        this.showAll(layer);
    }
    else {
        this.hideAll(layer);
    }
}

WardControl.prototype.showAll = function (layer) {
    var self = this;
    var source = layer.getSource();
    var features = source.getFeatures();
    features.forEach(function (feature) {
        self.InteractiveMap.select(feature);
        self.highlight(feature);
    });
}

WardControl.prototype.hideAll = function (layer) {
    var self = this;
    var source = layer.getSource();
    var features = source.getFeatures();
    features.forEach(function (feature) {
        self.InteractiveMap.deselect(feature);
        self.unhighlight(feature);
    });
}

WardControl.prototype.showVisibilityInfo = function (visionFeature, bClicked) {
    var info = this.InteractiveMap.infoControl;
    var vs = this.InteractiveMap.vs;
    var lightArea = vs.lightArea;
    var area = vs.area;
    if (visionFeature) {
        var visionData = visionFeature.get('visionData');
        if (visionData) {
            lightArea = visionData.lightArea;
            area = visionData.area;
            info.setContent("Visibility: " + (lightArea / area * 100).toFixed() + '% ' + lightArea + "/" + area);
            info.open(bClicked);
        }
    }
    else {
        info.setContent("Visibility: " + (lightArea / area * 100).toFixed() + '% ' + lightArea + "/" + area);
        info.open(bClicked);
    }
}

WardControl.prototype.clearInfo = function (bOverrideActive) {
    this.InteractiveMap.infoControl.setContent("");
    this.InteractiveMap.infoControl.close(bOverrideActive);
}

WardControl.prototype.activate = function () {
    if (!this.pointerMoveListener) {
        this.pointerMoveListener = this.InteractiveMap.map.on('pointermove', this.pointerMoveHandler);
    }
    if (!this.clickListener) {
        this.clickListener = this.InteractiveMap.map.on('click', this.clickHandler);
    }
}

WardControl.prototype.deactivate = function () {
    this.InteractiveMap.unhighlightWard();
    this.InteractiveMap.cursorControl.source.clear(true);
    ol.Observable.unByKey(this.pointerMoveListener);
    this.pointerMoveListener = null;
    ol.Observable.unByKey(this.clickListener);
    this.clickListener = null;
}

WardControl.prototype.parseQueryString = function () {
    var self = this;
    ['observer', 'sentry'].forEach(function (wardType) {
        var values = QueryString.getParameterByName(wardType);
        if (values) {
            values = values.split(';');
            values.forEach(function (worldXY) {
                worldXY = worldXY.split(',');
                if (worldXY.length == 2) {
                    worldXY = worldXY.map(parseFloat);
                    if (!worldXY.some(isNaN)) {
                        var coordinate = worldToLatLon(worldXY);
                        self.addWard(coordinate, wardType, true);
                    }
                }
            });
        }
        self.updateQueryString(wardType);
    });
}

WardControl.prototype.updateQueryString = function (wardType) {
    var values = Object.keys(this.placedWardCoordinates[wardType]).join(';');
    QueryString.setQueryString(wardType, values || null);
}

WardControl.prototype.addWard = function (coordinate, wardType, bSkipQueryStringUpdate) {
    if (coordinate[0] < 0 || coordinate[0] > mapConstants.map_w || coordinate[1] < 0 || coordinate[1] > mapConstants.map_h) return;
    var geom = new ol.geom.Point(coordinate);
    var feature = new ol.Feature(geom);
    feature.set('wardType', wardType, true);
    feature.setStyle(styles[wardType].normal);
    this.source.addFeature(feature);
    if (wardType == 'observer') {
        if (this.InteractiveMap.visionControl.setVisionFeature(feature, coordinate, wardType)) {
            this.showVisibilityInfo();
        }
    }
    
    var circle = this.InteractiveMap.getRangeCircle(feature, coordinate, wardType);
    if (circle) {
        circle.setStyle(wardType == 'observer' ? styles.dayVision : styles.trueSight);
        feature.set('wardRange', circle, true);
        this.InteractiveMap.wardRangeSource.addFeature(circle);
    }
    var worldXY = latLonToWorld(coordinate).map(Math.round).join(',');
    console.log('addWard', worldXY);
    this.placedWardCoordinates[wardType][worldXY] = true;
    if (!bSkipQueryStringUpdate) this.updateQueryString(wardType);
}

WardControl.prototype.removeWard = function (feature) {
    var wardRange = feature.get('wardRange');
    if (wardRange) {
        this.InteractiveMap.wardRangeSource.removeFeature(wardRange);
    }
    this.source.removeFeature(feature);
    this.InteractiveMap.visionControl.removeVisionFeature(feature);
    
    var worldXY = latLonToWorld(feature.getGeometry().getCoordinates()).map(Math.round).join(',');
    var wardType = feature.get('wardType');
    console.log(feature, worldXY, this.placedWardCoordinates[wardType][worldXY]);
    delete this.placedWardCoordinates[wardType][worldXY];
    this.updateQueryString(wardType);
}

WardControl.prototype.highlight = function (feature) {
    this.InteractiveMap.cursorControl.source.clear(true);
    this.unhighlight();
    var visionFeature = this.InteractiveMap.visionControl.setVisionFeature(feature);
    this.addRangeCircles(feature);
    this.InteractiveMap.highlight(feature);
    return visionFeature;
}

WardControl.prototype.unhighlight = function (feature) {
    var highlightedFeature = feature || this.InteractiveMap.highlightedFeature;
    if (highlightedFeature && !highlightedFeature.get("clicked")) {
        this.InteractiveMap.visionControl.removeVisionFeature(highlightedFeature);
        this.removeRangeCircles(highlightedFeature);
    }
    this.InteractiveMap.unhighlight();
}

WardControl.prototype.addRangeCircles = function (feature) {
    this.addRangeCircle(feature, 'dayVision');
    this.addRangeCircle(feature, 'nightVision');
    this.addRangeCircle(feature, 'trueSight');
    this.addRangeCircle(feature, 'attackRange');
}

WardControl.prototype.removeRangeCircles = function (feature) {
    this.removeRangeCircle(feature, 'dayVision');
    this.removeRangeCircle(feature, 'nightVision');
    this.removeRangeCircle(feature, 'trueSight');
    this.removeRangeCircle(feature, 'attackRange');
}

WardControl.prototype.addRangeCircle = function (feature, rangeType) {
    if (!feature.get(rangeType)) {
        var circle = this.InteractiveMap.getRangeCircle(feature, null, null, rangeType);
        if (circle) {
            feature.set(rangeType, circle, true);
            this.InteractiveMap.rangeSources[rangeType].addFeature(circle);
        }
    }
}

WardControl.prototype.removeRangeCircle = function (feature, rangeType) {
    var circle = feature.get(rangeType);
    if (circle) {
        feature.set(rangeType, null, true);
        this.InteractiveMap.rangeSources[rangeType].removeFeature(circle);
    }
}

module.exports = WardControl;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./../conversionFunctions":12,"./../mapConstants":18,"./../styleDefinitions":20,"./../util/queryString":25}],12:[function(require,module,exports){
var mapConstants = require('./mapConstants');

function lerp(minVal, maxVal, pos_r) {
    return pos_r * (maxVal - minVal) + minVal;
}

function reverseLerp(minVal, maxVal, pos) {
    return (pos - minVal) / (maxVal - minVal);
}

function latLonToWorld(coordinate) {
    var x_r = lerp(mapConstants.map_x_boundaries[0], mapConstants.map_x_boundaries[1], coordinate[0] / mapConstants.map_w),
        y_r = lerp(mapConstants.map_y_boundaries[0], mapConstants.map_y_boundaries[1], (mapConstants.map_h - coordinate[1]) / mapConstants.map_h);
    return [x_r, y_r];
}

function worldToLatLon(coordinate) {
    var x = reverseLerp(mapConstants.map_x_boundaries[0], mapConstants.map_x_boundaries[1], coordinate[0]) * mapConstants.map_w,
        y = mapConstants.map_h - reverseLerp(mapConstants.map_y_boundaries[0], mapConstants.map_y_boundaries[1], coordinate[1]) * mapConstants.map_h;
    return [x, y]
}

function getTileRadius(r) {
    return parseInt(Math.floor(r / 64));
}

function getScaledRadius(r) {
    return r / (mapConstants.map_x_boundaries[1] - mapConstants.map_x_boundaries[0]) * mapConstants.map_w
}

function calculateDistance(order, units, measure) {
    if (order == 1) {
        if (units == "km") {
            return measure * mapConstants.scale * 1000;
        } else {
            return measure * mapConstants.scale;
        }
    } else {
        return measure * mapConstants.scale;
    }
}

module.exports = {
    lerp: lerp,
    reverseLerp: reverseLerp,
    latLonToWorld: latLonToWorld,
    worldToLatLon: worldToLatLon,
    getTileRadius: getTileRadius,
    getScaledRadius: getScaledRadius,
    calculateDistance: calculateDistance
}
},{"./mapConstants":18}],13:[function(require,module,exports){
var proj = require('./projections');

function loadGeoJSON(map, layerDef) {
    var source = new ol.source.Vector({
        url: 'data/700/' + layerDef.filename,
        format: new ol.format.GeoJSON({defaultDataProjection: layerDef.projection || proj.pixel})
    });
    console.log('layerDef', layerDef);
    var layer = new ol.layer.Vector({
        title: layerDef.name,
        projection: layerDef.projection || proj.pixel,
        source: source,
        visible: !!layerDef.visible,
        style: layerDef.style
    });

    return layer;
}

function loadPolygon(map, layerDef, data, layer) {
    var features = [];
    features = data.data[layerDef.id].map(function (obj) {
        var points = obj.points;
        var ring = points.map(function (point) {
            return ol.proj.transform([point.x, point.y], proj.dota, proj.pixel)
        });
        ring.push(ol.proj.transform([points[0].x, points[0].y], proj.dota, proj.pixel))
        var geom = new ol.geom.Polygon([ring]);
        var feature = new ol.Feature(geom);
        obj.id = layerDef.id;
        feature.set('dotaProps', obj, true);
        return feature;
    });
    
    var vectorSource = new ol.source.Vector({
        defaultDataProjection : 'dota',
        features: features
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new ol.layer.Vector({
            title: layerDef.name,
            source: vectorSource,
            visible: !!layerDef.visible,
            style: layerDef.style
        });
        layer.set('layerId', layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        layer.set('showInfo', false, true);
    }

    return layer;
}

function loadJSON(map, layerDef, data, layer) {
    var features = [];
    features = data.data[layerDef.id].map(function (point) {
        var unitClass = point.subType ? layerDef.id + '_' + point.subType : layerDef.id;
        var stats = data.stats[unitClass];
        var bounds = layerDef.id == "ent_dota_tree" ? [64, 64] : stats.bounds;
        if (bounds && bounds[0] > 0 && bounds[1] > 0) {
            var geom = new ol.geom.Polygon([[
                ol.proj.transform([point.x-bounds[0], point.y-bounds[1]], proj.dota, proj.pixel),
                ol.proj.transform([point.x-bounds[0], point.y+bounds[1]], proj.dota, proj.pixel),
                ol.proj.transform([point.x+bounds[0], point.y+bounds[1]], proj.dota, proj.pixel),
                ol.proj.transform([point.x+bounds[0], point.y-bounds[1]], proj.dota, proj.pixel),
                ol.proj.transform([point.x-bounds[0], point.y-bounds[1]], proj.dota, proj.pixel)
            ]]);
        }
        else {
            var geom = new ol.geom.Point(ol.proj.transform([point.x, point.y], proj.dota, proj.pixel));
        }

        var feature = new ol.Feature(geom);
        
        point.id = layerDef.id;
        point.unitClass = unitClass;
        feature.set('dotaProps', point, true);
        
        return feature;
    });
    
    var vectorSource = new ol.source.Vector({
        defaultDataProjection : 'dota',
        features: features
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new ol.layer.Vector({
            title: layerDef.name,
            source: vectorSource,
            visible: !!layerDef.visible,
            style: layerDef.style
        });
        layer.set('layerId', layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        layer.set('showInfo', false, true);
    }

    return layer;
}

function loadNeutralPullRange(InteractiveMap, layerDef, data, layer) {
    /*var features = InteractiveMap.getMapLayerIndex().npc_dota_neutral_spawner.getSource().getFeatures();
    var circles = features.map(function (feature) {
        var circle = InteractiveMap.getRangeCircle(feature, null, null, null, 400);
        feature.set("guard_range", circle, true);
        return circle;
    });
    circles = circles.concat(features.map(function (feature) {
        var dotaProps = feature.get("dotaProps");
        var center = worldToLatLon([dotaProps.x, dotaProps.y]);
        var pullMaxCoords = createCirclePointCoords(center[0], center[1], 400 + pullRangeTiming[dotaProps.pullType] * 350, 360);
        var pullMinCoords = createCirclePointCoords(center[0], center[1], 400 + pullRangeTiming[dotaProps.pullType] * 270, 360);
        var geom = new ol.geom.Polygon([pullMaxCoords]);
        geom.appendLinearRing(new ol.geom.LinearRing(pullMinCoords));
        feature.set("pull_range_min", geom, true);
        var circle = new ol.Feature({geometry: geom, visible: false});
        circle.visible(false);
        return circle;
    }));*/
    
    var vectorSource = new ol.source.Vector({
        defaultDataProjection : 'pixel',
        features: []
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new ol.layer.Vector({
            title: layerDef.name,
            source: vectorSource,
            visible: !!layerDef.visible,
            style: layerDef.style
        });
        layer.set('layerId', layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        layer.set('showInfo', false, true);
    }

    return layer;
}

function loadLayerGroupFromData(InteractiveMap, data, version, layersIndex, layerDefs) {
    var layers = [];
    for (var i = 0; i < layerDefs.length; i++) {
        var layerDef = layerDefs[i];
        if (!data.data[layerDef.id] && ((layerDef.type !== 'pullRange' && layerDef.type !== 'GeoJSON') || version == '687')) continue;
        var layer;
        switch (layerDef.type) {
            case 'GeoJSON':
                layer = loadGeoJSON(InteractiveMap.map, layerDef, layersIndex[layerDef.id]);
            break;
            case 'polygon':
                layer = loadPolygon(InteractiveMap.map, layerDef, data, layersIndex[layerDef.id]);
            break;
            case 'pullRange':
                layer = loadNeutralPullRange(InteractiveMap, layerDef, data, layersIndex[layerDef.id]);
            break;
            default:
                layer = loadJSON(InteractiveMap.map, layerDef, data, layersIndex[layerDef.id]);
            break;
        }
        layersIndex[layerDef.id] = layer;
        layers.push(layer);
    }
    var layerGroup = new ol.layer.Group({
        title: 'Layers',
        layers: new ol.Collection(layers)
    });
    
    return layerGroup;
}

module.exports = {
    loadGeoJSON: loadGeoJSON,
    loadJSON: loadJSON,
    loadLayerGroupFromData: loadLayerGroupFromData,
};
},{"./projections":19}],14:[function(require,module,exports){
var VisionSimulation = require("dota-vision-simulation");
var key2pt = VisionSimulation.prototype.key2pt;
var xy2key = VisionSimulation.prototype.xy2key;
var xy2pt = VisionSimulation.prototype.xy2pt;

function processNeighbors(grid, lights, components, key, index) {
    var pt = key2pt(key);
    var dirs = [[1, 0], [0, -1], [-1, 0], [0, 1]];
    for (var i = 0; i < dirs.length; i++) {
        var aX = pt.x+dirs[i][0];
        var aY = pt.y+dirs[i][1];
        if (!grid[aX] || !grid[aX][aY]) continue;
        var keyAdj = grid[aX][aY].key
        if (components[keyAdj] || !lights[keyAdj]) continue;
        components[keyAdj] = index;
        processNeighbors(grid, lights, components, keyAdj, index);
    }
}

function getLightUnion(grid, lights) {
    var components = {};
    var index = 1;
    for (var key in lights) {
        if (!components[key]) {
            components[key] = index;
            processNeighbors(grid, lights, components, key, index);
            index++;
        }
    }
    
    var outlines = [];
    for (var i = 1; i < index; i++) {
        outlines.push(getOutline(grid, components, i))
    }
    return outlines;
}

function isSideFree(grid, components, pt, dir) {
    var aX = pt.x+dir[0];
    var aY = pt.y+dir[1];
    if (!grid[aX] || !grid[aX][aY]) return true;
    var keyAdj = grid[aX][aY].key
    return !components[keyAdj];
}

function notSurrounded(grid, components, pt) {
    for (var i = 0; i < 8; i+=2) {
        var aX = pt.x+Math.round(Math.cos(2 * Math.PI - Math.PI/4 * i));
        var aY = pt.y+Math.round(Math.sin(2 * Math.PI - Math.PI/4 * i));
        if (!grid[aX] || !grid[aX][aY]) return i;
        var keyAdj = grid[aX][aY].key
        if (!components[keyAdj]) return i;
    }
    return null;
}

function mod(n, m) {
        return ((n % m) + m) % m;
}

function getOutline(grid, components, index) {
    var outlinePoints = [];
    var startKey;
    var dir = null;
    for (var key in components) {
        var pt = key2pt(key);
        dir = notSurrounded(grid, components, pt);
        if (components[key] == index && dir !== null) {
            startKey = key;
            break;
        }
    }
    var next = processNext(grid, components, startKey, dir);
    while (startKey !== next.key || dir !== next.dir) {
        outlinePoints.push(next.point);
        next = processNext(grid, components, next.key, next.dir);
    }
    outlinePoints.push(next.point);
    return outlinePoints;
}

function checkAdj(grid, components, pt, key, dir, i, adjDir) {
    var aX = pt.x+dir[0];
    var aY = pt.y+dir[1];
    if (!grid[aX] || !grid[aX][aY]) return;
    var ptAdj = grid[pt.x+dir[0]][pt.y+dir[1]];
    if (components[ptAdj.key] == components[key] && isSideFree(grid, components, ptAdj, adjDir)) {
        return {
            key: ptAdj.key,
            dir: i
        }
    }
}

function processNext(grid, components, key, i) {
    var pt = key2pt(key);
    var next;
    
    var x = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * i));
    var y = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * i));
    
    var nI = mod(i+2, 8);
    var nX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * nI));
    var nY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * nI));
    
    var bI = mod(i-1, 8);
    var bX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * bI));
    var bY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * bI));

    if (isSideFree(grid, components, pt, [nX, nY])) {
        return {
            key: key,
            dir: mod(i+2, 8),
            point: xy2pt(pt.x+bX/2, pt.y+bY/2)
        }
    }
    if (!next) next = checkAdj(grid, components, pt, key, [nX, nY], i, [x, y]);
    if (!next) {
        var aI = mod(i + 1, 8);
        var aX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * aI));
        var aY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * aI));
        var pI = mod(i - 2, 8);
        var pX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * pI));
        var pY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * pI));
        next = checkAdj(grid, components, pt, key, [aX, aY], pI, [pX, pY]);
    }
    if (next) {
        next.point = xy2pt(pt.x+bX/2, pt.y+bY/2);
        return next;
    }
    else {
        console.log('error');
    }
}

module.exports = getLightUnion;
},{"dota-vision-simulation":31}],15:[function(require,module,exports){
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var unitNames = {
    npc_dota_roshan_spawner: "Roshan",
    dota_item_rune_spawner_powerup: "Rune",
    dota_item_rune_spawner_bounty: "Bounty Rune",
    ent_dota_tree: "Tree",
    npc_dota_healer: "Shrine",
    ent_dota_fountain: "Fountain",
    npc_dota_fort: "Ancient",
    ent_dota_shop: "Shop",
    npc_dota_tower: "Tower",
    npc_dota_barracks: "Barracks",
    npc_dota_filler: "Building",
    trigger_multiple: "Neutral Camp Spawn Box",
    npc_dota_neutral_spawner: "Neutral Camp",
    observer: "Observer Ward",
    sentry: "Sentry Ward"
};
    
function getUnitName(unitType, unitSubType) {
    return (unitSubType ? capitalize(unitSubType.replace('tower', 'Tier ').replace('range', 'Ranged')) + ' ' : '') + unitNames[unitType];
}
    
var pullTypes = ['Normal', 'Fast', 'Slow'];
var neutralTypes = ['Easy', 'Medium', 'Hard', 'Ancient'];
function getPopupContent(data, feature) {
    var dotaProps = feature.get('dotaProps');
    var unitClass = dotaProps.subType ? dotaProps.id + '_' + dotaProps.subType : dotaProps.id;
    var stats = data.data.stats[unitClass];
    var htmlContent = '<div class="info"><span class="info-header">' + getUnitName(dotaProps.id, dotaProps.subType) + '</span><span class="info-body">';
    if (dotaProps.pullType != null) {
        htmlContent += '<br><span class="info-line">Pull Type: ' + pullTypes[dotaProps.pullType] + '</span>';
    }
    if (dotaProps.neutralType != null) {
        htmlContent += '<br><span class="info-line">Difficulty: ' + neutralTypes[dotaProps.neutralType] + '</span>';
    }
    if (stats.hasOwnProperty('damageMin') && stats.hasOwnProperty('damageMax')) {
        htmlContent += '<br><span class="info-line">Damage: ' + stats.damageMin + "&ndash;" + stats.damageMax + '</span>';
    }
    if (stats.hasOwnProperty('bat')) {
        htmlContent += '<br><span class="info-line">BAT: ' + stats.bat + '</span>';
    }
    if (stats.hasOwnProperty('attackRange')) {
        htmlContent += '<br><span class="info-line">Attack Range: ' + stats.attackRange + '</span>';
    }
    if (stats.hasOwnProperty('health')) {
        htmlContent += '<br><span class="info-line">Health: ' + stats.health + '</span>';
    }
    if (stats.hasOwnProperty('armor')) {
        htmlContent += '<br><span class="info-line">Armor: ' + stats.armor + '</span>';
    }
    if (stats.hasOwnProperty('dayVision') && stats.hasOwnProperty('nightVision')) {
        htmlContent += '<br><span class="info-line">Vision: ' + stats.dayVision + "/" + stats.nightVision + '</span>';
    }
    htmlContent += '</span></div>';
    return htmlContent;
}

module.exports = getPopupContent;
},{}],16:[function(require,module,exports){
(function (global){
var VisionSimulation = require("dota-vision-simulation");
var worlddata = require("dota-vision-simulation/src/worlddata.json");
var QueryString = require('./util/queryString');
var ol = (typeof window !== "undefined" ? window['ol'] : typeof global !== "undefined" ? global['ol'] : null);
var proj = require('./projections');
var mapConstants = require('./mapConstants');
var MenuControl = require('./controls/menuControl');
var InfoControl = require('./controls/infoControl');
var NotificationControl = require('./controls/notificationControl');
var MeasureControl = require('./controls/measureControl');
var CreepControl = require('./controls/creepControl');
var VisionControl = require('./controls/visionControl');
var WardControl = require('./controls/wardControl');
var TreeControl = require('./controls/treeControl');
var CursorControl = require('./controls/cursorControl');
var vision_data_image_path = 'img/map_data.png';
var InteractiveMap = require('./InteractiveMap');

InteractiveMap.toggleLayerMenuOption = function(layerId, state) {
    var element = document.querySelector('input[data-layer-id="' + layerId + '"]');
    if (state != null) element.checked = state;
    updateLayerAndQueryString(element, layerId);
}

var forEach = require('./util/forEach');
InteractiveMap.vs = new VisionSimulation(worlddata, vision_data_image_path, initialize);
InteractiveMap.menuControl = new MenuControl(InteractiveMap);
InteractiveMap.menuControl.initialize(layerToggleHandler, baseLayerToggleHandler);
InteractiveMap.infoControl = new InfoControl(InteractiveMap);
InteractiveMap.infoControl.initialize('info');
InteractiveMap.notificationControl = new NotificationControl();
InteractiveMap.notificationControl.initialize('notification');
InteractiveMap.visionControl = new VisionControl(InteractiveMap, 20);
InteractiveMap.wardControl = new WardControl(InteractiveMap);
InteractiveMap.treeControl = new TreeControl(InteractiveMap);
InteractiveMap.cursorControl = new CursorControl(InteractiveMap);
InteractiveMap.measureControl = new MeasureControl(InteractiveMap);
InteractiveMap.creepControl = new CreepControl(InteractiveMap);
InteractiveMap.creepControl.initialize('timer');

//var DrawCurveControl = require('./drawCurveControl');
//InteractiveMap.drawCurveControl = new DrawCurveControl(InteractiveMap);

var modeNotificationText = {
    observer: "Ward Mode: Observer",
    sentry: "Ward Mode: Sentry",
    navigate: "Navigation Mode",
    line: "Measure Mode: Line",
    circle: "Measure Mode: Circle",
    treeEnable: "<span>Navigation Mode</span><span>Trees: On</span>",
    treeDisable: "<span>Navigation Mode</span><span>Trees: Off</span>",
    nightOn: "Nighttime Vision",
    nightOff: "Daytime Vision",
    darknessOn: "Darkness: On",
    darknessOff: "Darkness: Off",
    creepControlOn: "Lane Animation: On",
    creepControlOff: "Lane Animation: Off"
}
function changeMode(mode) {
    console.log('changeMode', mode);
    switch (mode) {
        case 'observer':
        case 'sentry':
            document.querySelector('input[name="ward-type"][value="' + mode + '"]').checked = true;
        case 'ward':
            document.querySelector('input[name="mode"][value="ward"]').checked = true;
            InteractiveMap.MODE = document.querySelector('input[name="ward-type"]:checked').value;
            document.getElementById('btn-ward').setAttribute('ward-type', InteractiveMap.MODE);
            document.getElementById('btn-ward').classList.add('active');
            document.getElementById('btn-tree').classList.remove('active');
            document.getElementById('btn-measure').classList.remove('active');
            QueryString.setQueryString('mode', InteractiveMap.MODE);
            InteractiveMap.measureControl.deactivate();
            InteractiveMap.wardControl.activate();
            InteractiveMap.infoControl.deactivate();
        break;
        case 'line':
        case 'circle':
            document.querySelector('input[name="measure-type"][value="' + mode + '"]').checked = true;
        case 'measure':
            document.querySelector('input[name="mode"][value="measure"]').checked = true;
            InteractiveMap.MODE = document.querySelector('input[name="measure-type"]:checked').value;
            document.getElementById('btn-ward').classList.remove('active');
            document.getElementById('btn-tree').classList.remove('active');
            document.getElementById('btn-measure').classList.add('active');
            document.getElementById('btn-measure').setAttribute('measure-type', InteractiveMap.MODE);
            QueryString.setQueryString('mode', InteractiveMap.MODE);
            InteractiveMap.measureControl.change(InteractiveMap.MODE);
            InteractiveMap.wardControl.deactivate();
            InteractiveMap.infoControl.deactivate();
            
        break;
        default:
            document.querySelector('input[name="mode"][value="navigate"]').checked = true;
            InteractiveMap.MODE = mode || "navigate";
            document.getElementById('btn-ward').classList.remove('active');
            document.getElementById('btn-tree').classList.add('active');
            document.getElementById('btn-measure').classList.remove('active');
            QueryString.setQueryString('mode', InteractiveMap.MODE == 'navigate' ? null : InteractiveMap.MODE);
            InteractiveMap.measureControl.deactivate();
            InteractiveMap.wardControl.deactivate();
            InteractiveMap.infoControl.activate();
        break;
    }
    InteractiveMap.notificationControl.show(modeNotificationText[InteractiveMap.MODE]);
}

forEach(document.querySelectorAll('input[name="mode"], input[name="ward-type"], input[name="measure-type"]'), function (element) {
    element.addEventListener("change", function () {
        changeMode(this.value);
    }, false);
}, this);

function updateLayerAndQueryString(element, layerId) {
    layerId = layerId || element.getAttribute('data-layer-id');
    var layer = InteractiveMap.getMapLayerIndex()[layerId];
    layer.setVisible(element.checked);
    var param = layer.get("title").replace(/ /g, '');
    QueryString.setQueryString(param, element.checked ? true : null);
    if (layerId == 'ent_dota_tree') {
        document.getElementById('btn-tree').setAttribute('trees-enabled', element.checked ? "yes" : "no");
    }
}
function layerToggleHandler() {
    updateLayerAndQueryString(this);
}
function baseLayerToggleHandler() {
    var layerId = this.getAttribute('data-layer-id');
    InteractiveMap.baseLayers.forEach(function (layer) {
        layer.setVisible(layer.get('layerId') === layerId);
    });
    QueryString.setQueryString('BaseLayer', layerId);
}

// updates element visibility based on map layer index
// updates layer visibility based on element state
function updateOverlayMenu() {
    forEach(document.querySelectorAll('.data-layer > input'), function (element) {
        var label = element.nextSibling;
        var layerId = element.getAttribute('data-layer-id');
        var layerIndex = InteractiveMap.getMapLayerIndex();
        var layer = layerIndex[layerId];
        console.log('label', label);
        if (!layer) {
            label.style.display = "none";
        }
        else {
            label.style.display = "block";
            layer.setVisible(element.checked);
        }
    }, this);
}

function setDefaults() {
    var x = QueryString.getParameterByName('x');
    var y = QueryString.getParameterByName('y');
    var zoom = QueryString.getParameterByName('zoom');
    if (zoom) {
        InteractiveMap.view.setZoom(zoom);
    }
    if (x && y) {
        var coordinate = ol.proj.transform([x, y], proj.dota, proj.pixel);
        if (ol.extent.containsXY([-100, -100, mapConstants.map_w+100, mapConstants.map_h+100], coordinate[0], coordinate[1])) {
            InteractiveMap.panTo(coordinate);
        }
    }
    
    document.getElementById('btn-ward').setAttribute('ward-type', 'observer');
    var mode = QueryString.getParameterByName('mode');
    changeMode(mode);

    var baseLayerName = QueryString.getParameterByName('BaseLayer');
    var element;
    if (baseLayerName) {
        element = document.querySelector('input[name="base-layer"][value="' + baseLayerName + '"]');
        if (element) {
            element.checked = true;
            InteractiveMap.baseLayers.filter(function (layer) { return layer.get("layerId") == baseLayerName })[0].setVisible(true);
        }
    }
    if (!element) {
        QueryString.setQueryString('BaseLayer', null);
        InteractiveMap.baseLayers[0].setVisible(true);
        document.querySelector('input[name="base-layer"][value="' + InteractiveMap.baseLayers[0].get("layerId") + '"]').checked = true;
    }
    
    InteractiveMap.layerDefs.forEach(function (layerDef) {
        var param = layerDef.name.replace(/ /g, '');
        var value = QueryString.getParameterByName(param);
        if (value && value !== "false") {
            layerDef.visible = true;
            document.querySelector('input[data-layer-id="' + layerDef.id + '"]').checked = true;
            QueryString.setQueryString(param, true);
        }
        else {
            QueryString.setQueryString(param, null);
        }
        if (layerDef.id == 'ent_dota_tree') {
            document.getElementById('btn-tree').setAttribute('trees-enabled', layerDef.visible ? "yes" : "no");
        }
    });

    console.log('trees enabled', document.getElementById('btn-tree').getAttribute('trees-enabled'));
}
    
document.getElementById('nightControl').addEventListener('change', function () {
    InteractiveMap.isNight = this.checked;
    if (this.checked) {
        InteractiveMap.notificationControl.show(modeNotificationText.nightOn);
    }
    else {
        InteractiveMap.notificationControl.show(modeNotificationText.nightOff);
    }
}, false);

document.getElementById('darknessControl').addEventListener('change', function () {
    InteractiveMap.isDarkness = this.checked;
    if (this.checked) {
        InteractiveMap.notificationControl.show(modeNotificationText.darknessOn);
    }
    else {
        InteractiveMap.notificationControl.show(modeNotificationText.darknessOff);
    }
}, false);

document.getElementById('creepControl').addEventListener('change', function () {
    if (this.checked) {
        InteractiveMap.creepControl.activate();
        InteractiveMap.notificationControl.show(modeNotificationText.creepControlOn);
    }
    else {
        InteractiveMap.creepControl.deactivate();
        InteractiveMap.notificationControl.show(modeNotificationText.creepControlOff);
    }
}, false);

document.getElementById('version-select').addEventListener('change', function () {
    InteractiveMap.version = this.value;
}, false);

document.getElementById('vision-radius').addEventListener('change', function () {
    InteractiveMap.visionRadius = this.value;
}, false);

document.getElementById('movementSpeed').addEventListener('change', function () {
    InteractiveMap.movementSpeed = this.value;
}, false);

function onMoveEnd(evt) {
    var map = evt.map;
    var extent = map.getView().calculateExtent(map.getSize());
    var center = ol.extent.getCenter(extent);
    var worldXY = ol.proj.transform(center, proj.pixel, proj.dota);
    var coordinate = [Math.round(worldXY[0]), Math.round(worldXY[1])];
    QueryString.setQueryString('x', coordinate[0]);
    QueryString.setQueryString('y', coordinate[1]);
    QueryString.setQueryString('zoom', Math.round(InteractiveMap.view.getZoom()));
}

function initialize() {
    InteractiveMap.infoControl.activate();
    
    setDefaults();

    InteractiveMap.setMapLayers(InteractiveMap.version, function () {
        updateOverlayMenu();
        InteractiveMap.map.addLayer(InteractiveMap.measureControl.layer);
        InteractiveMap.map.addLayer(InteractiveMap.cursorControl.layer);
        InteractiveMap.map.addLayer(InteractiveMap.visionControl.layer);
        InteractiveMap.map.addLayer(InteractiveMap.wardControl.layer);
        InteractiveMap.map.addLayer(InteractiveMap.highlightLayer);
        InteractiveMap.map.addLayer(InteractiveMap.selectLayer);
        InteractiveMap.map.addLayer(InteractiveMap.wardRangeLayer);
        InteractiveMap.map.addLayer(InteractiveMap.rangeLayers.dayVision);
        InteractiveMap.map.addLayer(InteractiveMap.rangeLayers.nightVision);
        InteractiveMap.map.addLayer(InteractiveMap.rangeLayers.trueSight);
        InteractiveMap.map.addLayer(InteractiveMap.rangeLayers.attackRange);
        
        InteractiveMap.treeControl.parseQueryString();
        InteractiveMap.wardControl.parseQueryString();
    });
    
    InteractiveMap.map.on('moveend', onMoveEnd);
        
    document.getElementById('option-dayVision').addEventListener('change', function () {
        InteractiveMap.rangeLayers.dayVision.setVisible(this.checked);
    });
        
    document.getElementById('option-nightVision').addEventListener('change', function () {
        InteractiveMap.rangeLayers.nightVision.setVisible(this.checked);
    });
        
    document.getElementById('option-trueSight').addEventListener('change', function () {
        InteractiveMap.rangeLayers.trueSight.setVisible(this.checked);
    });
        
    document.getElementById('option-attackRange').addEventListener('change', function () {
        InteractiveMap.rangeLayers.attackRange.setVisible(this.checked);
    });
        
    document.getElementById('version-select').addEventListener('change', function () {
        InteractiveMap.setMapLayers(this.value);
    });
        
    document.getElementById('btn-zoom-in').addEventListener('click', function () {
        InteractiveMap.view.animate({zoom: InteractiveMap.view.getZoom() + 1});
    });
        
    document.getElementById('btn-zoom-out').addEventListener('click', function () {
        InteractiveMap.view.animate({zoom: InteractiveMap.view.getZoom() - 1});
    });

    document.getElementById('btn-tree').addEventListener('click', function () {
        if (this.classList.contains('active')) {
            console.log('swapping', this.getAttribute('trees-enabled'), !this.getAttribute('trees-enabled'));
            this.setAttribute('trees-enabled', this.getAttribute('trees-enabled') == "yes" ? "no" : "yes");
        }
        this.classList.add('active');
        document.getElementById('btn-ward').classList.remove('active');
        document.getElementById('btn-measure').classList.remove('active');
        console.log('btn-tree', this.getAttribute('trees-enabled'));
        InteractiveMap.toggleLayerMenuOption("ent_dota_tree", this.getAttribute('trees-enabled') == "yes");
        changeMode('navigate');
        InteractiveMap.notificationControl.show(this.getAttribute('trees-enabled') == "yes" ? modeNotificationText.treeEnable : modeNotificationText.treeDisable);
    });

    document.getElementById('btn-ward').addEventListener('click', function () {
        if (this.classList.contains('active')) {
            this.setAttribute('ward-type', this.getAttribute('ward-type') == 'observer' ? 'sentry' : 'observer');
        }
        if (this.getAttribute('ward-type') == 'sentry') {
            document.querySelector('input[name="mode"][value="ward"]').checked = true;
            document.querySelector('input[name="ward-type"][value="sentry"]').checked = true;
        }
        else {
            document.querySelector('input[name="mode"][value="ward"]').checked = true;
            document.querySelector('input[name="ward-type"][value="observer"]').checked = true;
        }
        this.classList.add('active');
        document.getElementById('btn-tree').classList.remove('active');
        document.getElementById('btn-measure').classList.remove('active');
        changeMode('ward');
    });

    document.getElementById('btn-measure').addEventListener('click', function () {
        if (this.classList.contains('active')) {
            this.setAttribute('measure-type', this.getAttribute('measure-type') == 'line' ? 'circle' : 'line');
        }
        if (this.getAttribute('measure-type') == 'circle') {
            document.querySelector('input[name="mode"][value="measure"]').checked = true;
            document.querySelector('input[name="measure-type"][value="circle"]').checked = true;
        }
        else {
            document.querySelector('input[name="mode"][value="measure"]').checked = true;
            document.querySelector('input[name="measure-type"][value="line"]').checked = true;
        }
        this.classList.add('active');
        document.getElementById('btn-tree').classList.remove('active');
        document.getElementById('btn-ward').classList.remove('active');
        changeMode('measure');
    });
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./InteractiveMap":1,"./controls/creepControl":3,"./controls/cursorControl":4,"./controls/infoControl":5,"./controls/measureControl":6,"./controls/menuControl":7,"./controls/notificationControl":8,"./controls/treeControl":9,"./controls/visionControl":10,"./controls/wardControl":11,"./mapConstants":18,"./projections":19,"./util/forEach":22,"./util/queryString":25,"dota-vision-simulation":31,"dota-vision-simulation/src/worlddata.json":32}],17:[function(require,module,exports){
(function (global){
var ol = (typeof window !== "undefined" ? window['ol'] : typeof global !== "undefined" ? global['ol'] : null);
var styles = require('./styleDefinitions');
var proj = require('./projections');

var layerDefinitions = [
    {
        id: 'path_corner',
        name: 'Lanes',
        filename: 'path_corner.json',
        type: 'GeoJSON',
        group: 'overlay',
        projection: proj.dota,
        style: styles.teamColor
    },
    {
        id: 'npc_dota_spawner',
        name: 'Lane Spawns',
        filename: 'npc_dota_spawner.json',
        type: 'GeoJSON',
        group: 'overlay',
        projection: proj.dota,
        style: styles.creepSpawn
    },
    {
        id: 'ent_fow_blocker_node',
        name: 'Vision Blocker',
        filename: 'ent_fow_blocker_node2.json',
        type: 'GeoJSON',
        group: 'overlay',
        style: new ol.style.Style({
            fill: new ol.style.Fill({color: [0, 0, 255, 0.3]}),
            stroke: new ol.style.Stroke({color: [0, 0, 255, 0.8]})
        })
    },
    {
        id: 'no_wards',
        name: 'Invalid Wards',
        filename: 'no_wards2.json',
        type: 'GeoJSON',
        group: 'overlay',
        style: new ol.style.Style({
            fill: new ol.style.Fill({color: [255, 0, 0, 0.3]}),
            stroke: new ol.style.Stroke({color: [255, 0, 0, 0.8]})
        })
    },
    {
        id: 'trigger_multiple',
        name: 'Spawn Boxes',
        type: 'polygon',
        group: 'overlay',
        style: new ol.style.Style({
            fill: new ol.style.Fill({color: [0, 255, 125, 0.3]}),
            stroke: new ol.style.Stroke({color: [0, 255, 125, 0.8]})
        })
    },
    {
        id: 'npc_dota_neutral_spawner',
        name: 'Neutral Camps',
        group: 'object',
        style: function (feature, resolution) {
            return styles.neutralCamp[parseInt(feature.get('dotaProps').neutralType)]
        }
    },
    {
        id: 'ent_dota_tree',
        name: 'Trees',
        group: 'object',
        style:  function (feature, resolution) {
            if (feature.get('isCut')) {
                return styles.tree.dead;
            }
            else {
                return styles.tree.alive;
            }
        },
        toggle: true
    },
    {
        id: 'npc_dota_roshan_spawner',
        name: 'Roshan',
        group: 'object',
        style: styles.roshan
    },
    {
        id: 'dota_item_rune_spawner_powerup',
        name: 'Runes',
        group: 'object',
        style: styles.rune
    },
    {
        id: 'dota_item_rune_spawner_bounty',
        name: 'Bounty Runes',
        group: 'object',
        style: styles.bountyRune
    },
    {
        id: 'ent_dota_fountain',
        name: 'Fountain',
        group: 'structure',
        style: styles.ent_dota_fountain,
        toggle: true
    },
    {
        id: 'npc_dota_barracks',
        name: 'Barracks',
        group: 'structure',
        style: styles.npc_dota_barracks,
        toggle: true
    },
    {
        id: 'npc_dota_filler',
        name: 'Buildings',
        group: 'structure',
        style: styles.npc_dota_filler,
        toggle: true
    },
    {
        id: 'npc_dota_tower',
        name: 'Towers',
        group: 'structure',
        style: styles.npc_dota_tower,
        toggle: true
    },
    {
        id: 'ent_dota_shop',
        name: 'Shops',
        group: 'structure',
        style: styles.ent_dota_shop
    },
    {
        id: 'npc_dota_fort',
        name: 'Ancients',
        group: 'structure',
        style: styles.npc_dota_fort,
        toggle: true
    },
    {
        id: 'npc_dota_healer',
        name: 'Shrines',
        group: 'structure',
        style: styles.npc_dota_healer,
        toggle: true
    },
    {
        id: 'pullRange',
        name: 'Pull Range',
        type: 'pullRange',
        group: 'overlay',
        style: styles.pullRange,
        visible: true
    }
];

module.exports = layerDefinitions;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./projections":19,"./styleDefinitions":20}],18:[function(require,module,exports){
var mapConstants = {
    map_w: 16384,
    map_h: 16384,
    map_x_boundaries: [-8475.58617377, 9327.49124559],
    map_y_boundaries: [9028.52473332, -8836.61406266],
    resolutions: [
        16384 / 1024,
        16384 / 1024 / 2,
        16384 / 1024 / 4,
        16384 / 1024 / 8,
        16384 / 1024 / 16
    ],
    visionRadius: {
        observer: 1600,
        sentry: 850,
        darkness: 675
    },
    defaultMovementSpeed: 300,
    creepBaseMovementSpeed: 325,
    pullRangeTiming: [4, 2.25, 4.75]
}
mapConstants.imgCenter = [mapConstants.map_w / 2, mapConstants.map_h / 2]
mapConstants.scale = Math.abs(mapConstants.map_x_boundaries[1] - mapConstants.map_x_boundaries[0]) / mapConstants.map_w;

module.exports = mapConstants;
},{}],19:[function(require,module,exports){
(function (global){
var ol = (typeof window !== "undefined" ? window['ol'] : typeof global !== "undefined" ? global['ol'] : null);
var conversionFunctions = require('./conversionFunctions');
var mapConstants = require('./mapConstants');

var pixelProj = new ol.proj.Projection({
    code: 'pixel',
    units: 'pixels',
    extent: [0, 0, mapConstants.map_w, mapConstants.map_h]
});

var dotaProj = new ol.proj.Projection({
    code: 'dota',
    extent: [-8288, -8288, 8288, 8288],
    units: 'units'
});

ol.proj.addProjection(pixelProj);
ol.proj.addCoordinateTransforms('pixel', dotaProj, conversionFunctions.latLonToWorld, conversionFunctions.worldToLatLon);

ol.proj.addProjection(dotaProj);
ol.proj.addCoordinateTransforms('dota', pixelProj, conversionFunctions.worldToLatLon, conversionFunctions.latLonToWorld);

module.exports = {
    pixel: pixelProj,
    dota: dotaProj
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./conversionFunctions":12,"./mapConstants":18}],20:[function(require,module,exports){
(function (global){
var ol = (typeof window !== "undefined" ? window['ol'] : typeof global !== "undefined" ? global['ol'] : null);
var getFeatureCenter = require('./util/getFeatureCenter');

var defaultStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.4)'
    }),
    stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 1.25
    })
});

var styles = {
    creepSpawn: new ol.style.Style({
        image: new ol.style.RegularShape({
            points: 6,
            radius: 8,
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.3)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 255, 0.7)',
                width: 2
            })
        })
    }),
    neutralCamp: [
        new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 3,
                radius: 8,
                fill: new ol.style.Fill({
                    color: 'rgba(0, 255, 0, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 255, 0, 0.7)',
                    width: 2
                })
            })
        }),
        new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 3,
                radius: 9,
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 0, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 255, 0, 0.7)',
                    width: 2
                })
            })
        }),
        new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 3,
                radius: 10,
                fill: new ol.style.Fill({
                    color: 'rgba(255, 150, 0, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 150, 0, 0.7)',
                    width: 2
                })
            })
        }),
        new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 3,
                radius: 11,
                fill: new ol.style.Fill({
                    color: 'rgba(255, 0, 0, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 0, 0, 0.7)',
                    width: 2
                })
            })
        })
    ],
    dire: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 51, 51, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#FF3333',
            width: 2
        })
    }),
    radiant: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(51, 255, 51, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#33FF33',
            width: 2
        })
    }),
    direCreep: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 51, 51, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#FF3333',
            width: 10
        })
    }),
    radiantCreep: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(51, 255, 51, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#33FF33',
            width: 10
        })
    }),
    highlight: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffff00',
            width: 2
        })
    }),
    select: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(0, 255, 0, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#00ff00',
            width: 2
        })
    }),
    cursor: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 255, 1)',
            width: 1
        })
    }),
    visionSimulation: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 0, 1)',
            width: 1
        })
    }),
    dayVision: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(238, 153, 0, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(238, 153, 0, 0.5)',
            width: 2
        })
    }),
    nightVision: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(0, 127, 255, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 255, 0.5)',
            width: 2
        })
    }),
    trueSight: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(0, 127, 255, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 127, 255, 0.5)',
            width: 2
        })
    }),
    attackRange: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 0, 0, 0.5)',
            width: 2
        })
    }),
    ent_dota_fountain: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/water-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_barracks: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/stadium-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_filler: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/landmark-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_tower: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/castle-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    ent_dota_shop: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/shop-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_fort: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/town-hall-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_healer: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/place-of-worship-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    measure: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.3)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255,165,0, 0.7)',
            lineDash: [10, 10],
            width: 3
        }),
        image: new ol.style.Circle({
            radius: 5,
            stroke: new ol.style.Stroke({
                color: 'rgba(255,165,0, 0.7)',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255,165,0, 0.3)'
            })
        })
    }),
    observer: {
        normal: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1]
            })
        }),
        highlight: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1],
                color: '#0000ff'
            })
        }),
        remove: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1],
                color: '#ff0000'
            })
        })
    },
    sentry: {
        normal: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1]
            })
        }),
        highlight: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1],
                color: '#0000ff'
            })
        }),
        remove: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1],
                color: '#ff0000'
            })
        })
    },
    tree: {
        alive: new ol.style.Style({
            fill: new ol.style.Fill({color: [0, 255, 0, 0.3]}),
            stroke: new ol.style.Stroke({color: [0, 255, 0, 0.8]})
        }),
        dead: new ol.style.Style({
            fill: new ol.style.Fill({color: [51, 25, 0, 0.7]}),
            stroke: new ol.style.Stroke({color: [255, 128, 0, 0.8]})
        })
    },
    bountyRune: new ol.style.Style({
        image: new ol.style.Icon({
            src: 'img/bountyrune.png',
            anchor: [0.5, 0.5]
        })
    }),
    rune: new ol.style.Style({
        image: new ol.style.Icon({
            src: 'img/doubledamage.png',
            anchor: [0.5, 0.5]
        })
    }),
    roshan: new ol.style.Style({
        image: new ol.style.Icon({
            src: 'img/roshan.png',
            anchor: [0.5, 0.5]
        })
    }),
    pullRange: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(0, 153, 238, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 153, 238, 0.5)',
            width: 2
        })
    }),
}

styles.teamColor = function (feature, resolution) {
    if (feature.getId().indexOf('_bad_') == -1) {
        return styles.radiant;
    }
    else {
        return styles.dire;
    }
}

styles.creepColor = function (feature, resolution) {
    if (feature.getId().indexOf('_bad_') == -1) {
        return styles.radiantCreep;
    }
    else {
        return styles.direCreep;
    }
}
module.exports = styles;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util/getFeatureCenter":23}],21:[function(require,module,exports){
function createCirclePointCoords(circleCenterX, circleCenterY, circleRadius, pointsToFind) {
    var angleToAdd = 360/pointsToFind;
    var coords = [];  
    var angle = 0;
    for (var i=0;i<pointsToFind;i++){
        angle = angle+angleToAdd;
        var coordX = circleCenterX + circleRadius * Math.cos(angle*Math.PI/180);
        var coordY = circleCenterY + circleRadius * Math.sin(angle*Math.PI/180);
        coords.push([coordX,coordY]);
    }
    return coords;
}

module.exports = createCirclePointCoords;
},{}],22:[function(require,module,exports){
var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, array[i], i); // passes back stuff we need
    }
};

module.exports = forEach;
},{}],23:[function(require,module,exports){
var getFeatureCenter = function(feature) {
    var extent = feature.getGeometry().getExtent();
    var center = ol.extent.getCenter(extent);
    return new ol.geom.Point(center);
};

module.exports = getFeatureCenter;
},{}],24:[function(require,module,exports){
function getJSON(path, callback) {
    console.log('getJSON', path);
    var request = new XMLHttpRequest();

    request.open('GET', path, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            callback(data);
        } else {
            alert('Error loading page.');
        }
    };
    request.onerror = function() {
        alert('Error loading page.');
    };
    request.send();
    return request;
}

module.exports = getJSON;
},{}],25:[function(require,module,exports){
var trim = require('./trim');

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setQueryString(key, value) {
    if (history && history.replaceState) history.replaceState(null, "", updateQueryString(key, value));
}

function addQueryStringValue(key, value) {
    console.log('addQueryStringValue', key, value);
    var qs = getParameterByName(key);
    qs = trim(trim(qs, ' ;') + ';' + value, ' ;');
    if (history && history.replaceState) history.replaceState(null, "", updateQueryString(key, qs));
}

function removeQueryStringValue(key, value) {
    console.log('removeQueryStringValue', key, value);
    var qs = getParameterByName(key);
    qs = trim(trim(qs, ' ;').replace(value, '').replace(/;;/g, ''), ' ;');
    if (history && history.replaceState) history.replaceState(null, "", updateQueryString(key, qs != '' ? qs : null));
}

function updateQueryString(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    } else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        } else {
            return url;
        }
    }
}

module.exports = {
    getParameterByName: getParameterByName,
    setQueryString: setQueryString,
    addQueryStringValue: addQueryStringValue,
    removeQueryStringValue: removeQueryStringValue,
    updateQueryString: updateQueryString
}
},{"./trim":26}],26:[function(require,module,exports){
function escapeRegex(string) {
    return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
}

var trim = function trim(str, characters, flags) {
    flags = flags || "g";
    if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
        throw new TypeError("argument must be string");
    }

    if (!/^[gi]*$/.test(flags)) {
        throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
    }

    characters = escapeRegex(characters);

    return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
};

module.exports = trim;
},{}],27:[function(require,module,exports){
var PNG = require('png-js');

function ImageHandler(imagePath) {
    this.imagePath = imagePath;
    self.canvas = null;
    self.png = null;
}
ImageHandler.prototype.load = function (callback) {
    var self = this;
    var t1 = Date.now();
    self.canvas = document.createElement("canvas");
    PNG.load(this.imagePath, self.canvas, function(png) {
        self.png = png;
        self.ctx = self.canvas.getContext("2d");
        callback();
    });
}
ImageHandler.prototype.scan = function (offset, width, height, pixelHandler, grid) {
    var imgData = this.ctx.getImageData(offset, 0, width, height);
    var data = imgData.data;

    for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var alpha = data[i+3];
        var x = Math.floor((i/4) % width);
        var y = Math.floor((i/4) / height);
        pixelHandler(x, y, [r, g, b], grid);
    }
}

module.exports = ImageHandler;
},{"png-js":28}],28:[function(require,module,exports){
// Generated by CoffeeScript 1.4.0

/*
# MIT LICENSE
# Copyright (c) 2011 Devon Govett
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy of this 
# software and associated documentation files (the "Software"), to deal in the Software 
# without restriction, including without limitation the rights to use, copy, modify, merge, 
# publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
# to whom the Software is furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all copies or 
# substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
# BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
# DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var FlateStream = require('./zlib');

  var PNG;

  PNG = (function() {
    PNG.load = function(url, canvas, callback) {
      var xhr,
        _this = this;
      if (typeof canvas === 'function') {
        callback = canvas;
      }
      xhr = new XMLHttpRequest;
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function() {
        var data, png;
        data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
        png = new PNG(data);
        if (typeof (canvas != null ? canvas.getContext : void 0) === 'function') {
          png.render(canvas);
        }
        return typeof callback === "function" ? callback(png) : void 0;
      };
      return xhr.send(null);
    };

    function PNG(data) {
      var chunkSize, colors, delayDen, delayNum, frame, i, index, key, section, short, text, _i, _j, _ref;
      this.data = data;
      this.pos = 8;
      this.palette = [];
      this.imgData = [];
      this.transparency = {};
      this.text = {};
      frame = null;
      while (true) {
        chunkSize = this.readUInt32();
        section = ((function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; _i < 4; i = ++_i) {
            _results.push(String.fromCharCode(this.data[this.pos++]));
          }
          return _results;
        }).call(this)).join('');
        switch (section) {
          case 'IHDR':
            this.width = this.readUInt32();
            this.height = this.readUInt32();
            this.bits = this.data[this.pos++];
            this.colorType = this.data[this.pos++];
            this.compressionMethod = this.data[this.pos++];
            this.filterMethod = this.data[this.pos++];
            this.interlaceMethod = this.data[this.pos++];
            break;
          case 'PLTE':
            this.palette = this.read(chunkSize);
            break;
          case 'IDAT':
            if (section === 'fdAT') {
              this.pos += 4;
              chunkSize -= 4;
            }
            data = (frame != null ? frame.data : void 0) || this.imgData;
            for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i) {
              data.push(this.data[this.pos++]);
            }
            break;
          case 'tRNS':
            this.transparency = {};
            switch (this.colorType) {
              case 3:
                this.transparency.indexed = this.read(chunkSize);
                short = 255 - this.transparency.indexed.length;
                if (short > 0) {
                  for (i = _j = 0; 0 <= short ? _j < short : _j > short; i = 0 <= short ? ++_j : --_j) {
                    this.transparency.indexed.push(255);
                  }
                }
                break;
              case 0:
                this.transparency.grayscale = this.read(chunkSize)[0];
                break;
              case 2:
                this.transparency.rgb = this.read(chunkSize);
            }
            break;
          case 'tEXt':
            text = this.read(chunkSize);
            index = text.indexOf(0);
            key = String.fromCharCode.apply(String, text.slice(0, index));
            this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
            break;
          case 'IEND':
            if (frame) {
              this.animation.frames.push(frame);
            }
            this.colors = (function() {
              switch (this.colorType) {
                case 0:
                case 3:
                case 4:
                  return 1;
                case 2:
                case 6:
                  return 3;
              }
            }).call(this);
            this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
            colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
            this.pixelBitlength = this.bits * colors;
            this.colorSpace = (function() {
              switch (this.colors) {
                case 1:
                  return 'DeviceGray';
                case 3:
                  return 'DeviceRGB';
              }
            }).call(this);
            this.imgData = new Uint8Array(this.imgData);
            return;
          default:
            this.pos += chunkSize;
        }
        this.pos += 4;
        if (this.pos > this.data.length) {
          throw new Error("Incomplete or corrupt PNG file");
        }
      }
      return;
    }

    PNG.prototype.read = function(bytes) {
      var i, _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i) {
        _results.push(this.data[this.pos++]);
      }
      return _results;
    };

    PNG.prototype.readUInt32 = function() {
      var b1, b2, b3, b4;
      b1 = this.data[this.pos++] << 24;
      b2 = this.data[this.pos++] << 16;
      b3 = this.data[this.pos++] << 8;
      b4 = this.data[this.pos++];
      return b1 | b2 | b3 | b4;
    };

    PNG.prototype.readUInt16 = function() {
      var b1, b2;
      b1 = this.data[this.pos++] << 8;
      b2 = this.data[this.pos++];
      return b1 | b2;
    };

    PNG.prototype.decodePixels = function(data) {
      var byte, c, col, i, left, length, p, pa, paeth, pb, pc, pixelBytes, pixels, pos, row, scanlineLength, upper, upperLeft, _i, _j, _k, _l, _m;
      if (data == null) {
        data = this.imgData;
      }
      if (data.length === 0) {
        return new Uint8Array(0);
      }
      data = new FlateStream(data);
      data = data.getBytes();
      pixelBytes = this.pixelBitlength / 8;
      scanlineLength = pixelBytes * this.width;
      pixels = new Uint8Array(scanlineLength * this.height);
      length = data.length;
      row = 0;
      pos = 0;
      c = 0;
      while (pos < length) {
        switch (data[pos++]) {
          case 0:
            for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
              pixels[c++] = data[pos++];
            }
            break;
          case 1:
            for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
              byte = data[pos++];
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              pixels[c++] = (byte + left) % 256;
            }
            break;
          case 2:
            for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
              pixels[c++] = (upper + byte) % 256;
            }
            break;
          case 3:
            for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
              pixels[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
            }
            break;
          case 4:
            for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              if (row === 0) {
                upper = upperLeft = 0;
              } else {
                upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
                upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + (i % pixelBytes)];
              }
              p = left + upper - upperLeft;
              pa = Math.abs(p - left);
              pb = Math.abs(p - upper);
              pc = Math.abs(p - upperLeft);
              if (pa <= pb && pa <= pc) {
                paeth = left;
              } else if (pb <= pc) {
                paeth = upper;
              } else {
                paeth = upperLeft;
              }
              pixels[c++] = (byte + paeth) % 256;
            }
            break;
          default:
            throw new Error("Invalid filter algorithm: " + data[pos - 1]);
        }
        row++;
      }
      return pixels;
    };

    PNG.prototype.decodePalette = function() {
      var c, i, length, palette, pos, ret, transparency, _i, _ref, _ref1;
      palette = this.palette;
      transparency = this.transparency.indexed || [];
      ret = new Uint8Array((transparency.length || 0) + palette.length);
      pos = 0;
      length = palette.length;
      c = 0;
      for (i = _i = 0, _ref = palette.length; _i < _ref; i = _i += 3) {
        ret[pos++] = palette[i];
        ret[pos++] = palette[i + 1];
        ret[pos++] = palette[i + 2];
        ret[pos++] = (_ref1 = transparency[c++]) != null ? _ref1 : 255;
      }
      return ret;
    };

    PNG.prototype.copyToImageData = function(imageData, pixels) {
      var alpha, colors, data, i, input, j, k, length, palette, v, _ref;
      colors = this.colors;
      palette = null;
      alpha = this.hasAlphaChannel;
      if (this.palette.length) {
        palette = (_ref = this._decodedPalette) != null ? _ref : this._decodedPalette = this.decodePalette();
        colors = 4;
        alpha = true;
      }
      data = imageData.data || imageData;
      length = data.length;
      input = palette || pixels;
      i = j = 0;
      if (colors === 1) {
        while (i < length) {
          k = palette ? pixels[i / 4] * 4 : j;
          v = input[k++];
          data[i++] = v;
          data[i++] = v;
          data[i++] = v;
          data[i++] = alpha ? input[k++] : 255;
          j = k;
        }
      } else {
        while (i < length) {
          k = palette ? pixels[i / 4] * 4 : j;
          data[i++] = input[k++];
          data[i++] = input[k++];
          data[i++] = input[k++];
          data[i++] = alpha ? input[k++] : 255;
          j = k;
        }
      }
    };

    PNG.prototype.decode = function() {
      var ret;
      ret = new Uint8Array(this.width * this.height * 4);
      this.copyToImageData(ret, this.decodePixels());
      return ret;
    };

    PNG.prototype.render = function(canvas) {
      var ctx, data;
      canvas.width = this.width;
      canvas.height = this.height;
      ctx = canvas.getContext("2d");
      data = ctx.createImageData(this.width, this.height);
      this.copyToImageData(data, this.decodePixels());
      return ctx.putImageData(data, 0, 0);
    };

    return PNG;

  })();

  module.exports = PNG;
},{"./zlib":29}],29:[function(require,module,exports){
/*
 * Extracted from pdf.js
 * https://github.com/andreasgal/pdf.js
 *
 * Copyright (c) 2011 Mozilla Foundation
 *
 * Contributors: Andreas Gal <gal@mozilla.com>
 *               Chris G Jones <cjones@mozilla.com>
 *               Shaon Barman <shaon.barman@gmail.com>
 *               Vivien Nicolas <21@vingtetun.org>
 *               Justin D'Arcangelo <justindarc@gmail.com>
 *               Yury Delendik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var DecodeStream = (function() {
  function constructor() {
    this.pos = 0;
    this.bufferLength = 0;
    this.eof = false;
    this.buffer = null;
  }

  constructor.prototype = {
    ensureBuffer: function decodestream_ensureBuffer(requested) {
      var buffer = this.buffer;
      var current = buffer ? buffer.byteLength : 0;
      if (requested < current)
        return buffer;
      var size = 512;
      while (size < requested)
        size <<= 1;
      var buffer2 = new Uint8Array(size);
      for (var i = 0; i < current; ++i)
        buffer2[i] = buffer[i];
      return this.buffer = buffer2;
    },
    getByte: function decodestream_getByte() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return this.buffer[this.pos++];
    },
    getBytes: function decodestream_getBytes(length) {
      var pos = this.pos;

      if (length) {
        this.ensureBuffer(pos + length);
        var end = pos + length;

        while (!this.eof && this.bufferLength < end)
          this.readBlock();

        var bufEnd = this.bufferLength;
        if (end > bufEnd)
          end = bufEnd;
      } else {
        while (!this.eof)
          this.readBlock();

        var end = this.bufferLength;
      }

      this.pos = end;
      return this.buffer.subarray(pos, end);
    },
    lookChar: function decodestream_lookChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos]);
    },
    getChar: function decodestream_getChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos++]);
    },
    makeSubStream: function decodestream_makeSubstream(start, length, dict) {
      var end = start + length;
      while (this.bufferLength <= end && !this.eof)
        this.readBlock();
      return new Stream(this.buffer, start, length, dict);
    },
    skip: function decodestream_skip(n) {
      if (!n)
        n = 1;
      this.pos += n;
    },
    reset: function decodestream_reset() {
      this.pos = 0;
    }
  };

  return constructor;
})();

var FlateStream = (function() {
  var codeLenCodeMap = new Uint32Array([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
  ]);

  var lengthDecode = new Uint32Array([
    0x00003, 0x00004, 0x00005, 0x00006, 0x00007, 0x00008, 0x00009, 0x0000a,
    0x1000b, 0x1000d, 0x1000f, 0x10011, 0x20013, 0x20017, 0x2001b, 0x2001f,
    0x30023, 0x3002b, 0x30033, 0x3003b, 0x40043, 0x40053, 0x40063, 0x40073,
    0x50083, 0x500a3, 0x500c3, 0x500e3, 0x00102, 0x00102, 0x00102
  ]);

  var distDecode = new Uint32Array([
    0x00001, 0x00002, 0x00003, 0x00004, 0x10005, 0x10007, 0x20009, 0x2000d,
    0x30011, 0x30019, 0x40021, 0x40031, 0x50041, 0x50061, 0x60081, 0x600c1,
    0x70101, 0x70181, 0x80201, 0x80301, 0x90401, 0x90601, 0xa0801, 0xa0c01,
    0xb1001, 0xb1801, 0xc2001, 0xc3001, 0xd4001, 0xd6001
  ]);

  var fixedLitCodeTab = [new Uint32Array([
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c0,
    0x70108, 0x80060, 0x80020, 0x900a0, 0x80000, 0x80080, 0x80040, 0x900e0,
    0x70104, 0x80058, 0x80018, 0x90090, 0x70114, 0x80078, 0x80038, 0x900d0,
    0x7010c, 0x80068, 0x80028, 0x900b0, 0x80008, 0x80088, 0x80048, 0x900f0,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c8,
    0x7010a, 0x80064, 0x80024, 0x900a8, 0x80004, 0x80084, 0x80044, 0x900e8,
    0x70106, 0x8005c, 0x8001c, 0x90098, 0x70116, 0x8007c, 0x8003c, 0x900d8,
    0x7010e, 0x8006c, 0x8002c, 0x900b8, 0x8000c, 0x8008c, 0x8004c, 0x900f8,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c4,
    0x70109, 0x80062, 0x80022, 0x900a4, 0x80002, 0x80082, 0x80042, 0x900e4,
    0x70105, 0x8005a, 0x8001a, 0x90094, 0x70115, 0x8007a, 0x8003a, 0x900d4,
    0x7010d, 0x8006a, 0x8002a, 0x900b4, 0x8000a, 0x8008a, 0x8004a, 0x900f4,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cc,
    0x7010b, 0x80066, 0x80026, 0x900ac, 0x80006, 0x80086, 0x80046, 0x900ec,
    0x70107, 0x8005e, 0x8001e, 0x9009c, 0x70117, 0x8007e, 0x8003e, 0x900dc,
    0x7010f, 0x8006e, 0x8002e, 0x900bc, 0x8000e, 0x8008e, 0x8004e, 0x900fc,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c2,
    0x70108, 0x80061, 0x80021, 0x900a2, 0x80001, 0x80081, 0x80041, 0x900e2,
    0x70104, 0x80059, 0x80019, 0x90092, 0x70114, 0x80079, 0x80039, 0x900d2,
    0x7010c, 0x80069, 0x80029, 0x900b2, 0x80009, 0x80089, 0x80049, 0x900f2,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900ca,
    0x7010a, 0x80065, 0x80025, 0x900aa, 0x80005, 0x80085, 0x80045, 0x900ea,
    0x70106, 0x8005d, 0x8001d, 0x9009a, 0x70116, 0x8007d, 0x8003d, 0x900da,
    0x7010e, 0x8006d, 0x8002d, 0x900ba, 0x8000d, 0x8008d, 0x8004d, 0x900fa,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c6,
    0x70109, 0x80063, 0x80023, 0x900a6, 0x80003, 0x80083, 0x80043, 0x900e6,
    0x70105, 0x8005b, 0x8001b, 0x90096, 0x70115, 0x8007b, 0x8003b, 0x900d6,
    0x7010d, 0x8006b, 0x8002b, 0x900b6, 0x8000b, 0x8008b, 0x8004b, 0x900f6,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900ce,
    0x7010b, 0x80067, 0x80027, 0x900ae, 0x80007, 0x80087, 0x80047, 0x900ee,
    0x70107, 0x8005f, 0x8001f, 0x9009e, 0x70117, 0x8007f, 0x8003f, 0x900de,
    0x7010f, 0x8006f, 0x8002f, 0x900be, 0x8000f, 0x8008f, 0x8004f, 0x900fe,
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c1,
    0x70108, 0x80060, 0x80020, 0x900a1, 0x80000, 0x80080, 0x80040, 0x900e1,
    0x70104, 0x80058, 0x80018, 0x90091, 0x70114, 0x80078, 0x80038, 0x900d1,
    0x7010c, 0x80068, 0x80028, 0x900b1, 0x80008, 0x80088, 0x80048, 0x900f1,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c9,
    0x7010a, 0x80064, 0x80024, 0x900a9, 0x80004, 0x80084, 0x80044, 0x900e9,
    0x70106, 0x8005c, 0x8001c, 0x90099, 0x70116, 0x8007c, 0x8003c, 0x900d9,
    0x7010e, 0x8006c, 0x8002c, 0x900b9, 0x8000c, 0x8008c, 0x8004c, 0x900f9,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c5,
    0x70109, 0x80062, 0x80022, 0x900a5, 0x80002, 0x80082, 0x80042, 0x900e5,
    0x70105, 0x8005a, 0x8001a, 0x90095, 0x70115, 0x8007a, 0x8003a, 0x900d5,
    0x7010d, 0x8006a, 0x8002a, 0x900b5, 0x8000a, 0x8008a, 0x8004a, 0x900f5,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cd,
    0x7010b, 0x80066, 0x80026, 0x900ad, 0x80006, 0x80086, 0x80046, 0x900ed,
    0x70107, 0x8005e, 0x8001e, 0x9009d, 0x70117, 0x8007e, 0x8003e, 0x900dd,
    0x7010f, 0x8006e, 0x8002e, 0x900bd, 0x8000e, 0x8008e, 0x8004e, 0x900fd,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c3,
    0x70108, 0x80061, 0x80021, 0x900a3, 0x80001, 0x80081, 0x80041, 0x900e3,
    0x70104, 0x80059, 0x80019, 0x90093, 0x70114, 0x80079, 0x80039, 0x900d3,
    0x7010c, 0x80069, 0x80029, 0x900b3, 0x80009, 0x80089, 0x80049, 0x900f3,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900cb,
    0x7010a, 0x80065, 0x80025, 0x900ab, 0x80005, 0x80085, 0x80045, 0x900eb,
    0x70106, 0x8005d, 0x8001d, 0x9009b, 0x70116, 0x8007d, 0x8003d, 0x900db,
    0x7010e, 0x8006d, 0x8002d, 0x900bb, 0x8000d, 0x8008d, 0x8004d, 0x900fb,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c7,
    0x70109, 0x80063, 0x80023, 0x900a7, 0x80003, 0x80083, 0x80043, 0x900e7,
    0x70105, 0x8005b, 0x8001b, 0x90097, 0x70115, 0x8007b, 0x8003b, 0x900d7,
    0x7010d, 0x8006b, 0x8002b, 0x900b7, 0x8000b, 0x8008b, 0x8004b, 0x900f7,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900cf,
    0x7010b, 0x80067, 0x80027, 0x900af, 0x80007, 0x80087, 0x80047, 0x900ef,
    0x70107, 0x8005f, 0x8001f, 0x9009f, 0x70117, 0x8007f, 0x8003f, 0x900df,
    0x7010f, 0x8006f, 0x8002f, 0x900bf, 0x8000f, 0x8008f, 0x8004f, 0x900ff
  ]), 9];

  var fixedDistCodeTab = [new Uint32Array([
    0x50000, 0x50010, 0x50008, 0x50018, 0x50004, 0x50014, 0x5000c, 0x5001c,
    0x50002, 0x50012, 0x5000a, 0x5001a, 0x50006, 0x50016, 0x5000e, 0x00000,
    0x50001, 0x50011, 0x50009, 0x50019, 0x50005, 0x50015, 0x5000d, 0x5001d,
    0x50003, 0x50013, 0x5000b, 0x5001b, 0x50007, 0x50017, 0x5000f, 0x00000
  ]), 5];
  
  function error(e) {
      throw new Error(e)
  }

  function constructor(bytes) {
    //var bytes = stream.getBytes();
    var bytesPos = 0;

    var cmf = bytes[bytesPos++];
    var flg = bytes[bytesPos++];
    if (cmf == -1 || flg == -1)
      error('Invalid header in flate stream');
    if ((cmf & 0x0f) != 0x08)
      error('Unknown compression method in flate stream');
    if ((((cmf << 8) + flg) % 31) != 0)
      error('Bad FCHECK in flate stream');
    if (flg & 0x20)
      error('FDICT bit set in flate stream');

    this.bytes = bytes;
    this.bytesPos = bytesPos;

    this.codeSize = 0;
    this.codeBuf = 0;

    DecodeStream.call(this);
  }

  constructor.prototype = Object.create(DecodeStream.prototype);

  constructor.prototype.getBits = function(bits) {
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    var b;
    while (codeSize < bits) {
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= b << codeSize;
      codeSize += 8;
    }
    b = codeBuf & ((1 << bits) - 1);
    this.codeBuf = codeBuf >> bits;
    this.codeSize = codeSize -= bits;
    this.bytesPos = bytesPos;
    return b;
  };

  constructor.prototype.getCode = function(table) {
    var codes = table[0];
    var maxLen = table[1];
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    while (codeSize < maxLen) {
      var b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= (b << codeSize);
      codeSize += 8;
    }
    var code = codes[codeBuf & ((1 << maxLen) - 1)];
    var codeLen = code >> 16;
    var codeVal = code & 0xffff;
    if (codeSize == 0 || codeSize < codeLen || codeLen == 0)
      error('Bad encoding in flate stream');
    this.codeBuf = (codeBuf >> codeLen);
    this.codeSize = (codeSize - codeLen);
    this.bytesPos = bytesPos;
    return codeVal;
  };

  constructor.prototype.generateHuffmanTable = function(lengths) {
    var n = lengths.length;

    // find max code length
    var maxLen = 0;
    for (var i = 0; i < n; ++i) {
      if (lengths[i] > maxLen)
        maxLen = lengths[i];
    }

    // build the table
    var size = 1 << maxLen;
    var codes = new Uint32Array(size);
    for (var len = 1, code = 0, skip = 2;
         len <= maxLen;
         ++len, code <<= 1, skip <<= 1) {
      for (var val = 0; val < n; ++val) {
        if (lengths[val] == len) {
          // bit-reverse the code
          var code2 = 0;
          var t = code;
          for (var i = 0; i < len; ++i) {
            code2 = (code2 << 1) | (t & 1);
            t >>= 1;
          }

          // fill the table entries
          for (var i = code2; i < size; i += skip)
            codes[i] = (len << 16) | val;

          ++code;
        }
      }
    }

    return [codes, maxLen];
  };

  constructor.prototype.readBlock = function() {
    function repeat(stream, array, len, offset, what) {
      var repeat = stream.getBits(len) + offset;
      while (repeat-- > 0)
        array[i++] = what;
    }

    // read block header
    var hdr = this.getBits(3);
    if (hdr & 1)
      this.eof = true;
    hdr >>= 1;

    if (hdr == 0) { // uncompressed block
      var bytes = this.bytes;
      var bytesPos = this.bytesPos;
      var b;

      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var blockLen = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      blockLen |= (b << 8);
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var check = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      check |= (b << 8);
      if (check != (~blockLen & 0xffff))
        error('Bad uncompressed block length in flate stream');

      this.codeBuf = 0;
      this.codeSize = 0;

      var bufferLength = this.bufferLength;
      var buffer = this.ensureBuffer(bufferLength + blockLen);
      var end = bufferLength + blockLen;
      this.bufferLength = end;
      for (var n = bufferLength; n < end; ++n) {
        if (typeof (b = bytes[bytesPos++]) == 'undefined') {
          this.eof = true;
          break;
        }
        buffer[n] = b;
      }
      this.bytesPos = bytesPos;
      return;
    }

    var litCodeTable;
    var distCodeTable;
    if (hdr == 1) { // compressed block, fixed codes
      litCodeTable = fixedLitCodeTab;
      distCodeTable = fixedDistCodeTab;
    } else if (hdr == 2) { // compressed block, dynamic codes
      var numLitCodes = this.getBits(5) + 257;
      var numDistCodes = this.getBits(5) + 1;
      var numCodeLenCodes = this.getBits(4) + 4;

      // build the code lengths code table
      var codeLenCodeLengths = Array(codeLenCodeMap.length);
      var i = 0;
      while (i < numCodeLenCodes)
        codeLenCodeLengths[codeLenCodeMap[i++]] = this.getBits(3);
      var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);

      // build the literal and distance code tables
      var len = 0;
      var i = 0;
      var codes = numLitCodes + numDistCodes;
      var codeLengths = new Array(codes);
      while (i < codes) {
        var code = this.getCode(codeLenCodeTab);
        if (code == 16) {
          repeat(this, codeLengths, 2, 3, len);
        } else if (code == 17) {
          repeat(this, codeLengths, 3, 3, len = 0);
        } else if (code == 18) {
          repeat(this, codeLengths, 7, 11, len = 0);
        } else {
          codeLengths[i++] = len = code;
        }
      }

      litCodeTable =
        this.generateHuffmanTable(codeLengths.slice(0, numLitCodes));
      distCodeTable =
        this.generateHuffmanTable(codeLengths.slice(numLitCodes, codes));
    } else {
      error('Unknown block type in flate stream');
    }

    var buffer = this.buffer;
    var limit = buffer ? buffer.length : 0;
    var pos = this.bufferLength;
    while (true) {
      var code1 = this.getCode(litCodeTable);
      if (code1 < 256) {
        if (pos + 1 >= limit) {
          buffer = this.ensureBuffer(pos + 1);
          limit = buffer.length;
        }
        buffer[pos++] = code1;
        continue;
      }
      if (code1 == 256) {
        this.bufferLength = pos;
        return;
      }
      code1 -= 257;
      code1 = lengthDecode[code1];
      var code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var len = (code1 & 0xffff) + code2;
      code1 = this.getCode(distCodeTable);
      code1 = distDecode[code1];
      code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var dist = (code1 & 0xffff) + code2;
      if (pos + len >= limit) {
        buffer = this.ensureBuffer(pos + len);
        limit = buffer.length;
      }
      for (var k = 0; k < len; ++k, ++pos)
        buffer[pos] = buffer[pos - dist];
    }
  };

  return constructor;
})();

module.exports = FlateStream;
},{}],30:[function(require,module,exports){
/*
	This is rot.js, the ROguelike Toolkit in JavaScript.
	Version 0.6~dev, generated on Tue Mar 17 16:16:31 CET 2015.
*/
/**
 * @namespace Top-level ROT namespace
 */
var ROT = {
	/** Directional constants. Ordering is important! */
	DIRS: {
		"4": [
			[ 0, -1],
			[ 1,  0],
			[ 0,  1],
			[-1,  0]
		],
		"8": [
			[ 0, -1],
			[ 1, -1],
			[ 1,  0],
			[ 1,  1],
			[ 0,  1],
			[-1,  1],
			[-1,  0],
			[-1, -1]
		],
		"6": [
			[-1, -1],
			[ 1, -1],
			[ 2,  0],
			[ 1,  1],
			[-1,  1],
			[-2,  0]
		]
	}
};
/**
 * Always positive modulus
 * @param {int} n Modulus
 * @returns {int} this modulo n
 */
Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
}
if (!Object.create) {  
	/**
	 * ES5 Object.create
	 */
	Object.create = function(o) {  
		var tmp = function() {};
		tmp.prototype = o;
		return new tmp();
	};  
}  
/**
 * Sets prototype of this function to an instance of parent function
 * @param {function} parent
 */
Function.prototype.extend = function(parent) {
	this.prototype = Object.create(parent.prototype);
	this.prototype.constructor = this;
	return this;
}
if (typeof window != "undefined") {
	window.requestAnimationFrame =
		window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.oRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function(cb) { return setTimeout(cb, 1000/60); };

	window.cancelAnimationFrame =
		window.cancelAnimationFrame
		|| window.mozCancelAnimationFrame
		|| window.webkitCancelAnimationFrame
		|| window.oCancelAnimationFrame
		|| window.msCancelAnimationFrame
		|| function(id) { return clearTimeout(id); };
}
/**
 * @class Abstract FOV algorithm
 * @param {function} lightPassesCallback Does the light pass through x,y?
 * @param {object} [options]
 * @param {int} [options.topology=8] 4/6/8
 */
ROT.FOV = function(lightPassesCallback, options) {
	this._lightPasses = lightPassesCallback;
	this._options = {
		topology: 8
	}
	for (var p in options) { this._options[p] = options[p]; }
};

/**
 * Compute visibility for a 360-degree circle
 * @param {int} x
 * @param {int} y
 * @param {int} R Maximum visibility radius
 * @param {function} callback
 */
ROT.FOV.prototype.compute = function(x, y, R, callback) {}

/**
 * Return all neighbors in a concentric ring
 * @param {int} cx center-x
 * @param {int} cy center-y
 * @param {int} r range
 */
ROT.FOV.prototype._getCircle = function(cx, cy, r) {
	var result = [];
	var dirs, countFactor, startOffset;

	switch (this._options.topology) {
		case 4:
			countFactor = 1;
			startOffset = [0, 1];
			dirs = [
				ROT.DIRS[8][7],
				ROT.DIRS[8][1],
				ROT.DIRS[8][3],
				ROT.DIRS[8][5]
			]
		break;

		case 6:
			dirs = ROT.DIRS[6];
			countFactor = 1;
			startOffset = [-1, 1];
		break;

		case 8:
			dirs = ROT.DIRS[4];
			countFactor = 2;
			startOffset = [-1, 1];
		break;
	}

	/* starting neighbor */
	var x = cx + startOffset[0]*r;
	var y = cy + startOffset[1]*r;

	/* circle */
	for (var i=0;i<dirs.length;i++) {
		for (var j=0;j<r*countFactor;j++) {
			result.push([x, y]);
			x += dirs[i][0];
			y += dirs[i][1];

		}
	}

	return result;
}
/**
 * @class Precise shadowcasting algorithm
 * @augments ROT.FOV
 */
ROT.FOV.PreciseShadowcasting = function(lightPassesCallback, options) {
	ROT.FOV.call(this, lightPassesCallback, options);
}
ROT.FOV.PreciseShadowcasting.extend(ROT.FOV);

ROT.FOV.PreciseShadowcasting.prototype.compute = function(x, y, R, callback) {
	/* this place is always visible */
	callback(x, y, 0, 1);
    
	callback(x-1, y-1, 0, 1);
	callback(x, y-1, 0, 1);
	callback(x+1, y-1, 0, 1);
	callback(x-1, y, 0, 1);
	callback(x+1, y, 0, 1);
	callback(x-1, y+1, 0, 1);
	callback(x, y+1, 0, 1);
	callback(x+1, y+1, 0, 1);
    
    callback(x-1, y-2, 0, 1);
    callback(x, y-2, 0, 1);
    callback(x+1, y-2, 0, 1);
    callback(x-2, y-1, 0, 1);
    callback(x-2, y, 0, 1);
    callback(x-2, y+1, 0, 1);
    callback(x+2, y-1, 0, 1);
    callback(x+2, y, 0, 1);
    callback(x+2, y+1, 0, 1);
    callback(x-1, y+2, 0, 1);
    callback(x, y+2, 0, 1);
    callback(x+1, y+2, 0, 1);

	/* standing in a dark place. FIXME is this a good idea?  */
	if (!this._lightPasses(x, y)) { return; }
	
	/* list of all shadows */
	var SHADOWS = [];
	var trees = {};
	var totalNeighborCount = 1;
    var cx, cy, blocks, A1, A2, visibility,
        dx, dy, dd, a, b, radius,
        cx2, cy2, dd1,
        obstacleType;

	/* analyze surrounding cells in concentric rings, starting from the center */
	for (var r=1; r<=R; r++) {
		var neighbors = this._getCircle(x, y, r);
		var neighborCount = neighbors.length;
        totalNeighborCount += neighborCount;
        trees = {};
		for (var i=0;i<neighborCount;i++) {
			cx = neighbors[i][0];
			cy = neighbors[i][1];
            var key = cx+","+cy;
            if ((x-cx)*(x-cx) + (y-cy)*(y-cy) >= R * R) {
                totalNeighborCount--;
                continue;
            }
            //if (key == "44,102") //console.log('KEY', key, !this._lightPasses(cx, cy));
            // if (key == "150,160") //console.log(key, obstacleType);
            // if (key == "151,161") //console.log(key, obstacleType);
            // if (key == "150,161") //console.log(key, obstacleType);
            var obstacleTypes = obstacleTypes = this.walls[key];
            if (obstacleTypes && obstacleTypes.length) {
                var skipVisibility = false;
                for (var j = 0; j < obstacleTypes.length; j++) {
                    var obstacleType = obstacleTypes[j];
                    cx2 = obstacleType[1];
                    cy2 = obstacleType[2];
                    radius = obstacleType[3];
                    
                    dx = cx2 - x;
                    dy = cy2 - y;
                    dd = Math.sqrt(dx * dx + dy * dy);
                    if (dd > 1/2) {
                        a = Math.asin(radius / dd);
                        b = Math.atan2(dy, dx),
                        A1 = normalize(b - a),
                        A2 = normalize(b + a);
                        blocks = !this._lightPasses(cx, cy);
                        
                        dx1 = cx - x;
                        dy1 = cy - y;
                        dd1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                        if (dd1 < dd) {
                            trees[obstacleType[1]+","+obstacleType[2]] = [obstacleType[1], obstacleType[2]];
                        }
                        
                        dx = cx - x;
                        dy = cy - y;
                        dd = Math.sqrt(dx * dx + dy * dy);
                        a = Math.asin(radius / dd);
                        b = Math.atan2(dy, dx),
                        A1 = normalize(b - a),
                        A2 = normalize(b + a);
                        visibility = this._checkVisibility(b, A1, A2, false, SHADOWS);
                        if (!visibility) skipVisibility = true;
                    }
                }
                if (visibility && !skipVisibility) { callback(cx, cy, r, visibility); }
            }
            else {
                cx2 = cx;
                cy2 = cy;
                radius = Math.SQRT2 / 2;
                
                dx = cx2 - x;
                dy = cy2 - y;
                dd = Math.sqrt(dx * dx + dy * dy);
                if (dd > 1/2) {
                    a = Math.asin(radius / dd);
                    b = Math.atan2(dy, dx),
                    A1 = normalize(b - a),
                    A2 = normalize(b + a);
                    blocks = !this._lightPasses(cx, cy);
                    
                    visibility = this._checkVisibility(b, A1, A2, blocks, SHADOWS);
                    if (visibility) { callback(cx, cy, r, visibility); }
                    if (this.done) return;
                }
            }
            
            /*dx = cx2 - x;
            dy = cy2 - y;
            dd = Math.sqrt(dx * dx + dy * dy);
            if (dd > 1/2) {
                a = Math.asin(radius / dd);
                b = Math.atan2(dy, dx),
                A1 = normalize(b - a),
                A2 = normalize(b + a);
                blocks = !this._lightPasses(cx, cy);
                if (obstacleType && obstacleType[0] == 'tree') {
                    dx1 = cx - x;
                    dy1 = cy - y;
                    dd1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                    if (dd1 < dd) {
                        trees[obstacleType[1]+","+obstacleType[2]] = [obstacleType[1], obstacleType[2]];
                    }
                    
                    dx = cx - x;
                    dy = cy - y;
                    dd = Math.sqrt(dx * dx + dy * dy);
                    a = Math.asin(radius / dd);
                    b = Math.atan2(dy, dx),
                    A1 = normalize(b - a),
                    A2 = normalize(b + a);
                    visibility = this._checkVisibility(b, A1, A2, false, SHADOWS);
                    if (visibility) { callback(cx, cy, r, visibility); }
                }
                else {
                    //if (obstacleType) //console.log(obstacleType[0], radius);
                    //console.log('BLOCKS', cx, cy, blocks, b);
                    visibility = this._checkVisibility(b, A1, A2, blocks, SHADOWS);
                    if (visibility) { callback(cx, cy, r, visibility); }
                    if (this.done) return;
                }
            }*/

		} /* for all cells in this ring */
        
        // apply tree blockers
        for (var k in trees) {
            ////console.log('apply tree');
            cx2 = trees[k][0];
            cy2 = trees[k][1];
            dx = cx2 - x;
            dy = cy2 - y;
            dd = Math.sqrt(dx * dx + dy * dy);
            radius = Math.SQRT2 - .01;
            if (dd > 1/2) {
                a = Math.asin(radius / dd);
                b = Math.atan2(dy, dx),
                A1 = normalize(b - a),
                A2 = normalize(b + a);
                visibility = this._checkVisibility(b, A1, A2, true, SHADOWS);
                if (this.done) return;
            }
        }
	} /* for all rings */
    
    return totalNeighborCount;
}

/**
 * @param {int[2]} A1 arc start
 * @param {int[2]} A2 arc end
 * @param {bool} blocks Does current arc block visibility?
 * @param {int[][]} SHADOWS list of active shadows
 */
ROT.FOV.PreciseShadowcasting.prototype._checkVisibility = function(b, A1, A2, blocks, SHADOWS) {
    ////console.log('_checkVisibility', b, A1, A2, blocks, SHADOWS);
    // check if target center is inside a shadow
    var visible = !blocks;
    //console.log('_checkVisibility', b, visible);
	for (var i = 0; i < SHADOWS.length; i++) {
		var old = SHADOWS[i];
        if (isBetween(b, old[0], old[1])) {
            if (blocks) {
                ////console.log('blocks but not visible', SHADOWS.length);
                visible = false;
            }
            else {
                //console.log(i, b, JSON.stringify(SHADOWS));
                return false; // not visible, return
            }
        }
	}
    
    if (blocks) {
        if (A1 < 0 && A2 >= 0) {
            //console.log('splitting');
            this._mergeShadows(b, 0, A2, blocks, SHADOWS);
            this.done = false;
            this._mergeShadows(b, A1, 0, blocks, SHADOWS);
        }
        else {
            //console.log('not splitting', blocks, visible, b);
            this._mergeShadows(b, A1, A2, blocks, SHADOWS);
        }
        //console.log('end', A1, A2, JSON.stringify(SHADOWS), !isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]), !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1]));
        if (SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1])) && A1 != SHADOWS[0][0] && A2 != SHADOWS[0][1] ) {
            this.done = true;
        }
    }
    
    return visible;
}

ROT.FOV.PreciseShadowcasting.prototype._mergeShadows = function(b, A1, A2, blocks, SHADOWS) {
    ////console.log('merging', b, A1, A2);
    // check if target first edge is inside a shadow or which shadows it is between
    var index1 = 0,
        edge1 = false,
        firstIndex = 0;
    while (index1 < SHADOWS.length) {
        var old = SHADOWS[index1];
        firstIndex = index1;
        if (isBetween(A1, old[0], old[1])) {
            edge1 = true;
            break;
        }
        if (index1 > 0 && isBetween(A1, SHADOWS[index1 - 1][1], old[0])) {
            edge1 = false;
            break;
        }
        if (!isBefore(A1, old[1])) {
            index1++;
            firstIndex = index1;
            continue;
        }
        if (isBefore(A1, old[0])) {
            break;
        }
        index1++;
    }
    
    // check if target second edge is inside a shadow or which shadows it is between
    var index2 = SHADOWS.length - 1,
        edge2 = false,
        secondIndex = 0;
    while (index2 >= 0) {
        var old = SHADOWS[index2];
        secondIndex = index2;
        ////console.log(A2, old[0], old[1], isBetween(A2, old[0], old[1]))
        if (isBetween(A2, old[0], old[1])) {
            edge2 = true;
            break;
        }
        if (isBefore(A2, old[0])) {
            index2--;
            secondIndex = index2;
            continue;
        }
        if (!isBefore(A2, old[1])) {
            break;
        }
        index2--;
    }
    
    ////console.log(firstIndex, secondIndex, edge1, edge2, A1, A2);
    if (firstIndex == SHADOWS.length && !edge1 && secondIndex == 0 && edge2) firstIndex = 0;
    //if (secondIndex == -1) secondIndex = SHADOWS.length - 1;
    //console.log(firstIndex, secondIndex, edge1, edge2, A1, A2);
    //console.log(JSON.stringify(SHADOWS));
    if (SHADOWS.length == 0) {
        //console.log('empty shadows pushing', [A1, A2]);
        SHADOWS.push([A1, A2]);
    }
    /*else if (SHADOWS.length > 1 && firstIndex == SHADOWS.length && secondIndex == 0 && !edge1 && edge2) {
    
    }*/
    else {
        var new_shadow = [edge1 ? SHADOWS[firstIndex][0] : A1, edge2 ? SHADOWS[secondIndex][1] : A2];
        //console.log('new_shadow', new_shadow);
        secondIndex = Math.max(firstIndex, secondIndex);
        var sum1 = diff_sum(SHADOWS);
        var doShift = false;
        if (isBetween(0, new_shadow[0], new_shadow[1]) && new_shadow[0] != 0 && new_shadow[1] != 0) {
            //console.log('crosses 0');
            SHADOWS.splice(firstIndex, firstIndex == secondIndex && edge1 == edge2 && !edge1 ? 0 : secondIndex - firstIndex + 1, [new_shadow[0], 0]);
            //console.log([new_shadow[0], 0], JSON.stringify(SHADOWS));
            if (SHADOWS[0][0] != 0 && SHADOWS[0][1] != new_shadow[1]) {
                SHADOWS.splice(firstIndex + 1, 0, [0, new_shadow[1]]);
                //console.log([0, new_shadow[1]], JSON.stringify(SHADOWS));
            }
            //console.log(JSON.stringify(SHADOWS));
            doShift = true;
        }
        else {
            SHADOWS.splice(firstIndex, firstIndex == secondIndex && edge1 == edge2 && !edge1 ? 0 : secondIndex - firstIndex + 1, new_shadow);
        }
        var sum2 = diff_sum(SHADOWS);
        //console.log('sum1', sum1, 'sum2', sum2, sum2 < sum1, SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1])));
        if (sum2 < sum1) this.done = true;
        /*if (SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1]))) {
            this.done = true;
        }*/
        if (new_shadow[0] == 0 || doShift) {
            var count = 0;
            //console.log('shifting');
            while (SHADOWS[0][0] != 0) {
                SHADOWS.push(SHADOWS.shift());
                if (count >= SHADOWS.length) break;
                count++;
                //console.log(JSON.stringify(SHADOWS));
            }
            //console.log('end shifting', JSON.stringify(SHADOWS));
        }
        //console.log(JSON.stringify(SHADOWS));
        //console.log(diff_sum(SHADOWS));
    }
}

function isBefore(A1, A2) {
    if (A1 > 0 && A2 < 0) { // A1 in bottom half, A2 in top half
        return true;
    }
    else if (A2 > 0 && A1 < 0) { // A1 in top half, A2 in bottom half
        return false;
    }
    else {
        return A1 < A2;
    }
}

function isAfter(A1, A2) {
    return !isBefore(A1, A2);
}

function isBetween(b, A1, A2) {
    if (A1 < A2) {
        return ((A1 <= b) && (b <= A2));
    }
    else {
        return ((A1 <= b) && (b <= Math.PI)) || ((-Math.PI <= b) && (b <= A2));
    }
}

function normalize(x) {
    if (x > Math.PI) {
        return -(2 * Math.PI - x);
    }
    else if ( x < -Math.PI) {
        return 2 * Math.PI + x;
    }
    else {
        return x;
    }
}

function diff(A1, A2) {
    if (A1 > 0 && A2 < 0) { // A1 in bottom half, A2 in top half
        return Math.abs((Math.PI - A1) - (-Math.PI - A2));
    }
    else if (A2 > 0 && A1 < 0) { // A1 in top half, A2 in bottom half
        return Math.abs(-A1 + A2);
    }
    if (A1 <= 0 && A2 <= 0) { // A1,A2 in bottom half
        if (isAfter(A1, A2)) { // A1 after A2
            return -A1 + Math.PI - (-Math.PI - A2)
        }
        else {
            return Math.abs(A2 - A1);
        }
    }
    else {
        if (isAfter(A1, A2)) {
            return Math.PI + (Math.PI - A1) + A2
        }
        else {
            return Math.abs(A2 - A1);
        }
    }
}

function diff_sum(SHADOWS) {
    var sum = 0;
    for (var i = 0; i < SHADOWS.length; i++) {
        ////console.log(SHADOWS[i][0], SHADOWS[i][1], diff(SHADOWS[i][0], SHADOWS[i][1]));
        sum += diff(SHADOWS[i][0], SHADOWS[i][1]);
    }
    return sum;
}

module.exports = ROT;
},{}],31:[function(require,module,exports){
var ImageHandler = require("./imageHandler.js");
var ROT = require("./rot6.js");

var key2pt_cache = {};
function key2pt(key) {
    if (key in key2pt_cache) return key2pt_cache[key];
    var p = key.split(',').map(function (c) { return parseInt(c) });
    var pt = {x: p[0], y: p[1], key: key};
    key2pt_cache[key] = pt;
    return pt;
}

function xy2key(x, y) {
    return x + "," + y;
}

function xy2pt(x, y) {
    return {x: x, y: y, key: x + "," + y};
}

function pt2key(pt) {
    return pt.x + "," + pt.y;
}

function generateElevationWalls(data, elevation) {
    var t1 = Date.now();
    var walls = {};
    for (var key in data) {
        var pt = data[key];
        if (pt.z > elevation) {
            adjLoop:
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    if (0 !== i || 0 !== j) {
                        var k = (pt.x + i) + "," + (pt.y + j);
                        if (data[k] && data[k].z <= elevation) {
                            walls[pt.key] = pt;
                            break adjLoop;
                        }
                    }
                }
            }
        }
    }
    console.log('generateElevationWalls', Date.now() - t1 + 'ms');
    return walls;
}

function setElevationWalls(obj, data, elevation) {
    for (var i = 0; i < data[elevation].length; i++) {
        var el = data[elevation][i];
        obj[el[1] + "," + el[2]] = el;
    }
}

function setWalls(obj, data, id, r) {
    id = id || 'wall';
    r = r || (Math.SQRT2 / 2);
    for (var i in data) {
        obj[i] = [id, data[i].x, data[i].y, r];
    }
}

function setTreeWalls(obj, elevation, tree, tree_elevations, tree_state, tree_blocks) {
    for (var i in tree) {
        if (elevation < tree_elevations[i]) {
            if (tree_state[i]) {
                //obj[i] = ['tree', tree[i].x, tree[i].y, Math.SQRT2];
                tree_blocks[i].forEach(function (pt) {
                    var k = pt.x + "," + pt.y;
                    obj[k] = (obj[k] || []).concat([['tree', tree[i].x, tree[i].y, Math.SQRT2]]);
                });
            }
        }
    }
}

function VisionSimulation(worlddata, mapDataImagePath, onReady, opts) {
    var self = this;
    
    this.opts = opts || {};
    this.grid = [];
    this.gridnav = null;
    this.ent_fow_blocker_node = null;
    this.tools_no_wards = null;
    this.elevationValues = [];
    this.elevationGrid = null;
    this.elevationWalls = {};
    this.treeWalls = {};
    this.tree = {}; // center key to point map
    this.tree_blocks = {}; // center to corners map
    this.tree_relations = {}; // corner to center map
    this.tree_elevations = {};
    this.tree_state = {};
    this.walls = {};
    this.radius = this.opts.radius || parseInt(1600 / 64);
    this.lights = {};
    this.worldMinX = worlddata.worldMinX;
    this.worldMinY = worlddata.worldMinY;
    this.worldMaxX = worlddata.worldMaxX;
    this.worldMaxY = worlddata.worldMaxY;
    this.worldWidth = this.worldMaxX - this.worldMinX;
    this.worldHeight = this.worldMaxY - this.worldMinY;
    this.gridWidth = this.worldWidth / 64 + 1;
    this.gridHeight = this.worldHeight / 64 + 1;
    this.ready = false;
    this.area = 0;
    
    this.imageHandler = new ImageHandler(mapDataImagePath);
    var t1 = Date.now();
    this.imageHandler.load(function () {
        var t2 = Date.now();
        console.log('image load', t2 - t1 + 'ms');
        self.gridnav = parseImage(self.imageHandler, self.gridWidth * 2, self.gridWidth, self.gridHeight, blackPixelHandler);
        self.ent_fow_blocker_node = parseImage(self.imageHandler, self.gridWidth * 3, self.gridWidth, self.gridHeight, blackPixelHandler);
        self.tools_no_wards = parseImage(self.imageHandler, self.gridWidth * 4, self.gridWidth, self.gridHeight, blackPixelHandler);
        parseImage(self.imageHandler, self.gridWidth, self.gridWidth, self.gridHeight, treeElevationPixelHandler);
        self.elevationGrid = parseImage(self.imageHandler, 0, self.gridWidth, self.gridHeight, elevationPixelHandler);
        var t3 = Date.now();
        console.log('image process', t3 - t2 + 'ms');
        self.elevationValues.forEach(function (elevation) {
            //self.elevationWalls[elevation] = generateElevationWalls(self.elevationGrid, elevation);
            self.treeWalls[elevation] = {};
            setTreeWalls(self.treeWalls[elevation], elevation, self.tree, self.tree_elevations, self.tree_state, self.tree_blocks)
        });
        var t4 = Date.now();
        console.log('walls generation', t4 - t3 + 'ms');
        for (var i = 0; i < self.gridWidth; i++) {
            self.grid[i] = [];
            for (var j = 0; j < self.gridHeight; j++) {
                var pt = xy2pt(i, j);
                key2pt_cache[pt.key] = pt;
                self.grid[i].push(pt);
            }
        }
        var t5 = Date.now();
        console.log('cache prime', t5 - t4 + 'ms');
        self.ready = true;
        onReady();
    });

    function parseImage(imageHandler, offset, width, height, pixelHandler) {
        var grid = {};
        imageHandler.scan(offset, width, height, pixelHandler, grid);
        return grid;
    }

    function blackPixelHandler(x, y, p, grid) {
        var pt = self.ImageXYtoGridXY(x, y);
        if (p[0] === 0) {
            grid[pt.x + "," + pt.y] = pt;
        }
    }

    
    function elevationPixelHandler(x, y, p, grid) {
        var pt = self.ImageXYtoGridXY(x, y);
        pt.z = p[0];
        grid[pt.x + "," + pt.y] = pt;
        if (self.elevationValues.indexOf(p[0]) == -1) {
            self.elevationValues.push(p[0]);
        }
    }

    function treeElevationPixelHandler(x, y, p, grid) {
        var pt = self.ImageXYtoGridXY(x, y);
        if (p[1] == 0 && p[2] == 0) {
            // trees are 2x2 in grid
            // tree origins rounded up when converted to grid, so they represent top right corner. subtract 0.5 to get grid origin
            var treeOrigin = xy2pt(pt.x - 0.5, pt.y - 0.5);
            var treeElevation = p[0] + 40;
            var kC = treeOrigin.key;
            self.tree[kC] = treeOrigin;
            self.tree_elevations[kC] = treeElevation;
            self.tree_blocks[kC] = [];
            self.tree_state[kC] = true;
            // iterate through tree 2x2 by taking floor and ceil of tree grid origin
            [Math.floor, Math.ceil].forEach(function (i) {
                [Math.floor, Math.ceil].forEach(function (j) {
                    var treeCorner = xy2pt(i(treeOrigin.x), j(treeOrigin.y));
                    self.tree_relations[treeCorner.key] = (self.tree_relations[treeCorner.key] || []).concat(treeOrigin);
                    self.tree_blocks[kC].push(treeCorner);
                });
            });
        }
    }

    this.lightPassesCallback = function (x, y) {
        var key = x + ',' + y;
        return !(key in self.elevationWalls[self.elevation]) && !(key in self.ent_fow_blocker_node) && !(key in self.treeWalls[self.elevation] && self.treeWalls[self.elevation][key].length > 0) ;
    }
    
    this.fov = new ROT.FOV.PreciseShadowcasting(this.lightPassesCallback, {topology:8});
}
VisionSimulation.prototype.updateVisibility = function (gX, gY, radius) {
    var self = this,
        key = xy2key(gX, gY);

    radius = radius || self.radius;
    this.elevation = this.elevationGrid[key].z;
    this.walls = this.treeWalls[this.elevation];
    if (!this.elevationWalls[this.elevation]) this.elevationWalls[this.elevation] = generateElevationWalls(this.elevationGrid, this.elevation);
    //setElevationWalls(this.walls, this.elevationWalls, this.elevation)
    //setWalls(this.walls, this.ent_fow_blocker_node);
    //setWalls(this.walls, this.tools_no_wards);
    //setTreeWalls(this.walls, this.elevation, this.tree, this.tree_elevations, this.tree_state, this.tree_blocks);

    this.fov.walls = this.walls;
    this.lights = {};
    this.area = this.fov.compute(gX, gY, radius, function(x2, y2, r, vis) {
        var key = xy2key(x2, y2);
        if (!self.elevationGrid[key]) return;
        var treePts = self.tree_relations[key];
        var treeBlocking = false;
        if (treePts) {
            for (var i = 0; i < treePts.length; i++) {
                var treePt = treePts[i];
                treeBlocking = self.tree_state[treePt.key] && self.tree_elevations[treePt.key] > self.elevation;
                if (treeBlocking) break;
            }
        }
        if (vis == 1 && !self.ent_fow_blocker_node[key] && !treeBlocking) {
            self.lights[key] = 255;
        }
    });
    this.lightArea = Object.keys(this.lights).length;
}

VisionSimulation.prototype.isValidXY = function (x, y, bCheckGridnav, bCheckToolsNoWards, bCheckTreeState) {
    if (!this.ready) return false;
    
    var key = xy2key(x, y),
        treeBlocking = false;
        
    if (bCheckTreeState) {
        var treePts = this.tree_relations[key];
        if (treePts) {
            for (var i = 0; i < treePts.length; i++) {
                var treePt = treePts[i];
                treeBlocking = this.tree_state[treePt.key];
                if (treeBlocking) break;
            }
        }
    }
    
    return x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight && (!bCheckGridnav || !this.gridnav[key]) && (!bCheckToolsNoWards || !this.tools_no_wards[key]) && (!bCheckTreeState || !treeBlocking);
}

VisionSimulation.prototype.toggleTree = function (x, y) {
    var self = this;
    var key = xy2key(x, y);
    var isTree = !!this.tree_relations[key];
    if (isTree) {
        var treePts = this.tree_relations[key];
        for (var i = 0; i < treePts.length; i++) {
            var pt = treePts[i];
            this.tree_state[pt.key] = !this.tree_state[pt.key];
            
            this.elevationValues.forEach(function (elevation) {
                if (elevation < self.tree_elevations[pt.key]) {
                    self.tree_blocks[pt.key].forEach(function (ptB) {
                        for (var j = self.treeWalls[elevation][ptB.key].length - 1; j >= 0; j--) {
                            if (pt.x == self.treeWalls[elevation][ptB.key][j][1] && pt.y == self.treeWalls[elevation][ptB.key][j][2]) {
                                self.treeWalls[elevation][ptB.key].splice(j, 1);
                            }
                        }
                    });
                    if (self.tree_state[pt.key]) {
                        self.tree_blocks[pt.key].forEach(function (ptB) {
                            self.treeWalls[elevation][ptB.key] = (self.treeWalls[elevation][ptB.key] || []).concat([['tree', pt.x, pt.y, Math.SQRT2]]);
                        });
                    }
                }
            });
        }
    }

    return isTree;
}
VisionSimulation.prototype.setRadius = function (r) {
    this.radius = r;
}
VisionSimulation.prototype.WorldXYtoGridXY = function (wX, wY, bNoRound) {
    var x = (wX - this.worldMinX) / 64,
        y = (wY - this.worldMinY) / 64;
    if (!bNoRound) {
        x = parseInt(Math.round(x))
        y = parseInt(Math.round(y))
    }
    return {x: x, y: y, key: x + ',' + y};
}
VisionSimulation.prototype.GridXYtoWorldXY = function (gX, gY) {
    return {x: gX * 64 + this.worldMinX, y: gY * 64 + this.worldMinY};
}

VisionSimulation.prototype.GridXYtoImageXY = function (gX, gY) {
    return {x: gX, y: this.gridHeight - gY - 1};
}

VisionSimulation.prototype.ImageXYtoGridXY = function (x, y) {
    var gY = this.gridHeight - y - 1;
    return {x: x, y: gY, key: x + ',' + gY};
}

VisionSimulation.prototype.WorldXYtoImageXY = function (wX, wY) {
    var pt = this.WorldXYtoGridXY(wX, wY);
    return this.GridXYtoImageXY(pt.x, pt.y);
}

VisionSimulation.prototype.key2pt = key2pt;
VisionSimulation.prototype.xy2key = xy2key;
VisionSimulation.prototype.xy2pt = xy2pt;
VisionSimulation.prototype.pt2key = pt2key;

module.exports = VisionSimulation;
},{"./imageHandler.js":27,"./rot6.js":30}],32:[function(require,module,exports){
module.exports={"worldMinX":-8288,"worldMaxX":8288,"worldMinY":-8288,"worldMaxY":8288}
},{}]},{},[16]);
