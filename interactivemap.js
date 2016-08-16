$(function() {
    var DEBUG = false,
        VISION_SIMULATION = false,
        ENTITIES = {
            observer: {
                icon_path: "ward_observer.png",
                radius: 1600
            },
            sentry: {
                icon_path: "ward_sentry.png",
                radius: 850
            }
        },
        TOWER_DAY_VISION_RADIUS = 1900,
        TOWER_NIGHT_VISION_RADIUS = 800,
        TOWER_TRUE_SIGHT_RADIUS = 900,
        TOWER_ATTACK_RANGE_RADIUS = 700,
        map_data_path = "data.json",
        map_data,
        map_tile_path = "http://devilesk.com/media/images/map/687/",
        map_w = 16384,
        map_h = 16384,
        //map_x_boundaries = [-8537, 9305],
        // map_y_boundaries = [8790, -9096],
        map_x_boundaries = [-8475.58617377, 9327.49124559],
        map_y_boundaries = [9028.52473332, -8836.61406266],
        //map_y_boundaries = [8786, -9104],
        //map_y_boundaries = [8775, -9104],
        zoomify = new OpenLayers.Layer.Zoomify( "Zoomify", map_tile_path, new OpenLayers.Size( map_w, map_h ) ),
        scale = Math.abs(map_x_boundaries[1] - map_x_boundaries[0])/map_w,
        map = new OpenLayers.Map("map", {
            maxExtent: new OpenLayers.Bounds(0, 0, map_w, map_h),
            numZoomLevels: 5,
            //maxResolution: 5,
            //resolutions: [0.0625, 0.125, 0.25, 0.5, 1],
            //resolutions: [16, 8, 4, 2, 1],
            maxResolution: Math.pow(2, 5-1 ),
            units: "pixels"
            // projection: "EPSG:900913",
            // displayProjection: new OpenLayers.Projection("EPSG:900913")
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
            npc_dota_neutral_spawner: "Neutral Camps",
            trigger_no_wards: "Invalid Ward Locations",
            ent_fow_blocker_node: "Vision Blocker"
        },
        baseLayers = [
            new OpenLayers.Layer.TMS("Default", map_tile_path, {
                type: "jpg",
                getURL: getMyURL('default')
            }),
            new OpenLayers.Layer.TMS("Desert", map_tile_path, {
                type: "jpg",
                getURL: getMyURL('desert')
            }),
            new OpenLayers.Layer.TMS("Immortal Gardens", map_tile_path, {
                type: "jpg",
                getURL: getMyURL('immortalgardens')
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
        treeMarkers = {},
        jstsToOpenLayersParser = new jsts.io.OpenLayersParser(),
        geometryFactory = new jsts.geom.GeometryFactory(),
        canvas = document.getElementById("elevation-canvas"),
        elevationCtx = canvas.getContext("2d"),
        walls = {},
        lights = {},
        tree_relations,
        trees,
        tree_blocks = {},
        invalid_blocks = {},
        ent_fow_blocker_nodes,
        ent_fow_blocker_nodes_blocks = {},
        trigger_no_wards_blocks = {},
        tree_elevations = {
            "high2": {},
            "high": {},
            "middle": {},
            "low": {},
            "uber": {}
        },
        elevations,
        elevationImg = new Image(),
        assetsLoaded = 1;
console.log('zoomify.numberOfTiers', zoomify.numberOfTiers);
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
        history.pushState(null, "", updateQueryString(key, value));
    }

    function addQueryStringValue(key, value) {
        console.log('addQueryStringValue', key, value);
        var qs = getParameterByName(key);
        qs = trim(trim(qs, ' ;') + ';' + value, ' ;');
        history.pushState(null, "", updateQueryString(key, qs));
    }

    function removeQueryStringValue(key, value) {
        console.log('removeQueryStringValue', key, value);
        var qs = getParameterByName(key);
        qs = trim(trim(qs, ' ;').replace(value, '').replace(/;;/g, ''), ' ;');
        history.pushState(null, "", updateQueryString(key, qs != '' ? qs : null));
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

    function worldToGNVCoordinates(x1, y1) {
        return {
            x: Math.floor(x1 / 64 + 128),
            y: Math.floor(247 - (y1 / 64 + 119))
        };
    }

    function gnvToWorldCoordinates(x1, y1) {
        return {
            x: parseInt((x1 - 128) * 64),
            y: parseInt(((247 - y1) - 119) * 64)
        };
    }

    function getScaledRadius(r) {
        return r / (map_x_boundaries[1] - map_x_boundaries[0]) * map_w
    }

    function calculateDistance(order, units, measure) {
        console.log(order, units, measure);
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

            if (VISION_SIMULATION) {
                updateVisibility(new OpenLayers.LonLat(lonlat.x, lonlat.y), e.object, TOWER_DAY_VISION_RADIUS);
            }
        } else {
            dayRangeLayer.removeFeatures(e.object.day_vision_feature);
            nightRangeLayer.removeFeatures(e.object.night_vision_feature);
            trueSightRangeLayer.removeFeatures(e.object.true_sight_feature);
            attackRangeLayer.removeFeatures(e.object.attack_range_feature);

            if (event.object.vision_feature) visionSimulationLayer.removeFeatures(event.object.vision_feature);
            if (event.object.vision_center_feature) visionSimulationLayer.removeFeatures(event.object.vision_center_feature);

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

        // run vision simulation
        if (VISION_SIMULATION) {
            if (entityName == 'observer') updateVisibility(latlon, marker, entity.radius);
        }

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

    function handleTreeMarkerClick(event) {
        var worldXY = latLonToWorld(event.object.lonlat.lon, event.object.lonlat.lat),
            gnvXY = worldToGNVCoordinates(worldXY.x, worldXY.y);

        event.object.treeVisible = !event.object.treeVisible
        event.object.setOpacity(event.object.treeVisible ? 1 : .4);
        toggleTree(gnvXY.x, gnvXY.y)

        if (event.object.treeVisible) {
            removeQueryStringValue('cut_trees', event.object.tree_loc);
        } else {
            addQueryStringValue('cut_trees', event.object.tree_loc);
        }
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

        if (markers.name == "Towers" || markers.name == "Trees") {
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

    // Creates a 64x64 rectangle feature with c as top left corner
    function createTileFeature(c, style) {
        var r1 = worldToLatLon(c.x, c.y),
            r2 = worldToLatLon(c.x + 64, c.y),
            r3 = worldToLatLon(c.x + 64, c.y - 64),
            r4 = worldToLatLon(c.x, c.y - 64),
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
    function getMyURL(baseLayer) {
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
            return url + baseLayer + '/' + path
        }
    }

    function onMapDataLoad(data) {
        var markers = {},
            marker,
            vectorLayer = map.getLayersByName("Placed Wards")[0],
            box_points = [],
            box_rect, box_feature;
        ["trigger_multiple","ent_dota_tree","dota_item_rune_spawner","ent_dota_shop","npc_dota_barracks","npc_dota_building","npc_dota_fort","npc_dota_tower"].forEach(function (k) {
            console.log(k);
            // Create markers for non-neutral spawn box and non-tree layers
            if (k != "trigger_multiple" && k != "ent_dota_tree" && k != "trigger_no_wards" && k != "ent_fow_blocker_node") {
                markers[k] = new OpenLayers.Layer.Markers(layerNames[k]);
                map.addLayer(markers[k]);
                markers[k].setVisibility(false);
                for (var i = 0; i < data[k].length; i++) {
                    var latlon = worldToLatLon(data[k][i].x, data[k][i].y);
                    marker = addMarker(markers[k], new OpenLayers.LonLat(latlon.x, latlon.y), OpenLayers.Popup.FramedCloud, "Click to toggle range overlay" + data[k][i].x + ", " + data[k][i].y, false);
                    marker.day_vision_radius = TOWER_DAY_VISION_RADIUS;
                    marker.night_vision_radius = TOWER_NIGHT_VISION_RADIUS;
                    marker.true_sight_radius = TOWER_TRUE_SIGHT_RADIUS;
                    marker.attack_range_radius = TOWER_ATTACK_RANGE_RADIUS;
                    marker.showInfo = false;

                    if (k == "npc_dota_tower") {
                        console.log('npc_dota_tower');
                        marker.events.register("mousedown", markers[k], handleTowerMarkerClick);
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
                if (!DEBUG) {
                    loadJSONData(markers, k, "npc_dota_neutral_spawner_box", data[k]);
                    //generateBoxesKML(markers, data, k, 'npc_dota_neutral_spawner_box', false);
                } else {
                    loadKMLData(markers, k, "npc_dota_neutral_spawner_box", "trigger_multiple.kml");
                }
            }
            /*else if (k == "trigger_no_wards") {
              // load layer data from KML file
              loadKMLData(markers, k, "trigger_no_wards_box", "trigger_no_wards.kml");
              
              //generateBoxesKML(markers, data, k, 'trigger_no_wards_box', true);
            }
            else if (k == "ent_fow_blocker_node") {
              // load layer data from KML file
              loadKMLData(markers, k, "ent_fow_blocker_node_box", "ent_fow_blocker_node.kml");
              
              //generatePointSquaresKML(markers, data, k, 'ent_fow_blocker_node_box');
            }*/
        });

        map_data = data;
        
        map.raiseLayer(vectorLayer, map.layers.length);

        // Create tree markers the first time the tree layer is switched to
        map.events.register("changelayer", null, function(event) {
            if (event.property === "visibility" && event.layer.name == layerNames["ent_dota_tree"] && !event.layer.loaded) {
                loadTreeData();
            }

            if (event.property === "visibility") {
                console.log(event.layer.name, event.layer.visibility, event.layer.isBaseLayer);
                if (event.layer.isBaseLayer) {
                    setQueryString('BaseLayer', event.layer.name.replace(/ /g, ''));
                }
                else {
                    setQueryString(event.layer.name.replace(/ /g, ''), event.layer.visibility ? true : null);
                }
            }
        });

        assetsLoaded--;
        if (assetsLoaded == 0) parseQueryString();
    }

    function loadTreeData() {
        console.log('start tree load');
        var layer = map.getLayersByName(layerNames["ent_dota_tree"])[0];
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
                //pnt.push(new OpenLayers.Geometry.Point(data[i][j][0], 5120 - data[i][j][1]));
                pnt.push(new OpenLayers.Geometry.Point(latlon.x, latlon.y));
            }


            ln = new OpenLayers.Geometry.LinearRing(pnt);
            pf = new OpenLayers.Feature.Vector(ln, null, style.green);
            markers[name].addFeatures([pf]);
        }
    }

    function loadKMLData(markers, k, name, filename) {
        markers[name] = new OpenLayers.Layer.Vector(layerNames[k], {
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                url: filename,
                format: new OpenLayers.Format.KML({
                    extractStyles: true,
                    extractAttributes: true
                })
            })
        });
        map.addLayer(markers[name]);
        markers[name].setVisibility(false);
    }

    // when DEBUG == false this code will be removed by UglifyJS dead code removal
    if (DEBUG) {
        function generatePointSquaresKML(markers, k, layerName) {
            console.log(k, 'start');
            markers[layerName] = new OpenLayers.Layer.Vector(layerNames[k]);
            map.addLayer(markers[layerName]);
            markers[layerName].setVisibility(false);
            var union = null
            for (var i = 0; i < data[k].length; i++) {
                box_points = [];
                var latlon;
                latlon = worldToLatLon(data[k][i][0] - 32, data[k][i][1] + 32);
                box_points.push(new jsts.geom.Coordinate(latlon.x, latlon.y));
                latlon = worldToLatLon(data[k][i][0] + 32, data[k][i][1] + 32);
                box_points.push(new jsts.geom.Coordinate(latlon.x, latlon.y));
                latlon = worldToLatLon(data[k][i][0] + 32, data[k][i][1] - 32);
                box_points.push(new jsts.geom.Coordinate(latlon.x, latlon.y));
                latlon = worldToLatLon(data[k][i][0] - 32, data[k][i][1] - 32);
                box_points.push(new jsts.geom.Coordinate(latlon.x, latlon.y));
                latlon = worldToLatLon(data[k][i][0] - 32, data[k][i][1] + 32);
                box_points.push(new jsts.geom.Coordinate(latlon.x, latlon.y));
                shell = geometryFactory.createLinearRing(box_points);
                jstsPolygon = geometryFactory.createPolygon(shell);

                if (union == null) {
                    union = jstsPolygon;
                } else {
                    union = union.union(jstsPolygon);
                }
            }
            union = jstsToOpenLayersParser.write(union);
            box_feature = new OpenLayers.Feature.Vector(union, null, style.red);
            markers[layerName].addFeatures([box_feature]);
            console.log(k, 'end');

            // export to KML
            kmlParser = new OpenLayers.Format.KML()
            console.log(kmlParser.write(box_feature));
        }

        function generateBoxesKML(markers, data, k, layerName, combine) {
            console.log(k, 'start');
            markers[layerName] = new OpenLayers.Layer.Vector(layerNames[k]);
            map.addLayer(markers[layerName]);
            markers[layerName].setVisibility(false);
            var union = null;
            var box_features = [];
            for (var i = 0; i < data[k].length; i++) {
                box_points = [];
                box_points2 = [];
                for (var j = 0; j < data[k][i].length; j++) {
                    var latlon = worldToLatLon(data[k][i][j].x, data[k][i][j].y);
                    box_points.push(new jsts.geom.Coordinate(latlon.x, latlon.y));
                    box_points2.push(new OpenLayers.Geometry.Point(latlon.x, latlon.y));
                }
                var latlon = worldToLatLon(data[k][i][0].x, data[k][i][0].y);
                box_points.push(new jsts.geom.Coordinate(latlon.x, latlon.y));
                shell = geometryFactory.createLinearRing(box_points);
                jstsPolygon = geometryFactory.createPolygon(shell);

                if (union == null) {
                    union = jstsPolygon;
                } else {
                    union = union.union(jstsPolygon);
                }

                box_rect = new OpenLayers.Geometry.LinearRing(box_points2);
                box_feature2 = new OpenLayers.Feature.Vector(box_rect, null, style.green);
                box_features.push(box_feature2);
            }
            union = jstsToOpenLayersParser.write(union);
            box_feature = new OpenLayers.Feature.Vector(union, null, style.red);
            markers[layerName].addFeatures([box_feature]);
            console.log(k, 'end');

            // export to KML
            kmlParser = new OpenLayers.Format.KML()
            if (combine) {
                console.log(kmlParser.write(box_feature));
            } else {
                console.log(kmlParser.write(box_features));
                console.log(box_features);
            }
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
                layer.setVisibility(value == "true");
            }
        }
        
        //layerSwitcher.redraw();
        var cut_trees = getParameterByName('cut_trees');
        if (cut_trees) {
            var layer = map.getLayersByName(layerNames["ent_dota_tree"])[0];
            if (!layer.loaded) loadTreeData();
            cut_tree_coordinates = trim(cut_trees, ' ;').split(';')
            console.log(treeMarkers, cut_tree_coordinates);
            for (var i = 0; i < cut_tree_coordinates.length; i++) {
                console.log(cut_tree_coordinates[i]);
                treeMarkers[cut_tree_coordinates[i]].treeVisible = false;
                treeMarkers[cut_tree_coordinates[i]].setOpacity(.4);
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

    /*******************************
     * VISION SIMULATION FUNCTIONS *
     *******************************/
    if (VISION_SIMULATION) {
        // Gets elevation of an x,y coordinate from the elevation image
        function getElevation(x, y) {
            var key = x + "," + y,
                imgd = elevationCtx.getImageData(x, y, 1, 1),
                pix = imgd.data;
            if (trigger_no_wards_blocks[key]) {
                return "invalid"
            }
            if (pix[0] == 255 && pix[1] == 255 && pix[2] == 255) {
                return "invalid"
            }
            if (pix[0] == 153) {
                return "high"
            }
            if (pix[0] == 102) {
                return "middle"
            }
            if (pix[0] == 51) {
                return "low"
            }
            if (pix[0] == 204) {
                return "high2"
            }
            if (pix[0] == 255) {
                return "uber"
            }
            //console.log(x, y, pix);
        }

        function getElevationBelow(elevation) {
            if (elevation == "invalid" || elevation == "low") {
                return "invalid"
            }
            if (elevation == "middle") return "low";
            if (elevation == "high") return "middle";
            if (elevation == "high2") return "high";
            if (elevation == "uber") return "high2";
        }

        function addTreeWalls(walls, elevation) {
            for (key in tree_elevations[elevation]) {
                if (tree_blocks[key]) {
                    skey = key.split(',');
                    x = parseFloat(skey[0]);
                    y = parseFloat(skey[1]);
                    var t = tree_relations[key];
                    c = [0, 0];
                    for (var i = 0; i < t.length; i++) {
                        c[0] += parseFloat(t[i].split(',')[0]);
                        c[1] += parseFloat(t[i].split(',')[1]);
                    }
                    c = [c[0] / t.length, c[1] / t.length];
                    walls[key] = ['tree', c[0], c[1], Math.SQRT2];
                    walls[c[0] + "," + c[1]] = ['tree', c[0], c[1], Math.SQRT2];
                }
            }
        }

        // Generates a vision with fog of war feature and adds it to the map
        function updateVisibility(latlon, marker, r1) {
            var worldXY = latLonToWorld(latlon.lon, latlon.lat),
                gnvXY = worldToGNVCoordinates(worldXY.x, worldXY.y),
                x = gnvXY.x,
                y = gnvXY.y,
                elevation = getElevation(x, y),
                elevationBelow = getElevationBelow(elevation),
                key = x + "," + y,
                box_feature,
                fov = new ROT.FOV.PreciseShadowcasting(lightPassesCallback, {
                    topology: 8
                }),
                lightPoints = [],
                union = null,
                visionFeature,
                RADIUS = getTileRadius(r1);
            console.log('RADIUS', RADIUS, x, y, gnvToWorldCoordinates(x, y));
            // create and add center marker polygon
            box_feature = createTileFeature(gnvToWorldCoordinates(gnvXY.x, gnvXY.y), (elevation == "invalid" || tree_blocks[key]) ? style.red : style.green);
            visionSimulationLayer.addFeatures([box_feature]);
            marker.vision_center_feature = box_feature;

            // set walls based on elevation
            if (elevation == "invalid" || tree_blocks[key]) {
                console.log('invalid');
                walls = {};
                setWalls(walls, tree_blocks);
                setWalls(walls, ent_fow_blocker_nodes);

                // when DEBUG == false this code will be removed by UglifyJS dead code removal
                if (DEBUG) {
                    redraw();
                }
                return;
            } else {
                walls = {};
                setWalls(walls, elevations[elevation]);
                setWalls(walls, ent_fow_blocker_nodes);
                addTreeWalls(walls, elevation);
                if (elevationBelow != 'invalid') addTreeWalls(walls, elevationBelow);
            }

            // get light points from shadowcasting
            lights = {};
            fov.walls = walls;
            console.log('BLOCKS', walls["44,102"]);
            fov.compute(x, y, RADIUS, function(x2, y2, r, vis) {
                var key = x2 + "," + y2;
                pt = gnvToWorldCoordinates(x2, y2);
                pt2 = gnvToWorldCoordinates(x, y);
                pt.x += 32;
                pt.y -= 32;
                pt2.x += 32;
                pt2.y -= 32;
                //if ((vis == 1 && !ent_fow_blocker_nodes_blocks[key] && (!tree_blocks[key] || !tree_elevations[elevation][key]) && (x-x2)*(x-x2) + (y-y2)*(y-y2) < RADIUS * RADIUS) || r <= 2) {
                if ((vis == 1 && !ent_fow_blocker_nodes_blocks[key] && (pt2.x - pt.x) * (pt2.x - pt.x) + (pt2.y - pt.y) * (pt2.y - pt.y) < r1 * r1) || r <= 2) {
                    lights[key] = 255;
                    lightPoints.push(gnvToWorldCoordinates(x2, y2));
                }
            });

            // merge light points into a single polygon
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

            // add vision polygon to map
            union = jstsToOpenLayersParser.write(union);
            visionFeature = new OpenLayers.Feature.Vector(union, null, style.yellow);
            visionSimulationLayer.addFeatures([visionFeature]);
            marker.vision_feature = visionFeature;

            // when DEBUG == false this code will be removed by UglifyJS dead code removal
            if (DEBUG) {
                redraw();
            }
        }

        function lightPassesCallback(x, y) {
            if (x + "," + y == "44,102") console.log('LIGHT', !(x + "," + y in walls), x + "," + y in walls);
            return (!(x + "," + y in walls));
        }

        function setWalls(obj, index) {
            for (var i = 0; i < index.length; i++) {
                obj[index[i][0] + "," + index[i][1]] = ['wall', index[i][0], index[i][1], Math.SQRT2 / 2];
            }
        }

        function toggleTree(x, y) {
            var key = x + "," + y;

            if (tree_relations[key]) {
                for (var i = 0; i < tree_relations[key].length; i++) {
                    if (tree_blocks[tree_relations[key][i]]) {
                        delete tree_blocks[tree_relations[key][i]];
                    } else {
                        tree_blocks[tree_relations[key][i]] = 1;
                    }
                }
            }
        }

        function onVisionDataLoad(data) {
            tree_relations = data.tree_relations;
            trees = data.trees;
            elevations = data.elevations;
            ent_fow_blocker_nodes = data.ent_fow_blocker_node
            setWalls(tree_blocks, trees);
            setWalls(trigger_no_wards_blocks, data.trigger_no_wards);
            setWalls(ent_fow_blocker_nodes_blocks, data.ent_fow_blocker_node);
            setWalls(invalid_blocks, data.elevations.invalid);
            setWalls(tree_elevations.high2, data.tree_elevations.high2);
            setWalls(tree_elevations.high, data.tree_elevations.high);
            setWalls(tree_elevations.middle, data.tree_elevations.middle);
            setWalls(tree_elevations.low, data.tree_elevations.low);
            setWalls(tree_elevations.uber, data.tree_elevations.uber);

            assetsLoaded--;
            if (assetsLoaded == 0) parseQueryString();
        }

        // when DEBUG == false this code will be removed by UglifyJS dead code removal
        if (DEBUG) {
            var CELL = [1, 1],
                SIZE = [256, 248],
                COLOR_WALL = [40, 40, 40],
                COLOR_FLOOR = [160, 160, 160],
                COLOR_LIGHT = [255, 255, 0],
                COLOR_STUMP = [102, 51, 0],
                COLOR_LIT_STUMP = [167, 173, 47],
                ctx = document.getElementById("canvas").getContext("2d");
            ctx.canvas.width = CELL[0] * SIZE[0];
            ctx.canvas.height = CELL[1] * SIZE[1];
            ctx.fillStyle = "black";

            function redraw() {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.fillStyle = "rgb(" + COLOR_FLOOR.join(",") + ")";
                ctx.fillRect(0, 0, CELL[0] * SIZE[0], CELL[1] * SIZE[1]);
                for (var x = 0; x < SIZE[0]; x++) {
                    for (var y = 0; y < SIZE[1]; y++) {
                        var key = x + "," + y,
                            light = lights[key],
                            c = [];

                        if (light) {
                            c = COLOR_LIGHT;
                            if (tree_relations[key] && !tree_blocks[key]) {
                                c = COLOR_LIT_STUMP;
                            }
                            ctx.fillStyle = "rgb(" + c.join(",") + ")";
                            ctx.fillRect(x * CELL[0], y * CELL[1], CELL[0], CELL[1]);
                        } else if (!light && tree_relations[key]) {
                            c = tree_blocks[key] ? [0, 255, 0] : COLOR_STUMP;
                            ctx.fillStyle = "rgb(" + c.join(",") + ")";
                            ctx.fillRect(x * CELL[0], y * CELL[1], CELL[0], CELL[1]);
                        } else if (!light && invalid_blocks[key]) {
                            c = COLOR_WALL;
                            ctx.fillStyle = "rgb(" + c.join(",") + ")";
                            ctx.fillRect(x * CELL[0], y * CELL[1], CELL[0], CELL[1]);
                        }
                    }
                }
            }
        }
    }
    /********************
     * INITITIALIZATION *
     ********************/
    OpenLayers.ImgPath = "OpenLayers/dark/";
    
    // Start setting up the map, adding controls and layers
    baseLayers.forEach(function(layer) {
        map.addLayer(layer);
    });
    map.addControl(layerSwitcher);
    layerSwitcher.maximizeControl();
    map.addLayer(dayRangeLayer);
    map.addLayer(nightRangeLayer);
    map.addLayer(trueSightRangeLayer);
    map.addLayer(attackRangeLayer);
    map.addLayer(polygonLayer);
    map.addLayer(wardVisionLayer);
    //map.addLayer(visionSimulationLayer);
    map.addLayer(iconLayer);
    //map.addControl(new OpenLayers.Control.Permalink({anchor: true}));
    //map.addControl(new OpenLayers.Control.Attribution());
    map.addControl(coordinateControl);
    map.addControl(new OpenLayers.Control.KeyboardDefaults());
    //map.addControl(new OpenLayers.Control.ScaleLine());
    //map.addControl(new OpenLayers.Control.OverviewMap());
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
        var lonlat = map.getLonLatFromPixel(e.xy),
            worldXY = latLonToWorld(lonlat.lon, lonlat.lat),
            gnvXY,
            key,
            elevation,
            box_feature;

        if (wardVisionLayer.cursor_marker) {
            wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker);
        }

        if (document.getElementById("observerToggle").checked) {
            gnvXY = worldToGNVCoordinates(worldXY.x, worldXY.y);
            key = gnvXY.x + "," + gnvXY.y;
            elevation = getElevation(gnvXY.x, gnvXY.y);
            box_feature = createTileFeature(gnvToWorldCoordinates(gnvXY.x, gnvXY.y), (elevation == "invalid" || tree_blocks[key]) ? style.red : style.green);
            wardVisionLayer.addFeatures([box_feature]);
            wardVisionLayer.cursor_marker = box_feature;
        }
    });

    // Show/hide controls panel
    document.getElementById("controls-max").addEventListener("click", function(e) {
        document.querySelector(".controls").style.display = '';
        document.getElementById("controls-min").style.display = 'block';
        this.style.display = 'none';
    }, false);
    document.getElementById("controls-min").addEventListener("click", function(e) {
        document.querySelector(".controls").style.display = 'none';
        document.getElementById("controls-max").style.display = 'block';
        this.style.display = 'none';
    }, false);

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

    // Load elevation map image then load map data
    /*elevationImg.src = 'elevation.png';
    elevationImg.onload = function() {
        getJSON(map_data_path, onMapDataLoad);
        //getJSON('vision.json', onVisionDataLoad);

        canvas.width = elevationImg.width;
        canvas.height = elevationImg.height;
        canvas.getContext('2d').drawImage(elevationImg, 0, 0, elevationImg.width, elevationImg.height);
    }*/
    getJSON(map_data_path, onMapDataLoad);
    
    // Adjustment controls for fine-tuning map boundaries
    if (!DEBUG) {
        function updateMarkers() {
            console.log('updateMarkers');
            var layer = map.getLayersByName("Towers")[0];
            layer.clearMarkers();
            map_x_boundaries[0] = parseInt(document.getElementById('xmin').value);
            map_x_boundaries[1] = parseInt(document.getElementById('xmax').value);
            map_y_boundaries[0] = parseInt(document.getElementById('ymin').value);
            map_y_boundaries[1] = parseInt(document.getElementById('ymax').value);
            var data = map_data.npc_dota_tower;
            for (var i = 0; i < data.length; i++) {
                var latlon = worldToLatLon(data[i].x, data[i].y);
                marker = addMarker(layer, new OpenLayers.LonLat(latlon.x, latlon.y), OpenLayers.Popup.FramedCloud, "Click to toggle range overlay", false);
                marker.day_vision_radius = TOWER_DAY_VISION_RADIUS;
                marker.night_vision_radius = TOWER_NIGHT_VISION_RADIUS;
                marker.true_sight_radius = TOWER_TRUE_SIGHT_RADIUS;
                marker.attack_range_radius = TOWER_ATTACK_RANGE_RADIUS;
                marker.showInfo = false;

                marker.events.register("mousedown", layer, handleTowerMarkerClick);
                marker.tower_loc = data[i];
            }
            layer = map.getLayersByName(layerNames["trigger_multiple"])[0];
            layer.destroyFeatures();
            data = map_data.trigger_multiple;
            for (var i = 0; i < data.length; i++) {
                pnt = [];
                for (var j = 0; j < data[i].length; j++) {
                    var latlon = worldToLatLon(data[i][j].x, data[i][j].y);
                    //console.log(latlon.x, latlon.y);
                    //pnt.push(new OpenLayers.Geometry.Point(data[i][j][0], 5120 - data[i][j][1]));
                    pnt.push(new OpenLayers.Geometry.Point(latlon.x, latlon.y));
                }


                ln = new OpenLayers.Geometry.LinearRing(pnt);
                pf = new OpenLayers.Feature.Vector(ln, null, style.green);
                layer.addFeatures([pf]);
            }
            //loadJSONData({}, 'trigger_multiple', "npc_dota_neutral_spawner_box", map_data['trigger_multiple']);
            //loadKMLData({}, 'trigger_multiple', "npc_dota_neutral_spawner_box", "trigger_multiple.kml")
            //console.log('updatemarkers', layer);
        }
        document.getElementById('update').addEventListener('click', updateMarkers, false);
        document.getElementById('xmin').value = map_x_boundaries[0];
        document.getElementById('xmax').value = map_x_boundaries[1];
        document.getElementById('ymin').value = map_y_boundaries[0];
        document.getElementById('ymax').value = map_y_boundaries[1];
        document.getElementById('xmin').addEventListener('change', updateMarkers, false);
        document.getElementById('xmax').addEventListener('change', updateMarkers, false);
        document.getElementById('ymin').addEventListener('change', updateMarkers, false);
        document.getElementById('ymax').addEventListener('change', updateMarkers, false);
        $('.bound').spinner();
        $(".bound").on("spin", updateMarkers);
    }
}());