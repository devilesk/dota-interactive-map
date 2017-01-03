var VisionSimulation = require("dota-vision-simulation");
var worlddata = require("dota-vision-simulation/src/worlddata.json");
var getLightUnion = require("./getLightUnion");
var QueryString = require('./util/queryString');
var ol = require('openlayers');
var styles = require('./styleDefinitions');
var debounce = require('./util/debounce');
var proj = require('./projections');
var getJSON = require('./util/getJSON');
var mapConstants = require('./mapConstants');
var MeasureControl = require('./measureControl');
var VisionControl = require('./visionControl');
var conversionFunctions = require('./conversionFunctions');
var reverseLerp = conversionFunctions.reverseLerp,
    latLonToWorld = conversionFunctions.latLonToWorld,
    worldToLatLon = conversionFunctions.worldToLatLon,
    getTileRadius = conversionFunctions.getTileRadius,
    getScaledRadius = conversionFunctions.getScaledRadius,
    calculateDistance = conversionFunctions.calculateDistance;
var vision_data_image_path = 'img/map_data.png';
//http://stackoverflow.com/questions/35928163/openlayers-3-static-tiles-and-xyz-coordinates
var InteractiveMap = require('./InteractiveMap');
var pointerMoveListener;
var visionPointerListener;
var vs = new VisionSimulation(worlddata, vision_data_image_path, initialize);
InteractiveMap.vs = vs;
var map = new ol.Map({
    controls: ol.control.defaults({ attribution: false, rotate: false }),
    interactions: ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false}),
    target: 'map',
    view: InteractiveMap.view
});

InteractiveMap.measureControl = new MeasureControl(map, styles.measure);

function changeMode(mode) {
    console.log('modeToggleHandler', mode);
    switch (mode) {
        case 'observer':
        case 'sentry':
            document.querySelector('input[name="ward-type"][value="' + mode + '"]').checked = true;
        case 'ward':
            InteractiveMap.MODE = document.querySelector('input[name="ward-type"]:checked').value;
            document.getElementById('btn-ward').setAttribute('ward-type', InteractiveMap.MODE);
            document.getElementById('btn-ward').classList.add('active');
            document.getElementById('btn-tree').classList.remove('active');
            QueryString.setQueryString('mode', InteractiveMap.MODE);
            InteractiveMap.measureControl.deactivate();
            if (!visionPointerListener && InteractiveMap.MODE == 'observer') {
                visionPointerListener = map.on('pointermove', visionPointerHandler);
            }
            else {
                ol.Observable.unByKey(visionPointerListener);
                visionPointerListener = null;
            }
        break;
        case 'line':
        case 'circle':
            document.querySelector('input[name="measure-type"][value="' + mode + '"]').checked = true;
        case 'measure':
            InteractiveMap.MODE = document.querySelector('input[name="measure-type"]:checked').value;
            document.getElementById('btn-ward').classList.remove('active');
            document.getElementById('btn-tree').classList.remove('active');
            QueryString.setQueryString('mode', InteractiveMap.MODE);
            InteractiveMap.measureControl.change(InteractiveMap.MODE);
            ol.Observable.unByKey(visionPointerListener);
            visionPointerListener = null;
        break;
        default:
            InteractiveMap.MODE = mode
            document.getElementById('btn-ward').classList.remove('active');
            document.getElementById('btn-tree').classList.remove('active');
            QueryString.setQueryString('mode', InteractiveMap.MODE == 'navigate' ? null : InteractiveMap.MODE);
            InteractiveMap.measureControl.deactivate();
            ol.Observable.unByKey(visionPointerListener);
            visionPointerListener = null;
        break;
    }
}

function modeToggleHandler() {
    changeMode(this.value);
}
document.querySelectorAll('input[name="mode"], input[name="ward-type"], input[name="measure-type"]').forEach(function (element) {
    element.addEventListener("change", modeToggleHandler, false);
});

