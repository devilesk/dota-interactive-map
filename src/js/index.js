import InteractiveMap from './InteractiveMap';

import ModalControl from './InteractiveMap/controls/modal';

class App {
    constructor(root, mapTilePath, visionDataImagePath, version, options) {
        this.root = root;

        this.aboutModal = new ModalControl(root, 'about', 'about-open', 'about-close');
        this.helpModal = new ModalControl(root, 'help', 'help-open', 'help-close');

        this.interactiveMap = new InteractiveMap(root, mapTilePath, version, visionDataImagePath, options);

        this.root.getElementById('buildDate').innerHTML = this.interactiveMap.buildDate;
        this.root.getElementById('releaseTag').innerHTML = this.interactiveMap.releaseTag;
        this.root.getElementById('codeVersion').innerHTML = this.interactiveMap.codeVersion;

        this.interactiveMap.initialize();
    }
}

export default App;
