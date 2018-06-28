import VisionSimulation from 'dota-vision-simulation';
import worlddata from 'dota-vision-simulation/src/worlddata.json';
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
const aboutModal = new ModalControl('about', 'about-open', 'about-close');
const helpModal = new ModalControl('help', 'help-open', 'help-close');

const buildDate = "#build_date";
document.getElementById('buildDate').innerHTML = buildDate;

const releaseTag = "#release_tag";
document.getElementById('releaseTag').innerHTML = releaseTag;

const codeVersion = "#code_version";
document.getElementById('codeVersion').innerHTML = codeVersion;

class App {
    constructor (map_tile_path, vision_data_image_path, version) {
        const InteractiveMap = new InteractiveMapConstructor(map_tile_path, version);
        
        InteractiveMap.toggleLayerMenuOption = (layerId, state) => {
            const element = document.querySelector('input[data-layer-id="' + layerId + '"]');
            if (state != null) element.checked = state;
            this.updateLayerAndQueryString(element, layerId);
        }

        InteractiveMap.vs = new VisionSimulation(worlddata, vision_data_image_path, this.initialize.bind(this));
        InteractiveMap.menuControl = new MenuControl(InteractiveMap);
        const layerToggleHandler = e => this.updateLayerAndQueryString(e.currentTarget);
        const baseLayerToggleHandler = e => {
            const layerId = e.currentTarget.getAttribute('data-layer-id');
            this.InteractiveMap.baseLayers.forEach(layer => layer.setVisible(layer.get('layerId') === layerId));
            setQueryString('BaseLayer', layerId);
        }
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
        
        this.InteractiveMap = InteractiveMap;
    }
    
