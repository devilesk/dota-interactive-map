import worlddata from 'dota-vision-simulation/src/worlddata.json';
import InteractiveMap from './InteractiveMap';

import rollbar from './rollbar';

import ModalControl from './controls/modal';
const aboutModal = new ModalControl('about', 'about-open', 'about-close');
const helpModal = new ModalControl('help', 'help-open', 'help-close');

document.getElementById('buildDate').innerHTML = "#build_date";
document.getElementById('releaseTag').innerHTML = "#release_tag";
document.getElementById('codeVersion').innerHTML = "#code_version";

class App {
    constructor (map_tile_path, vision_data_image_path, version) {
        const interactiveMap = new InteractiveMap(map_tile_path, version, vision_data_image_path, worlddata);
        
        interactiveMap.initialize();
    }
}

export default App;