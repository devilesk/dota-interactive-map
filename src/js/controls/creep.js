import Circle from 'ol/geom/circle';
import Observable from 'ol/observable';
import mapConstants from './../mapConstants';
import styles from './../styleDefinitions';

var laneData = {
    700: {
        npc_dota_spawner_good_bot: [1.25, 10],
        npc_dota_spawner_bad_bot: [0.75, 22],
        npc_dota_spawner_good_top: [0.75, 2],
        npc_dota_spawner_bad_top: [1.25, 2]
    },
    706: {
        npc_dota_spawner_good_bot: [1.3, 16],
        npc_dota_spawner_bad_bot: [0.65, 22],
        npc_dota_spawner_good_top: [1.3, 8],
        npc_dota_spawner_bad_top: [0.65, 8]
    },
    707: {
        npc_dota_spawner_good_bot: [1.3, 4],
        npc_dota_spawner_bad_bot: [0.65, 6],
        npc_dota_spawner_good_top: [1.3, 2],
        npc_dota_spawner_bad_top: [0.65, 2]
    },
    709: {
        npc_dota_spawner_good_bot: [1.3, 4],
        npc_dota_spawner_bad_bot: [0.65, 6],
        npc_dota_spawner_good_top: [1.3, 2],
        npc_dota_spawner_bad_top: [0.65, 2]
    },
    715: {
        npc_dota_spawner_good_bot: [1.3, 4],
        npc_dota_spawner_bad_bot: [0.65, 6],
        npc_dota_spawner_good_top: [1.3, 2],
        npc_dota_spawner_bad_top: [0.65, 2]
    }
}

function CreepControl(InteractiveMap) {
    this.InteractiveMap = InteractiveMap;
    this.postComposeListener = null;
    this.postComposeHandler = this.animateCreeps.bind(this);
    this.playbackSpeed = 1;
    this.paused = true;
    this.pauseTime = null;
    this.title = 'Lane Animation';
}

CreepControl.prototype.show = function (message) {
    this.setContent(message);
    this.info.classList.remove('slideUp');
    this.info.classList.add('slideDown');
}

CreepControl.prototype.setContent = function (html) {
    this.infoContent.innerHTML = html;
}

CreepControl.prototype.open = function () {
    this.info.classList.add('slideDown');
    this.info.classList.remove('slideUp');
}

CreepControl.prototype.close = function () {
    this.info.classList.add('slideUp');
    this.info.classList.remove('slideDown');
}

CreepControl.prototype.initialize = function (id) {
    var self = this;
    this.id = id;
    this.info = document.getElementById(id);
    this.infoContent = document.querySelector('#timer-time');
    this.playPauseBtn = document.querySelector('#timer-playPause');
    this.playPauseHandler = function (evt) {
        self.playPause.call(self, true);
    }
    this.playPauseBtn.addEventListener('click', this.playPauseHandler, false);
    
    this.stopBtn = document.querySelector('#timer-stop');
    this.stopHandler = function (evt) {
        self.stop.call(self, true);
    }
    this.stopBtn.addEventListener('click', this.stopHandler, false);
    
    this.fasterBtn = document.querySelector('#timer-faster');
    this.fasterHandler = function (evt) {
        self.faster.call(self, true);
    }
    this.fasterBtn.addEventListener('click', this.fasterHandler, false);
    
    this.slowerBtn = document.querySelector('#timer-slower');
    this.slowerHandler = function (evt) {
        self.slower.call(self, true);
    }
    this.slowerBtn.addEventListener('click', this.slowerHandler, false);
}

CreepControl.prototype.slower = function () {
    var oldVal = this.playbackSpeed;
    this.playbackSpeed = Math.max(1, this.playbackSpeed - 1);
    this.updatePlayback(oldVal, this.playbackSpeed);
}

CreepControl.prototype.faster = function () {
    var oldVal = this.playbackSpeed;
    this.playbackSpeed += 1;
    this.updatePlayback(oldVal, this.playbackSpeed);
}

CreepControl.prototype.updatePlayback = function (oldVal, newVal) {
    var layer = this.InteractiveMap.getMapLayer('npc_dota_spawner');
    if (layer) {
        var features = layer.getSource().getFeatures();
        var elapsedTime = this.currentTime - this.startTime;
        var adjustedElapsedTime = elapsedTime * oldVal / newVal;
        this.startTime = this.currentTime - adjustedElapsedTime;
        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            var waveTimes = feature.get('waveTimes');
            if (waveTimes) {
                var j = waveTimes.length;
                while (j--) {
                    var elapsedTime = this.currentTime - waveTimes[j];
                    var adjustedElapsedTime = elapsedTime * oldVal / newVal;
                    waveTimes[j] = this.currentTime - adjustedElapsedTime;
                }
            }
        }
    }
}

CreepControl.prototype.start = function () {
    if (!this.postComposeListener) {
        this.postComposeListener = this.InteractiveMap.map.on('postcompose', this.postComposeHandler);
    }
    if (this.paused) this.playPause();
    this.InteractiveMap.map.render();
}

