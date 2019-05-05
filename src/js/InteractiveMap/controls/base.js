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

    get vs() {
        return this.InteractiveMap.vs;
    }
}

export default BaseControl;
