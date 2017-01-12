var proj = require('./projections');

function loadGeoJSON(map, layerDef) {
    var source = new ol.source.Vector({
        url: 'data/700/' + layerDef.filename,
        format: new ol.format.GeoJSON({defaultDataProjection: layerDef.projection || proj.pixel})
    });
    var layer = new ol.layer.Vector({
        title: layerDef.name,
        projection: layerDef.projection || proj.pixel,
        source: source,
        visible: !!layerDef.visible,
        style: layerDef.style
    });

    return layer;
}

function loadPolygon(map, layerDef, data, layer) {
    var features = [];
    features = data.data[layerDef.id].map(function (obj) {
        var points = obj.points;
        var ring = points.map(function (point) {
            return ol.proj.transform([point.x, point.y], proj.dota, proj.pixel)
        });
        ring.push(ol.proj.transform([points[0].x, points[0].y], proj.dota, proj.pixel))
        var geom = new ol.geom.Polygon([ring]);
        var feature = new ol.Feature(geom);
        obj.id = layerDef.id;
        feature.set('dotaProps', obj, true);
        return feature;
    });
    
    var vectorSource = new ol.source.Vector({
        defaultDataProjection : 'dota',
        features: features
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new ol.layer.Vector({
            title: layerDef.name,
            source: vectorSource,
            visible: !!layerDef.visible,
            style: layerDef.style
        });
        layer.set('layerId', layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        layer.set('showInfo', false, true);
    }

    return layer;
}

function loadJSON(map, layerDef, data, layer) {
    var features = [];
    features = data.data[layerDef.id].map(function (point) {
        var unitClass = point.subType ? layerDef.id + '_' + point.subType : layerDef.id;
        var stats = data.stats[unitClass];
        var bounds = layerDef.id == "ent_dota_tree" ? [64, 64] : stats.bounds;
        if (bounds && bounds[0] > 0 && bounds[1] > 0) {
            var geom = new ol.geom.Polygon([[
                ol.proj.transform([point.x-bounds[0], point.y-bounds[1]], proj.dota, proj.pixel),
                ol.proj.transform([point.x-bounds[0], point.y+bounds[1]], proj.dota, proj.pixel),
                ol.proj.transform([point.x+bounds[0], point.y+bounds[1]], proj.dota, proj.pixel),
                ol.proj.transform([point.x+bounds[0], point.y-bounds[1]], proj.dota, proj.pixel),
                ol.proj.transform([point.x-bounds[0], point.y-bounds[1]], proj.dota, proj.pixel)
            ]]);
        }
        else {
            var geom = new ol.geom.Point(ol.proj.transform([point.x, point.y], proj.dota, proj.pixel));
        }

        var feature = new ol.Feature(geom);
        
        point.id = layerDef.id;
        point.unitClass = unitClass;
        feature.set('dotaProps', point, true);
        
        return feature;
    });
    
    var vectorSource = new ol.source.Vector({
        defaultDataProjection : 'dota',
        features: features
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new ol.layer.Vector({
            title: layerDef.name,
            source: vectorSource,
            visible: !!layerDef.visible,
            style: layerDef.style
        });
        layer.set('layerId', layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        layer.set('showInfo', false, true);
    }

    return layer;
}

function loadNeutralPullRange(InteractiveMap, layerDef, data, layer) {
    /*var features = InteractiveMap.getMapLayerIndex().npc_dota_neutral_spawner.getSource().getFeatures();
    var circles = features.map(function (feature) {
        var circle = InteractiveMap.getRangeCircle(feature, null, null, null, 400);
        feature.set("guard_range", circle, true);
        return circle;
    });
    circles = circles.concat(features.map(function (feature) {
        var dotaProps = feature.get("dotaProps");
        var center = worldToLatLon([dotaProps.x, dotaProps.y]);
        var pullMaxCoords = createCirclePointCoords(center[0], center[1], 400 + pullRangeTiming[dotaProps.pullType] * 350, 360);
        var pullMinCoords = createCirclePointCoords(center[0], center[1], 400 + pullRangeTiming[dotaProps.pullType] * 270, 360);
        var geom = new ol.geom.Polygon([pullMaxCoords]);
        geom.appendLinearRing(new ol.geom.LinearRing(pullMinCoords));
        feature.set("pull_range_min", geom, true);
        var circle = new ol.Feature({geometry: geom, visible: false});
        circle.visible(false);
        return circle;
    }));*/
    
    var vectorSource = new ol.source.Vector({
        defaultDataProjection : 'pixel',
        features: []
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new ol.layer.Vector({
            title: layerDef.name,
            source: vectorSource,
            visible: !!layerDef.visible,
            style: layerDef.style
        });
        layer.set('layerId', layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        layer.set('showInfo', false, true);
    }

    return layer;
}

function loadLayerGroupFromData(InteractiveMap, data, version, layersIndex, layerDefs) {
    var layers = [];
    for (var i = 0; i < layerDefs.length; i++) {
        var layerDef = layerDefs[i];
        if (!data.data[layerDef.id] && ((layerDef.type !== 'pullRange' && layerDef.type !== 'GeoJSON') || version == '687')) continue;
        var layer;
        switch (layerDef.type) {
            case 'GeoJSON':
                layer = loadGeoJSON(InteractiveMap.map, layerDef, layersIndex[layerDef.id]);
            break;
            case 'polygon':
                layer = loadPolygon(InteractiveMap.map, layerDef, data, layersIndex[layerDef.id]);
            break;
            case 'pullRange':
                layer = loadNeutralPullRange(InteractiveMap, layerDef, data, layersIndex[layerDef.id]);
            break;
            default:
                layer = loadJSON(InteractiveMap.map, layerDef, data, layersIndex[layerDef.id]);
            break;
        }
        layersIndex[layerDef.id] = layer;
        layers.push(layer);
    }
    var layerGroup = new ol.layer.Group({
        title: 'Layers',
        layers: new ol.Collection(layers)
    });
    
    return layerGroup;
}

module.exports = {
    loadGeoJSON: loadGeoJSON,
    loadJSON: loadJSON,
    loadLayerGroupFromData: loadLayerGroupFromData,
};