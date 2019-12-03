import VisionSimulation from 'dota-vision-simulation';
import worlddata from 'dota-vision-simulation/src/worlddata.json';
import View from 'ol/View';
import Map from 'ol/Map';
import { getCenter, containsXY } from 'ol/extent';
import Collection from 'ol/Collection';
import SourceVector from 'ol/source/Vector';
import TileImage from 'ol/source/TileImage';
import LayerVector from 'ol/layer/Vector';
import LayerTile from 'ol/layer/Tile';
import LayerGroup from 'ol/layer/Group';
import TileGrid from 'ol/tilegrid/TileGrid';
import { transform } from 'ol/proj';
import { defaults as defaultControls, FullScreen } from 'ol/control';
import { defaults as defaultInteractions } from 'ol/interaction';
import Feature from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import { KML } from 'ol/format';
import { pixelProj, dotaProj } from './projections';
import mapConstants from './mapConstants';
import styles from './styleDefinitions';
import { loadGeoJSON, loadJSON, loadLayerGroupFromData } from './dataLoader';
import { getScaledRadius, worldToLatLon } from './conversion';
import baseLayerDefinitions from './baseLayerDefinitions';
import layerDefinitions from './layerDefinitions';
import modeNotificationText from './modeNotificationText';
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
import DrawControl from './controls/draw';
import getJSON from './util/getJSON';
import { setQueryString, getParameterByName } from './util/queryString';
import forEach from './util/forEach';
import CP from './util/color-picker';
import { saveAs } from 'file-saver/FileSaver';
import heroIcons from './heroIconManifest.json';

class InteractiveMap {
    constructor(root, mapTilePath, version, visionDataImagePath, options = {}) {
        this.root = root;
        this.options = {
            mode: 'navigate',
            zoom: 1,
            resolutions: [32, 16, 8, 4, 2, 1],
            isNight: false,
            isDarkness: false,
            ...options,
            controls: {
                coordinate: true,
                ...options.controls,
            },
        };
        this.mapTilePath = mapTilePath;
        this.visionDataImagePath = visionDataImagePath;
        this.vs = new VisionSimulation(worlddata);
        this.mode = this.options.mode;
        this.layerDefs = layerDefinitions;
        this.baseLayerDefs = baseLayerDefinitions;
        this.view = new View({
            zoom: this.options.zoom,
            center: mapConstants.imgCenter,
            projection: pixelProj,
            resolutions: this.options.resolutions,
            extent: [0, 0, mapConstants.map_w, mapConstants.map_h],
        });
        this.data = {};
        this.layerIndex = {};
        this.version = version;
        this.visionRadius = mapConstants.visionRadius.observer;
        this.movementSpeed = mapConstants.defaultMovementSpeed;
        this.isNight = this.options.isNight;
        this.isDarkness = this.options.isDarkness;
        this.layerFilters = {
            marker: (layer) => {
                const layerDef = layer.get('layerDef');
                return layer.getVisible() && layerDef && (layerDef.group == 'structure' || layerDef.group == 'object');
            },
        };
        this.map = new Map({
            controls: defaultControls({ zoom: false, attribution: false, rotate: false }).extend([
                new FullScreen(),
            ]),
            interactions: defaultInteractions({ altShiftDragRotate: false, pinchRotate: false }),
            target: 'map',
            view: this.view,
        });

        this.highlightSource = new SourceVector({});
        this.highlightLayer = new LayerVector({
            source: this.highlightSource,
            style: styles.highlight,
        });

        this.selectSource = new SourceVector({});
        this.selectLayer = new LayerVector({
            source: this.selectSource,
            style: styles.select,
        });

        this.wardRangeSource = new SourceVector({});
        this.wardRangeLayer = new LayerVector({ source: this.wardRangeSource });

        this.rangeSources = {
            dayVision: new SourceVector({}),
            nightVision: new SourceVector({}),
            trueSight: new SourceVector({}),
            attackRange: new SourceVector({}),
        };
        this.rangeLayers = {
            dayVision: new LayerVector({
                source: this.rangeSources.dayVision,
                style: styles.dayVision,
            }),
            nightVision: new LayerVector({
                source: this.rangeSources.nightVision,
                style: styles.nightVision,
            }),
            trueSight: new LayerVector({
                source: this.rangeSources.trueSight,
                style: styles.trueSight,
            }),
            attackRange: new LayerVector({
                source: this.rangeSources.attackRange,
                style: styles.attackRange,
            }),
        };

        // setup base layers
        this.baseLayers = this.baseLayerDefs.reduce((baseLayers, group) => baseLayers.concat(group.tilesets.map((tileset) => {
            const layerDef = { ...tileset, group: group.id };
            const layer = new LayerTile({
                title: layerDef.name,
                type: 'base',
                extent: pixelProj.getExtent(), // proj.pixel.getExtent()
                source: new TileImage({
                    tileGrid: new TileGrid({
                        origin: [0, mapConstants.map_h],
                        resolutions: mapConstants.resolutions,
                    }),
                    projection: pixelProj,
                    url: `${this.mapTilePath + layerDef.group}/${layerDef.id}/{z}/tile_{x}_{y}.jpg`,
                    crossOrigin: 'Anonymous',
                }),
                visible: !!layerDef.visible,
            });
            layer.set('layerId', `${layerDef.group}-${layerDef.id}`, true);
            layer.set('layerDef', layerDef, true);
            return layer;
        })), []);

        this.baseLayerGroup = new LayerGroup({
            title: 'Base Layers',
            layers: new Collection(this.baseLayers),
        });

        this.controls = {
            menu: new MenuControl(this),
            info: new InfoControl(this, 'info'),
            notification: new NotificationControl(this.root, 'notification'),
            vision: new VisionControl(this),
            ward: new WardControl(this),
            tree: new TreeControl(this),
            cursor: new CursorControl(this),
            coordinate: this.options.controls.coordinate && new CoordinateControl(this, 'coordinates'),
            measure: new MeasureControl(this),
            creep: new CreepControl(this, 'timer'),
            draw: new DrawControl(this),
        };

        this.map.on('moveend', (evt) => {
            const map = evt.map;
            const ext = map.getView().calculateExtent(map.getSize());
            const center = getCenter(ext);
            const worldXY = transform(center, pixelProj, dotaProj);
            const coordinate = [Math.round(worldXY[0]), Math.round(worldXY[1])];
            setQueryString('x', coordinate[0]);
            setQueryString('y', coordinate[1]);
            setQueryString('zoom', Math.round(this.view.getZoom()));
        });
    }

