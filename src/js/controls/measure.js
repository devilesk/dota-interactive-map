import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import Circle from 'ol/geom/Circle';
import Draw from 'ol/interaction/Draw';
import Overlay from 'ol/Overlay';
import { unByKey } from 'ol/Observable';
import styles from '../styleDefinitions';

/**
 * Format area output.
 * @param {ol.geom.Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
const formatArea = (polygon) => {
    const area = polygon.getArea();
    const output = area > 10000
        ? `${Math.round(area / 1000000 * 100) / 100} ` + 'km<sup>2</sup>'
        : `${Math.round(area * 100) / 100} ` + 'm<sup>2</sup>';
    return output;
};

const formatRadius = (circle) => {
    const length = Math.round(circle.getRadius());
    const output = `Radius: ${length} ` + `units<br>Area: ${(Math.PI * length * length).toFixed(2)} units<sup>2</sup>`;
    return output;
};

/**
 * Format length output.
 * @param {ol.geom.LineString} line The line.
 * @return {string} The formatted length.
 */
const formatLength = (InteractiveMap, line) => {
    const length = Math.round(line.getLength());
    const output = `Distance: ${length} ` + `units<br>Travel Time: ${(length / InteractiveMap.movementSpeed).toFixed(2)}s at ${InteractiveMap.movementSpeed}ms`;
    return output;
};

class MeasureControl {
    constructor(InteractiveMap) {
        this.InteractiveMap = InteractiveMap;
        this.map = InteractiveMap.map;
        this.source = new SourceVector({});

        this.layer = new LayerVector({ source: this.source });

        /**
         * Currently drawn feature.
         * @type {ol.Feature}
         */
        this.sketch = null;

        /**
         * The help tooltip element.
         * @type {Element}
         */
        this.helpTooltipElement = null;

        /**
         * Overlay to show the help messages.
         * @type {ol.Overlay}
         */
        this.helpTooltip = null;

        /**
         * The measure tooltip element.
         * @type {Element}
         */
        this.measureTooltipElement = null;

        /**
         * Overlay to show the measurement.
         * @type {ol.Overlay}
         */
        this.measureTooltip = null;

        /**
         * Message to show when the user is drawing a polygon.
         * @type {string}
         */
        this.continuePolygonMsg = 'Click to continue drawing the polygon';

        /**
         * Message to show when the user is drawing a line.
         * @type {string}
         */
        this.continueLineMsg = 'Click to continue drawing the line';

        /**
         * Handle pointer move.
         * @param {ol.MapBrowserEvent} evt The event.
         */

        this.pointerMoveListener = null;

        this.mouseOutHandler = () => this.helpTooltipElement.classList.add('hidden');

        this.type = 'line';

        this.draw = null; // global so we can remove it later

        this.active = false;
    }

    get root() {
        return this.InteractiveMap.root;
    }

    /**
     * Creates a new measure tooltip
     */
    createMeasureTooltip() {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'tooltip tooltip-measure';
        this.measureTooltip = new Overlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
        });
        this.map.addOverlay(this.measureTooltip);
    }

    /**
     * Creates a new help tooltip
     */
    createHelpTooltip() {
        if (this.helpTooltipElement) {
            this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
        }
        this.helpTooltipElement = document.createElement('div');
        this.helpTooltipElement.className = 'tooltip hidden';
        this.helpTooltip = new Overlay({
            element: this.helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left',
        });
        this.map.addOverlay(this.helpTooltip);
    }

    addInteraction() {
        const type = (this.type == 'circle' ? 'Circle' : 'LineString');
        this.draw = new Draw({
            source: this.source,
            type,
            style: styles.measure,
        });
        this.map.addInteraction(this.draw);

        this.createHelpTooltip();

        let listener;
        this.draw.on('drawstart', (evt) => {
            this.source.clear(true);
            this.InteractiveMap.controls.info.setContent('');
            this.InteractiveMap.controls.info.close(true);
            // set sketch
            this.sketch = evt.feature;
            /** @type {ol.Coordinate|undefined} */
            let tooltipCoord = evt.coordinate;

            listener = this.sketch.getGeometry().on('change', (evt) => {
                const geom = evt.target;
                let output;
                if (geom instanceof Circle) {
                    output = formatRadius(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                else if (geom instanceof LineString) {
                    output = formatLength(this.InteractiveMap, geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                this.InteractiveMap.controls.info.setContent(output);
                this.InteractiveMap.controls.info.open(true);
            });
        });

        this.draw.on('drawend', () => {
            // unset sketch
            this.sketch = null;
            // unset tooltip so that a new one can be created
            unByKey(listener);
        });
    }

    change(type) {
        this.type = type;
        unByKey(this.pointerMoveListener);
        this.map.getViewport().removeEventListener('mouseout', this.mouseOutHandler);
        this.map.removeInteraction(this.draw);
        this.source.clear(true);
        this.addInteraction();
        this.active = true;
    }

    activate() {
        if (!this.active) {
            this.pointerMoveListener = this.map.on('pointermove', (evt) => {
                if (evt.dragging) {
                    return;
                }
                /** @type {string} */
                let helpMsg = 'Click to start drawing';

                if (this.sketch) {
                    const geom = (this.sketch.getGeometry());
                    if (geom instanceof Polygon) {
                        helpMsg = this.continuePolygonMsg;
                    }
                    else if (geom instanceof LineString) {
                        helpMsg = this.continueLineMsg;
                    }
                }

                this.helpTooltipElement.innerHTML = helpMsg;
                this.helpTooltip.setPosition(evt.coordinate);

                this.helpTooltipElement.classList.remove('hidden');
            });
            this.map.getViewport().addEventListener('mouseout', this.mouseOutHandler);
            this.addInteraction();
        }
        this.active = true;
    }

    deactivate() {
        unByKey(this.pointerMoveListener);
        this.map.getViewport().removeEventListener('mouseout', this.mouseOutHandler);
        this.map.removeInteraction(this.draw);
        this.source.clear(true);
        this.active = false;
    }
}

export default MeasureControl;
