class BaseControl {
    constructor(InteractiveMap) {
        this.InteractiveMap = InteractiveMap;
    }
    
    get root() {
        return this.InteractiveMap.root;
    }
    
    get map() {
        return this.InteractiveMap.map;
    }
}

export default BaseControl;
