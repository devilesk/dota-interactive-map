import BaseControl from './base';
import MenuPanel from './menuPanel';
import { setQueryString } from '../util/queryString';

class MenuControl extends BaseControl {
    constructor(InteractiveMap) {
        super(InteractiveMap);
        this.mode = '';
        this._treesEnabled = false;
        this.wardType = 'observer';
        this.measureType = 'line';
        this.leftPanel = new MenuPanel(InteractiveMap.root, 'menu-left', 'menu-left-open-btn', 'menu-left-close-btn');
        this.rightPanel = new MenuPanel(InteractiveMap.root, 'menu-right', 'menu-right-open-btn', 'menu-right-close-btn');
        this.leftPanel.otherMenu = this.rightPanel;
        this.rightPanel.otherMenu = this.leftPanel;

        const layerToggleHandler = e => this.updateLayer(e.currentTarget);

        this.root.getElementById('option-draw-layer').addEventListener('change', layerToggleHandler, false);
        this.root.getElementById('option-ward-layer').addEventListener('change', layerToggleHandler, false);

        this.InteractiveMap.layerDefs.forEach((layerDef) => {
            const group = layerDef.group;
            const menu = this.root.getElementById(`${group}-menu`);
            const menuItem = MenuPanel.createMenuPanelItem(this.InteractiveMap, layerDef, layerToggleHandler);
            menu.appendChild(menuItem);
        });

        const baseLayerToggleHandler = (e) => {
            const layerId = e.currentTarget.getAttribute('data-layer-id');
            this.InteractiveMap.baseLayers.forEach(layer => layer.setVisible(layer.get('layerId') === layerId));
            setQueryString('BaseLayer', layerId);
        };

        const versionSelect = this.root.getElementById('version-select');
        const baseMenu = this.root.getElementById('base-menu');
        let checked = true;
        this.InteractiveMap.baseLayerDefs.forEach((group) => {
            const baseLayerMenu = MenuPanel.createBaseLayerMenuItem(group.id, group.name, checked);
            baseMenu.appendChild(baseLayerMenu);
            if (checked) checked = false;

            group.tilesets.forEach((tileset) => {
                const menu = this.root.getElementById(`base-${group.id}-menu`);
                const layerDef = { ...tileset, group: group.id };
                const menuItem = MenuPanel.createMenuPanelItem(this.InteractiveMap, layerDef, baseLayerToggleHandler, 'radio', 'base-layer');
                menu.appendChild(menuItem);
            });

            const versionOption = document.createElement('option');
            versionOption.setAttribute('value', group.id);
            versionOption.innerHTML = group.name;
            versionSelect.appendChild(versionOption);
        });

        this.InteractiveMap.on('creepControl', (value) => {
            this.toggleLayerMenuOption('npc_dota_spawner', value);
            this.toggleLayerMenuOption('path_corner', value);
        });
        this.InteractiveMap.on('changeMode', value => this.changeMode(value));
        this.InteractiveMap.on('treesEnabled', value => (this.treesEnabled = value));
        this.InteractiveMap.on('wardType', value => (this.wardType = value));
        this.InteractiveMap.on('measureType', value => (this.measureType = value));
        
        this.InteractiveMap.on('baseLayer', baseLayerName => {
            if (baseLayerName) {
                const element = this.root.querySelector(`input[name="base-layer"][value="${baseLayerName}"]`);
                if (element) {
                    element.checked = true;
                }
            }
        });
        
        this.InteractiveMap.on('layerDef.visible', (layerDef, value) => {
            this.root.querySelector(`input[data-layer-id="${layerDef.id}"]`).checked = value;
        });
        
        this.InteractiveMap.on('allTreesCutState', value => (this.root.getElementById('toggle-ent_dota_tree').checked = value));
        
        this.InteractiveMap.on('version', () => this.reset());
        
        this.InteractiveMap.on('layer', (layerId, value) => {
            if (layerId === 'ent_dota_tree') {
                this.InteractiveMap.emit('treesEnabled', value);
            }
        });
    }
    
    get treesEnabled() {
        return this._treesEnabled;
    }
    
