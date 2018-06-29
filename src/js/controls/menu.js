import { setQueryString } from '../util/queryString';

class MenuPanel {
    constructor(panelId, openId, closeId, fullscreen) {
        this.panelId = panelId;
        this.openId = openId;
        this.closeId = closeId;
        this.fullscreen = fullscreen;

        this.panel = document.getElementById(this.panelId);
        
        this.openBtn = document.getElementById(this.openId);
        this.openBtn.addEventListener("click", this.open.bind(this), false);
        
        this.closeBtn = document.getElementById(this.closeId);
        this.closeBtn.addEventListener("click", this.close.bind(this), false);
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
            toggleCb.setAttribute("type", "checkbox");
            toggleCb.id = 'toggle-' + layerDef.id;
            toggleCb.addEventListener("change", handler, false);
        toggle.appendChild(toggleCb);

        const toggleLbl = document.createElement('label');
            toggleLbl.setAttribute("for", toggleCb.id);
        toggle.appendChild(toggleLbl);
        
        return toggle;
    }

    static createMenuPanelItem(InteractiveMap, layerDef, handler, inputType, inputName) {
        let optionId = layerDef.id;
        
        const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.classList.add(inputName || 'data-layer');
            
        const menuItemCb = document.createElement('input');
            menuItemCb.setAttribute("type", inputType || "checkbox");
            if (inputType == "radio") {
                optionId = layerDef.group + '-' + layerDef.id;
                menuItemCb.setAttribute("name", inputName);
                menuItemCb.setAttribute("value", optionId);
            }
            menuItemCb.id = 'option-' + optionId;
            menuItemCb.setAttribute("data-layer-id", optionId);
            menuItemCb.addEventListener("change", handler, false);
        menuItem.appendChild(menuItemCb);
        
        const menuItemLbl = document.createElement('label');
            menuItemLbl.classList.add('checkbox');
            menuItemLbl.setAttribute("for", menuItemCb.id);
            menuItemLbl.innerHTML = layerDef.name;
        menuItem.appendChild(menuItemLbl);
        
        if (layerDef.toggle) {
            const toggle = MenuPanel.createToggle(layerDef, e => {
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
            menuItemRb.setAttribute("type", "radio");
            menuItemRb.setAttribute("name", "base-type");
            menuItemRb.setAttribute("value", id);
            menuItem.appendChild(menuItemRb);
            
        const menuItemLbl = document.createElement('label');
            menuItemLbl.classList.add('checkbox');
            menuItemLbl.setAttribute("for", menuItemRb.id);
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
    constructor(InteractiveMap, layerToggleHandler) {
        this.InteractiveMap = InteractiveMap;
        this.leftPanel = new MenuPanel("menu-left", "menu-left-open-btn", "menu-left-close-btn");
        this.rightPanel = new MenuPanel("menu-right", "menu-right-open-btn", "menu-right-close-btn");
        this.leftPanel.otherMenu = this.rightPanel;
        this.rightPanel.otherMenu = this.leftPanel;
        
        this.InteractiveMap.layerDefs.forEach(layerDef => {
            const group = layerDef.group;
            const menu = document.querySelector('#' + group + '-menu');
            const menuItem = MenuPanel.createMenuPanelItem(this.InteractiveMap, layerDef, layerToggleHandler);
            menu.appendChild(menuItem);
        });
        
        const baseLayerToggleHandler = e => {
            const layerId = e.currentTarget.getAttribute('data-layer-id');
            this.InteractiveMap.baseLayers.forEach(layer => layer.setVisible(layer.get('layerId') === layerId));
            setQueryString('BaseLayer', layerId);
        }

        const versionSelect = document.getElementById('version-select');
        const baseMenu = document.getElementById('base-menu');
        var checked = true;
        this.InteractiveMap.baseLayerDefs.forEach(group => {
            const baseLayerMenu = MenuPanel.createBaseLayerMenuItem(group.id, group.name, checked);
            baseMenu.appendChild(baseLayerMenu);
            if (checked) checked = false;
            
            group.tilesets.forEach(tileset => {
                const menu = document.querySelector('#base-' + group.id + '-menu');
                const layerDef = {...tileset, group: group.id};
                const menuItem = MenuPanel.createMenuPanelItem(this.InteractiveMap, layerDef, baseLayerToggleHandler, 'radio', 'base-layer');
                menu.appendChild(menuItem);
            });
            
            const versionOption = document.createElement('option');
            versionOption.setAttribute("value", group.id);
            versionOption.innerHTML = group.name;
            versionSelect.appendChild(versionOption);
        });
    }
}

export default MenuControl;