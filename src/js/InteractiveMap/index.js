import EventEmitter from 'events';
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
import { KML } from 'ol/format';
import { pixelProj, dotaProj } from './definitions/projections';
import mapConstants from './definitions/mapConstants';
import styles from './definitions/styles';
import { loadGeoJSON, loadJSON, loadLayerGroupFromData } from './dataLoader';
import baseLayerDefinitions from './definitions/baseLayers';
import layerDefinitions from './definitions/layers';
import MenuControl from './controls/menu';
import InfoControl from './controls/info';
import NotificationControl from './controls/notification';
import MeasureControl from './controls/measure';
import CreepControl from './controls/creep';
import VisionControl from './controls/vision';
import WardControl from './controls/ward';
import TreeControl from './controls/tree';
import CoordinateControl from './controls/coordinate';
import DrawControl from './controls/draw';
import QueryStringControl from './controls/queryString';
import getJSON from './util/getJSON';
import { saveAs } from 'file-saver/FileSaver';
import heroIcons from './definitions/heroIconManifest.json';

class InteractiveMap extends EventEmitter {
    constructor(root, mapTilePath, version, visionDataImagePath, options = {}) {
        super();
        this.buildDate = '%BUILD_DATE%';
        this.releaseTag = '%RELEASE_TAG%';
        this.codeVersion = '%CODE_VERSION%';
        this.root = root;
        this.options = {
            target: 'map',
            mode: 'navigate',
            zoom: 1,
            resolutions: [32, 16, 8, 4, 2, 1],
            save: true,
            download: true,
            ...options,
            controls: {
                coordinate: true,
                ...options.controls,
            },
        };
        this.mapTilePath = mapTilePath;
        this._visionDataImagePath = visionDataImagePath;
        this.vs = new VisionSimulation(worlddata);
        this.layerDefs = layerDefinitions;
        this.baseLayerDefs = baseLayerDefinitions;
        this.view = new View({
            zoom: this.options.zoom,
            center: mapConstants.imgCenter,
            projection: pixelProj,
            resolutions: this.options.resolutions,
            extent: [0, 0, mapConstants.map_w, mapConstants.map_h],
        });
        this._data = {};
        this.layerIndex = {};
        this.version = version;
        this.layerFilters = {
            marker: (layer) => {
                const layerDef = layer.get('layerDef');
                return layer.getVisible() && layerDef && (layerDef.group === 'structure' || layerDef.group === 'object');
            },
        };
        this.map = new Map({
            controls: defaultControls({ zoom: false, attribution: false, rotate: false }).extend([
                new FullScreen(),
            ]),
            interactions: defaultInteractions({ altShiftDragRotate: false, pinchRotate: false }),
            target: this.options.target,
            view: this.view,
        });

        this.highlightSource = new SourceVector({});
        this.highlightLayer = new LayerVector({
            source: this.highlightSource,
            style: styles.highlight,
            zIndex: 140,
        });

        this.selectSource = new SourceVector({});
        this.selectLayer = new LayerVector({
            source: this.selectSource,
            style: styles.select,
            zIndex: 150,
        });

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
            info: new InfoControl(this, this.root.getElementById('info')),
            notification: new NotificationControl(this, this.root.getElementById('notification')),
            vision: new VisionControl(this),
            ward: new WardControl(this, this.root.getElementById('info')),
            tree: new TreeControl(this),
            coordinate: this.options.controls.coordinate && new CoordinateControl(this, this.root.getElementById('coordinates')),
            measure: new MeasureControl(this, this.root.getElementById('info')),
            creep: new CreepControl(this, this.root.getElementById('timer')),
            draw: new DrawControl(this),
            queryString: new QueryStringControl(this),
        };