function toggleLayerMenuOption(layerId, state) {
    var element = document.querySelector('input[data-layer-id="' + layerId + '"]');
    if (state != null) element.checked = state;
    updateLayerAndQueryString(element, layerId)
}
function updateLayerAndQueryString(element, layerId) {
    layerId = layerId || element.getAttribute('data-layer-id');
    var layer = InteractiveMap.getMapLayerIndex()[layerId];
    layer.setVisible(element.checked);
    var param = layer.get("title").replace(/ /g, '');
    QueryString.setQueryString(param, element.checked ? true : null);
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

function updateOverlayMenu() {
    document.querySelectorAll('.data-layer > input').forEach(function (element) {
        var label = element.nextSibling;
        var layerId = element.getAttribute('data-layer-id');
        var layerIndex = InteractiveMap.getMapLayerIndex();
        var layer = layerIndex[layerId];
        if (!layer) {
            label.style.display = "none";
        }
        else {
            label.style.display = "block";
            layer.setVisible(element.checked);
        }
    });
}

function setDefaults() {
    document.getElementById('btn-ward').setAttribute('ward-type', 'observer');
    var mode = QueryString.getParameterByName('mode');
    changeMode(mode);
    

    var baseLayerName = QueryString.getParameterByName('BaseLayer');
    var element;
    if (baseLayerName) {
        element = document.querySelector('input[name="base-layer"][value="' + baseLayerName + '"');
        if (element) {
            element.checked = true;
            InteractiveMap.baseLayers.filter(function (layer) { return layer.get("layerId") == baseLayerName })[0].setVisible(true);
        }
    }
    if (!element) {
        QueryString.setQueryString('BaseLayer', null);
        InteractiveMap.baseLayers[0].setVisible(true);
        document.querySelector('input[name="base-layer"][value="' + InteractiveMap.baseLayers[0].get("layerId") + '"').checked = true;
    }
    
    InteractiveMap.layerDefs.forEach(function (layerDef) {
        var param = layerDef.name.replace(/ /g, '');
        var value = QueryString.getParameterByName(param);
        if (value && value !== "false") {
            layerDef.visible = true;
            document.querySelector('input[data-layer-id="' + layerDef.id + '"').checked = true;
            QueryString.setQueryString(param, true);
        }
        else {
            QueryString.setQueryString(param, null);
        }
    });
}

var Menu = require('./menu');
var leftMenu = new Menu("menu-left", "menu-left-open-btn", "menu-left-close-btn");
var rightMenu = new Menu("right-menu", "right-menu-open-btn", "right-menu-close-btn");

InteractiveMap.layerDefs.forEach(function (layerDef) {
    var group = layerDef.group;
    var menu = document.querySelector('#' + group + '-menu');
    var menuItem = Menu.prototype.createMenuItem(layerDef, layerToggleHandler);
    menu.appendChild(menuItem);
});

InteractiveMap.baseLayerDefs.forEach(function (layerDef) {
    var group = layerDef.group;
    var menu = document.querySelector('#base-' + group + '-menu');
    var menuItem = Menu.prototype.createMenuItem(layerDef, baseLayerToggleHandler, 'radio', 'base-layer');
    menu.appendChild(menuItem);
});

document.getElementById('version-select').addEventListener('change', function () {
    InteractiveMap.version = this.value;
}, false);

document.getElementById('vision-radius').addEventListener('change', function () {
    InteractiveMap.visionRadius = this.value;
}, false);

var loadGeoJSON = require('./dataLoader').loadGeoJSON;
var loadJSON = require('./dataLoader').loadJSON;
var loadLayerGroupFromData = require('./dataLoader').loadLayerGroupFromData;

function setMapLayers(map, version, callback) {
    console.log('setMapLayers', version);
    getMapData(map, version, function (data) {
        var currentLayerGroup = map.getLayerGroup();
        console.log(currentLayerGroup, data, currentLayerGroup == data.layerGroup);
        currentLayerGroup.setVisible(false);
        map.setLayerGroup(data.layerGroup);
        map.getLayerGroup().setVisible(true);
        updateOverlayMenu();
        if (callback) callback();
    });
}

function getMapData(map, version, callback) {
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
                        loadLayerGroupFromData(map, data, version, InteractiveMap.getMapLayerIndex(version), InteractiveMap.layerDefs)
                    ])
                })
            };                
            callback(InteractiveMap.data[version]);
        });
    }
}

