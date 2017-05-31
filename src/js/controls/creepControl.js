import Circle from 'ol/geom/circle';
import Observable from 'ol/observable';
import mapConstants from './../mapConstants';
import styles from './../styleDefinitions';

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
    var features = this.InteractiveMap.getMapLayerIndex()['npc_dota_spawner'].getSource().getFeatures();
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
    var features = this.InteractiveMap.getMapLayerIndex()['npc_dota_spawner'].getSource().getFeatures();
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        feature.set('waveTimes', null, true);
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

function getElapsedDistance(id, elapsedTime, playbackSpeed, bNoAdjust) {
    elapsedTime = elapsedTime * playbackSpeed;
    var base = mapConstants.creepBaseMovementSpeed;
    if (bNoAdjust) return getDistance(base, elapsedTime);
    switch (id) {
        case 'npc_dota_spawner_good_bot':
            if (elapsedTime < 10000) {
                return getDistance(base * 1.25, elapsedTime);
            }
            else {
                return getDistance(base * 1.25, 10000) + getDistance(base, elapsedTime - 10000);
            }
        break;
        case 'npc_dota_spawner_bad_top':
            if (elapsedTime < 2000) {
                return getDistance(base * 1.25, elapsedTime);
            }
            else {
                return getDistance(base * 1.25, 2000) + getDistance(base, elapsedTime - 2000);
            }
        break;
        case 'npc_dota_spawner_good_top':
            if (elapsedTime < 2000) {
                return getDistance(base * 0.75, elapsedTime);
            }
            else {
                return getDistance(base * 0.75, 2000) + getDistance(base, elapsedTime - 2000);
            }
        break;
        case 'npc_dota_spawner_bad_bot':
            if (elapsedTime < 22000) {
                return getDistance(base * 0.75, elapsedTime);
            }
            else {
                return getDistance(base * 0.75, 22000) + getDistance(base, elapsedTime - 22000);
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
    var features = this.InteractiveMap.getMapLayerIndex()['npc_dota_spawner'].getSource().getFeatures();
    var pathLayer = this.InteractiveMap.getMapLayerIndex()['path_corner'];
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
            var elapsedDistance = getElapsedDistance(id, elapsedTime, this.playbackSpeed);
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