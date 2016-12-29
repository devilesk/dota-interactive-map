var path = require('path');
var spawn = require('child_process').spawn;
var dir = path.resolve(process.cwd(), './ol2/build');
console.log(dir);
var compiler = process.argv[3] || '';

spawn('python', ['build.py', '-c', compiler, '../../interactivemap.cfg', '../../src/OpenLayers.js'], { cwd: dir, stdio: 'inherit' });