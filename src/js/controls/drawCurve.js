import SourceVector from 'ol/source/vector';
import LayerVector from 'ol/layer/vector';
import LineString from 'ol/geom/linestring';
import GeoJSON from 'ol/format/geojson';
import Draw from 'ol/interaction/draw';
import Feature from 'ol/feature';
import { latLonToWorld, worldToLatLon, getTileRadius } from './../conversion';
import getLightUnion from './../getLightUnion';
import styles from './../styleDefinitions';
import bezier from '@turf/bezier';

function DrawCurveControl(InteractiveMap) {
    const self = this;
    this.InteractiveMap = InteractiveMap;
    const map = InteractiveMap.map;
    this.source = new SourceVector({
        defaultDataProjection : 'pixel'
    });
    this.layer =  new LayerVector({
        source: this.source,
        style: styles.visionSimulation
    });
    map.addLayer(this.layer);
    const format = new GeoJSON();
    let sketch;
    geometryFunction = function(coordinates, geometry) {
        if (!geometry) {
            geometry = new LineString(null);
        }

        const line = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": coordinates
            }
        };
        const curved = bezier(line);
        geometry.setCoordinates(curved["geometry"]["coordinates"]);
        sketch = geometry.simplify(10);
        return sketch;
    };

    draw = new Draw({
        source: this.source,
        type: 'LineString',
        geometryFunction: geometryFunction
    });
    
    draw.on('drawend',
        function() {
            console.log('drawend', sketch);
            const feature = new Feature({geometry: sketch});
            console.log(JSON.stringify(format.writeFeatureObject(feature)));
            self.InteractiveMap.wardRangeSource.addFeature(feature);
            sketch = null;
            
        }, self);
    map.addInteraction(draw);
}

export default DrawCurveControl;