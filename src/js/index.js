var VisionSimulation = require("dota-vision-simulation");
var worlddata = require("dota-vision-simulation/src/worlddata.json");
var QueryString = require('./util/queryString');
var ol = require('openlayers');
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
var CoordinateControl = require('./controls/coordinateControl');
var ReplayViewerControl = require('./replayviewer');
var InteractiveMapConstructor = require('./InteractiveMap');

//var rollbar = require('./rollbar');

var ModalControl = require('./controls/modalControl');
var aboutModal = new ModalControl('about', 'about-open', 'about-close');
var helpModal = new ModalControl('help', 'help-open', 'help-close');

var buildDate = "#build_date";
document.getElementById('buildDate').innerHTML = buildDate;

var releaseTag = "#release_tag";
document.getElementById('releaseTag').innerHTML = releaseTag;

function App(map_tile_path, vision_data_image_path) {
    var InteractiveMap = new InteractiveMapConstructor(map_tile_path);
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
    InteractiveMap.coordinateControl = new CoordinateControl(InteractiveMap, 'coordinates');
    InteractiveMap.measureControl = new MeasureControl(InteractiveMap);
    InteractiveMap.creepControl = new CreepControl(InteractiveMap);
    InteractiveMap.creepControl.initialize('timer');
    InteractiveMap.replayViewerControl = new ReplayViewerControl(InteractiveMap, 'file-input');
    InteractiveMap.replayViewerControl.start();

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
        darknessOff: "Darkness: Off"
    }
    function changeMode(mode) {
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
        }
        else {
            InteractiveMap.creepControl.deactivate();
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

            
        document.getElementById('reset').addEventListener('click', function () {
            if (history && history.replaceState) history.replaceState(null, "", window.location.href.split("?")[0]);
            setDefaults();
            updateOverlayMenu();
            InteractiveMap.treeControl.toggleAllTrees(false, true);
            InteractiveMap.treeControl.parseQueryString();
            InteractiveMap.wardControl.clearWards();
            InteractiveMap.wardControl.parseQueryString();
        });

        document.getElementById('btn-tree').addEventListener('click', function () {
            if (this.classList.contains('active')) {
                this.setAttribute('trees-enabled', this.getAttribute('trees-enabled') == "yes" ? "no" : "yes");
            }
            this.classList.add('active');
            document.getElementById('btn-ward').classList.remove('active');
            document.getElementById('btn-measure').classList.remove('active');
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
}

module.exports = App;