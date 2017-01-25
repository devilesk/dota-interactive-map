var ol = require('openlayers');
var proj = require('../projections');

function CoordinateControl(InteractiveMap, elementId) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.mousePosition = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(),
        projection: proj.dota,
        target: document.getElementById(elementId),
        undefinedHTML: '&nbsp;'
    });
    this.InteractiveMap.map.addControl(this.mousePosition);
}

module.exports = CoordinateControl;