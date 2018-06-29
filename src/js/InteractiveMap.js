import View from 'ol/view';
import Map from 'ol/map';
import Collection from 'ol/collection';
import SourceVector from 'ol/source/vector';
import TileImage from 'ol/source/tileimage';
import LayerVector from 'ol/layer/vector';
import LayerTile from 'ol/layer/tile';
import LayerGroup from 'ol/layer/group';
import TileGrid from 'ol/tilegrid/tilegrid';
//import proj from 'ol/proj';
import control from 'ol/control';
import interaction from 'ol/interaction';
import Feature from 'ol/feature';
import Circle from 'ol/geom/circle';
import { pixelProj } from './projections';
import mapConstants from './mapConstants';
import styles from './styleDefinitions';
import { loadGeoJSON, loadJSON, loadLayerGroupFromData } from './dataLoader';
import getJSON from './util/getJSON';
import {getScaledRadius, worldToLatLon} from './conversion';
import baseLayerDefinitions from './baseLayerDefinitions';
import layerDefinitions from './layerDefinitions';

class InteractiveMap {
    constructor(map_tile_path, version) {
        this.map_tile_path = map_tile_path;
        this.MODE = 'navigation';
        this.layerDefs = layerDefinitions;
        this.baseLayerDefs = baseLayerDefinitions;
        this.view = new View({
            zoom: 0,
            center: mapConstants.imgCenter,
            projection: pixelProj,
            resolutions: mapConstants.resolutions,
            extent: [0, 0, mapConstants.map_w, mapConstants.map_h]
        });
        this.controls = {};
        this.data = {};
        this.layerIndex = {};
        this.version = version;
        this.visionRadius = mapConstants.visionRadius.observer;
        this.movementSpeed = mapConstants.defaultMovementSpeed;
        this.isNight = false;
        this.isDarkness = false;
        this.layerFilters = {
            marker: layer => {
                const layerDef = layer.get('layerDef');
                return layer.getVisible() && layerDef && (layerDef.group == 'structure' || layerDef.group == 'object');
            }
        };
        this.map = new Map({
            controls: control.defaults({ zoom: false, attribution: false, rotate: false }),
            interactions: interaction.defaults({altShiftDragRotate:false, pinchRotate:false}),
            target: 'map',
            view: this.view
        });
        
        this.highlightSource = new SourceVector({});
        this.highlightLayer =  new LayerVector({
            source: this.highlightSource,
            style: styles.highlight
        });

        this.selectSource = new SourceVector({});
        this.selectLayer =  new LayerVector({
            source: this.selectSource,
            style: styles.select
        });

        this.wardRangeSource = new SourceVector({});
        this.wardRangeLayer =  new LayerVector({
            source: this.wardRangeSource
        });

        this.rangeSources = {
            dayVision: new SourceVector({}),
            nightVision: new SourceVector({}),
            trueSight: new SourceVector({}),
            attackRange: new SourceVector({})
        }
        this.rangeLayers = {
            dayVision: new LayerVector({
                source: this.rangeSources.dayVision,
                style: styles.dayVision
            }),
            nightVision: new LayerVector({
                source: this.rangeSources.nightVision,
                style: styles.nightVision
            }),
            trueSight: new LayerVector({
                source: this.rangeSources.trueSight,
                style: styles.trueSight
            }),
            attackRange: new LayerVector({
                source: this.rangeSources.attackRange,
                style: styles.attackRange
            })
        }

        // setup base layers
        this.baseLayers = this.baseLayerDefs.map(layerDef => {
            const layer = new LayerTile({
                title: layerDef.name,
                type: 'base',
                extent: pixelProj.getExtent(), //proj.pixel.getExtent()
                source: new TileImage({
                    tileGrid: new TileGrid({
                        origin: [0, mapConstants.map_h],
                        resolutions: mapConstants.resolutions
                    }),
                    projection: pixelProj,
                    url: this.map_tile_path + layerDef.group + '/' + layerDef.id + '/{z}/tile_{x}_{y}.jpg'
                }),
                visible: !!layerDef.visible
            });
            layer.set('layerId', layerDef.group + '-' + layerDef.id, true);
            layer.set('layerDef', layerDef, true);
            return layer;
        });
        
        this.baseLayerGroup = new LayerGroup({
            title: 'Base Layers',
            layers: new Collection(this.baseLayers)
        });
    }
    
    getMapData(version) {
        return this.data[version || this.version] || {};
    }

    getData(version) {
        return this.getMapData(version).data || {};
    }

    getOverlayData(version) {
        return this.getData(version).data || {};
    }

    getStatData(version) {
        return this.getData(version).stats || {};
    }

    getMapLayerIndex(version) {
        version = version || this.version;
        if (!this.layerIndex[version]) this.layerIndex[version] = {};
        return this.layerIndex[version];
    }

    getMapLayer(layerId, version) {
        return this.getMapLayerIndex(version)[layerId];
    }

    getMapDataPath(version) {
        version = version || this.version;
        return 'data/' + version + '/mapdata.json';
    }