    set treesEnabled(value) {
        this._treesEnabled = value;
        this.root.getElementById('btn-tree').setAttribute('trees-enabled', value ? 'yes' : 'no');
    }

    updateLayer(element, layerId) {
        layerId = layerId || element.getAttribute('data-layer-id');
        if (layerId === 'ward-layer') {
            this.InteractiveMap.emit('layer.vision', element.checked);
            this.InteractiveMap.emit('layer.ward', element.checked);
        }
        else if (layerId === 'draw-layer') {
            this.InteractiveMap.emit('layer.draw', element.checked);
        }
        else {
            this.InteractiveMap.emit('layer', layerId, element.checked);
        }
    }

    toggleLayerMenuOption(layerId, state) {
        const element = this.root.querySelector(`input[data-layer-id="${layerId}"]`);
        if (state != null) element.checked = state;
        this.updateLayer(element, layerId);
    }

    // updates element visibility based on map layer index
    // updates layer visibility based on element state
    updateOverlayMenu() {
        for (const element of this.root.querySelectorAll('.data-layer > input')) {
            const label = element.nextSibling;
            const layerId = element.getAttribute('data-layer-id');
            const layer = this.InteractiveMap.getMapLayer(layerId);
            if (!layer) {
                label.style.display = 'none';
            }
            else {
                label.style.display = 'block';
                layer.setVisible(element.checked);
            }
        }
    }

    changeMode(mode) {
        switch (mode) {
        case 'observer':
        case 'sentry':
        case 'ward':
            if (this.mode === 'ward') {
                this.InteractiveMap.emit('wardType', this.wardType !== 'observer' ? 'observer' : 'sentry');
            }
            else if (this.mode === 'observer') {
                this.InteractiveMap.emit('wardType', 'sentry');
            }
            else if (this.mode === 'sentry') {
                this.InteractiveMap.emit('wardType', 'observer');
            }
            this.mode = this.wardType;
            this.root.querySelector(`input[name="ward-type"][value="${this.wardType}"]`).checked = true;
            this.root.querySelector('input[name="mode"][value="ward"]').checked = true;
            this.root.getElementById('btn-ward').setAttribute('ward-type', this.wardType);
            this.root.getElementById('btn-ward').classList.add('active');
            this.root.getElementById('btn-tree').classList.remove('active');
            this.root.getElementById('btn-measure').classList.remove('active');
            this.root.getElementById('menu-left').classList.remove('draw');
            break;
        case 'line':
        case 'circle':
        case 'measure':
            if (this.mode === 'measure') {
                this.InteractiveMap.emit('measureType', this.measureType !== 'line' ? 'line' : 'circle');
            }
            else if (this.mode === 'line') {
                this.InteractiveMap.emit('measureType', 'circle');
            }
            else if (this.mode === 'circle') {
                this.InteractiveMap.emit('measureType', 'line');
            }
            this.mode = this.measureType;
            this.root.querySelector(`input[name="measure-type"][value="${this.measureType}"]`).checked = true;
            this.root.querySelector('input[name="mode"][value="measure"]').checked = true;
            this.root.getElementById('btn-measure').setAttribute('measure-type', this.measureType);
            this.root.getElementById('btn-ward').classList.remove('active');
            this.root.getElementById('btn-tree').classList.remove('active');
            this.root.getElementById('btn-measure').classList.add('active');
            this.root.getElementById('menu-left').classList.remove('draw');
            break;
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
            this.mode = this.root.querySelector('input[name="draw-type"]:checked').value;
            this.root.querySelector('input[name="mode"][value="draw"]').checked = true;
            this.root.getElementById('btn-ward').classList.remove('active');
            this.root.getElementById('btn-tree').classList.remove('active');
            this.root.getElementById('btn-measure').classList.remove('active');
            this.root.getElementById('menu-left').classList.add('draw');
            this.root.getElementById('draw-options').classList.remove('brush');
            this.root.getElementById('draw-options').classList.remove('marker');
            this.root.getElementById('draw-options').classList.remove('point');
            this.root.getElementById('draw-options').classList.remove('linestring');
            this.root.getElementById('draw-options').classList.remove('polygon');
            this.root.getElementById('draw-options').classList.remove('shape');
            this.root.getElementById('draw-options').classList.add(this.mode);
            break;
        default:
            if (this.mode === 'navigate') this.InteractiveMap.emit('treesEnabled', !this.treesEnabled);
            this.mode = mode || 'navigate';
            this.toggleLayerMenuOption('ent_dota_tree', this.treesEnabled);
            this.root.querySelector('input[name="mode"][value="navigate"]').checked = true;
            this.root.getElementById('btn-ward').classList.remove('active');
            this.root.getElementById('btn-tree').classList.add('active');
            this.root.getElementById('btn-measure').classList.remove('active');
            this.root.getElementById('menu-left').classList.remove('draw');
            break;
        }
        this.InteractiveMap.emit('mode', this.mode);
    }
    