        this.map.on('moveend', this.onMoveEnd.bind(this));
        this.map.on('pointermove', this.onMouseEvent.bind(this));
        this.map.on('click', this.onMouseEvent.bind(this));
        this.on('map.pointermove', this.onMapHover.bind(this));
        this.on('map.click', this.onMapClick.bind(this));
    }

    onMoveEnd(evt) {
        const map = evt.map;
        const ext = map.getView().calculateExtent(map.getSize());
        const center = getCenter(ext);
        const worldXY = transform(center, pixelProj, dotaProj);
        const coordinate = [Math.round(worldXY[0]), Math.round(worldXY[1])];
        this.emit('map.moveend', coordinate[0], coordinate[1]);
    }

    onMouseEvent(evt) {
        // When user was dragging map, then coordinates didn't change and there's
        // no need to continue
        if (evt.type === 'pointermove' && evt.dragging) return;

        const pixel = this.map.getEventPixel(evt.originalEvent);
        let feature = this.map.forEachFeatureAtPixel(pixel, feature => feature, { layerFilter: this.layerFilters.marker });
        if (feature) {
            if (feature.get('dotaProps').id === 'ent_dota_tree') {
                this.emit(`map.${evt.type}`, feature, 'tree', evt);
            }
            else {
                this.emit(`map.${evt.type}`, feature, 'marker', evt);
            }
        }
        else {
            feature = this.map.forEachFeatureAtPixel(pixel, feature => feature, { layerFilter: this.controls.ward.layerFilter });
            if (feature) {
                this.emit(`map.${evt.type}`, feature, 'ward', evt);
            }
            else {
                this.emit(`map.${evt.type}`, null, null, evt);
            }
        }
    }

    onMapHover(feature, featureType, evt) {
        if (this.highlightedFeature && this.highlightedFeature !== feature) {
            this.emit('unhighlight', this.highlightedFeature, 'marker', evt);
            this.unhighlight();
        }
        else if (this.highlightedWard && this.highlightedWard !== feature) {
            this.emit('unhighlight', this.highlightedWard, 'ward', evt);
            this.unhighlightWard();
        }
        if (feature) {
            if (featureType === 'marker' || featureType === 'tree') {
                this.highlight(feature);
            }
            else if (featureType === 'ward') {
                this.highlightWard(feature);
            }
            this.emit('highlight', feature, featureType, evt);
        }
    }

    onMapClick(feature, featureType, evt) {
        if (feature) {
            if (!feature.get('clicked')) {
                if (featureType !== 'tree') {
                    this.select(feature);
                }
                this.emit('select', feature, featureType, evt);
            }
            else {
                this.deselect(feature);
                this.emit('deselect', feature, featureType, evt);
            }
            this.emit('click', feature, featureType, evt);
        }
        else {
            this.deselectAll();
        }
    }
    
    get visionDataImagePath() {
        return this._visionDataImagePath.replace('%MAP_VERSION%', this.version);
    }
    
    get mapData() {
        return this._data[this.version] || {};
    }
    
    get data() {
        return this.mapData.data || {};
    }
    
    get statData() {
        return this.data.stats || {};
    }
    
    get mapLayerIndex() {
        if (!this.layerIndex[this.version]) this.layerIndex[this.version] = {};
        return this.layerIndex[this.version];
    }

    get mapDataPath() {
        return `data/${this.version}/mapdata.json`;
    }

    getMapData(version) {
        console.warn("Deprecated. Use mapData property instead.");
        return this._data[version || this.version] || {};
    }

    getData(version) {
        console.warn("Deprecated. Use data property instead.");
        return this.getMapData(version).data || {};
    }

    getStatData(version) {
        console.warn("Deprecated. Use statData property instead.");
        return this.getData(version).stats || {};
    }

    getMapLayerIndex(version) {
        console.warn("Deprecated. Use mapLayerIndex property instead.");
        version = version || this.version;
        if (!this.layerIndex[version]) this.layerIndex[version] = {};
        return this.layerIndex[version];
    }

    getMapLayer(layerId) {
        return this.mapLayerIndex[layerId];
    }

    setMapLayers(data) {
        const currentLayerGroup = this.map.getLayerGroup();
        currentLayerGroup.setVisible(false);
        this.map.setLayerGroup(data.layerGroup);
        this.map.getLayerGroup().setVisible(true);
        for (const layer of this.map.getLayers().item(1).getLayers().getArray()) {
            const layerId = layer.get('layerId');
            if (layerId) {
                const layerDef = this.layerDefs.find(layerDef => layerDef.id === layerId);
                if (layerDef) {
                    layer.setVisible(!!layerDef.visible);
                }
            }
        }
    }

    getDataJSON(version, callback) {
        if (this._data[version]) {
            callback(null, this._data[version]);
        }
        else {
            getJSON(`data/${version}/mapdata.json`, (err, data) => {
                if (!err) {
                    const controlLayers = Object.values(this.controls).reduce((layers, control) => layers.concat(control.getMapLayers()), []);
                    controlLayers.push(this.highlightLayer);
                    controlLayers.push(this.selectLayer);
                    this._data[version] = {
                        data,
                        layerGroup: new LayerGroup({
                            title: `${version} Layers`,
                            layers: new Collection([
                                this.baseLayerGroup,
                                loadLayerGroupFromData(this, data, version, this.getMapLayerIndex(version), this.layerDefs),
                                new LayerGroup({
                                    title: 'Control Layers',
                                    layers: new Collection(controlLayers),
                                }),
                            ]),
                        }),
                    };
                }
                callback(err, this._data[version]);
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

    highlightWard(feature) {
        if (feature !== this.highlightedWard) {
            if (this.highlightedWard) {
                this.highlightedWard.setStyle(styles[this.highlightedWard.get('wardType')].normal);
            }
            if (feature) {
                feature.setStyle(styles[feature.get('wardType')][this.controls.menu.mode === 'navigate' ? 'highlight' : 'remove']);
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

    select(feature) {
        if (feature && !feature.get('clicked')) {
            if (feature === this.highlightedFeature) {
                this.unhighlight();
            }
            if (feature === this.highlightedWard) {
                this.unhighlightWard();
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
            if (feature === this.highlightedFeature) {
                this.unhighlight();
            }
            if (feature === this.highlightedWard) {
                this.unhighlightWard();
            }

            this.selectSource.removeFeature(feature);
            feature.set('clicked', false, true);
        }
    }

    setDefaults() {
        for (const control of Object.values(this.controls)) {
            control.setDefaults();
        }
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
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    if (data.file) {
                        this.emit('dataId', data.file);
                        return;
                    }
                }
            }
            this.emit('dataId', null);
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
        this.emit('share');
    }

    reset() {
        if (history && history.replaceState) {
            history.replaceState(null, '', window.location.href.split('?')[0]);
        }
        for (const control of Object.values(this.controls)) {
            control.reset();
        }
        this.setDefaults();
    }

    initialize() {
        this.vs.initialize(this.visionDataImagePath, (err) => {
            this.on('zoom.relative', value => this.view.animate({ zoom: this.view.getZoom() + value }));
            this.on('zoom', value => this.view.setZoom(value));
            this.on('reset', () => this.reset());
            this.on('layerDef.visible', (layerDef, value) => (layerDef.visible = value));
            this.on('panTo', (x, y) => {
                const coordinate = transform([x, y], dotaProj, pixelProj);
                if (containsXY([-100, -100, mapConstants.map_w + 100, mapConstants.map_h + 100], coordinate[0], coordinate[1])) {
                    this.panTo(coordinate);
                }
            });
            this.on('baseLayer', baseLayerName => {
                const baseLayer = this.baseLayers.filter(layer => layer.get('layerId') === baseLayerName)[0];
                if (baseLayer) {
                    baseLayer.setVisible(true);
                }
            });
            this.on('layer', (layerId, value) => {
                const layer = this.getMapLayer(layerId);
                if (layer) {
                    layer.setVisible(value);
                }
                const layerDef = this.layerDefs.find(layerDef => layerDef.id === layerId);
                if (layerDef) {
                    layerDef.visible = value;
                }
            });

            this.on('version', (version, data) => {
                this.version = version;
                this.setMapLayers(data);
                this.vs.initialize(this.visionDataImagePath, (err) => {
                    console.log('vision reinitialized', err);
                });
            });
            
            for (const control of Object.values(this.controls)) {
                control.initialize();
            }
            
            this.setDefaults();

            this.getDataJSON(this.version, (err, data) => {
                if (!err) {
                    this.emit('version', this.version, data);
                }
                else {
                    throw new Error(err);
                }
            });
        });
    }
}

export default InteractiveMap;
