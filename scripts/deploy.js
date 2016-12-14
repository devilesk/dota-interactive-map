var config = require('../config.json');
var path = require('path');
var execSync = require('child_process').execSync;
var del = require('del');

// clean and move to deploy directory
var normalizedPath = path.normalize(config.path);
var paths = [
    normalizedPath + '/**/*',
]
console.log(paths);
del.sync(paths, {force: true});
execSync('cp -r dist/* ' + normalizedPath);