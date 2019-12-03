import Circle from 'ol/geom/Circle';
import { unByKey } from 'ol/Observable';
import mapConstants from '../mapConstants';
import styles from '../styleDefinitions';

const laneData = {
    700: {
        npc_dota_spawner_good_bot: [1.25, 10],
        npc_dota_spawner_bad_bot: [0.75, 22],
        npc_dota_spawner_good_top: [0.75, 2],
        npc_dota_spawner_bad_top: [1.25, 2],
    },
    706: {
        npc_dota_spawner_good_bot: [1.3, 16],
        npc_dota_spawner_bad_bot: [0.65, 22],
        npc_dota_spawner_good_top: [1.3, 8],
        npc_dota_spawner_bad_top: [0.65, 8],
    },
    707: {
        npc_dota_spawner_good_bot: [1.3, 4],
        npc_dota_spawner_bad_bot: [0.65, 6],
        npc_dota_spawner_good_top: [1.3, 2],
        npc_dota_spawner_bad_top: [0.65, 2],
    },
    709: {
        npc_dota_spawner_good_bot: [1.3, 4],
        npc_dota_spawner_bad_bot: [0.65, 6],
        npc_dota_spawner_good_top: [1.3, 2],
        npc_dota_spawner_bad_top: [0.65, 2],
    },
    715: {
        npc_dota_spawner_good_bot: [1.3, 4],
        npc_dota_spawner_bad_bot: [0.65, 6],
        npc_dota_spawner_good_top: [1.3, 2],
        npc_dota_spawner_bad_top: [0.65, 2],
    },
    719: {
        npc_dota_spawner_good_bot: [1.3, 4],
        npc_dota_spawner_bad_bot: [0.65, 6],
        npc_dota_spawner_good_top: [1.3, 2],
        npc_dota_spawner_bad_top: [0.65, 2],
    },
    default: {
        npc_dota_spawner_good_bot: [0, 0],
        npc_dota_spawner_bad_bot: [0, 0],
        npc_dota_spawner_good_top: [0, 0],
        npc_dota_spawner_bad_top: [0, 0],
    },
};

const getDistance = (speed, elapsedTime) => speed * elapsedTime / 1000 * mapConstants.scale;

const getLaneData = (version, id, index) => (laneData[version] || laneData.default)[id][index];

const getElapsedDistance = (version, id, elapsedTime, playbackSpeed, bNoAdjust) => {
    elapsedTime *= playbackSpeed;
    const base = mapConstants.creepBaseMovementSpeed;
    if (bNoAdjust) return getDistance(base, elapsedTime);

    switch (id) {
    case 'npc_dota_spawner_good_bot':
    case 'npc_dota_spawner_bad_top':
    case 'npc_dota_spawner_good_top':
    case 'npc_dota_spawner_bad_bot':
        const boostMultiplier = getLaneData(version, id, 0);
        const boostDuration = getLaneData(version, id, 1) * 1000;
        if (elapsedTime < boostDuration) {
            return getDistance(base * boostMultiplier, elapsedTime);
        }

        return getDistance(base * boostMultiplier, boostDuration) + getDistance(base, elapsedTime - boostDuration);

        break;
    default:
        return getDistance(base, elapsedTime);
        break;
    }
};

class CreepControl {
    constructor(InteractiveMap, id) {
        this.InteractiveMap = InteractiveMap;
        this.postComposeListener = null;
        this.postComposeHandler = this.animateCreeps.bind(this);
        this.playbackSpeed = 1;
        this.paused = true;
        this.pauseTime = null;
        this.title = 'Lane Animation';

        this.id = id;
        this.info = this.root.getElementById(id);
        this.infoContent = this.root.querySelector('#timer-time');
        this.playPauseBtn = this.root.querySelector('#timer-playPause');
        this.playPauseBtn.addEventListener('click', () => this.playPause(true), false);

        this.stopBtn = this.root.querySelector('#timer-stop');
        this.stopBtn.addEventListener('click', () => this.stop(true), false);

        this.fasterBtn = this.root.querySelector('#timer-faster');
        this.fasterBtn.addEventListener('click', () => this.faster(true), false);

        this.slowerBtn = this.root.querySelector('#timer-slower');
        this.slowerBtn.addEventListener('click', () => this.slower(true), false);
    }

    get root() {
        return this.InteractiveMap.root;
    }

    show(message) {
        this.setContent(message);
        this.info.classList.remove('slideUp');
        this.info.classList.add('slideDown');
    }

    setContent(html) {
        this.infoContent.innerHTML = html;
    }

    open() {
        this.info.classList.add('slideDown');
        this.info.classList.remove('slideUp');
    }

    close() {
        this.info.classList.add('slideUp');
        this.info.classList.remove('slideDown');
    }

    slower() {
        const oldVal = this.playbackSpeed;
        this.playbackSpeed = Math.max(1, this.playbackSpeed - 1);
        this.updatePlayback(oldVal, this.playbackSpeed);
    }

    faster() {
        const oldVal = this.playbackSpeed;
        this.playbackSpeed += 1;
        this.updatePlayback(oldVal, this.playbackSpeed);
    }

