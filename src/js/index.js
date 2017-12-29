var VisionSimulation = require("dota-vision-simulation");
var worlddata = require("dota-vision-simulation/src/worlddata.json");
import { setQueryString, getParameterByName } from './util/queryString';
import proj from 'ol/proj';
import extent from 'ol/extent';
import { pixelProj, dotaProj } from './projections';
import mapConstants from './mapConstants';
import MenuControl from './controls/menu';
import InfoControl from './controls/info';
import NotificationControl from './controls/notification';
import MeasureControl from './controls/measure';
import CreepControl from './controls/creep';
import VisionControl from './controls/vision';
import WardControl from './controls/ward';
import TreeControl from './controls/tree';
import CursorControl from './controls/cursor';
import CoordinateControl from './controls/coordinate';
import InteractiveMapConstructor from './InteractiveMap';
import modeNotificationText from './modeNotificationText';

import forEach from './util/forEach';

import rollbar from './rollbar';

import ModalControl from './controls/modal';
var aboutModal = new ModalControl('about', 'about-open', 'about-close');
var helpModal = new ModalControl('help', 'help-open', 'help-close');

var buildDate = "#build_date";
document.getElementById('buildDate').innerHTML = buildDate;

var releaseTag = "#release_tag";
document.getElementById('releaseTag').innerHTML = releaseTag;

var codeVersion = "#code_version";
document.getElementById('codeVersion').innerHTML = codeVersion;

