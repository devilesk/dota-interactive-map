(function () {
    var SENTRY_VISION_RADIUS = 850,
        OBSERVER_VISION_RADIUS = 1600,
        TOWER_DAY_VISION_RADIUS = 1800,
        TOWER_NIGHT_VISION_RADIUS = 800,
        TOWER_TRUE_SIGHT_RADIUS = 900,
        TOWER_ATTACK_RANGE_RADIUS = 700,
        map_data_path = "data.json",
        map_tile_path = "tiles/",
        ward_icon_path = "ward_observer.png",
        sentry_icon_path = "ward_sentry.png",
        map_w = 5120,
        map_h = 5120,
        map_x_boundaries = [-8200, 8200],
        map_y_boundaries = [7558, -8842],
        map = new OpenLayers.Map("map", {
            maxExtent: new OpenLayers.Bounds(0, 0, 5120, 5120),
            numZoomLevels: 3,
            maxResolution: 4,
            units: "m",
            projection: "EPSG:900913",
            displayProjection: new OpenLayers.Projection("EPSG:900913")
        }),
        layerNames = {
            npc_dota_roshan_spawner: "Roshan",
            dota_item_rune_spawner: "Runes",
            ent_dota_tree: "Trees",
            npc_dota_fort: "Ancients",
            ent_dota_shop: "Shops",
            npc_dota_tower: "Towers",
            npc_dota_barracks: "Barracks",
            npc_dota_building: "Buildings",
            trigger_multiple: "Neutral Camps Spawn Boxes",
            npc_dota_neutral_spawner: "Neutral Camps"
        },
        wms = new OpenLayers.Layer.TMS("Dota 2 Map", map_tile_path, {
            type: "png",
            getURL: getMyURL
        }),
        layerSwitcher = new OpenLayers.Control.LayerSwitcher({
            ascending: false
        }),
        dayRangeLayer = new OpenLayers.Layer.Vector("Day Vision Range"),
        nightRangeLayer = new OpenLayers.Layer.Vector("Night Vision Range"),
        trueSightRangeLayer = new OpenLayers.Layer.Vector("True Sight Range"),
        attackRangeLayer = new OpenLayers.Layer.Vector("Attack Range"),
        polygonLayer = new OpenLayers.Layer.Vector("Drawn Circles"),
        wardVisionLayer = new OpenLayers.Layer.Vector("Ward Vision"),
        iconLayer = new OpenLayers.Layer.Markers("Placed Wards"),
        renderer = OpenLayers.Util.getParameters(window.location.href).renderer,
        drawControls,
        lastDistance,
        style = {
            lightblue: {
                strokeColor: "#007FFF",
                strokeOpacity: 1,
                strokeWidth: 1,
                fillColor: "#007FFF",
                fillOpacity: .4
            },
            red: {
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWidth: 1,
                fillColor: "#FF0000",
                fillOpacity: .4
            },
            green: {
                strokeColor: "#00FF00",
                strokeOpacity: 1,
                strokeWidth: 1,
                fillColor: "#00FF00",
                fillOpacity: .4
            },
            yellow: {
                strokeColor: "#FFFF00",
                strokeOpacity: 1,
                strokeWidth: 1,
                fillColor: "#FFFF00",
                fillOpacity: .4
            }
        };

    function getJSON(path, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                callback(data);
            }
            else {
                alert('Error loading page.');
            }
        };
        request.onerror = function () {
            alert('Error loading page.');
        };
        request.send();
        return request;
    }

    function lerp(minVal, maxVal, pos_r) {
        return pos_r * (maxVal - minVal) + minVal;
    }

    function reverseLerp(minVal, maxVal, pos) {
        return (pos - minVal) / (maxVal - minVal);
    }

    function latLonToWorld(x, y) {
        var x_r = lerp(map_x_boundaries[0], map_x_boundaries[1], x / map_w),
            y_r = lerp(map_y_boundaries[0], map_y_boundaries[1], (5120 - y) / map_h);
        return {x: x_r, y: y_r};
    }

    function addMarker(markers, ll) {
        var feature = new OpenLayers.Feature(markers, ll),
            marker;
        marker = feature.createMarker();
        markers.addMarker(marker);
        return marker;
    }

    function getScaledRadius(r) {
        return r / (map_x_boundaries[1] - map_x_boundaries[0]) * map_w
    };

    function getMyURL(bounds) {
        var res = this.map.getResolution(),
            x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)),
            y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h)),
            z = map.getZoom(),
            path = z + "/tile_" + x + "_" + y + "." + this.type,
            url = this.url;
        if (url instanceof Array) {
            url = this.selectUrl(path, url)
        }
        return url + path
    }

    function onMapDataLoad(data) {
        var markers = {},
            marker,
            box_points = [], box_rect, box_feature;

        for (var k in data) {
            // Create markers for non-neutral spawn box and non-tree layers
            if (k != "trigger_multiple" && k != "ent_dota_tree") {
                markers[k] = new OpenLayers.Layer.Markers(layerNames[k]);
                map.addLayer(markers[k]);
                markers[k].setVisibility(false);
                for (var i = 0; i < data[k].length; i++) {
                    marker = addMarker(markers[k], new OpenLayers.LonLat(data[k][i][0], 5120 - data[k][i][1]));
                }
            }
            // Set up tree layer without creating tree markers yet
            else if (k == "ent_dota_tree") {
                markers[k] = new OpenLayers.Layer.Markers(layerNames[k]);
                map.addLayer(markers[k]);
                markers[k].setVisibility(false);
                markers[k].data = data[k];
            }
            // Create neutral spawn markers and rectangles
            else if (k == "trigger_multiple") {
                markers["npc_dota_neutral_spawner_box"] = new OpenLayers.Layer.Vector(layerNames[k]);
                map.addLayer(markers["npc_dota_neutral_spawner_box"]);
                markers["npc_dota_neutral_spawner_box"].setVisibility(false);
                for (var i = 0; i < data[k].length; i++) {
                    box_points = [];
                    for (var j = 0; j < data[k][i].length; j++) {
                        box_points.push(new OpenLayers.Geometry.Point(data[k][i][j][0], 5120 - data[k][i][j][1]));
                    }
                    box_rect = new OpenLayers.Geometry.LinearRing(box_points);
                    box_feature = new OpenLayers.Feature.Vector(box_rect, null, style.green);
                    markers["npc_dota_neutral_spawner_box"].addFeatures([box_feature]);
                }
            }
        }
        
        // Create tree markers the first time the tree layer is switched to
        map.events.register("changelayer", null, function (event) {
            if (event.property === "visibility" && event.layer.name == layerNames["ent_dota_tree"] && !event.layer.loaded) {
                for (var i = 0; i < event.layer.data.length; i++) {
                    marker = addMarker(event.layer, new OpenLayers.LonLat(event.layer.data[i][0], 5120 - event.layer.data[i][1]), OpenLayers.Popup.FramedCloud, "Tower", false);
                }
                event.layer.loaded = !event.layer.loaded;
            }
        })
    }

    // Start setting up the map, adding controls and layers
    map.addLayer(wms);
    map.zoomToMaxExtent();
    map.addControl(layerSwitcher);
    layerSwitcher.maximizeControl();

    // X/Y coordinate update display handler
    map.events.register("mousemove", map, function (e) {
        var position = this.events.getMousePosition(e),
            lonlat = map.getLonLatFromPixel(e.xy),
            xy = latLonToWorld(lonlat.lon, lonlat.lat);
        position.x = xy.x.toFixed(0);
        position.y = xy.y.toFixed(0);
        OpenLayers.Util.getElement("coords").innerHTML = position;
    });

    // Get map data
    getJSON(map_data_path, onMapDataLoad);
}());