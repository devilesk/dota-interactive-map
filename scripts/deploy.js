var config = require('../config.json');
var path = require('path');
var execSync = require('child_process').execSync;
var del = require('del');

var env = process.argv.indexOf('production') !== -1 ? 'production': 'development';
console.log('env', env);

var deployPath = config.deployPath[env];

// clean and move to deploy directory
var normalizedPath = path.normalize(deployPath);
var paths = [
    normalizedPath + '/**/*',
]
console.log(paths);
del.sync(paths, {force: true});
execSync('cp -r build/* ' + normalizedPath);