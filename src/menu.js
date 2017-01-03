function Menu(panelId, openId, closeId, fullscreen) {
    this.panelId = panelId;
    this.openId = openId;
    this.closeId = closeId;
    this.fullscreen = fullscreen;
    this.initialize();
}
Menu.prototype.initialize = function () {
    this.panel = document.getElementById(this.panelId);
    this.openBtn = document.getElementById(this.openId);
    this.closeBtn = document.getElementById(this.closeId);
    
    this.openBtn.addEventListener("click", this.open.bind(this));
    this.closeBtn.addEventListener("click", this.close.bind(this));
}
Menu.prototype.open = function () {
    this.panel.classList.add('expand-horizontal');
    this.openBtn.classList.add('collapsed-horizontal');
    this.openBtn.classList.remove('expand-horizontal');
    //document.getElementById(this.panelId).style.width = this.fullscreen ? "100%" : "250px";
}
Menu.prototype.close = function () {
    this.panel.classList.remove('expand-horizontal');
    this.openBtn.classList.remove('collapsed-horizontal');
    this.openBtn.classList.add('expand-horizontal');
    //document.getElementById(this.panelId).style.width = "0"
}
Menu.prototype.createMenuItem = function (layerDef, handler, inputType, inputName) {
    var optionId = layerDef.id;
    
    var menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.classList.add(inputName || 'data-layer');
        
    var menuItemCb = document.createElement('input');
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
    
    var menuItemLbl = document.createElement('label');
        menuItemLbl.classList.add('checkbox');
        menuItemLbl.setAttribute("for", menuItemCb.id);
        menuItemLbl.innerHTML = layerDef.name;
    menuItem.appendChild(menuItemLbl);
    return menuItem;
}

module.exports = Menu;