import InteractiveMap from './InteractiveMap';

import ModalControl from './InteractiveMap/controls/modal';

class App {
    constructor(root, mapTilePath, visionDataImagePath, version, options) {
        this.root = root;

        this.aboutModal = new ModalControl(root, 'about', 'about-open', 'about-close');
        this.helpModal = new ModalControl(root, 'help', 'help-open', 'help-close');

        this.root.getElementById('buildDate').innerHTML = '#build_date';
        this.root.getElementById('releaseTag').innerHTML = '#release_tag';
        this.root.getElementById('codeVersion').innerHTML = '#code_version';
        this.interactiveMap = new InteractiveMap(root, mapTilePath, version, visionDataImagePath, options);


        this.interactiveMap.initialize();
    }
}

export default App;
