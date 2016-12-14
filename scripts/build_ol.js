var path = require('path');
var spawn = require('child_process').spawn;
var dir = path.resolve(process.cwd(), './ol2/build');
console.log(dir);
spawn('python', ['build.py', '../../interactivemap.cfg'], { cwd: dir, stdio: 'inherit' });