var getPopupContent = require('./getPopupContent');

function toggleTree(feature, dotaProps) {
    var gridXY = vs.WorldXYtoGridXY(dotaProps.x, dotaProps.y);
    console.log('toggleTree', gridXY, vs.toggleTree(gridXY.x, gridXY.y));
    feature.set('isCut', !feature.get('isCut'));
}
var cursorSource = new ol.source.Vector({
    defaultDataProjection : 'pixel'
});
var cursorLayer =  new ol.layer.Vector({
    source: cursorSource
});
var visionSource = new ol.source.Vector({
    defaultDataProjection : 'pixel'
});
var visionLayer =  new ol.layer.Vector({
    source: visionSource
});
var wardSource = new ol.source.Vector({
    defaultDataProjection : 'pixel'
});
var wardLayer =  new ol.layer.Vector({
    source: wardSource
});
    
var featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#ffff00',
            width: 2
        })
    })
});
    
var highlight;
function displayFeatureInfo(feature, eventType) {
    var info = document.getElementById('info');
    var infoContent = document.getElementById('info-content');
    if (feature) {
        infoContent.innerHTML = getPopupContent(InteractiveMap.data[InteractiveMap.version], feature);
        info.classList.add('slideUp');
        info.classList.remove('slideDown');
    }
    else {
        info.classList.add('slideDown');
        info.classList.remove('slideUp');
    }
    if (eventType == "click") {
        info.classList.add('active');
    }
    else {
        info.classList.remove('active');
    }

    if (feature !== highlight) {
        if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
            console.log('highlight feature');
            featureOverlay.getSource().addFeature(feature);
        }
        highlight = feature;
    }
};
    
function displayFeatureInfoFromPixel(map, pixel) {
    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
        return feature;
    }, {
        layerFilter: function(layer) {
            var layerDef = layer.get('layerDef');
            return layer.getVisible() && layerDef && (layerDef.group == 'structure' || layerDef.group == 'object');
        }
    });
    displayFeatureInfo(feature);
};
var lastPointerMoveTime = Date.now();
var wardHighlight;
function pointerMoveHandler(evt) {
    // When user was dragging map, then coordinates didn't change and there's
    // no need to continue
    if (evt.dragging) {
        return;
    }
    
    var pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfoFromPixel(map, pixel);
    var feature = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        return feature;
    }, {
        layerFilter: function(layer) {
            return layer === wardLayer;
        }
    });
    if (feature !== wardHighlight) {
        if (wardHighlight) {
            wardHighlight.setStyle(styles[wardHighlight.get('wardType')].normal);
        }
        if (feature) {
            console.log('InteractiveMap.MODE', InteractiveMap.MODE);
            feature.setStyle(styles[feature.get('wardType')][InteractiveMap.MODE == 'navigate' ? 'highlight' : 'remove']);
        }
        wardHighlight = feature;
    }
    
    if (Date.now() - lastPointerMoveTime < 20) {
        return;
    }
    if (InteractiveMap.MODE !== 'observer' && InteractiveMap.MODE !== 'sentry') {
        cursorSource.clear(true);
        return
    }
}

var visionPointerHandler = VisionControl.visionPointerHandler(20, InteractiveMap, cursorSource);