function App(map_tile_path, vision_data_image_path) {
    var InteractiveMap = new InteractiveMapConstructor(map_tile_path);
    InteractiveMap.toggleLayerMenuOption = function(layerId, state) {
        var element = document.querySelector('input[data-layer-id="' + layerId + '"]');
        if (state != null) element.checked = state;
        updateLayerAndQueryString(element, layerId);
    }

    InteractiveMap.vs = new VisionSimulation(worlddata, vision_data_image_path, initialize);
    InteractiveMap.menuControl = new MenuControl(InteractiveMap);
    InteractiveMap.menuControl.initialize(layerToggleHandler, baseLayerToggleHandler);
    InteractiveMap.infoControl = new InfoControl(InteractiveMap);
    InteractiveMap.infoControl.initialize('info');
    InteractiveMap.notificationControl = new NotificationControl();
    InteractiveMap.notificationControl.initialize('notification');
    InteractiveMap.visionControl = new VisionControl(InteractiveMap);
    InteractiveMap.wardControl = new WardControl(InteractiveMap);
    InteractiveMap.treeControl = new TreeControl(InteractiveMap);
    InteractiveMap.cursorControl = new CursorControl(InteractiveMap);
    InteractiveMap.coordinateControl = new CoordinateControl(InteractiveMap, 'coordinates');
    InteractiveMap.measureControl = new MeasureControl(InteractiveMap);
    InteractiveMap.creepControl = new CreepControl(InteractiveMap);
    InteractiveMap.creepControl.initialize('timer');

    //var DrawCurveControl = require('./controls/drawCurve');
    //InteractiveMap.drawCurveControl = new DrawCurveControl(InteractiveMap);
    
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
                setQueryString('mode', InteractiveMap.MODE);
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
                setQueryString('mode', InteractiveMap.MODE);
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
                setQueryString('mode', InteractiveMap.MODE == 'navigate' ? null : InteractiveMap.MODE);
                InteractiveMap.measureControl.deactivate();
                InteractiveMap.wardControl.deactivate();
                InteractiveMap.infoControl.activate();
            break;
        }
        InteractiveMap.notificationControl.show(modeNotificationText[InteractiveMap.MODE]);
    }

    function updateLayerAndQueryString(element, layerId) {
        layerId = layerId || element.getAttribute('data-layer-id');
        var layer = InteractiveMap.getMapLayer(layerId);
        if (layer) {
            layer.setVisible(element.checked);
            var param = layer.get("title").replace(/ /g, '');
            setQueryString(param, element.checked ? true : null);
            if (layerId == 'ent_dota_tree') {
                document.getElementById('btn-tree').setAttribute('trees-enabled', element.checked ? "yes" : "no");
            }
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
        setQueryString('BaseLayer', layerId);
    }

    // updates element visibility based on map layer index
    // updates layer visibility based on element state
    function updateOverlayMenu() {
        forEach(document.querySelectorAll('.data-layer > input'), function (element) {
            var label = element.nextSibling;
            var layerId = element.getAttribute('data-layer-id');
            var layer = InteractiveMap.getMapLayer(layerId);
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
        var x = getParameterByName('x');
        var y = getParameterByName('y');
        var zoom = getParameterByName('zoom');
        if (zoom) {
            InteractiveMap.view.setZoom(zoom);
        }
        if (x && y) {
            var coordinate = proj.transform([x, y], dotaProj, pixelProj);
            if (extent.containsXY([-100, -100, mapConstants.map_w+100, mapConstants.map_h+100], coordinate[0], coordinate[1])) {
                InteractiveMap.panTo(coordinate);
            }
        }
        
        document.getElementById('btn-ward').setAttribute('ward-type', 'observer');
        var mode = getParameterByName('mode');
        changeMode(mode);

        var baseLayerName = getParameterByName('BaseLayer');
        var element;
        if (baseLayerName) {
            element = document.querySelector('input[name="base-layer"][value="' + baseLayerName + '"]');
            if (element) {
                element.checked = true;
                InteractiveMap.baseLayers.filter(function (layer) { return layer.get("layerId") == baseLayerName })[0].setVisible(true);
            }
        }
        if (!element) {
            setQueryString('BaseLayer', null);
            InteractiveMap.baseLayers[0].setVisible(true);
            document.querySelector('input[name="base-layer"][value="' + InteractiveMap.baseLayers[0].get("layerId") + '"]').checked = true;
        }
        
        InteractiveMap.layerDefs.forEach(function (layerDef) {
            var param = layerDef.name.replace(/ /g, '');
            var value = getParameterByName(param);
            if (value && value !== "false") {
                layerDef.visible = true;
                document.querySelector('input[data-layer-id="' + layerDef.id + '"]').checked = true;
                setQueryString(param, true);
            }
            else {
                setQueryString(param, null);
            }
            if (layerDef.id == 'ent_dota_tree') {
                document.getElementById('btn-tree').setAttribute('trees-enabled', layerDef.visible ? "yes" : "no");
            }
        });
    }

    function onMoveEnd(evt) {
        var map = evt.map;
        var ext = map.getView().calculateExtent(map.getSize());
        var center = extent.getCenter(ext);
        var worldXY = proj.transform(center, pixelProj, dotaProj);
        var coordinate = [Math.round(worldXY[0]), Math.round(worldXY[1])];
        setQueryString('x', coordinate[0]);
        setQueryString('y', coordinate[1]);
        setQueryString('zoom', Math.round(InteractiveMap.view.getZoom()));
    }

    function initialize(err) {
        InteractiveMap.infoControl.activate();
        
        setDefaults();

        InteractiveMap.setMapLayers(InteractiveMap.version, function (err) {
            if (!err) {
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
            }
            else {
                rollbar.log("Vision simulation load error.", err);
            }
        });
        
        InteractiveMap.map.on('moveend', onMoveEnd);
        
        forEach(document.querySelectorAll('input[name="mode"], input[name="ward-type"], input[name="measure-type"]'), function (element) {
            element.addEventListener("change", function () {
                changeMode(this.value);
            }, false);
        }, this);
        
        document.getElementById('nightControl').addEventListener('change', function () {
            InteractiveMap.isNight = this.checked;
            if (this.checked) {
                InteractiveMap.notificationControl.show(modeNotificationText.nightOn);
            }
            else {
                InteractiveMap.notificationControl.show(modeNotificationText.nightOff);
            }
        });

        document.getElementById('darknessControl').addEventListener('change', function () {
            InteractiveMap.isDarkness = this.checked;
            if (this.checked) {
                InteractiveMap.notificationControl.show(modeNotificationText.darknessOn);
            }
            else {
                InteractiveMap.notificationControl.show(modeNotificationText.darknessOff);
            }
        });

        document.getElementById('creepControl').addEventListener('change', function () {
            if (this.checked) {
                InteractiveMap.creepControl.activate();
            }
            else {
                InteractiveMap.creepControl.deactivate();
            }
        });

        document.getElementById('vision-radius').addEventListener('change', function () {
            InteractiveMap.visionRadius = this.value;
        });

        document.getElementById('movementSpeed').addEventListener('change', function () {
            InteractiveMap.movementSpeed = this.value;
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
            var self = this;
            InteractiveMap.setMapLayers(this.value, function (err) {
                if (!err) {
                    InteractiveMap.version = self.value;
                }
                else {
                    self.value = InteractiveMap.version;
                    alert('Version change failed.');
                }
            });
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

export default App;