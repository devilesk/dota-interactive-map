var path = require('path');
var execSync = require('child_process').execSync;
var glob = require("glob");
var fs = require('fs');
var git = require('git-rev-sync');
var config = require('../config.json');

execSync('mkdir -p dist');
execSync('rm -rf dist/*');
execSync('cp -r build/* dist/');

glob("dist/**/*.{js,css,map,png}", function (er, files) {
    console.log(files);

    var jsMap = {};
    
    // rev files and update references in index.html
    files.forEach(function (filePath) {
        var buffer = fs.readFileSync(filePath);
        var hash = git.short();
        var basename = path.basename(filePath);
        var ext = path.extname(basename);
        var filename = basename.slice(0, -path.extname(basename).length);
        var revFilename = filename + '.' + hash + ext;
        var tmpPath = path.join(path.dirname(filePath), revFilename);
        if (ext != '.png' || config.vision_data_image_path.indexOf(filename) !== -1) {
            console.log(basename, revFilename);
            execSync('mv ' + filePath + ' ' + tmpPath);
            execSync("replace " + basename + " " + revFilename + " dist/index.html");
        }
        
        if (ext === '.js') {
            execSync("replace " + basename + ".map " + basename + "." + hash + ".map " + tmpPath);
        }
        
        if (ext === '.map') {
            console.log('map basename', filename.replace('.min', '.' + hash));
            execSync("replace " + filename.replace('.min', '') + " " + filename.replace('.min', '.' + hash) + " " + tmpPath);
        }
    });
});