function clickHandler(evt) {
    if (InteractiveMap.MODE == 'navigate') {
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            var layerDef = layer.get('layerDef');
            var htmlContent = getPopupContent(InteractiveMap.data[InteractiveMap.version], feature);
            console.log(feature, feature.get('dotaProps'));
            return feature;
        }, {
            layerFilter: function(layer) {
                var layerDef = layer.get('layerDef');
                return layer.getVisible() && layerDef && (layerDef.group == 'structure' || layerDef.group == 'object');
            }
        });
        displayFeatureInfo(feature, evt.type);
        if (feature) {
            var dotaProps = feature.get('dotaProps');
            if (feature.get('dotaProps').id == "ent_dota_tree") {
                toggleTree(feature, dotaProps);
            }
            else {
                InteractiveMap.view.animate({
                  center: evt.coordinate,
                  duration: 1000
                });
            }
        }
    }
    else if (InteractiveMap.MODE == 'observer' || InteractiveMap.MODE == 'sentry') {
        var bWardFound = false;
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return feature;
        }, {
            layerFilter: function(layer) {
                return layer === wardLayer;
            }
        });
        if (feature) {
            wardSource.removeFeature(feature);
            var visionFeature = feature.get('visionFeature');
            if (visionFeature) {
                visionSource.removeFeature(visionFeature);
            }
        }
        else {
            var geom = new ol.geom.Point(evt.coordinate);
            var feature = new ol.Feature(geom);
            feature.set('wardType', InteractiveMap.MODE, true);
            feature.setStyle(styles[InteractiveMap.MODE].normal);
            console.log('add feature', feature);
            wardSource.addFeature(feature);
            if (InteractiveMap.MODE == 'observer') {
                var visionFeature = VisionControl.getVisionFeature(evt.coordinate, vs, InteractiveMap.visionRadius);
                if (visionFeature) {
                    visionSource.addFeature(visionFeature);
                }
                feature.set('visionFeature', visionFeature, true);
            }
        }
    }
}

function initialize() {
    setDefaults();

    setMapLayers(map, InteractiveMap.version, function () {
        map.addLayer(InteractiveMap.measureControl.layer);
        map.addLayer(cursorLayer);
        map.addLayer(visionLayer);
        map.addLayer(wardLayer);
        map.addLayer(featureOverlay);
    });
    
    map.on('click', clickHandler);
        
    document.getElementById('version-select').addEventListener('change', function () {
        setMapLayers(map, this.value);
    });
        
    document.getElementById('btn-zoom-in').addEventListener('click', function () {
        InteractiveMap.view.animate({zoom: InteractiveMap.view.getZoom() + 1});
    });
        
    document.getElementById('btn-zoom-out').addEventListener('click', function () {
        InteractiveMap.view.animate({zoom: InteractiveMap.view.getZoom() - 1});
    });

    document.getElementById('info-close-btn').addEventListener('click', function () {
        console.log('click');
        document.getElementById('info').classList.remove('slideUp');
        document.getElementById('info').classList.add('slideDown');
    });

    document.getElementById('btn-tree').addEventListener('click', function () {
        console.log('click qb');
        document.querySelector('input[name="mode"][value="navigate"').checked = true;
        document.getElementById('btn-ward').classList.remove('active');
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            toggleLayerMenuOption("ent_dota_tree", false);
        }
        else {
            modeToggleHandler.call({value:'navigate'});
            this.classList.add('active');
            toggleLayerMenuOption("ent_dota_tree", true);
        }
    });

    document.getElementById('btn-ward').addEventListener('click', function () {
        if (this.classList.contains('active')) {
            this.setAttribute('ward-type', this.getAttribute('ward-type') == 'observer' ? 'sentry' : 'observer');
        }
        if (this.getAttribute('ward-type') == 'sentry') {
            document.querySelector('input[name="mode"][value="ward"').checked = true;
            document.querySelector('input[name="ward-type"][value="sentry"').checked = true;
        }
        else {
            document.querySelector('input[name="mode"][value="ward"').checked = true;
            document.querySelector('input[name="ward-type"][value="observer"').checked = true;
        }
        this.classList.add('active');
        document.getElementById('btn-tree').classList.remove('active');
        modeToggleHandler.call({value:'ward'});
    });
    pointerMoveListener = map.on('pointermove', pointerMoveHandler);
}