    getMapData(version) {
        return this.data[version || this.version] || {};
    }

    getData(version) {
        return this.getMapData(version).data || {};
    }

    getOverlayData(version) {
        return this.getData(version).data || {};
    }

    getStatData(version) {
        return this.getData(version).stats || {};
    }

    getMapLayerIndex(version) {
        version = version || this.version;
        if (!this.layerIndex[version]) this.layerIndex[version] = {};
        return this.layerIndex[version];
    }

    getMapLayer(layerId, version) {
        return this.getMapLayerIndex(version)[layerId];
    }

    getMapDataPath(version) {
        version = version || this.version;
        return `data/${version}/mapdata.json`;
    }

    setMapLayers(version, callback) {
        this.getDataJSON(version, (err, data) => {
            if (!err) {
                const currentLayerGroup = this.map.getLayerGroup();
                currentLayerGroup.setVisible(false);
                this.map.setLayerGroup(data.layerGroup);
                this.map.getLayerGroup().setVisible(true);
            }

            this.map.addLayer(this.controls.measure.layer);
            this.map.addLayer(this.controls.cursor.layer);
            this.map.addLayer(this.controls.vision.layer);
            this.map.addLayer(this.controls.ward.layer);
            this.map.addLayer(this.highlightLayer);
            this.map.addLayer(this.selectLayer);
            this.map.addLayer(this.wardRangeLayer);
            this.map.addLayer(this.rangeLayers.dayVision);
            this.map.addLayer(this.rangeLayers.nightVision);
            this.map.addLayer(this.rangeLayers.trueSight);
            this.map.addLayer(this.rangeLayers.attackRange);
            this.map.addLayer(this.controls.draw.layer);

            if (callback) callback(err);
        });
    }

