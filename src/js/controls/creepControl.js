var mapConstants = require('./../mapConstants');
var styles = require('./../styleDefinitions');

function CreepControl(InteractiveMap) {
    this.InteractiveMap = InteractiveMap;
    this.postComposeListener = null;
    this.postComposeHandler = this.animateCreeps.bind(this);
    this.playbackSpeed = 1;
    this.paused = true;
    this.pauseTime = null;
}

CreepControl.prototype.show = function (message) {
    console.log('show', message);
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
    
    this.playPause();
}

CreepControl.prototype.slower = function () {
    
}

CreepControl.prototype.faster = function () {
    
}

CreepControl.prototype.stop = function () {
    
}

CreepControl.prototype.playPause = function () {
    console.log('playPause', this.paused);
    this.paused = !this.paused;
    if (this.paused) {
        this.playPauseBtn.innerHTML = '&#9658;';
    }
    else {
        this.playPauseBtn.innerHTML = '&#10074;&#10074;';
    }
}

CreepControl.prototype.activate = function () {
    this.InteractiveMap.toggleLayerMenuOption('npc_dota_spawner', true);
    this.InteractiveMap.toggleLayerMenuOption('path_corner', true);
    if (!this.postComposeListener) {
        console.log('activate');
        this.postComposeListener = this.InteractiveMap.map.on('postcompose', this.postComposeHandler);
    }
    this.show();
}

CreepControl.prototype.deactivate = function () {
    this.InteractiveMap.toggleLayerMenuOption('npc_dota_spawner', false);
    this.InteractiveMap.toggleLayerMenuOption('path_corner', false);
    ol.Observable.unByKey(this.postComposeListener);
    this.postComposeListener = null;
    this.close();
    this.startTime = null;
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
    var currentTime = frameState.time;
    var features = this.InteractiveMap.getMapLayerIndex()['npc_dota_spawner'].getSource().getFeatures();
    var pathLayer = this.InteractiveMap.getMapLayerIndex()['path_corner'];
    if (!this.startTime) this.startTime = currentTime;
    if (this.paused) {
        if (this.pauseTime == null) this.pauseTime = frameState.time;
        currentTime = this.pauseTime;
    }
    else {
        if (this.pauseTime != null) {
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                var waveTimes = feature.get('waveTimes');
                if (waveTimes) {
                    var j = waveTimes.length;
                    while (j--) {
                        waveTimes[j] += (currentTime - this.pauseTime);
                    }
                }
            }
            this.startTime += (currentTime - this.pauseTime);
            this.pauseTime = null;
        }
    }
    //console.log('InteractiveMap.getMapLayerIndex()', InteractiveMap.getMapLayerIndex());
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        var id = feature.getId();
        var pathFeature = pathLayer.getSource().getFeatureById(id);
        //console.log('npc_dota_spawner feature', feature, pathFeature);
        var waveTimes = feature.get('waveTimes');
        if (!waveTimes) {
            waveTimes = [currentTime];
            feature.set('waveTimes', waveTimes, true);
        }
        if (currentTime - waveTimes[waveTimes.length - 1] >= 30000 / this.playbackSpeed) {
            waveTimes.push(currentTime);
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
            var elapsedTime = currentTime - waveTimes[j];
            var elapsedDistance = getElapsedDistance(id, elapsedTime, this.playbackSpeed);
            var elapsedFraction = Math.max(0, elapsedDistance / pathLength);
            if (elapsedFraction >= 1) {
                var endPoint = coords[coords.length - 1];
                waveTimes.splice(j, 1);
            }
            else {
                var endPoint = path.getCoordinateAt(elapsedFraction);
            }

            var point = new ol.geom.Circle(endPoint);
            vectorContext.setStyle(styles.creepColor(feature));
            vectorContext.drawCircle(point);
        }
    }
    var timeText = (((currentTime - this.startTime) % (60000 / this.playbackSpeed)) / 1000 * this.playbackSpeed).toFixed(1);
    if (this.playbackSpeed > 1) timeText += ' ' + this.playbackSpeed + 'x'
    this.setContent(timeText);
    frameState.animate = true;
}

module.exports = CreepControl;