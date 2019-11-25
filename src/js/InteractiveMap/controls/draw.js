import BaseControl from './base';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import Polygon from 'ol/geom/Polygon';
import Draw, { createRegularPolygon, createBox } from 'ol/interaction/Draw';
import { Modify, Translate, Select } from 'ol/interaction';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { asArray as colorAsArray } from 'ol/color';
import { unByKey } from 'ol/Observable';
import RotateFeatureInteraction from 'ol-rotate-feature';
import heroIcons from '../definitions/heroIconManifest.json';
import { KML } from 'ol/format';
import CP from '../util/color-picker';

class DrawControl extends BaseControl {
    constructor(InteractiveMap) {
        super(InteractiveMap);
        this.source = new SourceVector({
            url: (source, extent, number, proj) => (this.dataId ? `save/${this.dataId}.kml` : ''),
            format: new KML(),
        });

        this.layer = new LayerVector({
            title: 'Draw',
            source: this.source,
            zIndex: 210,
        });

        this.dataId = null;

        this.type = 'brush';

        this.draw = null; // global so we can remove it later

        this.rotate = null;

        this.modify = null;

        this.select = null;

        this.pendingModification = null;

        this.markerType = 'abaddon';

        this.freehandType = 'LineString';
        this.sides = 3;

        this.undoHistory = [];
        this.redoHistory = [];

        this.InteractiveMap.on('dataId', value => (this.dataId = value));
        this.InteractiveMap.on('layer.draw', value => this.layer.setVisible(value));
        this.InteractiveMap.on('mode', (value) => {
            switch (value) {
            case 'brush':
            case 'marker':
            case 'point':
            case 'linestring':
            case 'polygon':
            case 'shape':
            case 'modify':
            case 'rotate':
            case 'scale':
            case 'skew':
            case 'translate':
            case 'delete':
            case 'draw':
                this.change(value);
                this.activate();
                break;
            default:
                this.deactivate();
                break;
            }
        });
    }

    get strokeSize() {
        return parseInt(this.root.getElementById('strokesize-option').value);
    }

    get strokeColor() {
        const color = colorAsArray(this.root.getElementById('strokecolor-option').value).slice();
        color[3] = parseInt(this.root.getElementById('strokeopacity-option').value) / 100;
        return color;
    }

    get fillColor() {
        const color = colorAsArray(this.root.getElementById('fillcolor-option').value).slice();
        color[3] = parseInt(this.root.getElementById('fillopacity-option').value) / 100;
        return color;
    }

    getId() {
        return `_${Math.random().toString(36).substr(2, 9)}`;
    }

    onFeatureModified(event, sourceFeature) {
        const feature = sourceFeature.clone();
        feature.setId(sourceFeature.getId());
        this.pendingModification = {
            type: 'modify',
            id: feature.getId(),
            feature,
        };
    }

    onModifyStart(event) {
        for (const feature of event.features.getArray()) {
            const geometry = feature.getGeometry();
            feature.modifiedListener = geometry.on('change', event => this.onFeatureModified(event, feature));
        }
    }

    onModifyEnd(event) {
        for (const feature of event.features.getArray()) {
            unByKey(feature.modifiedListener);
        }
        this.undoHistory.push(this.pendingModification);
        this.redoHistory.length = 0;
    }

    addInteraction() {
        const options = { source: this.source };
        switch (this.type) {
        case 'translate':
        case 'modify':
            if (this.type === 'translate') {
                this.modify = new Translate({ source: this.source });
            }
            else {
                this.modify = new Modify({ source: this.source });
            }
            this.modify.on(`${this.type}start`, event => this.onModifyStart(event));
            this.modify.on(`${this.type}end`, event => this.onModifyEnd(event));
            this.map.addInteraction(this.modify);
            return;
            break;
        case 'rotate':
            this.select = new Select();
            this.select.on('select', (event) => {
                this.map.removeInteraction(this.rotate);
                const features = event.target.getFeatures();
                if (features.getLength()) {
                    this.rotate = new RotateFeatureInteraction({
                        features,
                        angle: -90 * Math.PI / 180,
                    });
                    this.rotate.on('rotatestart', event => this.onModifyStart(event));
                    this.rotate.on('rotateend', event => this.onModifyEnd(event));
                    this.map.addInteraction(this.rotate);
                }
            });
            this.map.addInteraction(this.select);
            return;
            break;
        case 'delete':
            this.select = new Select();
            this.select.on('select', (event) => {
                const features = event.target.getFeatures();
                if (features.getLength()) {
                    for (const feature of features.getArray()) {
                        this.source.removeFeature(feature);
                        const clone = feature.clone();
                        clone.setId(feature.getId());
                        this.undoHistory.push({
                            type: 'remove',
                            id: clone.getId(),
                            feature: clone,
                        });
                        this.redoHistory.length = 0;
                    }
                    features.clear();
                }
            });
            this.map.addInteraction(this.select);
            return;
            break;
        case 'brush':
            options.type = this.freehandType;
            if (this.freehandType === 'Box') {
                options.type = 'Circle';
                options.geometryFunction = createBox();
            }
            else if (this.freehandType === 'Star') {
                options.type = 'Circle';
                options.geometryFunction = (coordinates, geometry) => {
                    const center = coordinates[0];
                    const last = coordinates[1];
                    const dx = center[0] - last[0];
                    const dy = center[1] - last[1];
                    const radius = Math.sqrt(dx * dx + dy * dy);
                    const rotation = Math.atan2(dy, dx);
                    const newCoordinates = [];
                    const numPoints = 12;
                    for (let i = 0; i < numPoints; ++i) {
                        const angle = rotation + i * 2 * Math.PI / numPoints;
                        const fraction = i % 2 === 0 ? 1 : 0.5;
                        const offsetX = radius * fraction * Math.cos(angle);
                        const offsetY = radius * fraction * Math.sin(angle);
                        newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
                    }
                    newCoordinates.push(newCoordinates[0].slice());
                    if (!geometry) {
                        geometry = new Polygon([newCoordinates]);
                    }
                    else {
                        geometry.setCoordinates([newCoordinates]);
                    }
                    return geometry;
                };
            }
            else {
                options.freehand = true;
            }
            break;
        case 'marker':
        case 'point':
            options.type = 'Point';
            break;
        case 'linestring':
            options.type = 'LineString';
            break;
        case 'polygon':
            options.type = 'Polygon';
            break;
        case 'shape':
            options.type = 'Circle';
            options.geometryFunction = createRegularPolygon(this.sides);
            break;
        }
        this.draw = new Draw(options);
        this.draw.on('drawend', (event) => {
            let style = new Style({
                fill: new Fill({ color: this.fillColor }),
                stroke: new Stroke({
                    color: this.strokeColor,
                    width: this.strokeSize,
                }),
            });
            if (this.type === 'point') {
                style = new Style({
                    image: new Circle({
                        radius: this.strokeSize,
                        fill: new Fill({ color: this.strokeColor }),
                    }),
                });
            }
            else if (this.type === 'marker') {
                const heroIcon = heroIcons[this.markerType];
                style = new Style({
                    image: new Icon({
                        offset: [heroIcon.x, heroIcon.y],
                        opacity: 1,
                        rotateWithView: false,
                        rotation: 0.0,
                        scale: 1.0,
                        size: [32, 32],
                        src: 'img/miniheroes_sprite.png',
                    }),
                });
            }
            event.feature.setStyle(style);
            event.feature.setId(this.getId());
            const feature = event.feature.clone();
            feature.setId(event.feature.getId());
            this.undoHistory.push({
                type: 'add',
                id: feature.getId(),
                feature,
            });
            this.redoHistory.length = 0;
        });
        this.map.addInteraction(this.draw);
    }

