var ol = require('openlayers');
var styles = require('./styleDefinitions');

function CursorControl(InteractiveMap) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.source = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    this.layer =  new ol.layer.Vector({
        source: this.source,
        style: styles.cursor
    });
    this.layerFilter = function(layer) {
        return layer === self.layer;
    }
}


module.exports = CursorControl;