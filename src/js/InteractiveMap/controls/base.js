import EventEmitter from 'events';

class BaseControl extends EventEmitter {
    constructor(InteractiveMap) {
        super();
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
