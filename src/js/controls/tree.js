import { setQueryString, getParameterByName } from '../util/queryString';

class TreeControl {
    constructor(InteractiveMap) {
        this.InteractiveMap = InteractiveMap;
        this.allTreesCutState = false;
    }

    get root() {
        return this.InteractiveMap.root;
    }

    updateQueryString() {
        const keys = ['cut_trees', 'uncut_trees'];
        const layer = this.InteractiveMap.getMapLayer('ent_dota_tree');
        const source = layer.getSource();
        const features = source.getFeatures();
        const values = features
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
        const layer = this.InteractiveMap.getMapLayer('ent_dota_tree');
        const source = layer.getSource();
        const features = source.getFeatures();
        const treeMap = {};
        features.forEach((feature) => {
            const dotaProps = feature.get('dotaProps');
            const worldXY = `${dotaProps.x},${dotaProps.y}`;
            treeMap[worldXY] = feature;
        });
        ['uncut_trees', 'cut_trees'].forEach((treeCutState, index) => {
            let values = getParameterByName(treeCutState);
            if (values) {
                this.toggleAllTrees(!index, true);
                values = values.split(';');
                values.forEach((worldXY) => {
                    const feature = treeMap[worldXY];
                    if (feature) {
                        if (!!feature.get('isCut') == !index) {
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
        const gridXY = this.InteractiveMap.vs.WorldXYtoGridXY(dotaProps.x, dotaProps.y);
        this.InteractiveMap.vs.toggleTree(gridXY.x, gridXY.y);
        feature.set('isCut', !feature.get('isCut'));
        if (!bSkipQueryStringUpdate) this.updateQueryString();

        if (!bSkipWardVisionUpdate) this.InteractiveMap.controls.ward.updateAllWardVision();
    }

    toggleAllTrees(state, bSkipQueryStringUpdate, bSkipWardVisionUpdate) {
        this.allTreesCutState = state;
        const layer = this.InteractiveMap.getMapLayer('ent_dota_tree');
        const source = layer.getSource();
        const features = source.getFeatures();
        features.forEach((feature) => {
            if (!!feature.get('isCut') != state) {
                this.toggleTree(feature, feature.get('dotaProps'), true, true);
            }
        });
        if (!bSkipQueryStringUpdate) this.updateQueryString();

        if (!bSkipWardVisionUpdate) this.InteractiveMap.controls.ward.updateAllWardVision();
    }
}

export default TreeControl;