    updatePlayback(oldVal, newVal) {
        const layer = this.InteractiveMap.getMapLayer('npc_dota_spawner');
        if (layer) {
            const features = layer.getSource().getFeatures();
            let elapsedTime = this.currentTime - this.startTime;
            let adjustedElapsedTime = elapsedTime * oldVal / newVal;
            this.startTime = this.currentTime - adjustedElapsedTime;
            for (let i = 0; i < features.length; i++) {
                const feature = features[i];
                const waveTimes = feature.get('waveTimes');
                if (waveTimes) {
                    let j = waveTimes.length;
                    while (j--) {
                        elapsedTime = this.currentTime - waveTimes[j];
                        adjustedElapsedTime = elapsedTime * oldVal / newVal;
                        waveTimes[j] = this.currentTime - adjustedElapsedTime;
                    }
                }
            }
        }
    }

    start() {
        if (!this.postComposeListener) {
            this.postComposeListener = this.InteractiveMap.map.on('postcompose', this.postComposeHandler);
        }
        if (this.paused) this.playPause();
        this.InteractiveMap.map.render();
    }

    stop() {
        unByKey(this.postComposeListener);
        this.postComposeListener = null;
        const layer = this.InteractiveMap.getMapLayer('npc_dota_spawner');
        if (layer) {
            const features = layer.getSource().getFeatures();
            for (let i = 0; i < features.length; i++) {
                const feature = features[i];
                feature.set('waveTimes', null, true);
            }
        }
        this.startTime = null;
        if (!this.paused) this.playPause();
        this.pauseTime = null;
        this.InteractiveMap.map.render();
        this.setContent(this.title);
    }

    playPause() {
        this.paused = !this.paused;
        if (this.paused) {
            this.playPauseBtn.classList.add('icon-play');
            this.playPauseBtn.classList.remove('icon-pause');
        }
        else {
            this.playPauseBtn.classList.add('icon-pause');
            this.playPauseBtn.classList.remove('icon-play');
            this.start();
        }
    }

    activate() {
        this.show(this.title);
    }

    deactivate() {
        this.stop();
        this.close();
    }

    animateCreeps(event) {
        const vectorContext = event.vectorContext;
        const frameState = event.frameState;
        this.currentTime = frameState.time;
        const layer = this.InteractiveMap.getMapLayer('npc_dota_spawner');
        const pathLayer = this.InteractiveMap.getMapLayer('path_corner');
        if (!layer || !pathLayer) return;
        const features = layer.getSource().getFeatures();
        if (!this.startTime) this.startTime = this.currentTime;
        if (this.paused) {
            if (this.pauseTime == null) this.pauseTime = frameState.time;
            this.currentTime = this.pauseTime;
        }
        else if (this.pauseTime != null) {
            for (let i = 0; i < features.length; i++) {
                const feature = features[i];
                const waveTimes = feature.get('waveTimes');
                if (waveTimes) {
                    let j = waveTimes.length;
                    while (j--) {
                        waveTimes[j] += (this.currentTime - this.pauseTime);
                    }
                }
            }
            this.startTime += (this.currentTime - this.pauseTime);
            this.pauseTime = null;
        }
        for (let i = 0; i < features.length; i++) {
            const feature = features[i];
            const id = feature.getId();
            const pathFeature = pathLayer.getSource().getFeatureById(id);
            let waveTimes = feature.get('waveTimes');
            if (!waveTimes) {
                waveTimes = [this.currentTime];
                feature.set('waveTimes', waveTimes, true);
            }
            if (this.currentTime - waveTimes[waveTimes.length - 1] >= 30000 / this.playbackSpeed) {
                waveTimes.push(this.currentTime);
            }
            let j = waveTimes.length;
            while (j--) {
                let path = feature.get('path');
                let coords;
                if (!path) {
                    path = pathFeature.getGeometry().clone();
                    coords = path.getCoordinates();
                    coords[0] = feature.getGeometry().getCoordinates();
                    path.setCoordinates(coords);
                    feature.set('path', path, true);
                }
                const pathLength = path.getLength();
                coords = path.getCoordinates();
                const elapsedTime = this.currentTime - waveTimes[j];
                const elapsedDistance = getElapsedDistance(this.InteractiveMap.version, id, elapsedTime, this.playbackSpeed);
                const elapsedFraction = Math.max(0, elapsedDistance / pathLength);
                let endPoint;
                if (elapsedFraction >= 1) {
                    endPoint = coords[coords.length - 1];
                    waveTimes.splice(j, 1);
                }
                else {
                    endPoint = path.getCoordinateAt(elapsedFraction);
                }

                const point = new Circle(endPoint);
                vectorContext.setStyle(styles.creepColor(feature));
                vectorContext.drawCircle(point);
            }
        }
        let timeText = `${(((this.currentTime - this.startTime) % (60000 / this.playbackSpeed)) / 1000 * this.playbackSpeed).toFixed(1)}s`;
        if (this.playbackSpeed > 1) timeText += `, ${this.playbackSpeed}x`;
        this.setContent(timeText);
        frameState.animate = true;
    }
}

export default CreepControl;