    changeMode(mode) {
        const InteractiveMap = this.InteractiveMap;
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

    updateLayerAndQueryString(element, layerId) {
        layerId = layerId || element.getAttribute('data-layer-id');
        const layer = this.InteractiveMap.getMapLayer(layerId);
        if (layer) {
            layer.setVisible(element.checked);
            const param = layer.get("title").replace(/ /g, '');
            setQueryString(param, element.checked ? true : null);
            if (layerId == 'ent_dota_tree') {
                document.getElementById('btn-tree').setAttribute('trees-enabled', element.checked ? "yes" : "no");
            }
        }
    }

    // updates element visibility based on map layer index
    // updates layer visibility based on element state
    updateOverlayMenu() {
        forEach(document.querySelectorAll('.data-layer > input'), element => {
            const label = element.nextSibling;
            const layerId = element.getAttribute('data-layer-id');
            const layer = this.InteractiveMap.getMapLayer(layerId);
            if (!layer) {
                label.style.display = "none";
            }
            else {
                label.style.display = "block";
                layer.setVisible(element.checked);
            }
        }, this);
    }

    setDefaults() {
        const x = getParameterByName('x');
        const y = getParameterByName('y');
        const zoom = getParameterByName('zoom');
        if (zoom) {
            this.InteractiveMap.view.setZoom(zoom);
        }
        if (x && y) {
            const coordinate = proj.transform([x, y], dotaProj, pixelProj);
            if (extent.containsXY([-100, -100, mapConstants.map_w+100, mapConstants.map_h+100], coordinate[0], coordinate[1])) {
                this.InteractiveMap.panTo(coordinate);
            }
        }
        
        document.getElementById('btn-ward').setAttribute('ward-type', 'observer');
        const mode = getParameterByName('mode');
        this.changeMode(mode);

        const baseLayerName = getParameterByName('BaseLayer');
        let element;
        if (baseLayerName) {
            element = document.querySelector('input[name="base-layer"][value="' + baseLayerName + '"]');
            if (element) {
                element.checked = true;
                this.InteractiveMap.baseLayers.filter(layer => layer.get("layerId") == baseLayerName)[0].setVisible(true);
            }
        }
        if (!element) {
            setQueryString('BaseLayer', null);
            this.InteractiveMap.baseLayers[0].setVisible(true);
            document.querySelector('input[name="base-layer"][value="' + this.InteractiveMap.baseLayers[0].get("layerId") + '"]').checked = true;
        }
        
        this.InteractiveMap.layerDefs.forEach(layerDef => {
            const param = layerDef.name.replace(/ /g, '');
            const value = getParameterByName(param);
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

    initialize(err) {
        this.InteractiveMap.infoControl.activate();
        
        this.setDefaults();

        this.InteractiveMap.setMapLayers(this.InteractiveMap.version, err => {
            if (!err) {
                this.updateOverlayMenu();
                this.InteractiveMap.map.addLayer(this.InteractiveMap.measureControl.layer);
                this.InteractiveMap.map.addLayer(this.InteractiveMap.cursorControl.layer);
                this.InteractiveMap.map.addLayer(this.InteractiveMap.visionControl.layer);
                this.InteractiveMap.map.addLayer(this.InteractiveMap.wardControl.layer);
                this.InteractiveMap.map.addLayer(this.InteractiveMap.highlightLayer);
                this.InteractiveMap.map.addLayer(this.InteractiveMap.selectLayer);
                this.InteractiveMap.map.addLayer(this.InteractiveMap.wardRangeLayer);
                this.InteractiveMap.map.addLayer(this.InteractiveMap.rangeLayers.dayVision);
                this.InteractiveMap.map.addLayer(this.InteractiveMap.rangeLayers.nightVision);
                this.InteractiveMap.map.addLayer(this.InteractiveMap.rangeLayers.trueSight);
                this.InteractiveMap.map.addLayer(this.InteractiveMap.rangeLayers.attackRange);
                
                this.InteractiveMap.treeControl.parseQueryString();
                this.InteractiveMap.wardControl.parseQueryString();
            }
            else {
                rollbar.log("Vision simulation load error.", err);
            }
        });
        
        this.InteractiveMap.map.on('moveend', evt => {
            const map = evt.map;
            const ext = map.getView().calculateExtent(map.getSize());
            const center = extent.getCenter(ext);
            const worldXY = proj.transform(center, pixelProj, dotaProj);
            const coordinate = [Math.round(worldXY[0]), Math.round(worldXY[1])];
            setQueryString('x', coordinate[0]);
            setQueryString('y', coordinate[1]);
            setQueryString('zoom', Math.round(this.InteractiveMap.view.getZoom()));
        });
        
        forEach(document.querySelectorAll('input[name="mode"], input[name="ward-type"], input[name="measure-type"]'), element => {
            element.addEventListener("change", e => {
                this.changeMode(e.currentTarget.value);
            }, false);
        }, this);
        
        document.getElementById('nightControl').addEventListener('change', e => {
            const el = e.currentTarget;
            this.InteractiveMap.isNight = el.checked;
            if (el.checked) {
                this.InteractiveMap.notificationControl.show(modeNotificationText.nightOn);
            }
            else {
                this.InteractiveMap.notificationControl.show(modeNotificationText.nightOff);
            }
        });

        document.getElementById('darknessControl').addEventListener('change', e => {
            const el = e.currentTarget;
            this.InteractiveMap.isDarkness = el.checked;
            if (el.checked) {
                this.InteractiveMap.notificationControl.show(modeNotificationText.darknessOn);
            }
            else {
                this.InteractiveMap.notificationControl.show(modeNotificationText.darknessOff);
            }
        });

        document.getElementById('creepControl').addEventListener('change', e => {
            if (e.currentTarget.checked) {
                this.InteractiveMap.creepControl.activate();
            }
            else {
                this.InteractiveMap.creepControl.deactivate();
            }
        });

        document.getElementById('vision-radius').addEventListener('change', e => this.InteractiveMap.visionRadius = e.currentTarget.value);

        document.getElementById('movementSpeed').addEventListener('change', e => this.InteractiveMap.movementSpeed = e.currentTarget.value);
            
        document.getElementById('option-dayVision').addEventListener('change', e => this.InteractiveMap.rangeLayers.dayVision.setVisible(e.currentTarget.checked));
            
        document.getElementById('option-nightVision').addEventListener('change', e => this.InteractiveMap.rangeLayers.nightVision.setVisible(e.currentTarget.checked));
            
        document.getElementById('option-trueSight').addEventListener('change', e => this.InteractiveMap.rangeLayers.trueSight.setVisible(e.currentTarget.checked));
            
        document.getElementById('option-attackRange').addEventListener('change', e => this.InteractiveMap.rangeLayers.attackRange.setVisible(e.currentTarget.checked));
            
        document.getElementById('version-select').addEventListener('change', e => {
            const el = e.currentTarget;
            this.InteractiveMap.setMapLayers(el.value, err => {
                if (!err) {
                    this.InteractiveMap.creepControl.deactivate();
                    this.InteractiveMap.version = el.value;
                    document.getElementById('creepControl').disabled = !this.InteractiveMap.getMapLayer('npc_dota_spawner');
                    document.getElementById('creepControl').checked = false;
                }
                else {
                    el.value = this.InteractiveMap.version;
                    alert('Version change failed.');
                }
            });
        });
            
        document.getElementById('btn-zoom-in').addEventListener('click', () => this.InteractiveMap.view.animate({zoom: this.InteractiveMap.view.getZoom() + 1}));
            
        document.getElementById('btn-zoom-out').addEventListener('click', () => this.InteractiveMap.view.animate({zoom: this.InteractiveMap.view.getZoom() - 1}));

        document.getElementById('reset').addEventListener('click', () => {
            if (history && history.replaceState) history.replaceState(null, "", window.location.href.split("?")[0]);
            this.setDefaults();
            this.updateOverlayMenu();
            this.InteractiveMap.treeControl.toggleAllTrees(false, true);
            this.InteractiveMap.treeControl.parseQueryString();
            this.InteractiveMap.wardControl.clearWards();
            this.InteractiveMap.wardControl.parseQueryString();
        });

        document.getElementById('btn-tree').addEventListener('click', e => {
            const el = e.currentTarget;
            if (el.classList.contains('active')) {
                el.setAttribute('trees-enabled', el.getAttribute('trees-enabled') == "yes" ? "no" : "yes");
            }
            el.classList.add('active');
            document.getElementById('btn-ward').classList.remove('active');
            document.getElementById('btn-measure').classList.remove('active');
            this.InteractiveMap.toggleLayerMenuOption("ent_dota_tree", el.getAttribute('trees-enabled') == "yes");
            this.changeMode('navigate');
            this.InteractiveMap.notificationControl.show(el.getAttribute('trees-enabled') == "yes" ? modeNotificationText.treeEnable : modeNotificationText.treeDisable);
        });

        document.getElementById('btn-ward').addEventListener('click', e => {
            const el = e.currentTarget;
            if (el.classList.contains('active')) {
                el.setAttribute('ward-type', el.getAttribute('ward-type') == 'observer' ? 'sentry' : 'observer');
            }
            if (el.getAttribute('ward-type') == 'sentry') {
                document.querySelector('input[name="mode"][value="ward"]').checked = true;
                document.querySelector('input[name="ward-type"][value="sentry"]').checked = true;
            }
            else {
                document.querySelector('input[name="mode"][value="ward"]').checked = true;
                document.querySelector('input[name="ward-type"][value="observer"]').checked = true;
            }
            el.classList.add('active');
            document.getElementById('btn-tree').classList.remove('active');
            document.getElementById('btn-measure').classList.remove('active');
            this.changeMode('ward');
        });

        document.getElementById('btn-measure').addEventListener('click', e => {
            const el = e.currentTarget;
            if (el.classList.contains('active')) {
                el.setAttribute('measure-type', el.getAttribute('measure-type') == 'line' ? 'circle' : 'line');
            }
            if (el.getAttribute('measure-type') == 'circle') {
                document.querySelector('input[name="mode"][value="measure"]').checked = true;
                document.querySelector('input[name="measure-type"][value="circle"]').checked = true;
            }
            else {
                document.querySelector('input[name="mode"][value="measure"]').checked = true;
                document.querySelector('input[name="measure-type"][value="line"]').checked = true;
            }
            el.classList.add('active');
            document.getElementById('btn-tree').classList.remove('active');
            document.getElementById('btn-ward').classList.remove('active');
            this.changeMode('measure');
        });
    }
}

export default App;