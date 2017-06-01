import SourceVector from 'ol/source/vector';
import LayerVector from 'ol/layer/vector';
import GeoJSON from 'ol/format/geojson';
import proj from 'ol/proj';
import Polygon from 'ol/geom/polygon';
import Point from 'ol/geom/point';
import Feature from 'ol/feature';
import LayerGroup from 'ol/layer/group';
import Collection from 'ol/collection';
import { dotaProj, pixelProj } from './projections';

function loadGeoJSON(map, layerDef, data, version) {
    var layer;
    try {
        var source = new SourceVector({
            url: 'data/' + version + '/' + layerDef.filename,
            format: new GeoJSON({defaultDataProjection: layerDef.projection || pixelProj})
        });
        layer = new LayerVector({
            title: layerDef.name,
            projection: layerDef.projection || pixelProj,
            source: source,
            visible: !!layerDef.visible,
            style: layerDef.style
        });
    }
    catch (e) {
    
    }
    return layer;
}

function loadPolygon(map, layerDef, data, layer) {
    var features = [];
    features = data.data[layerDef.id].map(function (obj) {
        var points = obj.points;
        var ring = points.map(function (point) {
            return proj.transform([point.x, point.y], dotaProj, pixelProj)
        });
        ring.push(proj.transform([points[0].x, points[0].y], dotaProj, pixelProj))
        var geom = new Polygon([ring]);
        var feature = new Feature(geom);
        obj.id = layerDef.id;
        feature.set('dotaProps', obj, true);
        return feature;
    });
    
    var vectorSource = new SourceVector({
        defaultDataProjection : 'dota',
        features: features
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new LayerVector({
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
            var geom = new Polygon([[
                proj.transform([point.x-bounds[0], point.y-bounds[1]], dotaProj, pixelProj),
                proj.transform([point.x-bounds[0], point.y+bounds[1]], dotaProj, pixelProj),
                proj.transform([point.x+bounds[0], point.y+bounds[1]], dotaProj, pixelProj),
                proj.transform([point.x+bounds[0], point.y-bounds[1]], dotaProj, pixelProj),
                proj.transform([point.x-bounds[0], point.y-bounds[1]], dotaProj, pixelProj)
            ]]);
        }
        else {
            var geom = new Point(proj.transform([point.x, point.y], dotaProj, pixelProj));
        }

        var feature = new Feature(geom);
        
        point.id = layerDef.id;
        point.unitClass = unitClass;
        feature.set('dotaProps', point, true);
        
        return feature;
    });
    
    var vectorSource = new SourceVector({
        defaultDataProjection : 'dota',
        features: features
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new LayerVector({
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
        var geom = new Polygon([pullMaxCoords]);
        geom.appendLinearRing(new ol.geom.LinearRing(pullMinCoords));
        feature.set("pull_range_min", geom, true);
        var circle = new Feature({geometry: geom, visible: false});
        circle.visible(false);
        return circle;
    }));*/
    
    var vectorSource = new SourceVector({
        defaultDataProjection : 'pixel',
        features: []
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new LayerVector({
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
        if (!data.data[layerDef.id] && ((layerDef.type !== 'pullRange' && layerDef.type !== 'GeoJSON') || version == '688')) continue;
        var layer;
        switch (layerDef.type) {
            case 'GeoJSON':
                layer = loadGeoJSON(InteractiveMap.map, layerDef, layersIndex[layerDef.id], version);
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
        if (layer) {
            layersIndex[layerDef.id] = layer;
            layers.push(layer);
        }
    }
    var layerGroup = new LayerGroup({
        title: 'Layers',
        layers: new Collection(layers)
    });
    
    return layerGroup;
}

export {
    loadGeoJSON,
    loadJSON,
    loadLayerGroupFromData,
};