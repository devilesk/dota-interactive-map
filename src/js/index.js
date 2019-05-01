import InteractiveMap from './InteractiveMap';

import rollbar from './rollbar';

import ModalControl from './controls/modal';

class App {
    constructor(root, mapTilePath, visionDataImagePath, version) {
        this.root = root;

        this.aboutModal = new ModalControl(root, 'about', 'about-open', 'about-close');
        this.helpModal = new ModalControl(root, 'help', 'help-open', 'help-close');

        this.root.getElementById('buildDate').innerHTML = '#build_date';
        this.root.getElementById('releaseTag').innerHTML = '#release_tag';
        this.root.getElementById('codeVersion').innerHTML = '#code_version';

        this.interactiveMap = new InteractiveMap(root, mapTilePath, version, visionDataImagePath);

        this.interactiveMap.initialize();
    }
}

export default App;
