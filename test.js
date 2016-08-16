//http://stackoverflow.com/questions/35928163/openlayers-3-static-tiles-and-xyz-coordinates

function getJSON(path, callback) {
    var request = new XMLHttpRequest();

    request.open('GET', path, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            callback(data);
        } else {
            alert('Error loading page.');
        }
    };
    request.onerror = function() {
        alert('Error loading page.');
    };
    request.send();
    return request;
}
var map_data;
var map_data_path = "data.json";
var map_tile_path = "http://devilesk.com/media/images/map/687/";
var layerNames = {
    npc_dota_roshan_spawner: "Roshan",
    dota_item_rune_spawner: "Runes",
    ent_dota_tree: "Trees",
    npc_dota_fort: "Ancients",
    ent_dota_shop: "Shops",
    npc_dota_tower: "Towers",
    npc_dota_barracks: "Barracks",
    npc_dota_building: "Buildings",
    trigger_multiple: "Neutral Camps Spawn Boxes",
    npc_dota_neutral_spawner: "Neutral Camps",
    trigger_no_wards: "Invalid Ward Locations",
    ent_fow_blocker_node: "Vision Blocker"
};
var map_w = 16384;
var map_h = 16384;
var imgCenter = [map_w / 2, map_h / 2];
var map_x_boundaries = [-8475.58617377, 9327.49124559];
var map_y_boundaries = [9028.52473332, -8836.61406266];

var pixelProj = new ol.proj.Projection({
    code: 'pixel',
    units: 'pixels',
    extent: [0, 0, map_w, map_h]
});

var resolutions = [
    16384 / 1024,
    16384 / 1024 / 2,
    16384 / 1024 / 4,
    16384 / 1024 / 8,
    16384 / 1024 / 16
];

var baseLayers = [
    new ol.layer.Tile({
        title: 'Immortal Gardens',
        type: 'base',
        extent: pixelProj.getExtent(),
        source: new ol.source.TileImage({
            tileGrid: new ol.tilegrid.TileGrid({
                origin: [0, map_h],
                resolutions: resolutions
            }),
            projection: pixelProj,
            url: map_tile_path + 'immortalgardens/{z}/tile_{x}_{y}.jpg'
        })
    }),
    new ol.layer.Tile({
        title: 'Desert',
        type: 'base',
        extent: pixelProj.getExtent(),
        source: new ol.source.TileImage({
            tileGrid: new ol.tilegrid.TileGrid({
                origin: [0, map_h],
                resolutions: resolutions
            }),
            projection: pixelProj,
            url: map_tile_path + 'desert/{z}/tile_{x}_{y}.jpg'
        })
    }),
    new ol.layer.Tile({
        title: 'Default',
        type: 'base',
        extent: pixelProj.getExtent(),
        source: new ol.source.TileImage({
            tileGrid: new ol.tilegrid.TileGrid({
                origin: [0, map_h],
                resolutions: resolutions
            }),
            projection: pixelProj,
            url: map_tile_path + 'default/{z}/tile_{x}_{y}.jpg'
        })
    })
]

var overlayGroup = new ol.layer.Group({
    title: 'Overlays',
    layers: [
    ]
});

var map = new ol.Map({
    controls: ol.control.defaults({ attribution: false }),
    target: 'map',
    layers: [
        new ol.layer.Group({
            'title': 'Map Skins',
            layers: baseLayers
        }),
        overlayGroup
    ],
    view: new ol.View({
        zoom: 0,
        center: imgCenter,
        projection: pixelProj,
        resolutions: resolutions
    })
});

// Create a LayerSwitcher instance and add it to the map
var layerSwitcher = new ol.control.LayerSwitcher();
map.addControl(layerSwitcher);

function lerp(minVal, maxVal, pos_r) {
    return pos_r * (maxVal - minVal) + minVal;
}

function reverseLerp(minVal, maxVal, pos) {
    return (pos - minVal) / (maxVal - minVal);
}

function latLonToWorld(x, y) {
    var x_r = lerp(map_x_boundaries[0], map_x_boundaries[1], x / map_w),
        y_r = lerp(map_y_boundaries[0], map_y_boundaries[1], (map_h - y) / map_h);

    return [x_r, y_r];
}

function worldToLatLon(x_r, y_r) {
    var x = reverseLerp(map_x_boundaries[0], map_x_boundaries[1], x_r) * map_w,
        y = map_h - reverseLerp(map_y_boundaries[0], map_y_boundaries[1], y_r) * map_h;

    return [x, y];
}

function onMapDataLoad(data) {
    map_data = data;
    ["trigger_multiple","ent_dota_tree","dota_item_rune_spawner","ent_dota_shop","npc_dota_barracks","npc_dota_building","npc_dota_fort","npc_dota_tower"].forEach(function (k) {
        console.log(k);
        var features = [];
        if (k != "trigger_multiple") {
            features = data[k].map(function (point) {
                var geom = new ol.geom.Point(worldToLatLon(point.x, point.y));
                var feature = new ol.Feature(geom);
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.Icon(({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'http://dev.devilesk.com/dota2/apps/interactivemap3b/OpenLayers/dark/marker.png'
                    }))
                }));
                return feature;
            });
        }
        else {
            features = data[k].map(function (arr) {
                var vertices = arr.map(function (point) {
                    return worldToLatLon(point.x, point.y);
                });
                var geom = new ol.geom.Polygon([vertices]);
                
                var feature = new ol.Feature(geom);
                feature.setStyle(new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(0,255,0,0.4)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#00FF00',
                        width: 2
                    })
                }));
                return feature;
            });
        }
        
        var vectorSource = new ol.source.Vector({
            features: features
        });
        var layer = new ol.layer.Vector({
            title: layerNames[k],
            source: vectorSource,
            visible: false
        });
        overlayGroup.getLayers().push(layer);
    });
}

getJSON(map_data_path, onMapDataLoad);