    initialize() {
        this.root.getElementById('version-select').addEventListener('change', (e) => {
            const el = e.currentTarget;
            this.InteractiveMap.getDataJSON(el.value, (err, data) => {
                if (!err) {
                    this.InteractiveMap.emit('version', el.value, data);
                }
                else {
                    el.value = this.InteractiveMap.version;
                    alert('Version change failed.');
                }
            });
        });
            
        this.root.getElementById('nightControl').addEventListener('change', e => this.InteractiveMap.emit('isNight', e.currentTarget.checked));
        this.root.getElementById('darknessControl').addEventListener('change', e => this.InteractiveMap.emit('isDarkness', e.currentTarget.checked));
        this.root.getElementById('creepControl').addEventListener('change', e => this.InteractiveMap.emit('creepControl', e.currentTarget.checked));
        this.root.getElementById('vision-radius').addEventListener('change', e => this.InteractiveMap.emit('visionRadius', e.currentTarget.value));
        this.root.getElementById('movementSpeed').addEventListener('change', e => this.InteractiveMap.emit('movementSpeed', e.currentTarget.value));
        this.root.getElementById('option-dayVision').addEventListener('change', e => this.InteractiveMap.emit('dayVision', e.currentTarget.checked));
        this.root.getElementById('option-nightVision').addEventListener('change', e => this.InteractiveMap.emit('nightVision', e.currentTarget.checked));
        this.root.getElementById('option-trueSight').addEventListener('change', e => this.InteractiveMap.emit('trueSight', e.currentTarget.checked));
        this.root.getElementById('option-attackRange').addEventListener('change', e => this.InteractiveMap.emit('attackRange', e.currentTarget.checked));
        this.root.getElementById('btn-zoom-in').addEventListener('click', () => this.InteractiveMap.emit('zoom.relative', 1));
        this.root.getElementById('btn-zoom-out').addEventListener('click', () => this.InteractiveMap.emit('zoom.relative', -1));
        this.root.getElementById('reset').addEventListener('click', () => this.InteractiveMap.emit('reset'));
        
        this.root.getElementById('share').addEventListener('click', () => this.share());
        if (this.InteractiveMap.options.save) {
            this.root.getElementById('save').addEventListener('click', () => this.save());
        }
        if (this.InteractiveMap.options.download) {
            this.root.getElementById('export-map').addEventListener('click', () => this.export('map.png'));
        }

        for (const element of this.root.querySelectorAll('input[name="mode"], input[name="ward-type"], input[name="measure-type"], input[name="draw-type"]')) {
            element.addEventListener('change', (e) => this.InteractiveMap.emit('changeMode', e.currentTarget.value));
        }
        this.root.getElementById('btn-tree').addEventListener('click', e => this.InteractiveMap.emit('changeMode', 'navigate'));
        this.root.getElementById('btn-ward').addEventListener('click', e => this.InteractiveMap.emit('changeMode', 'ward'));
        this.root.getElementById('btn-measure').addEventListener('click', e => this.InteractiveMap.emit('changeMode', 'measure'));
    }
    
    setDefaults() {
        this.root.getElementById('btn-ward').setAttribute('ward-type', 'observer');
    }
    
    reset() {
        this.updateOverlayMenu();
    }
}

export default MenuControl;
