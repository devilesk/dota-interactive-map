var ol = require('openlayers');
var styles = require('./../styleDefinitions');
var proj = require('./../projections');

function writeFile(fileName, fileData) {
    var stream = FS.open(fileName, 'w+');
    var data = new Uint8Array(fileData);
    console.log('data length', data.length);
    FS.write(stream, data, 0, data.length, 0);
    FS.close(stream);
    console.log(fileName, 'written');
}

function ReplayViewerControl(InteractiveMap, fileInputId) {
    this.InteractiveMap = InteractiveMap;
    this.postComposeListener = null;
    this.postComposeHandler = this.animate.bind(this);
    this.playbackSpeed = 1;
    this.paused = true;
    this.fileInputId = fileInputId;
    this.fileInput = document.getElementById(this.fileInputId);
    this.file = null;
    this.reader = null;
    this.parser = null;
    Module.addOnPreMain(this.onPreMain.bind(this));
}

ReplayViewerControl.prototype.start = function () {
    if (!this.postComposeListener) {
        this.postComposeListener = this.InteractiveMap.map.on('postcompose', this.postComposeHandler);
    }
    this.InteractiveMap.map.render();
}

ReplayViewerControl.prototype.stop = function () {
    ol.Observable.unByKey(this.postComposeListener);
    this.postComposeListener = null;
    this.InteractiveMap.map.render();
}

ReplayViewerControl.prototype.onPreMain = function (event) {
    console.log('onPreMain');

    if (window.FileReader) {
        this.fileInput.addEventListener("change", this.handleFiles.bind(this), false);
    }
}

ReplayViewerControl.prototype.handleFiles = function (event) {
    console.log('fileSelect', this.fileInput.files);
    this.file = this.fileInput.files[0];
    console.log(this.file);
    this.reader = new FileReader();
    this.reader.onload = this.onReplayLoad.bind(this)
    this.reader.readAsArrayBuffer(this.file);
}

ReplayViewerControl.prototype.onReplayLoad = function (event) {
    console.log('file read', this.reader.result.slice(0, 8));
    var fileData = this.reader.result;
    writeFile(this.file.name, fileData);
    if (this.parser) this.parser.delete();
    this.parser = new Module['ReplayViewer']();
    console.log('parser', this.parser, this.file.name);
    this.parser.open(this.file.name);
    console.log('onReplayLoad done');
}

ReplayViewerControl.prototype.animate = function (event) {
    console.log('animate');
    if (!this.parser) return;
    
    var vectorContext = event.vectorContext;
    
    var frameState = event.frameState;
    this.currentTime = frameState.time;
    
    this.parser.replayTick += 30;
    var tickState = this.parser.getCurrentTickState();
    console.log('tick', tickState.tick, 'creep count', tickState.creeps.size());
    for (var i = 0; i < tickState.heroes.size(); i++) {
        var hero = tickState.heroes.get(i);
        var coordinate = ol.proj.transform(hero.pos, proj.dota, proj.pixel);
        console.log(hero.className, coordinate);
        console.log(styles.replayViewer.heroes[hero.className]);
        var point = new ol.geom.Point(coordinate);
        var feature = new ol.Feature(point);
        vectorContext.drawFeature(feature, styles.replayViewer.heroes[hero.className]);
    }
    for (var i = 0; i < tickState.creeps.size(); i++) {
        var creep = tickState.creeps.get(i);
        var coordinate = ol.proj.transform(creep.pos, proj.dota, proj.pixel);
        var point = new ol.geom.Circle(coordinate);
        vectorContext.setStyle(styles.replayViewer.creeps[creep.team]);
        vectorContext.drawCircle(point);
    }
    
    frameState.animate = true;
    
    /*var features = this.InteractiveMap.getMapLayerIndex()['npc_dota_spawner'].getSource().getFeatures();
    var pathLayer = this.InteractiveMap.getMapLayerIndex()['path_corner'];
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
            var point = new ol.geom.Circle(endPoint);
            vectorContext.setStyle(styles.creepColor(feature));
            vectorContext.drawCircle(point);
        }
    }
    this.setContent(timeText);
    frameState.animate = true;*/
}

module.exports = ReplayViewerControl;