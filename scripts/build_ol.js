var path = require('path');
var spawn = require('child_process').spawn;
var dir = path.resolve(process.cwd(), './ol2/build');
console.log(dir);

/*http://docs.openlayers.org/library/deploying.html

The options available for compression are:

closure

This requires you to have a closure-compiler.jar in your tools directory. You can do this by fetching the compiler from:

http://closure-compiler.googlecode.com/files/compiler-latest.zip

Then unzipping that file, and placing compiler.jar into tools and renaming it closure-compiler.jar.*/

spawn('python', ['build.py', '-c', 'closure', '../../interactivemap.cfg'], { cwd: dir, stdio: 'inherit' });