CreepControl.prototype.stop = function () {
    Observable.unByKey(this.postComposeListener);
    this.postComposeListener = null;
    var layer = this.InteractiveMap.getMapLayer('npc_dota_spawner');
    if (layer) {
        var features = layer.getSource().getFeatures();
        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            feature.set('waveTimes', null, true);
        }
    }
    this.startTime = null;
    if (!this.paused) this.playPause();
    this.pauseTime = null;
    this.InteractiveMap.map.render();
    this.setContent(this.title);
}

CreepControl.prototype.playPause = function () {
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

CreepControl.prototype.activate = function () {
    this.InteractiveMap.toggleLayerMenuOption('npc_dota_spawner', true);
    this.InteractiveMap.toggleLayerMenuOption('path_corner', true);
    this.show(this.title);
}

CreepControl.prototype.deactivate = function () {
    this.InteractiveMap.toggleLayerMenuOption('npc_dota_spawner', false);
    this.InteractiveMap.toggleLayerMenuOption('path_corner', false);
    this.stop();
    this.close();
}

function getDistance(speed, elapsedTime) {
    return speed * elapsedTime / 1000 * mapConstants.scale;
}

function getElapsedDistance(version, id, elapsedTime, playbackSpeed, bNoAdjust) {
    elapsedTime = elapsedTime * playbackSpeed;
    var base = mapConstants.creepBaseMovementSpeed;
    if (bNoAdjust) return getDistance(base, elapsedTime);

    switch (id) {
        case 'npc_dota_spawner_good_bot':
        case 'npc_dota_spawner_bad_top':
        case 'npc_dota_spawner_good_top':
        case 'npc_dota_spawner_bad_bot':
            var boostMultiplier = laneData[version][id][0];
            var boostDuration = laneData[version][id][1] * 1000;
            if (elapsedTime < boostDuration) {
                return getDistance(base * boostMultiplier, elapsedTime);
            }
            else {
                return getDistance(base * boostMultiplier, boostDuration) + getDistance(base, elapsedTime - boostDuration);
            }
        break;
        default:
            return getDistance(base, elapsedTime);
        break;
    }
}

CreepControl.prototype.animateCreeps = function (event) {
    var vectorContext = event.vectorContext;
    var frameState = event.frameState;
    this.currentTime = frameState.time;
    var layer = this.InteractiveMap.getMapLayer('npc_dota_spawner');
    var pathLayer = this.InteractiveMap.getMapLayer('path_corner');
    if (!layer || !pathLayer) return;
    var features = layer.getSource().getFeatures();
    if (!this.startTime) this.startTime = this.currentTime;
    if (this.paused) {
        if (this.pauseTime == null) this.pauseTime = frameState.time;
        this.currentTime = this.pauseTime;
    }
    else {
        if (this.pauseTime != null) {
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                var waveTimes = feature.get('waveTimes');
                if (waveTimes) {
                    var j = waveTimes.length;
                    while (j--) {
                        waveTimes[j] += (this.currentTime - this.pauseTime);
                    }
                }
            }
            this.startTime += (this.currentTime - this.pauseTime);
            this.pauseTime = null;
        }
    }
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        var id = feature.getId();
        var pathFeature = pathLayer.getSource().getFeatureById(id);
        var waveTimes = feature.get('waveTimes');
        if (!waveTimes) {
            waveTimes = [this.currentTime];
            feature.set('waveTimes', waveTimes, true);
        }
        if (this.currentTime - waveTimes[waveTimes.length - 1] >= 30000 / this.playbackSpeed) {
            waveTimes.push(this.currentTime);
        }
        var j = waveTimes.length;
        while (j--) {                
            var path = feature.get('path');
            if (!path) {
                var path = pathFeature.getGeometry().clone();
                var coords = path.getCoordinates();
                coords[0] = feature.getGeometry().getCoordinates();
                path.setCoordinates(coords);
                feature.set('path', path, true);
            }
            var pathLength = path.getLength();
            var coords = path.getCoordinates();
            var elapsedTime = this.currentTime - waveTimes[j];
            var elapsedDistance = getElapsedDistance(this.InteractiveMap.version, id, elapsedTime, this.playbackSpeed);
            var elapsedFraction = Math.max(0, elapsedDistance / pathLength);
            if (elapsedFraction >= 1) {
                var endPoint = coords[coords.length - 1];
                waveTimes.splice(j, 1);
            }
            else {
                var endPoint = path.getCoordinateAt(elapsedFraction);
            }

            var point = new Circle(endPoint);
            vectorContext.setStyle(styles.creepColor(feature));
            vectorContext.drawCircle(point);
        }
    }
    var timeText = (((this.currentTime - this.startTime) % (60000 / this.playbackSpeed)) / 1000 * this.playbackSpeed).toFixed(1) + 's';
    if (this.playbackSpeed > 1) timeText += ', ' + this.playbackSpeed + 'x'
    this.setContent(timeText);
    frameState.animate = true;
}

export default CreepControl;