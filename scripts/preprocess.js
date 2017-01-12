var pp = require('preprocess');
var config = require('../config');
var git = require('git-rev-sync');
var env = process.argv.indexOf('production') !== -1 ? 'production': 'development';
console.log('env', env);
config.NODE_ENV = env;
config.COMMIT_HASH = git.short();
pp.preprocessFileSync('www/index.html', 'build/index.html', config);