var styles = require('./styleDefinitions');

function MeasureControl(InteractiveMap) {
    var self = this;
    this.InteractiveMap = InteractiveMap;
    this.map = InteractiveMap.map;
    this.info = InteractiveMap.infoControl;
    this.source = new ol.source.Vector({
        defaultDataProjection : 'pixel'
    });
    
    this.layer =  new ol.layer.Vector({
        source: this.source
    });

    /**
     * Currently drawn feature.
     * @type {ol.Feature}
     */
    var sketch;

    /**
     * The help tooltip element.
     * @type {Element}
     */
    var helpTooltipElement;

    /**
     * Overlay to show the help messages.
     * @type {ol.Overlay}
     */
    var helpTooltip;

    /**
     * The measure tooltip element.
     * @type {Element}
     */
    var measureTooltipElement;

    /**
     * Overlay to show the measurement.
     * @type {ol.Overlay}
     */
    var measureTooltip;
    
    /**
     * Message to show when the user is drawing a polygon.
     * @type {string}
     */
    var continuePolygonMsg = 'Click to continue drawing the polygon';
    
    /**
     * Message to show when the user is drawing a line.
     * @type {string}
     */
    var continueLineMsg = 'Click to continue drawing the line';
    
    /**
     * Handle pointer move.
     * @param {ol.MapBrowserEvent} evt The event.
     */
    var pointerMoveHandler = function(evt) {
        if (evt.dragging) {
            return;
        }
        /** @type {string} */
        var helpMsg = 'Click to start drawing';

        if (sketch) {
            var geom = (sketch.getGeometry());
            if (geom instanceof ol.geom.Polygon) {
                helpMsg = continuePolygonMsg;
            } else if (geom instanceof ol.geom.LineString) {
                helpMsg = continueLineMsg;
            }
        }

        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);

        helpTooltipElement.classList.remove('hidden');
    };
    
    var pointerMoveListener;
    var mouseOutHandler = function() {
        helpTooltipElement.classList.add('hidden');
    };

    this.type = 'line';

    var draw; // global so we can remove it later


    /**
     * Format length output.
     * @param {ol.geom.LineString} line The line.
     * @return {string} The formatted length.
     */
    var formatLength = function(line) {
        var length = Math.round(line.getLength());
        var output;
        output = 'Distance: ' + length + ' ' + 'units<br>Travel Time: ' + (length / self.InteractiveMap.movementSpeed).toFixed(2) + 's at ' + self.InteractiveMap.movementSpeed + 'ms';
        return output;
    };
    
    var formatRadius = function(circle) {
        var length = Math.round(circle.getRadius());
        var output;
        output = 'Radius: ' + length + ' ' + 'units<br>Area: ' + (Math.PI * length * length).toFixed(2) + ' units<sup>2</sup>';
        return output;
    };


    /**
     * Format area output.
     * @param {ol.geom.Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    var formatArea = function(polygon) {
        var area = polygon.getArea();
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    };
    var self = this;
    function addInteraction() {
        var type = (self.type == 'circle' ? 'Circle' : 'LineString');
        draw = new ol.interaction.Draw({
            source: self.source,
            type: /** @type {ol.geom.GeometryType} */ (type),
            style: styles.measure
        });
        self.map.addInteraction(draw);

        //createMeasureTooltip();
        createHelpTooltip();

        var listener;
        draw.on('drawstart',
            function(evt) {
                self.source.clear(true);
                self.info.setContent("");
                self.info.close(true);
                // set sketch
                sketch = evt.feature;
                /** @type {ol.Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function(evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof ol.geom.Circle) {
                        output = formatRadius(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    } else if (geom instanceof ol.geom.LineString) {
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
                ol.Observable.unByKey(listener);
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
        helpTooltip = new ol.Overlay({
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
        measureTooltip = new ol.Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        self.map.addOverlay(measureTooltip);
    }

    this.change = function (type) {
        self.type = type;
        ol.Observable.unByKey(pointerMoveListener);
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
        ol.Observable.unByKey(pointerMoveListener);
        self.map.getViewport().removeEventListener('mouseout', mouseOutHandler);
        self.map.removeInteraction(draw);
        self.source.clear(true);
        this.active = false;
    }
}

module.exports = MeasureControl;