    undo() {
        if (this.select) {
            this.select.getFeatures().clear();
        }
        const action = this.undoHistory.pop();
        if (action) {
            if (action.type === 'add') {
                this.source.removeFeature(this.source.getFeatureById(action.id));
            }
            else if (action.type === 'remove') {
                const clone = action.feature.clone();
                clone.setId(action.feature.getId());
                this.source.addFeature(clone);
            }
            else if (action.type === 'modify') {
                for (const previousAction of this.undoHistory) {
                    if (previousAction.id === action.id) {
                        this.source.removeFeature(this.source.getFeatureById(action.id));
                        const clone = previousAction.feature.clone();
                        clone.setId(previousAction.feature.getId());
                        this.source.addFeature(clone);
                        break;
                    }
                }
            }
            const clone = action.feature.clone();
            clone.setId(action.feature.getId());
            action.feature = clone;
            this.redoHistory.push(action);
        }
    }

    redo() {
        if (this.select) {
            this.select.getFeatures().clear();
        }
        const action = this.redoHistory.pop();
        if (action) {
            if (action.type === 'add') {
                const clone = action.feature.clone();
                clone.setId(action.feature.getId());
                this.source.addFeature(clone);
            }
            else if (action.type === 'remove') {
                this.source.removeFeature(this.source.getFeatureById(action.id));
            }
            else if (action.type === 'modify') {
                this.source.removeFeature(this.source.getFeatureById(action.id));
                const clone = action.feature.clone();
                clone.setId(action.feature.getId());
                this.source.addFeature(clone);
            }
            const clone = action.feature.clone();
            clone.setId(action.feature.getId());
            action.feature = clone;
            this.undoHistory.push(action);
        }
    }

    change(type) {
        this.type = type;
        this.map.removeInteraction(this.draw);
        this.map.removeInteraction(this.modify);
        this.map.removeInteraction(this.select);
        this.map.removeInteraction(this.rotate);
        this.addInteraction();
    }

    changeFreehandType(type) {
        this.freehandType = type;
        this.change(this.type);
    }

    changeMarkerType(type) {
        this.markerType = type;
        this.change(this.type);
    }

    changeSides(value) {
        this.sides = value;
        this.change(this.type);
    }

    initialize() {
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
            this.changeMarkerType(el.value);
            this.root.getElementById('marker-preview').className = '';
            this.root.getElementById('marker-preview').classList.add(`miniheroes-sprite-${el.value}`);
        });

        this.root.getElementById('freehand-select').addEventListener('change', (e) => {
            const el = e.currentTarget;
            this.changeFreehandType(el.value);
        });

        this.root.getElementById('sides-option').addEventListener('change', (e) => {
            const el = e.currentTarget;
            this.changeSides(parseInt(el.value));
        });

        this.root.getElementById('undo').addEventListener('click', () => this.undo());
        this.root.getElementById('redo').addEventListener('click', () => this.redo());
        
        const self = this;
        
        const strokePicker = new CP(this.root.getElementById('strokecolor-option'), false, this.root.getElementById('strokecolor-picker-container'));
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
    }
    
    reset() {
        this.source.clear();
        this.undoHistory.length = 0;
        this.redoHistory.length = 0;
        this.pendingModification = null;
        this.dataId = null;
    }
    
    setMapLayers() {
        this.InteractiveMap.map.addLayer(this.layer);
    }
    
    getMapLayers() {
        return [this.layer];
    }
    
    deactivate() {
        super.deactivate();
        this.map.removeInteraction(this.draw);
        this.map.removeInteraction(this.modify);
        this.map.removeInteraction(this.select);
        this.map.removeInteraction(this.rotate);
    }
}

export default DrawControl;
