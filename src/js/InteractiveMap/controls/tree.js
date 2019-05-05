import BaseControl from './base';
import { setQueryString, getParameterByName } from '../util/queryString';

class TreeControl extends BaseControl {
    constructor(InteractiveMap) {
        super(InteractiveMap);
        this.allTreesCutState = false;
    }

    get layer() {
        return this.InteractiveMap.getMapLayer('ent_dota_tree');
    }

    get source() {
        return this.layer.getSource();
    }

    get features() {
        return this.source.getFeatures();
    }

    get treeMap() {
        this.features.forEach((feature) => {
            const dotaProps = feature.get('dotaProps');
            const worldXY = `${dotaProps.x},${dotaProps.y}`;
            treeMap[worldXY] = feature;
        });
        return treeMap;
    }

    updateQueryString() {
        const keys = ['cut_trees', 'uncut_trees'];
        const values = this.features
            .filter(feature => !!feature.get('isCut') != this.allTreesCutState)
            .map((feature) => {
                const dotaProps = feature.get('dotaProps');
                return `${dotaProps.x},${dotaProps.y}`;
            })
            .join(';');
        setQueryString(keys[this.allTreesCutState ? 1 : 0], values || null);
        setQueryString(keys[this.allTreesCutState ? 0 : 1], null);
        this.root.getElementById('toggle-ent_dota_tree').checked = this.allTreesCutState;
    }

    parseQueryString() {
        ['uncut_trees', 'cut_trees'].forEach((treeCutState, index) => {
            let values = getParameterByName(treeCutState);
            if (values) {
                this.toggleAllTrees(!index, true);
                values = values.split(';');
                values.forEach((worldXY) => {
                    const feature = this.treeMap[worldXY];
                    if (feature) {
                        if (!!feature.get('isCut') === !index) {
                            this.toggleTree(feature, feature.get('dotaProps'), true, true);
                        }
                    }
                });
            }
        });
        this.updateQueryString();

        this.InteractiveMap.controls.ward.updateAllWardVision();
    }

    toggleTree(feature, dotaProps, bSkipQueryStringUpdate, bSkipWardVisionUpdate) {
        const gridXY = this.vs.WorldXYtoGridXY(dotaProps.x, dotaProps.y);
        this.vs.toggleTree(gridXY.x, gridXY.y);
        feature.set('isCut', !feature.get('isCut'));
        if (!bSkipQueryStringUpdate) this.updateQueryString();

        if (!bSkipWardVisionUpdate) this.InteractiveMap.controls.ward.updateAllWardVision();
    }

    toggleAllTrees(state, bSkipQueryStringUpdate, bSkipWardVisionUpdate) {
        this.allTreesCutState = state;
        this.features.forEach((feature) => {
            if (!!feature.get('isCut') != state) {
                this.toggleTree(feature, feature.get('dotaProps'), true, true);
            }
        });
        if (!bSkipQueryStringUpdate) this.updateQueryString();

        if (!bSkipWardVisionUpdate) this.InteractiveMap.controls.ward.updateAllWardVision();
    }
}

export default TreeControl;
