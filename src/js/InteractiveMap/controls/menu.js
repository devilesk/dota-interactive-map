import { setQueryString } from '../util/queryString';
import modeNotificationText from '../modeNotificationText';
import forEach from '../util/forEach';

class MenuPanel {
    constructor(root, panelId, openId, closeId, fullscreen) {
        this.root = root;
        this.panelId = panelId;
        this.openId = openId;
        this.closeId = closeId;
        this.fullscreen = fullscreen;

        this.panel = this.root.getElementById(this.panelId);

        this.openBtn = this.root.getElementById(this.openId);
        this.openBtn.addEventListener('click', this.open.bind(this), false);

        this.closeBtn = this.root.getElementById(this.closeId);
        this.closeBtn.addEventListener('click', this.close.bind(this), false);
    }

    open() {
        this.panel.classList.add('expand-horizontal');
        this.panel.classList.remove('collapsed-horizontal');
        this.openBtn.classList.add('collapsed-horizontal');
        this.openBtn.classList.remove('expand-horizontal');
        this.otherMenu.close();
    }

    close() {
        this.panel.classList.remove('expand-horizontal');
        this.panel.classList.add('collapsed-horizontal');
        this.openBtn.classList.remove('collapsed-horizontal');
        this.openBtn.classList.add('expand-horizontal');
    }

    static createToggle(layerDef, handler) {
        const toggle = document.createElement('div');
        toggle.classList.add('btn-toggle');

        const toggleCb = document.createElement('input');
        toggleCb.setAttribute('type', 'checkbox');
        toggleCb.id = `toggle-${layerDef.id}`;
        toggleCb.addEventListener('change', handler, false);
        toggle.appendChild(toggleCb);

        const toggleLbl = document.createElement('label');
        toggleLbl.setAttribute('for', toggleCb.id);
        toggle.appendChild(toggleLbl);

        return toggle;
    }

    static createMenuPanelItem(InteractiveMap, layerDef, handler, inputType, inputName) {
        let optionId = layerDef.id;

        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.classList.add(inputName || 'data-layer');

        const menuItemCb = document.createElement('input');
        menuItemCb.setAttribute('type', inputType || 'checkbox');
        if (inputType == 'radio') {
            optionId = `${layerDef.group}-${layerDef.id}`;
            menuItemCb.setAttribute('name', inputName);
            menuItemCb.setAttribute('value', optionId);
        }
        menuItemCb.id = `option-${optionId}`;
        menuItemCb.setAttribute('data-layer-id', optionId);
        menuItemCb.addEventListener('change', handler, false);
        menuItem.appendChild(menuItemCb);

        const menuItemLbl = document.createElement('label');
        menuItemLbl.classList.add('checkbox');
        menuItemLbl.setAttribute('for', menuItemCb.id);
        menuItemLbl.innerHTML = layerDef.name;
        menuItem.appendChild(menuItemLbl);

        if (layerDef.toggle) {
            const toggle = MenuPanel.createToggle(layerDef, (e) => {
                const el = e.currentTarget;
                const layer = InteractiveMap.getMapLayer(layerDef.id);
                if (layerDef.id == 'ent_dota_tree') {
                    InteractiveMap.controls.tree.toggleAllTrees(el.checked);
                }
                else {
                    InteractiveMap.controls.ward.toggleAll(layer, el.checked);
                }
            });
            menuItem.appendChild(toggle);
        }

        return menuItem;
    }

    static createBaseLayerMenuItem(id, name, checked) {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');

        const menuItemRb = document.createElement('input');
        menuItemRb.id = `base-${id}-option`;
        menuItemRb.checked = checked;
        menuItemRb.setAttribute('type', 'radio');
        menuItemRb.setAttribute('name', 'base-type');
        menuItemRb.setAttribute('value', id);
        menuItem.appendChild(menuItemRb);

        const menuItemLbl = document.createElement('label');
        menuItemLbl.classList.add('checkbox');
        menuItemLbl.setAttribute('for', menuItemRb.id);
        menuItemLbl.innerHTML = name;
        menuItem.appendChild(menuItemLbl);

        const subMenuItem = document.createElement('div');
        subMenuItem.id = `base-${id}-menu`;
        subMenuItem.classList.add('menu-item-group');
        subMenuItem.classList.add('sub-menu');
        menuItem.appendChild(subMenuItem);

        return menuItem;
    }
}