    setMapLayers(version, callback) {
        this.getDataJSON(version, (err, data) => {
            if (!err) {
                const currentLayerGroup = this.map.getLayerGroup();
                currentLayerGroup.setVisible(false);
                this.map.setLayerGroup(data.layerGroup);
                this.map.getLayerGroup().setVisible(true);
            }
            if (callback) callback(err);
        });
    }

    getDataJSON(version, callback) {
        if (this.data[version]) {
            callback(null, this.data[version]);
        }
        else {
            getJSON(this.getMapDataPath(version), (err, data) => {
                if (!err) {
                    this.data[version] = {
                        data: data,
                        layerGroup: new LayerGroup({
                            title: version + ' Layers',
                            layers: new Collection([
                                this.baseLayerGroup,
                                loadLayerGroupFromData(this, data, version, this.getMapLayerIndex(version), this.layerDefs)
                            ])
                        })
                    };
                }
                callback(err, this.data[version]);
            });
        }
    }

    panTo(coordinate, duration) {
        if (duration == null) duration = 1000;
        this.view.animate({
          center: coordinate,
          duration: 1000
        });
    }

    checkAndHighlightWard(pixel) {
        const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature, {
            layerFilter: this.controls.ward.layerFilter
        });
        this.highlightWard(feature);
        return feature;
    }

    highlightWard(feature) {
        if (feature !== this.highlightedWard) {
            if (this.highlightedWard) {
                this.highlightedWard.setStyle(styles[this.highlightedWard.get('wardType')].normal);
            }
            if (feature) {
                feature.setStyle(styles[feature.get('wardType')][this.MODE == 'navigate' ? 'highlight' : 'remove']);
            }
            this.highlightedWard = feature;
        }
    }

    unhighlightWard() {
        if (this.highlightedWard) {
            this.highlightedWard.setStyle(styles[this.highlightedWard.get('wardType')].normal);
        }
        this.highlightedWard = null;
    }

    highlight(feature) {
        if (feature !== this.highlightedFeature) {
            if (this.highlightedFeature) {
                this.highlightSource.removeFeature(this.highlightedFeature);
            }
            if (feature) {
                this.highlightSource.addFeature(feature);
            }
            this.highlightedFeature = feature;
        }
    }

    unhighlight() {
        if (this.highlightedFeature) {
            this.highlightSource.removeFeature(this.highlightedFeature);
        }
        this.highlightedFeature = null;
    }

    toggle(feature) {    
        if (feature) {
            if (feature.get("clicked")) {
                this.deselect(feature);
                return false;
            }
            else {
                this.select(feature);
                return true;
            }
        }
    }

    select(feature) {    
        if (feature && !feature.get("clicked")) {
            if (feature == this.highlightedFeature) {
                this.unhighlight();
            }
            this.selectSource.addFeature(feature);
            feature.set("clicked", true, true);
        }
    }

    deselectAll() {
        this.selectSource.getFeatures().forEach(feature => feature.set("clicked", false, true));
        this.selectSource.clear();
    }
    deselect(feature) {
        if (feature && feature.get("clicked")) {
            if (feature == this.highlightedFeature) {
                this.unhighlight();
            }
            
            this.selectSource.removeFeature(feature);
            feature.set("clicked", false, true);
        }
    }

    hasVisionRadius(feature) {
        return this.getFeatureVisionRadius(feature) != null;
    }

    getFeatureVisionRadius(feature, dotaProps, unitClass, rangeType) {
        dotaProps = dotaProps || feature.get('dotaProps');
        unitClass = unitClass || dotaProps.unitClass;
        const unitStats = this.getStatData()[unitClass] || {};
        let radius;
        if (unitClass == 'observer') {
            radius = this.visionRadius || mapConstants.visionRadius[unitClass];
            if (this.isDarkness) {
                radius = Math.min(mapConstants.visionRadius.darkness, radius);
            }
        }
        else if (unitClass == 'sentry') {
            radius = mapConstants.visionRadius[unitClass];
        }
        else {
            if (rangeType && !unitStats.hasOwnProperty(rangeType)) return null;
            
            switch (rangeType) {
                case 'dayVision':
                case 'nightVision':
                    radius = unitStats[rangeType];
                    if (this.isDarkness) {
                        radius = Math.min(mapConstants.visionRadius.darkness, radius);
                    }
                case 'trueSight':
                case 'attackRange':
                    radius = unitStats[rangeType];
                break;
                default:
                    if (this.isNight) {
                        radius = unitStats.nightVision;
                    }
                    else {
                        radius = unitStats.dayVision;
                    }
                    if (this.isDarkness) {
                        radius = Math.min(mapConstants.visionRadius.darkness, radius);
                    }
                break;
            }
        }
        return radius;
    }

    getRangeCircle(feature, coordinate, unitClass, rangeType, radius) {
        const dotaProps = feature.get('dotaProps');
        radius = radius || this.getFeatureVisionRadius(feature, dotaProps, unitClass, rangeType);
        if (radius == null) return null;
        if (!coordinate) {
            coordinate = worldToLatLon([dotaProps.x, dotaProps.y]);
        }
        const circle = new Feature(new Circle(coordinate, getScaledRadius(radius)));
        return circle;
    }

}

export default InteractiveMap;