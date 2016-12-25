var VisionSimulation = require("dota-vision-simulation");
var worlddata = require("./worlddata.json");
function App(map_tile_path, vision_data_image_path) {
    var self = this,
        IMG_DIR = "img/",
        ENTITIES = {
            observer: {
                icon_path: IMG_DIR + "ward_observer.png",
                radius: 1600
            },
            sentry: {
                icon_path: IMG_DIR + "ward_sentry.png",
                radius: 850
            }
        },
        TOWER_DAY_VISION_RADIUS = 1900,
        TOWER_NIGHT_VISION_RADIUS = 800,
        TOWER_TRUE_SIGHT_RADIUS = 900,
        TOWER_ATTACK_RANGE_RADIUS = 700,
        map_data_path = "data",
        map_data,
        map_w = 16384,
        map_h = 16384,
        map_x_boundaries = [-8475.58617377, 9327.49124559],
        map_y_boundaries = [9028.52473332, -8836.61406266],
        zoomify = new OpenLayers.Layer.Zoomify( "Zoomify", map_tile_path, new OpenLayers.Size( map_w, map_h ) ),
        scale = Math.abs(map_x_boundaries[1] - map_x_boundaries[0])/map_w,
        map = new OpenLayers.Map("map", {
            theme: null,
            maxExtent: new OpenLayers.Bounds(0, 0, map_w, map_h),
            numZoomLevels: 5,
            maxResolution: Math.pow(2, 5-1 ),
            units: "m"
        }),
        layerKeys = ["npc_dota_roshan_spawner","trigger_multiple","ent_dota_tree","dota_item_rune_spawner","dota_item_rune_spawner_bounty","ent_dota_shop","npc_dota_barracks","npc_dota_building","npc_dota_healer","npc_dota_fort","npc_dota_tower"],
        layerNames = {
            npc_dota_roshan_spawner: "Roshan",
            dota_item_rune_spawner: "Runes",
            dota_item_rune_spawner_bounty: "Bounty Runes",
            ent_dota_tree: "Trees",
            npc_dota_healer: "Shrines",
            npc_dota_fort: "Ancients",
            ent_dota_shop: "Shops",
            npc_dota_tower: "Towers",
            npc_dota_barracks: "Barracks",
            npc_dota_building: "Buildings",
            trigger_multiple: "Neutral Camps Spawn Boxes",
            npc_dota_neutral_spawner: "Neutral Camps",
            trigger_no_wards: "Invalid Ward Locations",
            ent_fow_blocker_node: "Vision Blocker"
        },
        baseLayers = [
            new OpenLayers.Layer.TMS('7.00 Default', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('700', 'default')
            }),
            new OpenLayers.Layer.TMS('6.87 Default', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('687', 'default')
            }),
            new OpenLayers.Layer.TMS('6.87 Desert', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('687', 'desert')
            }),
            new OpenLayers.Layer.TMS('6.87 Immortal Gardens', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('687', 'immortalgardens')
            })
        ],
        layerSwitcher = new OpenLayers.Control.LayerSwitcher({
            ascending: false
        }),
        coordinateControl = new OpenLayers.Control.MousePosition(),
        dayRangeLayer = new OpenLayers.Layer.Vector("Day Vision Range"),
        nightRangeLayer = new OpenLayers.Layer.Vector("Night Vision Range"),
        trueSightRangeLayer = new OpenLayers.Layer.Vector("True Sight Range"),
        attackRangeLayer = new OpenLayers.Layer.Vector("Attack Range"),
        polygonLayer = new OpenLayers.Layer.Vector("Drawn Circles"),
        wardVisionLayer = new OpenLayers.Layer.Vector("Ward Vision"),
        visionSimulationLayer = new OpenLayers.Layer.Vector("Ward Vision with Fog"),
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
        },
        treeMarkers = {};

    /***********************************
     * QUERY STRING FUNCTIONS *
     ***********************************/

    var trim = (function() {
        "use strict";

        function escapeRegex(string) {
            return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
        }

        return function trim(str, characters, flags) {
            flags = flags || "g";
            if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
                throw new TypeError("argument must be string");
            }

            if (!/^[gi]*$/.test(flags)) {
                throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
            }

            characters = escapeRegex(characters);

            return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
        };
    }());

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function setQueryString(key, value) {
        history.replaceState(null, "", updateQueryString(key, value));
    }

    function addQueryStringValue(key, value) {
        console.log('addQueryStringValue', key, value);
        var qs = getParameterByName(key);
        qs = trim(trim(qs, ' ;') + ';' + value, ' ;');
        history.replaceState(null, "", updateQueryString(key, qs));
    }

    function removeQueryStringValue(key, value) {
        console.log('removeQueryStringValue', key, value);
        var qs = getParameterByName(key);
        qs = trim(trim(qs, ' ;').replace(value, '').replace(/;;/g, ''), ' ;');
        history.replaceState(null, "", updateQueryString(key, qs != '' ? qs : null));
    }

    function updateQueryString(key, value, url) {
        if (!url) url = window.location.href;
        var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
            hash;

        if (re.test(url)) {
            if (typeof value !== 'undefined' && value !== null)
                return url.replace(re, '$1' + key + "=" + value + '$2$3');
            else {
                hash = url.split('#');
                url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
                if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                    url += '#' + hash[1];
                return url;
            }
        } else {
            if (typeof value !== 'undefined' && value !== null) {
                var separator = url.indexOf('?') !== -1 ? '&' : '?';
                hash = url.split('#');
                url = hash[0] + separator + key + '=' + value;
                if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                    url += '#' + hash[1];
                return url;
            } else {
                return url;
            }
        }
    }

    /***********************************
     * COORDINATE CONVERSION FUNCTIONS *
     ***********************************/

    function getTileRadius(r) {
        return parseInt(Math.floor(r / 64));
    }

    function lerp(minVal, maxVal, pos_r) {
        return pos_r * (maxVal - minVal) + minVal;
    }

    function reverseLerp(minVal, maxVal, pos) {
        return (pos - minVal) / (maxVal - minVal);
    }

    function latLonToWorld(x, y) {
        var x_r = lerp(map_x_boundaries[0], map_x_boundaries[1], x / map_w),
            y_r = lerp(map_y_boundaries[0], map_y_boundaries[1], (map_h - y) / map_h);

        return {
            x: x_r,
            y: y_r
        };
    }

    function worldToLatLon(x_r, y_r) {
        var x = reverseLerp(map_x_boundaries[0], map_x_boundaries[1], x_r) * map_w,
            y = map_h - reverseLerp(map_y_boundaries[0], map_y_boundaries[1], y_r) * map_h;

        return {
            x: x,
            y: y
        };
    }

    function getScaledRadius(r) {
        return r / (map_x_boundaries[1] - map_x_boundaries[0]) * map_w
    }

    function calculateDistance(order, units, measure) {
        if (order == 1) {
            if (units == "km") {
                return measure * scale * 1000;
            } else {
                return measure * scale;
            }
        } else {
            return measure * scale;
        }
    }

    /********************
     * CONTROL HANDLERS *
     ********************/

    function handleTreeMarkerClick(event) {
        var worldXY = latLonToWorld(event.object.lonlat.lon, event.object.lonlat.lat),
            gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);

        event.object.treeVisible = !event.object.treeVisible
        event.object.setOpacity(event.object.treeVisible ? 1 : .4);
        vs.toggleTree(gridXY.x, gridXY.y);

        if (event.object.treeVisible) {
            removeQueryStringValue('cut_trees', event.object.tree_loc);
        } else {
            addQueryStringValue('cut_trees', event.object.tree_loc);
        }
    }

    function handleTowerMarkerClick(e, skipQueryStringUpdate) {
        console.log('handleTowerMarkerClick');
        var circle,
            feature,
            center;

        if (!e.object.showInfo) {
            center = new OpenLayers.Geometry.Point(e.object.lonlat.lon, e.object.lonlat.lat);

            // day vision circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.day_vision_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle);
            dayRangeLayer.addFeatures(feature);
            e.object.day_vision_feature = feature;

            // true sight circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.true_sight_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle, null, style.lightblue);
            trueSightRangeLayer.addFeatures(feature);
            e.object.true_sight_feature = feature;

            // night vision circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.night_vision_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle);
            nightRangeLayer.addFeatures(feature);
            e.object.night_vision_feature = feature;

            // attack range circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.attack_range_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle, null, style.red);
            attackRangeLayer.addFeatures(feature);
            e.object.attack_range_feature = feature;

            if (!skipQueryStringUpdate) addQueryStringValue("tower_vision", e.object.tower_loc.x + ',' + e.object.tower_loc.y);

            var lonlat = worldToLatLon(e.object.tower_loc.x, e.object.tower_loc.y);
        }
        else {
            dayRangeLayer.removeFeatures(e.object.day_vision_feature);
            nightRangeLayer.removeFeatures(e.object.night_vision_feature);
            trueSightRangeLayer.removeFeatures(e.object.true_sight_feature);
            attackRangeLayer.removeFeatures(e.object.attack_range_feature);

            if (!skipQueryStringUpdate) removeQueryStringValue("tower_vision", e.object.tower_loc.x + ',' + e.object.tower_loc.y);
        }
        e.object.showInfo = !e.object.showInfo;
    }

    function handleWardClick(entityName) {
        return function(event) {
            var latlon = map.getLonLatFromPixel(event.xy),
                marker = placeWard(latlon, entityName);
            addQueryStringValue(marker.ward_type, marker.ward_loc);
        }
    }

    function placeWard(latlon, entityName, qs_value_worldXY) {
        var entity = ENTITIES[entityName],
            marker = createWardMarker(entity.icon_path, latlon),
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(marker.lonlat.lon, marker.lonlat.lat), getScaledRadius(entity.radius), 40),
            feature = new OpenLayers.Feature.Vector(circle);
        iconLayer.addMarker(marker);
        wardVisionLayer.addFeatures(feature);
        marker.radius_feature = feature;
        marker.events.register("mousedown", this, wardMarkerRemove);
        marker.events.register("touchend", this, wardMarkerRemove);
        marker.ward_type = entityName;
        marker.ward_loc = entityName;

        if (qs_value_worldXY == undefined) {
            var worldXY = latLonToWorld(latlon.lon, latlon.lat);
            worldXY.x = worldXY.x.toFixed(0);
            worldXY.y = worldXY.y.toFixed(0);
            marker.ward_loc = worldXY.x + ',' + worldXY.y
        } else {
            marker.ward_loc = qs_value_worldXY;
        }

        if (entityName == 'observer') updateVisibility(latlon, marker, ENTITIES.observer.radius);
        
        return marker;
    }

    function wardMarkerRemove(event) {
        if (event.object.radius_feature) wardVisionLayer.removeFeatures(event.object.radius_feature);
        if (event.object.vision_feature) visionSimulationLayer.removeFeatures(event.object.vision_feature);
        if (event.object.vision_center_feature) visionSimulationLayer.removeFeatures(event.object.vision_center_feature);
        iconLayer.removeMarker(event.object);
        console.log(event.object);
        OpenLayers.Event.stop(event);

        removeQueryStringValue(event.object.ward_type, event.object.ward_loc);
    }

    function handleOnClick(event) {
        console.log('handleOnClick');
    }

    function handleMeasurements(event) {
        var out = "";
        if (event.order == 1) {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units";
        } else {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units<sup>2</" + "sup>";
        }
        document.getElementById("output").innerHTML = out;

        lastDistance = calculateDistance(event.order, event.units, event.measure);
        document.getElementById("traveltime").innerHTML = (lastDistance / document.getElementById("movespeed").value).toFixed(2);

        document.getElementById("traveltime-container").style.display = '';
    }

    function handleCircleMeasurements(event) {
        var element = document.getElementById("output"),
            out = "";

        if (event.order == 1) {
            out += "Radius: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units";
        } else {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units<sup>2</" + "sup>";
        }
        element.innerHTML = out;
    }

    function handleCircleMeasurementsPartial(event) {
        var element = document.getElementById("output"),
            out = "",
            circle,
            feature,
            self = this;

        drawControls["select"].deactivate();
        if (event.order == 1) {
            if (event.measure > 0) {
                if (event.units == "km") {
                    circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(event.geometry.components[0].x, event.geometry.components[0].y), event.measure * 1e3, 30);
                } else {
                    circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(event.geometry.components[0].x, event.geometry.components[0].y), event.measure, 30);
                }
                feature = new OpenLayers.Feature.Vector(circle);
                polygonLayer.removeFeatures(event.geometry.circle_features);
                if ("circle_features" in event.geometry) {
                    event.geometry.circle_features.length = 0;
                    event.geometry.circle_features.push(feature);
                } else {
                    event.geometry.circle_features = [feature];
                }
                feature.measure_control = this;
                feature.is_measuring = true;
                polygonLayer.addFeatures(feature);
                if (event.geometry.components.length > 2) {
                    setTimeout(function() {
                        feature.is_measuring = false;
                        drawControls["select"].activate();
                        self.cancel();
                    }, 0);
                }
            }
            out += "Radius: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units";
        } else {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units<sup>2</" + "sup>";
        }
        element.innerHTML = out;
    }

    function toggleControl() {
        var control;

        for (var key in drawControls) {
            control = drawControls[key];
            console.log(this, this.value, key, this.value == key && this.checked);
            if (this.value == key && this.checked) {
                control.activate();
            } else {
                control.deactivate();
            }
            if ((this.value == "polygonControl" || this.value == "circle") && this.checked) {
                drawControls["select"].activate();
            } else {
                drawControls["select"].deactivate();
            }
        }
        document.getElementById("output").innerHTML = "";

        document.getElementById("traveltime-container").style.display = 'none';
    }

    function addMarker(markers, ll, popupClass, popupContentHTML, closeBox, overflow) {
        var feature = new OpenLayers.Feature(markers, ll),
            marker;

        feature.closeBox = closeBox;
        feature.popupClass = popupClass;
        feature.data.popupContentHTML = popupContentHTML;
        feature.data.overflow = overflow ? "auto" : "hidden";
        marker = feature.createMarker();

        function handleHoverPopup(event) {
            if (this.popup == null) {
                this.popup = this.createPopup(this.closeBox);
                map.addPopup(this.popup);
                this.popup.show();
            } else {
                this.popup.toggle();
            }
            currentPopup = this.popup;
            OpenLayers.Event.stop(event);
        };

        if (markers.name == "Towers") {
            marker.events.register("mouseover", feature, handleHoverPopup);
            marker.events.register("mouseout", feature, handleHoverPopup);
        }
        markers.addMarker(marker);
        return marker;
    }

    function createWardMarker(img, latlon) {
        var size = new OpenLayers.Size(21, 25),
            offset = new OpenLayers.Pixel(-(size.w / 2), -size.h),
            icon = new OpenLayers.Icon(img, size, offset),
            marker = new OpenLayers.Marker(latlon, icon);
        console.log('createWardMarker', latlon);
        return marker;
    }

    // Creates a 64x64 rectangle feature centered at c
    function createTileFeature(c, style) {
        var r1 = worldToLatLon(c.x - 32, c.y - 32),
            r2 = worldToLatLon(c.x - 32, c.y + 32),
            r3 = worldToLatLon(c.x + 32, c.y + 32),
            r4 = worldToLatLon(c.x + 32, c.y - 32),
            box_points = [
                new OpenLayers.Geometry.Point(r1.x, r1.y),
                new OpenLayers.Geometry.Point(r2.x, r2.y),
                new OpenLayers.Geometry.Point(r3.x, r3.y),
                new OpenLayers.Geometry.Point(r4.x, r4.y)
            ],
            box_rect = new OpenLayers.Geometry.LinearRing(box_points),
            box_feature = new OpenLayers.Feature.Vector(box_rect, null, style);

        return box_feature;
    }

    // creates url for tiles. OpenLayers TMS Layer getURL property is set to this
    function getMyURL(patch, baseLayer) {
        return function(bounds) {
            //console.log('getMyURL', baseLayer);
            var res = this.map.getResolution(),
                x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)),
                y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h)),
                z = map.getZoom(),
                path = z + "/tile_" + x + "_" + y + "." + this.type,
                url = this.url;

            if (url instanceof Array) {
                url = this.selectUrl(path, url)
            }
            return url + patch + '/' + baseLayer + '/' + path
        }
    }
    
    function resetMarkerLayers() {
        var data = map_data;
        layerKeys.forEach(function (k) {
            if (data[k]) {
                var layer = map.getLayersByName(layerNames[k])[0];
                map.removeLayer(layer);
                layer.destroy();
            }
        });
        dayRangeLayer.destroyFeatures();
        nightRangeLayer.destroyFeatures();
        trueSightRangeLayer.destroyFeatures();
        attackRangeLayer.destroyFeatures();
        map.events.unregister("changelayer", map, layerChangeHandler);
    }

    function onMapDataLoad(data) {
        var markers = {},
            marker,
            vectorLayer = map.getLayersByName("Placed Wards")[0],
            box_points = [],
            box_rect, box_feature;
        layerKeys.forEach(function (k) {
            console.log('onMapDataLoad', k);
            if (data[k]) {
                // Create markers for non-neutral spawn box and non-tree layers
                if (k != "trigger_multiple" && k != "ent_dota_tree" && k != "trigger_no_wards" && k != "ent_fow_blocker_node") {
                    markers[k] = new OpenLayers.Layer.Markers(layerNames[k]);
                    map.addLayer(markers[k]);
                    markers[k].setVisibility(false);
                    for (var i = 0; i < data[k].length; i++) {
                        var latlon = worldToLatLon(data[k][i].x, data[k][i].y);
                        marker = addMarker(markers[k], new OpenLayers.LonLat(latlon.x, latlon.y), OpenLayers.Popup.FramedCloud, "Click to toggle range overlay", false);
                        marker.day_vision_radius = TOWER_DAY_VISION_RADIUS;
                        marker.night_vision_radius = TOWER_NIGHT_VISION_RADIUS;
                        marker.true_sight_radius = TOWER_TRUE_SIGHT_RADIUS;
                        marker.attack_range_radius = TOWER_ATTACK_RANGE_RADIUS;
                        marker.showInfo = false;

                        if (k == "npc_dota_tower") {
                            console.log('npc_dota_tower');
                            marker.events.register("mousedown", markers[k], handleTowerMarkerClick);
                            marker.events.register("touchend", markers[k], handleTowerMarkerClick);
                            marker.tower_loc = data[k][i];
                        }
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
                    loadJSONData(markers, k, "npc_dota_neutral_spawner_box", data[k]);
                }
            }
        });

        map_data = data;
        
        map.raiseLayer(vectorLayer, map.layers.length);

        // Create tree markers the first time the tree layer is switched to
        map.events.register("changelayer", map, layerChangeHandler);

        parseQueryString();
    }
    
    function layerChangeHandler(event) {
        if (event.property === "visibility" && event.layer.name == layerNames["ent_dota_tree"] && !event.layer.loaded) {
            loadTreeData();
        }

        if (event.property === "visibility") {
            if (event.layer.isBaseLayer) {
                setQueryString('BaseLayer', event.layer.name.replace(/ /g, ''));
            }
            else {
                setQueryString(event.layer.name.replace(/ /g, ''), event.layer.visibility ? true : null);
            }
        }
    }

    function loadTreeData() {
        console.log('start tree load');
        var layer = map.getLayersByName(layerNames["ent_dota_tree"])[0];
        console.log(layer);
        for (var i = 0; i < layer.data.length; i++) {
            var latlon = worldToLatLon(layer.data[i].x, layer.data[i].y);
            marker = addMarker(layer, new OpenLayers.LonLat(latlon.x, latlon.y), OpenLayers.Popup.FramedCloud, "Click to toggle tree as alive or cut-down.<br>This will affect the simulated placed wards vision.<br>Tree coordinate: " + layer.data[i].x + ', ' + layer.data[i].y, false);
            marker.treeVisible = true;
            marker.tree_loc = layer.data[i].x + ',' + layer.data[i].y;
            marker.events.register("mousedown", layer, handleTreeMarkerClick);
            treeMarkers[layer.data[i].x + ',' + layer.data[i].y] = marker;
        }
        layer.loaded = !layer.loaded;
        console.log('end tree load');
    }

    function loadJSONData(markers, k, name, data) {
        markers[name] = new OpenLayers.Layer.Vector(layerNames[k]);
        map.addLayer(markers[name]);
        markers[name].setVisibility(false);
        for (var i = 0; i < data.length; i++) {
            pnt = [];
            for (var j = 0; j < data[i].length; j++) {
                var latlon = worldToLatLon(data[i][j].x, data[i][j].y);
                pnt.push(new OpenLayers.Geometry.Point(latlon.x, latlon.y));
            }


            ln = new OpenLayers.Geometry.LinearRing(pnt);
            pf = new OpenLayers.Feature.Vector(ln, null, style.green);
            markers[name].addFeatures([pf]);
        }
    }

    // Initialize map settings based on query string values
    function parseQueryString() {
        var zoom = getParameterByName('zoom');
        if (zoom) {
            map.zoomTo(parseInt(zoom));
        }
        var worldX = getParameterByName('x');
        var worldY = getParameterByName('y');
        if (worldX && worldY) {
            var lonlat = worldToLatLon(worldX, worldY);
            map.setCenter(new OpenLayers.LonLat(lonlat.x, lonlat.y), undefined, false, false);
        }
        
        var keys = ['observer', 'sentry'];
        for (var i = 0; i < keys.length; i++) {
            var wards = getParameterByName(keys[i])
            if (wards) {
                ward_coordinates = trim(wards, ' ;').split(';')
                ward_coordinates.map(function(el) {
                    var coord = el.split(',');
                    var xy = worldToLatLon(parseFloat(coord[0]), parseFloat(coord[1]));
                    placeWard(new OpenLayers.LonLat(xy.x, xy.y), keys[i], el);
                });
            }
        }
        
        var baseLayerName = getParameterByName('BaseLayer');
        if (baseLayerName) {
            for (var i = 0; i < baseLayers.length; i++) {
                var layer = baseLayers[i];
                var layerName = layer.name.replace(/ /g, '');
                if (baseLayerName === layerName) {
                    map.setBaseLayer(layer);
                    break;
                }
            }
        }
        
        for (k in layerNames) {
            var layerName = layerNames[k].replace(/ /g, '');
            value = getParameterByName(layerName);
            if (value) {
                var layer = map.getLayersByName(layerNames[k])[0];
                console.log(layer, layerNames[k], layerName);
                if (layer) layer.setVisibility(value == "true");
            }
        }

        var tower_vision = getParameterByName('tower_vision');
        if (tower_vision) {
            var layer = map.getLayersByName(layerNames["npc_dota_tower"])[0];
            tower_vision_coordinates = trim(tower_vision, ' ;').split(';')
            console.log('tower_vision', layer);
            console.log(treeMarkers, tower_vision_coordinates);
            for (var i = 0; i < tower_vision_coordinates.length; i++) {
                for (var j = 0; j < layer.markers.length; j++) {
                    if (layer.markers[j].tower_loc.x + ',' + layer.markers[j].tower_loc.y == tower_vision_coordinates[i]) {
                        handleTowerMarkerClick({
                            object: layer.markers[j]
                        }, true);
                    }
                }
            }
        }
    }

    function getJSON(path, callback) {
        console.log('getJSON', path);
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

    /********************
     * INITITIALIZATION *
     ********************/
    OpenLayers.ImgPath = IMG_DIR;
    
    // Start setting up the map, adding controls and layers
    baseLayers.forEach(function(layer) {
        map.addLayer(layer);
    });
    map.addLayer(dayRangeLayer);
    map.addLayer(nightRangeLayer);
    map.addLayer(trueSightRangeLayer);
    map.addLayer(attackRangeLayer);
    map.addLayer(polygonLayer);
    map.addLayer(wardVisionLayer);
    map.addLayer(visionSimulationLayer);
    map.addLayer(iconLayer);
    map.addControl(coordinateControl);
    map.addControl(new OpenLayers.Control.TouchNavigation({
        dragPanOptions: {
            enableKinetic: true
        }
    }));
    map.addControl(new OpenLayers.Control.KeyboardDefaults());
    layerSwitcher.onButtonClick = (function (fn) {
        console.log('onButtonClick', fn);
        return function (evt) {
            var button = evt.buttonElement;
            if (button === this.maximizeDiv && isSmallScreen()) {
                minimizeControlList.call(document.getElementById("controls-min"));
            }
            return fn.apply(this, arguments);
        }
    })(layerSwitcher.onButtonClick);
    layerSwitcher.loadContents = function () {
        // layers list div
        this.layersDiv = document.createElement("div");
        this.layersDiv.id = this.id + "_layersDiv";
        OpenLayers.Element.addClass(this.layersDiv, "layersDiv");

        this.baseLbl = document.createElement("div");
        this.baseLbl.innerHTML = OpenLayers.i18n("Base Layer");
        OpenLayers.Element.addClass(this.baseLbl, "baseLbl");

        this.baseLayersDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.baseLayersDiv, "baseLayersDiv");

        this.dataLbl = document.createElement("div");
        this.dataLbl.innerHTML = OpenLayers.i18n("Overlays");
        OpenLayers.Element.addClass(this.dataLbl, "dataLbl");

        this.dataLayersDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.dataLayersDiv, "dataLayersDiv");

        if (this.ascending) {
            this.layersDiv.appendChild(this.baseLbl);
            this.layersDiv.appendChild(this.baseLayersDiv);
            this.layersDiv.appendChild(this.dataLbl);
            this.layersDiv.appendChild(this.dataLayersDiv);
        } else {
            this.layersDiv.appendChild(this.dataLbl);
            this.layersDiv.appendChild(this.dataLayersDiv);
            this.layersDiv.appendChild(this.baseLbl);
            this.layersDiv.appendChild(this.baseLayersDiv);
        }

        this.div.appendChild(this.layersDiv);

        // maximize button div
        this.maximizeDiv = OpenLayers.Util.createAlphaImageDiv(
                                    "OpenLayers_Control_MaximizeDiv",
                                    null,
                                    null,
                                    null,
                                    "absolute");
        OpenLayers.Element.addClass(this.maximizeDiv, "maximizeDiv olButton");
        this.maximizeDiv.style.display = "none";

        this.div.appendChild(this.maximizeDiv);

        // minimize button div
        this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv(
                                    "OpenLayers_Control_MinimizeDiv",
                                    null,
                                    null,
                                    null,
                                    "absolute");
        OpenLayers.Element.addClass(this.minimizeDiv, "minimizeDiv olButton");
        this.minimizeDiv.style.display = "none";

        this.maximizeDiv.innerHTML = '&equiv;';
        this.minimizeDiv.innerHTML = '&times;';
        
        this.div.appendChild(this.minimizeDiv);
    }
    console.log(layerSwitcher.onButtonClick);
    map.addControl(layerSwitcher);
    layerSwitcher.maximizeControl();
    if (!map.getCenter()) {
        map.zoomToMaxExtent();
    }
    
    // create click handler
    OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
        defaultHandlerOptions: {
            single: true,
            "double": false,
            pixelTolerance: 0,
            stopSingle: false,
            stopDouble: false
        },
        initialize: function(options) {
            this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
            OpenLayers.Control.prototype.initialize.apply(this, arguments);
            this.handler = new OpenLayers.Handler.Click(this, {
                click: this.onClick,
                dblclick: this.onDblclick
            }, this.handlerOptions);
        },
        onClick: handleOnClick,
        onDblclick: function(event) {
            var output = document.getElementById(this.key + "Output"),
                msg = "dblclick " + event.xy;
            output.value = output.value + msg + "\n";
        }
    });

    // Controls configuration
    renderer = renderer ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
    drawControls = {
        line: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
            persist: true,
            immediate: true,
            handlerOptions: {
                layerOptions: {
                    renderers: renderer
                }
            }
        }),
        circle: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
            persist: false,
            immediate: true,
            handlerOptions: {
                layerOptions: {
                    renderers: renderer
                }
            }
        }),
        observerclick: new OpenLayers.Control.Click({
            onClick: handleWardClick('observer'),
            handlerOptions: {
                single: true
            }
        }),
        sentryclick: new OpenLayers.Control.Click({
            onClick: handleWardClick('sentry'),
            handlerOptions: {
                single: true
            }
        }),
        polygonControl: new OpenLayers.Control.DrawFeature(polygonLayer, OpenLayers.Handler.RegularPolygon, {
            handlerOptions: {
                sides: 30
            }
        }),
        select: new OpenLayers.Control.SelectFeature(polygonLayer, {
            hover: true,
            highlightOnly: false,
            callbacks: {
                click: function(feature) {
                    var element = document.getElementById("output");
                    if (feature.measure_control && feature.is_measuring) {
                        feature.measure_control.cancel();
                        feature.is_measuring = false;
                        this.highlight(feature);
                    } else {
                        element.innerHTML = "";
                        polygonLayer.removeFeatures(feature);
                    }
                }
            },
            overFeature: function(feature) {
                var element = document.getElementById("output"),
                    out = "Radius: " + (.565352 * Math.sqrt(feature.geometry.getArea()) * scale).toFixed(0) + " units";
                element.innerHTML = out;
                this.highlight(feature);
            },
            outFeature: function(feature) {
                var element = document.getElementById("output");
                element.innerHTML = "";
                this.unhighlight(feature)
            }
        })
    };

    // Add controls to map
    for (var key in drawControls) {
        if (key == "line") {
            drawControls[key].events.on({
                measure: handleMeasurements,
                measurepartial: handleMeasurements
            })
        }
        if (key == "circle") {
            drawControls[key].events.on({
                measure: handleCircleMeasurements,
                measurepartial: handleCircleMeasurementsPartial
            })
        }
        map.addControl(drawControls[key]);
    }

    map.events.register("zoomend", map, function(){
        setQueryString('zoom', map.zoom);
    });

    map.events.register("moveend", map, function(){
        console.log(map);
        var worldXY = latLonToWorld(map.center.lon, map.center.lat);
        setQueryString('x', worldXY.x.toFixed(0));
        setQueryString('y', worldXY.y.toFixed(0));
    });

    // X/Y coordinate update display handler
    coordinateControl.formatOutput = function (lonlat) {
        var worldXY = latLonToWorld(lonlat.lon, lonlat.lat);
        return worldXY.x.toFixed(0) + ', ' + worldXY.y.toFixed(0);
    };
    
    map.events.register("mousemove", map, function(e) {
        if (wardVisionLayer.cursor_marker) {
            wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker);
        }
    
        // create and add cursor marker polygon if in place observer mode
        if (document.getElementById("observerToggle").checked) {
            var lonlat = map.getLonLatFromPixel(e.xy);
            var worldXY = latLonToWorld(lonlat.lon, lonlat.lat);
            var gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);
            var key = vs.pt2key(gridXY);

            var treePt = vs.tree_relations[key];
            var treeBlocking = false;
            if (treePt) {
                var treeKey = vs.pt2key(treePt);
                treeBlocking = vs.tree_state[treeKey];
            }
            var cursor_style = style.green;
            if (!vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
                cursor_style = style.red;
            }
            var box_feature = createTileFeature(vs.GridXYtoWorldXY(gridXY.x, gridXY.y), cursor_style);
            wardVisionLayer.addFeatures([box_feature]);
            wardVisionLayer.cursor_marker = box_feature;
        }
    });

    // Show/hide controls panel
    document.getElementById("controls-max").addEventListener("click", function(e) {
        document.querySelector(".controls").style.display = '';
        document.getElementById("controls-min").style.display = 'block';
        this.style.display = 'none';
        if (isSmallScreen()) {
            layerSwitcher.minimizeControl();
        }
        if (e) e.preventDefault();
    }, false);
    function minimizeControlList(e) {
        document.querySelector(".controls").style.display = 'none';
        document.getElementById("controls-max").style.display = 'block';
        this.style.display = 'none';
        if (e) e.preventDefault();
    }
    document.getElementById("controls-min").addEventListener("click", minimizeControlList, false);
    
    // Check screen size
    function isSmallScreen() {
        return ((window.innerWidth > 0) ? window.innerWidth : screen.width) <= 768;
    }
    // Initially hide controls if screen is small
    if (isSmallScreen()) {
        minimizeControlList.call(document.getElementById("controls-min"));
        layerSwitcher.minimizeControl();
    }

    // Show/hide X/Y coordinate display
    document.getElementById("coordControl").addEventListener("change", function(e) {
        if (this.checked) {
            document.querySelector(".olControlMousePosition").style.display = 'block';
        } else {
            document.querySelector(".olControlMousePosition").style.display = 'none';
        }
    }, false);

    // Update travel time display when movespeed input changes
    document.getElementById("movespeed").addEventListener("change", function(e) {
        document.getElementById("traveltime").innerHTML = (lastDistance / document.getElementById("movespeed").value).toFixed(2);
    }, false);

    // Set up panel radio button toggle handlers
    document.getElementById('noneToggle').addEventListener('click', toggleControl, false);
    document.getElementById('lineToggle').addEventListener('click', toggleControl, false);
    document.getElementById('circleToggle').addEventListener('click', toggleControl, false);
    document.getElementById('observerToggle').addEventListener('click', toggleControl, false);
    document.getElementById('sentryToggle').addEventListener('click', toggleControl, false);
    
    document.getElementById('dataControl').addEventListener('change', function () {
        setQueryString('data', document.getElementById('dataControl').value);
        resetMarkerLayers();
        init();
    }, false);
    
    function init() {
        console.log('init');
        var data = getParameterByName('data');
        if (data) {
            document.getElementById('dataControl').value = data;
        }
        getJSON(map_data_path + document.getElementById('dataControl').value + '.json', onMapDataLoad);
    }
  
    var wkt = new OpenLayers.Format.WKT();
    var jstsToWKTParser = new jsts.io.WKTWriter();
    var geometryFactory = new jsts.geom.GeometryFactory();
    function updateVisibility(latlon, marker, radius) {
        console.log('updateVisibility ready');
        var worldXY = latLonToWorld(latlon.lon, latlon.lat);
        var gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);
        if (vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
            // create and add center marker polygon
            var box_feature = createTileFeature(vs.GridXYtoWorldXY(gridXY.x, gridXY.y), style.green);
            visionSimulationLayer.addFeatures([box_feature]);
            marker.vision_center_feature = box_feature;
            
            console.log('updating vision simulation', gridXY);
            vs.updateVisibility(gridXY.x, gridXY.y, getTileRadius(radius));
            
            // merge light points into a single polygon
            var union = null;
            var lightPoints = Object.keys(vs.lights).map(function (key) {
                var pt = vs.key2pt(key);
                return vs.GridXYtoWorldXY(pt.x, pt.y);
            });
            var t1 = Date.now();
            
            var components = {};
            var index = 1;
            function processNeighbors(key) {
                var pt = vs.key2pt(key);
                var dirs = ['N', 'E', 'S', 'W'];
                for (var i = 0; i < dirs.length; i++) {
                    var keyAdj = getAdj(pt, dirs[i]);
                    if (components[keyAdj] || !vs.lights[keyAdj]) continue;
                    components[keyAdj] = index;
                    processNeighbors(keyAdj);
                }
            }
            
            for (var key in vs.lights) {
                if (!components[key]) {
                    components[key] = index;
                    processNeighbors(key);
                    index++;
                }
            }
            console.log('components', components);
            
            function getAdj(pt, dir) {
                var key;
                switch (dir) {
                    case 'N':
                        key = vs.xy2key(pt.x, pt.y+1);
                    break;
                    case 'E':
                        key = vs.xy2key(pt.x+1, pt.y);
                    break;
                    case 'S':
                        key = vs.xy2key(pt.x, pt.y-1);
                    break;
                    case 'W':
                        key = vs.xy2key(pt.x-1, pt.y);
                    break;
                    case 'NE':
                        key = vs.xy2key(pt.x+1, pt.y+1);
                    break;
                    case 'SE':
                        key = vs.xy2key(pt.x+1, pt.y-1);
                    break;
                    case 'SW':
                        key = vs.xy2key(pt.x-1, pt.y-1);
                    break;
                    case 'NW':
                        key = vs.xy2key(pt.x-1, pt.y+1);
                    break;
                }
                return key;
            }
            
            function isSideFree(key, dir) {
                var pt = vs.key2pt(key);
                var keyAdj = getAdj(pt, dir);
                return !vs.lights[keyAdj];
            }
            
            function notSurrounded(key) {
                var pt = vs.key2pt(key);
                var dirs = ['N', 'E', 'S', 'W'];
                for (var i = 0; i < dirs.length; i++) {
                    var keyAdj = getAdj(pt, dirs[i]);
                    if (!components[keyAdj]) return dirs[i];
                }
            }
            
            function getSegment(key, dir) {
                var pt = vs.key2pt(key);
                switch (dir) {
                    case 'N':
                        return [vs.xy2pt(pt.x-0.5, pt.y+0.5), vs.xy2pt(pt.x+0.5, pt.y+0.5)];
                    break;
                    case 'E':
                        return [vs.xy2pt(pt.x+0.5, pt.y+0.5), vs.xy2pt(pt.x+0.5, pt.y-0.5)];
                    break;
                    case 'S':
                        return [vs.xy2pt(pt.x+0.5, pt.y-0.5), vs.xy2pt(pt.x-0.5, pt.y-0.5)];
                    break;
                    case 'W':
                        return [vs.xy2pt(pt.x-0.5, pt.y-0.5), vs.xy2pt(pt.x-0.5, pt.y+0.5)];
                    break;
                }
            }
            
            function getCornerPoint(key, dir) {
                var pt = vs.key2pt(key);
                switch (dir) {
                    case 'N':
                        return vs.xy2pt(pt.x-0.5, pt.y+0.5);
                    break;
                    case 'E':
                        return vs.xy2pt(pt.x+0.5, pt.y+0.5);
                    break;
                    case 'S':
                        return vs.xy2pt(pt.x+0.5, pt.y-0.5);
                    break;
                    case 'W':
                        return vs.xy2pt(pt.x-0.5, pt.y-0.5);
                    break;
                }
            }
            
            function getOutline(index) {
                var outlinePoints = [];
                var startKey;
                var dir;
                for (var key in components) {
                    dir = notSurrounded(key);
                    if (components[key] == index && dir) {
                        startKey = key;
                        break;
                    }
                }
                var next = processNext(startKey, dir);
                console.log('getOutline', startKey, dir, next);
                while (startKey !== next.key || dir !== next.dir) {
                    console.log('next', next);
                    outlinePoints.push(next.point);
                    next = processNext(next.key, next.dir)
                }
                outlinePoints.push(next.point);
                console.log('outlinePoints', outlinePoints);
                return outlinePoints;
            }
            
            function checkAdj(key, dir, adjDir) {
                var pt = vs.key2pt(key);
                var adjKey = getAdj(pt, dir);
                if (components[adjKey] == components[key] && isSideFree(adjKey, adjDir)) {
                    return {
                        key: adjKey,
                        dir: adjDir
                    }
                }
            }
            
            function processNext(key, dir) {
                var pt = vs.key2pt(key);
                var next;
                switch (dir) {
                    case 'N':
                        if (isSideFree(key, 'E')) {
                            return {
                                key: key,
                                dir: 'E',
                                point: getCornerPoint(key, dir)
                            }
                        }
                        if (!next) next = checkAdj(key, 'E', 'N');
                        if (!next) next = checkAdj(key, 'NE', 'W');
                    break;
                    case 'E':
                        if (isSideFree(key, 'S')) {
                            return {
                                key: key,
                                dir: 'S',
                                point: getCornerPoint(key, dir)
                            }
                        }
                        if (!next) next = checkAdj(key, 'S', 'E');
                        if (!next) next = checkAdj(key, 'SE', 'N');
                    break;
                    case 'S':
                        if (isSideFree(key, 'W')) {
                            return {
                                key: key,
                                dir: 'W',
                                point: getCornerPoint(key, dir)
                            }
                        }
                        if (!next) next = checkAdj(key, 'W', 'S');
                        if (!next) next = checkAdj(key, 'SW', 'E');
                    break;
                    case 'W':
                        if (isSideFree(key, 'N')) {
                            return {
                                key: key,
                                dir: 'N',
                                point: getCornerPoint(key, dir)
                            }
                        }
                        if (!next) next = checkAdj(key, 'N', 'W');
                        if (!next) next = checkAdj(key, 'NW', 'S');
                    break;
                }
                if (next) {
                    next.point = getCornerPoint(key, dir);
                    return next;
                }
            }
            var polygonList = [];
            for (var i = 1; i < index; i++) {
                var outlinePoints = getOutline(i);
                var ringPoints = outlinePoints.map(function (pt) {
                    var worldXY = vs.GridXYtoWorldXY(pt.x, pt.y);
                    var latlon = worldToLatLon(worldXY.x, worldXY.y);
                    return new OpenLayers.Geometry.Point(latlon.x, latlon.y);
                });
                console.log(ringPoints);
                var ring = new OpenLayers.Geometry.LinearRing(ringPoints);
                var polygon = new OpenLayers.Geometry.Polygon([ring]);
                polygonList.push(polygon);
            }
            var multiPolygon = new OpenLayers.Geometry.MultiPolygon(polygonList);
            var multiPolygonFeature = new OpenLayers.Feature.Vector(multiPolygon, style.red);
            visionSimulationLayer.addFeatures([multiPolygonFeature]);
            console.log('outline', Date.now() - t1);
            
            for (var i = 0; i < lightPoints.length; i++) {
                var c = lightPoints[i],
                    r1 = worldToLatLon(c.x, c.y),
                    r2 = worldToLatLon(c.x + 64, c.y),
                    r3 = worldToLatLon(c.x + 64, c.y - 64),
                    r4 = worldToLatLon(c.x, c.y - 64),
                    shell = geometryFactory.createLinearRing([
                        new jsts.geom.Coordinate(r1.x, r1.y),
                        new jsts.geom.Coordinate(r2.x, r2.y),
                        new jsts.geom.Coordinate(r3.x, r3.y),
                        new jsts.geom.Coordinate(r4.x, r4.y),
                        new jsts.geom.Coordinate(r1.x, r1.y)
                    ]),
                    jstsPolygon = geometryFactory.createPolygon(shell);

                if (union == null) {
                    union = jstsPolygon;
                } else {
                    union = union.union(jstsPolygon);
                }
            }
            var t2 = Date.now();
            // add vision polygon to map
            var visionFeature = wkt.read(jstsToWKTParser.write(union));
            visionFeature.style = style.yellow;
            visionSimulationLayer.addFeatures([visionFeature]);
            marker.vision_feature = visionFeature;
            var t3 = Date.now();
            console.log('union', t2 - t1);
            console.log('draw', t3 - t2);
            console.log('total', t3 - t1);
        }
    }
    
    var vs = new VisionSimulation(worlddata, vision_data_image_path, function () {
        init();
    });
}

module.exports = App;