var VisionSimulation = require("dota-vision-simulation");
var worlddata = require("dota-vision-simulation/src/worlddata.json");
var QueryString = require('./util/queryString');
var ol = require('openlayers');
var InfoControl = require('./infoControl');
var NotificationControl = require('./notificationControl');
var MeasureControl = require('./measureControl');
var VisionControl = require('./visionControl');
var WardControl = require('./wardControl');
var CursorControl = require('./cursorControl');
var vision_data_image_path = 'img/map_data.png';
var InteractiveMap = require('./InteractiveMap');
InteractiveMap.vs = new VisionSimulation(worlddata, vision_data_image_path, initialize);
InteractiveMap.infoControl = new InfoControl(InteractiveMap);
InteractiveMap.infoControl.initialize('info');
InteractiveMap.notificationControl = new NotificationControl();
InteractiveMap.notificationControl.initialize('notification');
InteractiveMap.visionControl = new VisionControl(InteractiveMap, 20);
InteractiveMap.wardControl = new WardControl(InteractiveMap);
InteractiveMap.cursorControl = new CursorControl(InteractiveMap);
InteractiveMap.measureControl = new MeasureControl(InteractiveMap);

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
            QueryString.setQueryString('mode', InteractiveMap.MODE);
            InteractiveMap.measureControl.change(InteractiveMap.MODE);
            InteractiveMap.wardControl.deactivate();
            InteractiveMap.infoControl.deactivate();
            
        break;
        default:
            document.querySelector('input[name="mode"][value="navigate"]').checked = true;
            InteractiveMap.MODE = mode || "navigate";
            document.getElementById('btn-ward').classList.remove('active');
            document.getElementById('btn-tree').classList.remove('active');
            QueryString.setQueryString('mode', InteractiveMap.MODE == 'navigate' ? null : InteractiveMap.MODE);
            InteractiveMap.measureControl.deactivate();
            InteractiveMap.wardControl.deactivate();
            InteractiveMap.infoControl.activate();
        break;
    }
    InteractiveMap.notificationControl.show(modeNotificationText[InteractiveMap.MODE]);
}

document.querySelectorAll('input[name="mode"], input[name="ward-type"], input[name="measure-type"]').forEach(function (element) {
    element.addEventListener("change", function () {
        changeMode(this.value);
    }, false);
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

// updates element visibility based on map layer index
// updates layer visibility based on element state
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
var menu = new Menu(InteractiveMap);
menu.initialize(layerToggleHandler, baseLayerToggleHandler);
    
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

document.getElementById('version-select').addEventListener('change', function () {
    InteractiveMap.version = this.value;
}, false);

document.getElementById('vision-radius').addEventListener('change', function () {
    InteractiveMap.visionRadius = this.value;
}, false);

document.getElementById('movementSpeed').addEventListener('change', function () {
    InteractiveMap.movementSpeed = this.value;
}, false);

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
    });
        
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
        document.querySelector('input[name="mode"][value="navigate"').checked = true;
        document.getElementById('btn-ward').classList.remove('active');
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            toggleLayerMenuOption("ent_dota_tree", false);
            InteractiveMap.notificationControl.show(modeNotificationText.treeDisable);
        }
        else {
            changeMode('navigate');
            this.classList.add('active');
            toggleLayerMenuOption("ent_dota_tree", true);
            InteractiveMap.notificationControl.show(modeNotificationText.treeEnable);
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
        changeMode('ward');
    });
}