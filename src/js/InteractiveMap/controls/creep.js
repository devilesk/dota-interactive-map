import BaseInfoControl from './baseInfo';
import Circle from 'ol/geom/Circle';
import { unByKey } from 'ol/Observable';
import mapConstants from '../definitions/mapConstants';
import styles from '../definitions/styles';
import laneData from '../definitions/laneData';

const getDistance = (speed, elapsedTime) => speed * elapsedTime / 1000 * mapConstants.scale;

const getElapsedDistance = (version, id, elapsedTime, playbackSpeed, bNoAdjust) => {
    elapsedTime *= playbackSpeed;
    const base = mapConstants.creepBaseMovementSpeed;
    if (bNoAdjust) return getDistance(base, elapsedTime);

    switch (id) {
    case 'npc_dota_spawner_good_bot':
    case 'npc_dota_spawner_bad_top':
    case 'npc_dota_spawner_good_top':
    case 'npc_dota_spawner_bad_bot':
        const boostMultiplier = laneData[version][id][0];
        const boostDuration = laneData[version][id][1] * 1000;
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

class CreepControl extends BaseInfoControl {
    constructor(InteractiveMap, element) {
        super(InteractiveMap, element, {
            close: 'slideUp',
            open: 'slideDown',
        });
        this.postComposeListener = null;
        this.postComposeHandler = this.animateCreeps.bind(this);
        this.playbackSpeed = 1;
        this._paused = true;
        this.pauseTime = null;
        this.title = 'Lane Animation';

        this.on('unpaused', () => this.play());
        this.on('stop', () => this.stop());
        this.on('faster', () => this.faster());
        this.on('slower', () => this.slower());

        const btnPlayPause = this.element.querySelector('#timer-playPause');
        if (btnPlayPause) {
            btnPlayPause.addEventListener('click', () => {
                this.paused = !this.paused;
            }, false);
            this.on('paused', () => {
                btnPlayPause.classList.add('icon-play');
                btnPlayPause.classList.remove('icon-pause');
            });
            this.on('unpaused', () => {
                btnPlayPause.classList.add('icon-pause');
                btnPlayPause.classList.remove('icon-play');
            });
        }
        const btnStop = this.element.querySelector('#timer-stop');
        if (btnStop) btnStop.addEventListener('click', () => this.emit('stop'), false);
        const btnFaster = this.element.querySelector('#timer-faster');
        if (btnFaster) btnFaster.addEventListener('click', () => this.emit('faster'), false);
        const btnSlower = this.element.querySelector('#timer-slower');
        if (btnSlower) btnSlower.addEventListener('click', () => this.emit('slower'), false);
    }

    get contentElement() {
        return this.element.querySelector('#timer-time');
    }

    get paused() {
        return this._paused;
    }

    set paused(value) {
        this._paused = value;
        this.emit(value ? 'paused' : 'unpaused');
    }

    get pathLayer() {
        return this.InteractiveMap.getMapLayer('path_corner');
    }

    get layer() {
        return this.InteractiveMap.getMapLayer('npc_dota_spawner');
    }

    get source() {
        return this.layer.getSource();
    }

    get features() {
        return this.source.getFeatures();
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
        if (this.layer) {
            let elapsedTime = this.currentTime - this.startTime;
            let adjustedElapsedTime = elapsedTime * oldVal / newVal;
            this.startTime = this.currentTime - adjustedElapsedTime;
            for (const feature of this.features) {
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

    play() {
        if (!this.postComposeListener) {
            this.postComposeListener = this.map.on('postcompose', this.postComposeHandler);
        }
        this.map.render();
    }

    stop() {
        unByKey(this.postComposeListener);
        this.postComposeListener = null;
        if (this.layer) {
            this.features.forEach(feature => feature.set('waveTimes', null, true));
        }
        this.startTime = null;
        this.paused = true;
        this.pauseTime = null;
        this.map.render();
        this.content = this.title;
    }

    activate() {
        this.content = this.title;
        this.opened = true;
    }

    deactivate() {
        this.stop();
        this.opened = false;
    }

    animateCreeps(event) {
        const vectorContext = event.vectorContext;
        const frameState = event.frameState;
        this.currentTime = frameState.time;
        if (!this.layer || !this.pathLayer) return;
        if (!this.startTime) this.startTime = this.currentTime;
        if (this.paused) {
            if (this.pauseTime == null) this.pauseTime = frameState.time;
            this.currentTime = this.pauseTime;
        }
        else if (this.pauseTime != null) {
            for (const feature of this.features) {
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
        const pathLayerSource = this.pathLayer.getSource();
        for (const feature of this.features) {
            const id = feature.getId();
            const pathFeature = pathLayerSource.getFeatureById(id);
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
        this.content = timeText;
        frameState.animate = true;
    }
}

export default CreepControl;
