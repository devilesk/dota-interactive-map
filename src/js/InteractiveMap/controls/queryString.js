import BaseControl from './base';
import { setQueryString, getParameterByName } from '../util/queryString';

class QueryStringControl extends BaseControl {
    constructor(InteractiveMap, target) {
        super(InteractiveMap);
        
        this.InteractiveMap.on('map.moveend', (x, y) => {
            setQueryString('x', x);
            setQueryString('y', y);
            setQueryString('zoom', Math.round(this.InteractiveMap.view.getZoom()));
        });
        
        this.InteractiveMap.on('dataId', value => setQueryString('data', value));
        
        this.InteractiveMap.on('mode', value => setQueryString('mode', value === 'navigate' ? null : value));
        
        this.InteractiveMap.on('layer', (layerId, value) => {
            const layer = this.InteractiveMap.getMapLayer(layerId);
            if (layer) {
                const param = layer.get('title').replace(/ /g, '');
                setQueryString(param, value ? true : null);
            }
        });
    }
    
    initialize() {
        const x = getParameterByName('x');
        const y = getParameterByName('y');
        if (x && y) {
            this.InteractiveMap.emit('panTo', x, y);
        }
        this.InteractiveMap.emit('zoom', getParameterByName('zoom') || this.InteractiveMap.options.zoom);
        
        this.InteractiveMap.emit('changeMode', getParameterByName('mode') || this.InteractiveMap.options.mode);

        this.InteractiveMap.emit('baseLayer', getParameterByName('BaseLayer') || this.InteractiveMap.baseLayers[0].get('layerId'));

        this.InteractiveMap.emit('dataId', getParameterByName('data'));
        
        this.InteractiveMap.layerDefs.forEach((layerDef) => {
            const param = layerDef.name.replace(/ /g, '');
            const value = getParameterByName(param);
            if (value && value !== 'false') {
                this.InteractiveMap.emit('layerDef.visible', layerDef, true);
                setQueryString(param, true);
            }
            else {
                setQueryString(param, null);
            }
            if (layerDef.id === 'ent_dota_tree') {
                this.InteractiveMap.emit('treesEnabled', layerDef.visible);
            }
        });
    }
}

export default QueryStringControl;