class MenuControl {
    constructor(InteractiveMap) {
        this.InteractiveMap = InteractiveMap;
        this.leftPanel = new MenuPanel(InteractiveMap.root, 'menu-left', 'menu-left-open-btn', 'menu-left-close-btn');
        this.rightPanel = new MenuPanel(InteractiveMap.root, 'menu-right', 'menu-right-open-btn', 'menu-right-close-btn');
        this.leftPanel.otherMenu = this.rightPanel;
        this.rightPanel.otherMenu = this.leftPanel;

        const layerToggleHandler = e => this.updateLayerAndQueryString(e.currentTarget);

        this.root.getElementById('option-draw-layer').addEventListener('change', layerToggleHandler, false);
        this.root.getElementById('option-ward-layer').addEventListener('change', layerToggleHandler, false);

        this.InteractiveMap.layerDefs.forEach((layerDef) => {
            const group = layerDef.group;
            const menu = this.root.querySelector(`#${group}-menu`);
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
                const menu = this.root.querySelector(`#base-${group.id}-menu`);
                const layerDef = { ...tileset, group: group.id };
                const menuItem = MenuPanel.createMenuPanelItem(this.InteractiveMap, layerDef, baseLayerToggleHandler, 'radio', 'base-layer');
                menu.appendChild(menuItem);
            });

            const versionOption = document.createElement('option');
            versionOption.setAttribute('value', group.id);
            versionOption.innerHTML = group.name;
            versionSelect.appendChild(versionOption);
        });
    }

    get root() {
        return this.InteractiveMap.root;
    }

    updateLayerAndQueryString(element, layerId) {
        layerId = layerId || element.getAttribute('data-layer-id');
        let layer = this.InteractiveMap.getMapLayer(layerId);
        if (layerId === 'ward-layer') {
            layer = this.InteractiveMap.controls.ward.layer;
            this.InteractiveMap.controls.vision.layer.setVisible(element.checked);
            this.InteractiveMap.wardRangeLayer.setVisible(element.checked);
            layer.setVisible(element.checked);
        }
        else if (layerId === 'draw-layer') {
            layer = this.InteractiveMap.controls.draw.layer;
            layer.setVisible(element.checked);
        }
        else if (layer) {
            layer.setVisible(element.checked);
            const param = layer.get('title').replace(/ /g, '');
            setQueryString(param, element.checked ? true : null);
            if (layerId == 'ent_dota_tree') {
                this.root.getElementById('btn-tree').setAttribute('trees-enabled', element.checked ? 'yes' : 'no');
            }
        }
    }

    toggleLayerMenuOption(layerId, state) {
        const element = this.root.querySelector(`input[data-layer-id="${layerId}"]`);
        if (state != null) element.checked = state;
        this.updateLayerAndQueryString(element, layerId);
    }

    // updates element visibility based on map layer index
    // updates layer visibility based on element state
    updateOverlayMenu() {
        forEach(this.root.querySelectorAll('.data-layer > input'), (element) => {
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
        }, this);
    }

    changeMode(mode) {
        const interactiveMap = this.InteractiveMap;
        switch (mode) {
        case 'observer':
        case 'sentry':
            this.root.querySelector(`input[name="ward-type"][value="${mode}"]`).checked = true;
        case 'ward':
            this.root.querySelector('input[name="mode"][value="ward"]').checked = true;
            interactiveMap.mode = this.root.querySelector('input[name="ward-type"]:checked').value;
            this.root.getElementById('btn-ward').setAttribute('ward-type', interactiveMap.mode);
            this.root.getElementById('btn-ward').classList.add('active');
            this.root.getElementById('btn-tree').classList.remove('active');
            this.root.getElementById('btn-measure').classList.remove('active');
            this.root.getElementById('menu-left').classList.remove('draw');
            setQueryString('mode', interactiveMap.mode);
            interactiveMap.controls.measure.deactivate();
            interactiveMap.controls.draw.deactivate();
            interactiveMap.controls.ward.activate();
            interactiveMap.controls.info.deactivate();
            break;
        case 'line':
        case 'circle':
            this.root.querySelector(`input[name="measure-type"][value="${mode}"]`).checked = true;
        case 'measure':
            this.root.querySelector('input[name="mode"][value="measure"]').checked = true;
            interactiveMap.mode = this.root.querySelector('input[name="measure-type"]:checked').value;
            this.root.getElementById('btn-ward').classList.remove('active');
            this.root.getElementById('btn-tree').classList.remove('active');
            this.root.getElementById('btn-measure').classList.add('active');
            this.root.getElementById('btn-measure').setAttribute('measure-type', interactiveMap.mode);
            this.root.getElementById('menu-left').classList.remove('draw');
            setQueryString('mode', interactiveMap.mode);
            interactiveMap.controls.measure.change(interactiveMap.mode);
            interactiveMap.controls.draw.deactivate();
            interactiveMap.controls.ward.deactivate();
            interactiveMap.controls.info.deactivate();
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
            this.root.querySelector('input[name="mode"][value="draw"]').checked = true;
            interactiveMap.mode = this.root.querySelector('input[name="draw-type"]:checked').value;
            this.root.getElementById('btn-ward').classList.remove('active');
            this.root.getElementById('btn-tree').classList.remove('active');
            this.root.getElementById('btn-measure').classList.remove('active');
            this.root.getElementById('menu-left').classList.add('draw');
            setQueryString('mode', interactiveMap.mode);
            interactiveMap.controls.draw.change(interactiveMap.mode);
            interactiveMap.controls.measure.deactivate();
            interactiveMap.controls.ward.deactivate();
            interactiveMap.controls.info.deactivate();
            this.root.getElementById('draw-options').classList.remove('brush');
            this.root.getElementById('draw-options').classList.remove('marker');
            this.root.getElementById('draw-options').classList.remove('point');
            this.root.getElementById('draw-options').classList.remove('linestring');
            this.root.getElementById('draw-options').classList.remove('polygon');
            this.root.getElementById('draw-options').classList.remove('shape');
            this.root.getElementById('draw-options').classList.add(interactiveMap.mode);
            break;
        default:
            this.root.querySelector('input[name="mode"][value="navigate"]').checked = true;
            interactiveMap.mode = mode || 'navigate';
            this.root.getElementById('btn-ward').classList.remove('active');
            this.root.getElementById('btn-tree').classList.add('active');
            this.root.getElementById('btn-measure').classList.remove('active');
            this.root.getElementById('menu-left').classList.remove('draw');
            setQueryString('mode', interactiveMap.mode == 'navigate' ? null : interactiveMap.mode);
            interactiveMap.controls.measure.deactivate();
            interactiveMap.controls.draw.deactivate();
            interactiveMap.controls.ward.deactivate();
            interactiveMap.controls.info.activate();
            break;
        }
        interactiveMap.controls.notification.show(modeNotificationText[interactiveMap.mode]);
    }
}

export default MenuControl;
