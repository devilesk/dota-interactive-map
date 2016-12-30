var VisionSimulation = require("dota-vision-simulation");
var worlddata = require("dota-vision-simulation/src/worlddata.json");
var getLightUnion = require("./getLightUnion");
var trim = require('./util/trim');
var QueryString = require('./util/queryString');
var Rollbar = require("rollbar-browser");

var rollbarConfig = {
    accessToken: 'fe7cf327f2b24bb8991e252239f6200f',
    captureUncaught: true,
    ignoredMessages: [
        "Error:  DOM Exception 18",
        "SecurityError: DOM Exception 18: An attempt was made to break through the security policy of the user agent.",
        "SecurityError:  An attempt was made to break through the security policy of the user agent.",
        "Script error."
    ],
    payload: {
        environment: 'development',
        client: {
            javascript: {
                source_map_enabled: true,
                code_version: "#code_version",
                // Optionally have Rollbar guess which frames the error was thrown from
                // when the browser does not provide line and column numbers.
                guess_uncaught_frames: true
            }
        }
    }
};

var rollbar = Rollbar.init(rollbarConfig);
    
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
        TOWER_TRUE_SIGHT_RADIUS = 700,
        TOWER_ATTACK_RANGE_RADIUS = 700,
        map_data_path = "data/",
        map_data,
        mapConstants = require('./mapConstants'),
        conversionFunctions = require('./conversionFunctions'),
        //zoomify = new OpenLayers.Layer.Zoomify( "Zoomify", map_tile_path, new OpenLayers.Size( mapConstants.map_w, mapConstants.map_h ) ),
        mapBounds = new OpenLayers.Bounds(0, 0, mapConstants.map_w, mapConstants.map_h),
        map = new OpenLayers.Map("map1", {
            theme: null,
            maxExtent: mapBounds,
            numZoomLevels: 5,
            maxResolution: Math.pow(2, 5-1 ),
            units: "m"
        }),
        layerKeys = [
            "no_wards",
            "ent_fow_blocker_node",
            "trigger_multiple",
            "npc_dota_roshan_spawner",
            "ent_dota_tree",
            "dota_item_rune_spawner",
            "dota_item_rune_spawner_bounty",
            "ent_dota_shop",
            "npc_dota_barracks",
            "npc_dota_building",
            "npc_dota_healer",
            "npc_dota_fort",
            "npc_dota_tower"
        ],
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
            no_wards: "Invalid Ward Locations",
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
        overlayGrouping = {
            "Day Vision Range": "Towers",
            "Night Vision Range": "Towers",
            "True Sight Range": "Towers",
            "Attack Range": "Towers",
            "Towers": "Structures",
            "Shrines": "Structures",
            "Ancients": "Structures",
            "Barracks": "Structures",
            "Buildings": "Structures",
            "Shops": "Structures",
            "Invalid Ward Locations": "Vision",
            "Vision Blocker": "Vision",
            "Placed Wards": "Vision",
            "Ward Vision": "Vision",
            "Ward Vision with Fog": "Vision"
        },
        layerSwitcher = new OpenLayers.Control.LayerSwitcher({
            ascending: false,
            overlayGrouping: overlayGrouping,
            onMaximizeWhenSmallScreen: minimizeControlList.bind(document.getElementById("controls-min"))
        }),
        coordinateControl = new OpenLayers.Control.MousePosition(),
        cursorLayer = new OpenLayers.Layer.Vector("Cursor", {displayInLayerSwitcher:false}),
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
        style = require('./styleConstants'),
        treeMarkers = {},
        VISION_SIMULATION = true,
        VISION_SIMULATION_ALWAYS = true,
        cutTrees = {};

    /***********************************
     * COORDINATE CONVERSION FUNCTIONS *
     ***********************************/

    var lerp = lerp,
        reverseLerp = conversionFunctions.reverseLerp,
        latLonToWorld = conversionFunctions.latLonToWorld,
        worldToLatLon = conversionFunctions.worldToLatLon,
        getTileRadius = conversionFunctions.getTileRadius,
        getScaledRadius = conversionFunctions.getScaledRadius,
        calculateDistance = conversionFunctions.calculateDistance;

    /********************
     * CONTROL HANDLERS *
     ********************/

    function handleTreeMarkerClick(event) {
        console.log('handleTreeMarkerClick', this);
        setTreeMarkerState(this, !this.treeVisible);
        setTreeQueryString();
    }
    
    function setTreeMarkerState(marker, state) {
        console.log('setTreeMarkerState', marker);
        var worldXY = latLonToWorld(marker.lonlat.lon, marker.lonlat.lat);

        marker.treeVisible = state;
        marker.setOpacity(state ? 1 : .4);
        
        if (VISION_SIMULATION) {
            var gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);
            vs.toggleTree(gridXY.x, gridXY.y);
        }

        var popupContentHTML = "Click to cut down tree.<br>This will affect the ward vision simulation.";
        if (state) {
            delete cutTrees[marker.tree_loc]
        }
        else {
            popupContentHTML = "Click to regrow tree.<br>This will affect the ward vision simulation.";
            cutTrees[marker.tree_loc] = marker;
        }
        
        marker.feature.data.popupContentHTML = popupContentHTML;
        if (marker.feature.popup) {
            marker.feature.popup.setContentHTML(popupContentHTML);
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

            if (!skipQueryStringUpdate) QueryString.addQueryStringValue("tower_vision", e.object.tower_loc.x + ',' + e.object.tower_loc.y);

            if (VISION_SIMULATION) updateVisibilityHandler(e.object.lonlat, e.object, TOWER_DAY_VISION_RADIUS);
        }
        else {
            dayRangeLayer.removeFeatures(e.object.day_vision_feature);
            nightRangeLayer.removeFeatures(e.object.night_vision_feature);
            trueSightRangeLayer.removeFeatures(e.object.true_sight_feature);
            attackRangeLayer.removeFeatures(e.object.attack_range_feature);

            if (e.object.vision_feature) visionSimulationLayer.removeFeatures(e.object.vision_feature);
            if (e.object.vision_center_feature) visionSimulationLayer.removeFeatures(e.object.vision_center_feature);
      
            if (!skipQueryStringUpdate) QueryString.removeQueryStringValue("tower_vision", e.object.tower_loc.x + ',' + e.object.tower_loc.y);
        }
        e.object.showInfo = !e.object.showInfo;
    }

    function handleWardClick(entityName) {
        return function(event) {
            var latlon = map.getLonLatFromPixel(event.xy),
                marker = placeWard(latlon, entityName);
            if (marker) QueryString.addQueryStringValue(marker.ward_type, marker.ward_loc);
        }
    }

    function placeWard(latlon, entityName, qs_value_worldXY) {
        if (!mapBounds.containsLonLat(latlon)) return;
        var entity = ENTITIES[entityName],
            marker = createWardMarker(entity.icon_path, latlon),
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(marker.lonlat.lon, marker.lonlat.lat), getScaledRadius(entity.radius), 40),
            feature = new OpenLayers.Feature.Vector(circle);
        iconLayer.addMarker(marker);
        wardVisionLayer.addFeatures(feature);
        marker.radius_feature = feature;
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

        if (VISION_SIMULATION && entityName == 'observer') updateVisibilityHandler(latlon, marker, ENTITIES.observer.radius);
        
        marker.events.register("click", marker, wardMarkerRemove);
        marker.events.register("touchstart", marker, wardMarkerRemove);
        
        console.log('placeWard', this);
        
        return marker;
    }

    function wardMarkerRemove(event) {
        if (this.radius_feature) wardVisionLayer.removeFeatures(this.radius_feature);
        if (this.vision_feature) visionSimulationLayer.removeFeatures(this.vision_feature);
        if (this.vision_center_feature) visionSimulationLayer.removeFeatures(this.vision_center_feature);
        console.log(this);
        iconLayer.removeMarker(this);
        OpenLayers.Event.stop(event);

        QueryString.removeQueryStringValue(this.ward_type, this.ward_loc);
        
        this.events.unregister("click", this, wardMarkerRemove);
        this.events.unregister("touchstart", this, wardMarkerRemove);
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
        QueryString.setQueryString('mode', null);
        for (var key in drawControls) {
            control = drawControls[key];
            console.log(this, this.value, key, this.value == key && this.checked);
            if (this.value == key && this.checked) {
                QueryString.setQueryString('mode', key);
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

    function handleTowerHoverPopup(event) {
        if (this.popup == null) {
            console.log(this.closeBox);
            this.popup = this.createPopup(this.closeBox);
            map.addPopup(this.popup);
            this.popup.show();
        }
        else {
            this.popup.toggle();
        }
        currentPopup = this.popup;
        OpenLayers.Event.stop(event);
    };

    function handleTreeHoverPopup(event) {
        if (this.popup == null) {
            this.popup = this.createPopup(this.closeBox);
            map.addPopup(this.popup);
            this.popup.show();
        }
        else {
            this.popup.toggle();
        }
        currentPopup = this.popup;
        OpenLayers.Event.stop(event);
    };
        
    function addMarker(markers, ll, popupClass, popupContentHTML, closeBox, overflow) {
        var feature = new OpenLayers.Feature(markers, ll),
            marker;

        feature.closeBox = closeBox;
        feature.popupClass = popupClass;
        feature.data.popupContentHTML = popupContentHTML;
        feature.data.overflow = overflow ? "auto" : "hidden";
        marker = feature.createMarker();
        marker.feature = feature;
        
        if (markers.name == "Towers") {
            marker.events.register("mouseover", feature, handleTowerHoverPopup);
            marker.events.register("mouseout", feature, handleTowerHoverPopup);
        }
        else if (markers.name == "Trees" && VISION_SIMULATION) {
            marker.events.register("mouseover", feature, handleTreeHoverPopup);
            marker.events.register("mouseout", feature, handleTreeHoverPopup);
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
        for (k in treeMarkers) {
            if (cutTrees[k]) {
                setTreeMarkerState(treeMarkers[k], true);
            }
        }
        var data = map_data;
        layerKeys.forEach(function (k) {
            var layer = map.getLayersByName(layerNames[k])[0];
            console.log('removing layer', layer, k);
            if (layer) {
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
                if (k != "trigger_multiple" && k != "ent_dota_tree" && k != "no_wards" && k != "ent_fow_blocker_node") {
                    markers[k] = new OpenLayers.Layer.Markers(layerNames[k], {visibility: false});
                    map.addLayer(markers[k]);
                    //markers[k].setVisibility(false);
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
                            marker.events.register("click", markers[k], handleTowerMarkerClick);
                            marker.events.register("touchstart", markers[k], handleTowerMarkerClick);
                            marker.tower_loc = data[k][i];
                        }
                    }
                }
                // Set up tree layer without creating tree markers yet
                else if (k == "ent_dota_tree") {
                    markers[k] = new OpenLayers.Layer.Markers(layerNames[k], {visibility: false});
                    map.addLayer(markers[k]);
                    //markers[k].setVisibility(false);
                    markers[k].data = data[k];
                }
                // Create neutral spawn markers and rectangles
                else if (k == "trigger_multiple") {
                    loadJSONData(markers, k, "npc_dota_neutral_spawner_box", data[k]);
                }
            }
            else if (VISION_SIMULATION) {
                if (k === "no_wards") {
                    loadGeoJSONData(markers, k, layerNames[k], style.red);
                }
                else if (k === "ent_fow_blocker_node") {
                    loadGeoJSONData(markers, k, layerNames[k], style.lightblue);
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
                QueryString.setQueryString('BaseLayer', event.layer.name.replace(/ /g, ''));
            }
            else {
                QueryString.setQueryString(event.layer.name.replace(/ /g, ''), event.layer.visibility ? true : null);
            }
        }
    }

    function loadTreeData() {
        console.log('start tree load');
        var layer = map.getLayersByName(layerNames["ent_dota_tree"])[0];
        console.log(layer);
        for (var i = 0; i < layer.data.length; i++) {
            var latlon = worldToLatLon(layer.data[i].x, layer.data[i].y);
            marker = addMarker(layer, new OpenLayers.LonLat(latlon.x, latlon.y), OpenLayers.Popup.FramedCloud, "Click to cut down tree.<br>This will affect the ward vision simulation.", false);
            marker.treeVisible = true;
            marker.tree_loc = layer.data[i].x + ',' + layer.data[i].y;
            if (VISION_SIMULATION) {
                marker.events.register("click", marker, handleTreeMarkerClick);
            }
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
        var mode = QueryString.getParameterByName('mode');
        if (mode) {
            var modeRadioButton = document.getElementById(mode + 'Toggle');
            if (modeRadioButton) {
                modeRadioButton.checked = true;
                toggleControl.call(modeRadioButton);
            }
        }
        var zoom = QueryString.getParameterByName('zoom');
        if (zoom) {
            map.zoomTo(parseInt(zoom));
        }
        var worldX = QueryString.getParameterByName('x');
        var worldY = QueryString.getParameterByName('y');
        if (worldX && worldY) {
            var lonlat = worldToLatLon(worldX, worldY);
            map.setCenter(new OpenLayers.LonLat(lonlat.x, lonlat.y), undefined, false, false);
        }
        
        var keys = ['observer', 'sentry'];
        for (var i = 0; i < keys.length; i++) {
            var wards = QueryString.getParameterByName(keys[i])
            if (wards) {
                ward_coordinates = trim(wards, ' ;').split(';')
                ward_coordinates.map(function(el) {
                    var coord = el.split(',');
                    var xy = worldToLatLon(parseFloat(coord[0]), parseFloat(coord[1]));
                    placeWard(new OpenLayers.LonLat(xy.x, xy.y), keys[i], el);
                });
            }
        }
        
        var baseLayerName = QueryString.getParameterByName('BaseLayer');
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
            value = QueryString.getParameterByName(layerName);
            if (value) {
                var layer = map.getLayersByName(layerNames[k])[0];
                console.log('parseQueryString', layer, layerNames[k], layerName, value == "true");
                if (layer) layer.setVisibility(value == "true");
            }
        }

        var cut_trees = QueryString.getParameterByName('cut_trees');
        if (cut_trees) {
            var layer = map.getLayersByName(layerNames["ent_dota_tree"])[0];
            if (!layer.loaded) loadTreeData();
            cut_tree_coordinates = trim(cut_trees, ' ;').split(';')
            console.log(treeMarkers, cut_tree_coordinates);
            for (var i = 0; i < cut_tree_coordinates.length; i++) {
                console.log(cut_tree_coordinates[i]);
                if (treeMarkers[cut_tree_coordinates[i]]) {
                    setTreeMarkerState(treeMarkers[cut_tree_coordinates[i]], false);
                }
            }
        }

        var tower_vision = QueryString.getParameterByName('tower_vision');
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
    
    function setTreeQueryString() {
        var value = Object.keys(cutTrees).join(';');
        QueryString.setQueryString('cut_trees', value || null);
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
    map.addLayer(cursorLayer);
    map.addLayer(dayRangeLayer);
    map.addLayer(nightRangeLayer);
    map.addLayer(trueSightRangeLayer);
    map.addLayer(attackRangeLayer);
    map.addLayer(polygonLayer);
    map.addLayer(wardVisionLayer);
    map.addLayer(visionSimulationLayer);
    map.addLayer(iconLayer);
    map.addControl(coordinateControl);
    map.addControl(new OpenLayers.Control.Navigation({
        dragPanOptions: {
            enableKinetic: true
        }
    }));
    map.addControl(new OpenLayers.Control.KeyboardDefaults());
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
        observer: new OpenLayers.Control.Click({
            onClick: handleWardClick('observer'),
            handlerOptions: {
                single: true
            }
        }),
        sentry: new OpenLayers.Control.Click({
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
                    out = "Radius: " + (.565352 * Math.sqrt(feature.geometry.getArea()) * mapConstants.scale).toFixed(0) + " units";
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


    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    };

    map.events.register("zoomend", map, debounce(function(){
        QueryString.setQueryString('zoom', map.getZoom());
    }, 500));

    map.events.register("moveend", map, debounce(function() {
        var mapCenter = map.getCenter();
        if (mapCenter) {
            var worldXY = latLonToWorld(mapCenter.lon, mapCenter.lat);
            QueryString.setQueryString('x', worldXY.x.toFixed(0));
            QueryString.setQueryString('y', worldXY.y.toFixed(0));
        }
    }, 500));

    // X/Y coordinate update display handler
    coordinateControl.formatOutput = function (lonlat) {
        var worldXY = latLonToWorld(lonlat.lon, lonlat.lat);
        return worldXY.x.toFixed(0) + ', ' + worldXY.y.toFixed(0);
    };
    
    map.events.register("mousemove", map, function(e) {
        /*if (wardVisionLayer.cursor_marker) {
            if (wardVisionLayer.cursor_marker.vision_center_feature) wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker.vision_center_feature);
            if (wardVisionLayer.cursor_marker.vision_feature) wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker.vision_feature);
            wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker);
        }*/
        cursorLayer.destroyFeatures();
    
        // create and add cursor marker polygon if in place observer mode
        if (VISION_SIMULATION && vs.ready && document.getElementById("observerToggle").checked) {
            var lonlat = map.getLonLatFromPixel(e.xy);
            if (!mapBounds.containsLonLat(lonlat)) return;
            
            var worldXY = latLonToWorld(lonlat.lon, lonlat.lat);
            var gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);
            
            var treePts = vs.tree_relations[gridXY.key];
            var treeBlocking = false;
            if (treePts) {
                for (var i = 0 ; i < treePts.length; i++) {
                    var treePt = treePts[i];
                    treeBlocking = vs.tree_state[treePt.key];
                    if (treeBlocking) break;
                }
            }
            var cursor_style = style.green;
            if (!vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
                cursor_style = style.red;
            }
            var box_feature = createTileFeature(vs.GridXYtoWorldXY(gridXY.x, gridXY.y), cursor_style);
            cursorLayer.addFeatures([box_feature]);
            //wardVisionLayer.cursor_marker = box_feature;
            
            if (VISION_SIMULATION_ALWAYS) updateVisibilityHandler(lonlat, null, ENTITIES.observer.radius);
        }
    });

    // Show/hide controls panel
    document.getElementById("controls-max").addEventListener("click", function(e) {
        document.querySelector(".controls").style.display = '';
        document.getElementById("controls-min").style.display = 'block';
        this.style.display = 'none';
        if (layerSwitcher.isSmallScreen()) {
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
    
    // Initially hide controls if screen is small
    if (layerSwitcher.isSmallScreen()) {
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

    // Vision simulation on/off
    document.getElementById("visionSimulationControl").addEventListener("change", function(e) {
        VISION_SIMULATION = this.checked;
        document.getElementById("alwaysSimulateControl").disabled = !this.checked;
    }, false);

    // Always simulate vision on/off
    document.getElementById("alwaysSimulateControl").addEventListener("change", function(e) {
        VISION_SIMULATION_ALWAYS = this.checked;
    }, false);

    // Update travel time display when movespeed input changes
    document.getElementById("movespeed").addEventListener("change", function(e) {
        document.getElementById("traveltime").innerHTML = (lastDistance / document.getElementById("movespeed").value).toFixed(2);
    }, false);

    // Set up panel radio button toggle handlers
    document.getElementById('navigateToggle').addEventListener('click', toggleControl, false);
    document.getElementById('lineToggle').addEventListener('click', toggleControl, false);
    document.getElementById('circleToggle').addEventListener('click', toggleControl, false);
    document.getElementById('observerToggle').addEventListener('click', toggleControl, false);
    document.getElementById('sentryToggle').addEventListener('click', toggleControl, false);
    
    document.getElementById('reset').addEventListener('click', function () {
        if (history && history.replaceState) history.replaceState(null, "", window.location.href.split("?")[0]);
        resetMarkerLayers();
        polygonLayer.destroyFeatures();
        wardVisionLayer.destroyFeatures();
        visionSimulationLayer.destroyFeatures();
        iconLayer.clearMarkers();
        drawControls.line.cancel();
        drawControls.circle.cancel();
        map.setBaseLayer(baseLayers[0]);
        map.zoomToMaxExtent();
        document.getElementById('dataControl').selectedIndex = 0;
        init();
    }, false);
    
    document.getElementById('dataControl').addEventListener('change', function () {
        QueryString.setQueryString('data', document.getElementById('dataControl').value);
        resetMarkerLayers();
        init();
    }, false);
    
    function init() {
        var data = QueryString.getParameterByName('data');
        if (data) {
            document.getElementById('dataControl').value = data;
        }
        VISION_SIMULATION = data != "687";
        //document.querySelector('label[for="visionSimulationControl"]').style.display = VISION_SIMULATION ? 'inline' : 'none';
        document.getElementById("visionSimulationControl").disabled = !VISION_SIMULATION;
        document.getElementById("alwaysSimulateControl").disabled = !VISION_SIMULATION;
        getJSON(map_data_path + getDataVersion() + '/mapdata.json', onMapDataLoad);
    }
    
    function getDataVersion() {
        return document.getElementById('dataControl').value;
    }

    function updateVisibilityHandler(latlon, marker, radius) {
        if (!vs.ready) return;
        
        //console.log(latlon, marker, radius);
        var worldXY = latLonToWorld(latlon.lon, latlon.lat);
        var gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);
        if (vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
            // create and add center marker polygon
            var box_feature = createTileFeature(vs.GridXYtoWorldXY(gridXY.x, gridXY.y), style.green);
            if (marker) {
                visionSimulationLayer.addFeatures([box_feature]);
                marker.vision_center_feature = box_feature;
            }

            // execute vision simulation
            vs.updateVisibility(gridXY.x, gridXY.y, getTileRadius(radius));
            
            // merge light points into a single polygon and add to vision layer
            var outlines = getLightUnion(vs.grid, vs.lights);
            var polygonList = outlines.map(function (outlinePoints) {
                var ringPoints = outlinePoints.map(function (pt) {
                    var worldXY = vs.GridXYtoWorldXY(pt.x, pt.y);
                    var latlon = worldToLatLon(worldXY.x, worldXY.y);
                    return new OpenLayers.Geometry.Point(latlon.x, latlon.y);
                });
                var ring = new OpenLayers.Geometry.LinearRing(ringPoints);
                return new OpenLayers.Geometry.Polygon([ring]);
            });
            var multiPolygon = new OpenLayers.Geometry.MultiPolygon(polygonList);
            var visionFeature = new OpenLayers.Feature.Vector(multiPolygon, null, style.yellow);
            if (marker) {
                visionSimulationLayer.addFeatures([visionFeature]);
                marker.vision_feature = visionFeature;
            }
            else {
                cursorLayer.addFeatures([visionFeature]);
            }
        }
    }
    
    var getSizePoll;
    var t1 = Date.now();
    var vs = new VisionSimulation(worlddata, vision_data_image_path, function () {
        console.log('vs loaded', Date.now() - t1);
        console.log('map.getSize()', map.getSize());
        initCheck();
    });
    
    var initCheckCount = 0;
    var maxInitCheckCount = 40;
    function initCheck() {
        if (map.getSize()) {
            init();
        }
        else {
            initCheckCount++;
            console.log('map size null');
            if (initCheckCount < maxInitCheckCount) {
                map.updateSize();
                setTimeout(initCheck, 250);
            }
            else {
                rollbar.error("Max init check exceeded");
                alert("There was a problem loading the map.");
            }
        }
    }
    
    function loadGeoJSONData(markers, k, name, style) {
        var filename = map_data_path + getDataVersion() + '/' + k + '2.json';
        markers[k] = new OpenLayers.Layer.Vector(name, {
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                url: filename,
                format: new OpenLayers.Format.GeoJSON()
            }),
            visibility: false
        });
        markers[k].style = style;
        map.addLayer(markers[k]);
    }
}

module.exports = App;