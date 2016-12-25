var pp = require('preprocess');
var config = require('../config');

config.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log('NODE_ENV', config.NODE_ENV);
pp.preprocessFileSync('www/index.html', 'build/index.html', config);