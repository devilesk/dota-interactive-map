import SourceVector from 'ol/source/vector';
import LayerVector from 'ol/layer/vector';
import Polygon from 'ol/geom/polygon';
import LineString from 'ol/geom/linestring';
import Circle from 'ol/geom/circle';
import Draw from 'ol/interaction/draw';
import Overlay from 'ol/overlay';
import Observable from 'ol/observable';
import styles from './../styleDefinitions';

function MeasureControl(InteractiveMap) {
    const self = this;
    this.InteractiveMap = InteractiveMap;
    this.map = InteractiveMap.map;
    this.info = InteractiveMap.infoControl;
    this.source = new SourceVector({
        defaultDataProjection : 'pixel'
    });
    
    this.layer =  new LayerVector({
        source: this.source
    });

    /**
     * Currently drawn feature.
     * @type {ol.Feature}
     */
    let sketch;

    /**
     * The help tooltip element.
     * @type {Element}
     */
    let helpTooltipElement;

    /**
     * Overlay to show the help messages.
     * @type {ol.Overlay}
     */
    let helpTooltip;

    /**
     * The measure tooltip element.
     * @type {Element}
     */
    let measureTooltipElement;

    /**
     * Overlay to show the measurement.
     * @type {ol.Overlay}
     */
    let measureTooltip;
    
    /**
     * Message to show when the user is drawing a polygon.
     * @type {string}
     */
    const continuePolygonMsg = 'Click to continue drawing the polygon';
    
    /**
     * Message to show when the user is drawing a line.
     * @type {string}
     */
    const continueLineMsg = 'Click to continue drawing the line';
    
    /**
     * Handle pointer move.
     * @param {ol.MapBrowserEvent} evt The event.
     */
    const pointerMoveHandler = function(evt) {
        if (evt.dragging) {
            return;
        }
        /** @type {string} */
        let helpMsg = 'Click to start drawing';

        if (sketch) {
            const geom = (sketch.getGeometry());
            if (geom instanceof Polygon) {
                helpMsg = continuePolygonMsg;
            } else if (geom instanceof LineString) {
                helpMsg = continueLineMsg;
            }
        }

        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);

        helpTooltipElement.classList.remove('hidden');
    };
    
    let pointerMoveListener;
    const mouseOutHandler = function() {
        helpTooltipElement.classList.add('hidden');
    };

    this.type = 'line';

    let draw; // global so we can remove it later


    /**
     * Format length output.
     * @param {ol.geom.LineString} line The line.
     * @return {string} The formatted length.
     */
    const formatLength = function(line) {
        const length = Math.round(line.getLength());
        const output = 'Distance: ' + length + ' ' + 'units<br>Travel Time: ' + (length / self.InteractiveMap.movementSpeed).toFixed(2) + 's at ' + self.InteractiveMap.movementSpeed + 'ms';
        return output;
    };
    
    const formatRadius = function(circle) {
        const length = Math.round(circle.getRadius());
        const output = 'Radius: ' + length + ' ' + 'units<br>Area: ' + (Math.PI * length * length).toFixed(2) + ' units<sup>2</sup>';
        return output;
    };


    /**
     * Format area output.
     * @param {ol.geom.Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    const formatArea = function(polygon) {
        const area = polygon.getArea();
        const output = area > 10000
            ? (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>'
            : (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
        return output;
    };

    function addInteraction() {
        const type = (self.type == 'circle' ? 'Circle' : 'LineString');
        draw = new Draw({
            source: self.source,
            type: /** @type {ol.geom.GeometryType} */ (type),
            style: styles.measure
        });
        self.map.addInteraction(draw);

        //createMeasureTooltip();
        createHelpTooltip();

        let listener;
        draw.on('drawstart',
            function(evt) {
                self.source.clear(true);
                self.info.setContent("");
                self.info.close(true);
                // set sketch
                sketch = evt.feature;
                /** @type {ol.Coordinate|undefined} */
                let tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function(evt) {
                    const geom = evt.target;
                    let output;
                    if (geom instanceof Circle) {
                        output = formatRadius(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    } else if (geom instanceof LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    self.info.setContent(output);
                    self.info.open(true);
                    //measureTooltipElement.innerHTML = output;
                    //measureTooltip.setPosition(tooltipCoord);
                });
            }, self);

        draw.on('drawend',
            function() {
                //measureTooltipElement.className = 'tooltip tooltip-static';
                //measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                //measureTooltipElement = null;
                //createMeasureTooltip();
                Observable.unByKey(listener);
            }, self);
    }


    /**
     * Creates a new help tooltip
     */
    function createHelpTooltip() {
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'tooltip hidden';
        helpTooltip = new Overlay({
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        self.map.addOverlay(helpTooltip);
    }


    /**
     * Creates a new measure tooltip
     */
    function createMeasureTooltip() {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'tooltip tooltip-measure';
        measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        self.map.addOverlay(measureTooltip);
    }

    this.change = function (type) {
        self.type = type;
        Observable.unByKey(pointerMoveListener);
        self.map.getViewport().removeEventListener('mouseout', mouseOutHandler);
        self.map.removeInteraction(draw);
        self.source.clear(true);
        addInteraction.call(this);
        this.active = true;
    }
    
    this.active = false;
    this.activate = function () {
        if (!this.active) {
            pointerMoveListener = self.map.on('pointermove', pointerMoveHandler);
            self.map.getViewport().addEventListener('mouseout', mouseOutHandler);
            addInteraction();
        }
        this.active = true;
    }
    
    this.deactivate = function () {
        Observable.unByKey(pointerMoveListener);
        self.map.getViewport().removeEventListener('mouseout', mouseOutHandler);
        self.map.removeInteraction(draw);
        self.source.clear(true);
        this.active = false;
    }
}

export default MeasureControl;