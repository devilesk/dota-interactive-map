var QueryString = require('./../util/queryString');

function TreeControl(InteractiveMap) {
    this.InteractiveMap = InteractiveMap;
    this.allTreesCutState = false;
}

TreeControl.prototype.updateQueryString = function () {
    var self = this;
    var keys = ['cut_trees', 'uncut_trees'];
    var layer = this.InteractiveMap.getMapLayerIndex()['ent_dota_tree'];
    var source = layer.getSource();
    var features = source.getFeatures();
    var values = features.filter(function (feature) {
        return !!feature.get('isCut') != self.allTreesCutState;
    }).map(function (feature) {
        var dotaProps = feature.get('dotaProps');
        return dotaProps.x + ',' + dotaProps.y;
    }).join(';');
    QueryString.setQueryString(keys[this.allTreesCutState ? 1 : 0], values || null);
    QueryString.setQueryString(keys[this.allTreesCutState ? 0 : 1], null);
    document.getElementById('toggle-ent_dota_tree').checked = this.allTreesCutState;
}

TreeControl.prototype.parseQueryString = function () {
    var self = this;
    var layer = this.InteractiveMap.getMapLayerIndex()['ent_dota_tree'];
    var source = layer.getSource();
    var features = source.getFeatures();
    var treeMap = {};
    features.forEach(function (feature) {
        var dotaProps = feature.get('dotaProps');
        var worldXY = dotaProps.x + ',' + dotaProps.y;
        treeMap[worldXY] = feature;
    });
    ['uncut_trees', 'cut_trees'].forEach(function (treeCutState, index) {
        var values = QueryString.getParameterByName(treeCutState);
        if (values) {
            self.toggleAllTrees(!index, true);
            values = values.split(';');
            values.forEach(function (worldXY) {
                var feature = treeMap[worldXY];
                if (feature) {
                    if (!!feature.get('isCut') == !index) {
                        self.toggleTree(feature, feature.get('dotaProps'), true)
                    }
                }
            });
        }
    });
    this.updateQueryString();
}

TreeControl.prototype.toggleTree = function (feature, dotaProps, bSkipQueryStringUpdate) {
    var gridXY = this.InteractiveMap.vs.WorldXYtoGridXY(dotaProps.x, dotaProps.y);
    this.InteractiveMap.vs.toggleTree(gridXY.x, gridXY.y);
    feature.set('isCut', !feature.get('isCut'));
    if (!bSkipQueryStringUpdate) this.updateQueryString();
}

TreeControl.prototype.toggleAllTrees = function (state, bSkipQueryStringUpdate) {
    var self = this;
    this.allTreesCutState = state;
    var layer = this.InteractiveMap.getMapLayerIndex()['ent_dota_tree'];
    var source = layer.getSource();
    var features = source.getFeatures();
    features.forEach(function (feature) {
        if (!!feature.get('isCut') != state) {
            self.toggleTree(feature, feature.get('dotaProps'), true);
        }
    });
    if (!bSkipQueryStringUpdate) this.updateQueryString();
}

module.exports = TreeControl;