    getDataJSON(version, callback) {
        if (this.data[version]) {
            callback(null, this.data[version]);
        }
        else {
            getJSON(this.getMapDataPath(version), (err, data) => {
                if (!err) {
                    this.data[version] = {
                        data,
                        layerGroup: new LayerGroup({
                            title: `${version} Layers`,
                            layers: new Collection([
                                this.baseLayerGroup,
                                loadLayerGroupFromData(this, data, version, this.getMapLayerIndex(version), this.layerDefs),
                            ]),
                        }),
                    };
                }
                callback(err, this.data[version]);
            });
        }
    }

    panTo(coordinate, duration) {
        if (duration == null) duration = 1000;
        this.view.animate({
            center: coordinate,
            duration,
        });
    }

    checkAndHighlightWard(pixel) {
        const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature, { layerFilter: this.controls.ward.layerFilter });
        this.highlightWard(feature);
        return feature;
    }

    highlightWard(feature) {
        if (feature !== this.highlightedWard) {
            if (this.highlightedWard) {
                this.highlightedWard.setStyle(styles[this.highlightedWard.get('wardType')].normal);
            }
            if (feature) {
                feature.setStyle(styles[feature.get('wardType')][this.mode == 'navigate' ? 'highlight' : 'remove']);
            }
            this.highlightedWard = feature;
        }
    }

    unhighlightWard() {
        if (this.highlightedWard) {
            this.highlightedWard.setStyle(styles[this.highlightedWard.get('wardType')].normal);
        }
        this.highlightedWard = null;
    }

    highlight(feature) {
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

    unhighlight() {
        if (this.highlightedFeature) {
            this.highlightSource.removeFeature(this.highlightedFeature);
        }
        this.highlightedFeature = null;
    }

    toggle(feature) {
        if (feature) {
            if (feature.get('clicked')) {
                this.deselect(feature);
                return false;
            }

            this.select(feature);
            return true;
        }
    }

    select(feature) {
        if (feature && !feature.get('clicked')) {
            if (feature == this.highlightedFeature) {
                this.unhighlight();
            }
            this.selectSource.addFeature(feature);
            feature.set('clicked', true, true);
        }
    }

    deselectAll() {
        this.selectSource.getFeatures().forEach(feature => feature.set('clicked', false, true));
        this.selectSource.clear();
    }

    deselect(feature) {
        if (feature && feature.get('clicked')) {
            if (feature == this.highlightedFeature) {
                this.unhighlight();
            }

            this.selectSource.removeFeature(feature);
            feature.set('clicked', false, true);
        }
    }

    hasVisionRadius(feature) {
        return this.getFeatureVisionRadius(feature) != null;
    }

    getFeatureVisionRadius(feature, dotaProps, unitClass, rangeType) {
        dotaProps = dotaProps || feature.get('dotaProps');
        unitClass = unitClass || dotaProps.unitClass;
        const unitStats = this.getStatData()[unitClass] || {};
        let radius;
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

    getRangeCircle(feature, coordinate, unitClass, rangeType, radius) {
        const dotaProps = feature.get('dotaProps');
        radius = radius || this.getFeatureVisionRadius(feature, dotaProps, unitClass, rangeType);
        if (radius == null) return null;
        if (!coordinate) {
            coordinate = worldToLatLon([dotaProps.x, dotaProps.y]);
        }
        const circle = new Feature(new Circle(coordinate, getScaledRadius(radius)));
        return circle;
    }

    setDefaults() {
        const x = getParameterByName('x');
        const y = getParameterByName('y');
        const zoom = getParameterByName('zoom');
        if (zoom) {
            this.view.setZoom(zoom);
        }
        if (x && y) {
            const coordinate = transform([x, y], dotaProj, pixelProj);
            if (containsXY([-100, -100, mapConstants.map_w + 100, mapConstants.map_h + 100], coordinate[0], coordinate[1])) {
                this.panTo(coordinate);
            }
        }

        this.root.getElementById('btn-ward').setAttribute('ward-type', 'observer');
        const mode = getParameterByName('mode');
        this.controls.menu.changeMode(mode);

        const baseLayerName = getParameterByName('BaseLayer');
        let element;
        if (baseLayerName) {
            element = this.root.querySelector(`input[name="base-layer"][value="${baseLayerName}"]`);
            if (element) {
                element.checked = true;
                this.baseLayers.filter(layer => layer.get('layerId') == baseLayerName)[0].setVisible(true);
            }
        }
        if (!element) {
            setQueryString('BaseLayer', null);
            this.baseLayers[0].setVisible(true);
            this.root.querySelector(`input[name="base-layer"][value="${this.baseLayers[0].get('layerId')}"]`).checked = true;
        }

        this.layerDefs.forEach((layerDef) => {
            const param = layerDef.name.replace(/ /g, '');
            const value = getParameterByName(param);
            if (value && value !== 'false') {
                layerDef.visible = true;
                this.root.querySelector(`input[data-layer-id="${layerDef.id}"]`).checked = true;
                setQueryString(param, true);
            }
            else {
                setQueryString(param, null);
            }
            if (layerDef.id == 'ent_dota_tree') {
                this.root.getElementById('btn-tree').setAttribute('trees-enabled', layerDef.visible ? 'yes' : 'no');
            }
        });

        this.controls.draw.setDataId(getParameterByName('data'));
    }

    export(filename) {
        const map = this.root.getElementById('map');
        map.style.width = '2048px';
        map.style.height = '2048px';
        this.map.updateSize();
        const center = this.view.getCenter();
        const zoom = this.view.getZoom();
        this.view.setZoom(2);
        this.view.setCenter([mapConstants.map_w / 2, mapConstants.map_h / 2]);
        const resetExport = () => {
            map.style.width = '100%';
            map.style.height = '100%';
            this.map.updateSize();
            this.view.setZoom(zoom);
            this.view.setCenter(center);
        };
        this.map.once('rendercomplete', (event) => {
            const canvas = event.context.canvas;
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(canvas.msToBlob(), filename);
                resetExport();
            }
            else {
                canvas.toBlob((blob) => {
                    saveAs(blob, filename);
                    resetExport();
                });
            }
        });
        this.map.renderSync();
    }

    save() {
        const writer = new KML();
        const str = writer.writeFeatures(this.controls.draw.source.getFeatures());
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'save.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    const data = JSON.parse(xhr.responseText);
                    if (data.file) {
                        setQueryString('data', data.file);
                        this.controls.notification.show(modeNotificationText.saveSuccess);
                        return;
                    }
                }
            }
            this.controls.notification.show(modeNotificationText.saveFailed);
        };
        xhr.send(`data=${str}`);
    }

    share() {
        const dummy = document.createElement('input');
        const text = window.location.href;
        this.root.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        this.root.execCommand('copy');
        this.root.body.removeChild(dummy);
        this.controls.notification.show(modeNotificationText.share);
    }

    reset() {
        if (history && history.replaceState) {
            history.replaceState(null, '', window.location.href.split('?')[0]);
        }
        this.setDefaults();
        this.controls.menu.updateOverlayMenu();
        this.controls.tree.toggleAllTrees(false, true);
        this.controls.tree.parseQueryString();
        this.controls.ward.clearWards();
        this.controls.ward.parseQueryString();
        this.controls.draw.clear();
    }

    initialize() {
        this.vs.initialize(this.visionDataImagePath, (err) => {
            this.controls.info.activate();

            this.setDefaults();

            this.setMapLayers(this.version, (err) => {
                if (!err) {
                    this.controls.menu.updateOverlayMenu();
                    this.controls.tree.parseQueryString();
                    this.controls.ward.parseQueryString();
                }
                else {
                    throw new Error(err);
                }
            });

            forEach(this.root.querySelectorAll('input[name="mode"], input[name="ward-type"], input[name="measure-type"], input[name="draw-type"]'), (element) => {
                element.addEventListener('change', (e) => {
                    this.controls.menu.changeMode(e.currentTarget.value);
                }, false);
            }, this);

            if ('#enable_save' === 'true') {
                this.root.getElementById('save').addEventListener('click', () => this.save());
            }

            this.root.getElementById('share').addEventListener('click', () => this.share());

            if ('#enable_download' === 'true') {
                this.root.getElementById('export-map').addEventListener('click', () => this.export('map.png'));
            }

            const strokePicker = new CP(this.root.getElementById('strokecolor-option'), false, this.root.getElementById('strokecolor-picker-container'));
            const self = this;
            strokePicker.on('change', function (color) {
                this.target.value = `#${color}`;
                self.root.getElementById('strokecolor-preview').style.backgroundColor = `#${color}`;
            });

            strokePicker.target.oncut = strokePicker.target.onpaste = strokePicker.target.onkeyup = strokePicker.target.oninput = function () {
                strokePicker.set(this.value);
            };

            this.root.getElementById('strokecolor-option').addEventListener('blur', () => {
                this.root.getElementById('strokecolor-picker-container').classList.remove('open');
            });

            this.root.getElementById('strokecolor-option').addEventListener('click', () => {
                this.root.getElementById('strokecolor-picker-container').classList.add('open');
                strokePicker.fit = function () { // do nothing ...
                    this.picker.style.left = this.picker.style.top = '';
                };
                strokePicker.enter();
            });

            const fillPicker = new CP(this.root.getElementById('fillcolor-option'), false, this.root.getElementById('fillcolor-picker-container'));
            fillPicker.on('change', function (color) {
                this.target.value = `#${color}`;
                self.root.getElementById('fillcolor-preview').style.backgroundColor = `#${color}`;
            });

            fillPicker.target.oncut = fillPicker.target.onpaste = fillPicker.target.onkeyup = fillPicker.target.oninput = function () {
                fillPicker.set(this.value);
            };

            this.root.getElementById('fillcolor-option').addEventListener('blur', () => {
                this.root.getElementById('fillcolor-picker-container').classList.remove('open');
            });

            this.root.getElementById('fillcolor-option').addEventListener('click', () => {
                this.root.getElementById('fillcolor-picker-container').classList.add('open');
                fillPicker.fit = function () { // do nothing ...
                    this.picker.style.left = this.picker.style.top = '';
                };
                fillPicker.enter();
            });

            this.root.getElementById('nightControl').addEventListener('change', (e) => {
                this.isNight = e.currentTarget.checked;
                if (this.isNight) {
                    this.controls.notification.show(modeNotificationText.nightOn);
                }
                else {
                    this.controls.notification.show(modeNotificationText.nightOff);
                }
            });

            this.root.getElementById('darknessControl').addEventListener('change', (e) => {
                this.isDarkness = e.currentTarget.checked;
                if (this.isDarkness) {
                    this.controls.notification.show(modeNotificationText.darknessOn);
                }
                else {
                    this.controls.notification.show(modeNotificationText.darknessOff);
                }
            });

            this.root.getElementById('creepControl').addEventListener('change', (e) => {
                this.controls.menu.toggleLayerMenuOption('npc_dota_spawner', e.currentTarget.checked);
                this.controls.menu.toggleLayerMenuOption('path_corner', e.currentTarget.checked);
                if (e.currentTarget.checked) {
                    this.controls.creep.activate();
                }
                else {
                    this.controls.creep.deactivate();
                }
            });

            this.root.getElementById('vision-radius').addEventListener('change', e => this.visionRadius = e.currentTarget.value);

            this.root.getElementById('movementSpeed').addEventListener('change', e => this.movementSpeed = e.currentTarget.value);

            this.root.getElementById('option-dayVision').addEventListener('change', e => this.rangeLayers.dayVision.setVisible(e.currentTarget.checked));

            this.root.getElementById('option-nightVision').addEventListener('change', e => this.rangeLayers.nightVision.setVisible(e.currentTarget.checked));

            this.root.getElementById('option-trueSight').addEventListener('change', e => this.rangeLayers.trueSight.setVisible(e.currentTarget.checked));

            this.root.getElementById('option-attackRange').addEventListener('change', e => this.rangeLayers.attackRange.setVisible(e.currentTarget.checked));

            this.root.getElementById('version-select').addEventListener('change', (e) => {
                const el = e.currentTarget;
                this.setMapLayers(el.value, (err) => {
                    if (!err) {
                        this.controls.creep.deactivate();
                        this.version = el.value;
                        this.root.getElementById('creepControl').disabled = !this.getMapLayer('npc_dota_spawner');
                        this.root.getElementById('creepControl').checked = false;
                    }
                    else {
                        el.value = this.version;
                        alert('Version change failed.');
                    }
                });
            });

            const heroData = Object.keys(heroIcons).map((id) => {
                heroIcons[id].id = id;
                return heroIcons[id];
            });
            heroData.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
            const markerSelect = this.root.getElementById('marker-select');
            for (const data of heroData) {
                markerSelect.options[markerSelect.options.length] = new Option(data.name, data.id);
            }

            this.root.getElementById('marker-select').addEventListener('change', (e) => {
                const el = e.currentTarget;
                this.controls.draw.changeMarkerType(el.value);
                this.root.getElementById('marker-preview').className = '';
                this.root.getElementById('marker-preview').classList.add(`miniheroes-sprite-${el.value}`);
            });

            this.root.getElementById('freehand-select').addEventListener('change', (e) => {
                const el = e.currentTarget;
                this.controls.draw.changeFreehandType(el.value);
            });

            this.root.getElementById('sides-option').addEventListener('change', (e) => {
                const el = e.currentTarget;
                this.controls.draw.changeSides(parseInt(el.value));
            });

            this.root.getElementById('undo').addEventListener('click', () => this.controls.draw.undo());
            this.root.getElementById('redo').addEventListener('click', () => this.controls.draw.redo());

            this.root.getElementById('btn-zoom-in').addEventListener('click', () => this.view.animate({ zoom: this.view.getZoom() + 1 }));

            this.root.getElementById('btn-zoom-out').addEventListener('click', () => this.view.animate({ zoom: this.view.getZoom() - 1 }));

            this.root.getElementById('reset').addEventListener('click', () => this.reset());

            this.root.getElementById('btn-tree').addEventListener('click', (e) => {
                const el = e.currentTarget;
                if (el.classList.contains('active')) {
                    el.setAttribute('trees-enabled', el.getAttribute('trees-enabled') == 'yes' ? 'no' : 'yes');
                }
                el.classList.add('active');
                this.root.getElementById('btn-ward').classList.remove('active');
                this.root.getElementById('btn-measure').classList.remove('active');
                this.controls.menu.toggleLayerMenuOption('ent_dota_tree', el.getAttribute('trees-enabled') == 'yes');
                this.controls.menu.changeMode('navigate');
                this.controls.notification.show(el.getAttribute('trees-enabled') == 'yes' ? modeNotificationText.treeEnable : modeNotificationText.treeDisable);
            });

            this.root.getElementById('btn-ward').addEventListener('click', (e) => {
                const el = e.currentTarget;
                if (el.classList.contains('active')) {
                    el.setAttribute('ward-type', el.getAttribute('ward-type') == 'observer' ? 'sentry' : 'observer');
                }
                if (el.getAttribute('ward-type') == 'sentry') {
                    this.root.querySelector('input[name="mode"][value="ward"]').checked = true;
                    this.root.querySelector('input[name="ward-type"][value="sentry"]').checked = true;
                }
                else {
                    this.root.querySelector('input[name="mode"][value="ward"]').checked = true;
                    this.root.querySelector('input[name="ward-type"][value="observer"]').checked = true;
                }
                el.classList.add('active');
                this.root.getElementById('btn-tree').classList.remove('active');
                this.root.getElementById('btn-measure').classList.remove('active');
                this.controls.menu.changeMode('ward');
            });

            this.root.getElementById('btn-measure').addEventListener('click', (e) => {
                const el = e.currentTarget;
                if (el.classList.contains('active')) {
                    el.setAttribute('measure-type', el.getAttribute('measure-type') == 'line' ? 'circle' : 'line');
                }
                if (el.getAttribute('measure-type') == 'circle') {
                    this.root.querySelector('input[name="mode"][value="measure"]').checked = true;
                    this.root.querySelector('input[name="measure-type"][value="circle"]').checked = true;
                }
                else {
                    this.root.querySelector('input[name="mode"][value="measure"]').checked = true;
                    this.root.querySelector('input[name="measure-type"][value="line"]').checked = true;
                }
                el.classList.add('active');
                this.root.getElementById('btn-tree').classList.remove('active');
                this.root.getElementById('btn-ward').classList.remove('active');
                this.controls.menu.changeMode('measure');
            });
        });
    }
}

export default InteractiveMap;
