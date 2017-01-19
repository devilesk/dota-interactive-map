var fs = require('fs');
var git = require('git-rev-sync');
var browserify = require('browserify');
var watchify = require('watchify');
var exorcist = require('exorcist');
var UglifyJS = require("uglify-js");

var env = process.argv.indexOf('production') !== -1 ? 'production': 'development';
var bWatch = process.argv.indexOf('watch') !== -1 ? true : false;

try {
    var config = require('../config.json');
}
catch (e) {
    var config = require('../config.example.json');
}

var npmConfig = require('../package.json');
var releaseVersion = npmConfig.version;

console.log(process.argv);
console.log('env', env);
console.log('version', releaseVersion);
console.log('watch', bWatch);

var src = './src/js/index.js';
var root = env == 'development' ? './www/' : './dist/';
var hash = env == 'development' ? '.' : '-' + git.short() + '.' ;
var dst = root + 'bundle' + hash + 'js';
var mapfile = dst + '.map';

var opts = {
    debug:true,
    standalone: 'InteractiveMap',
    entries: [src],
    cache: {},
    packageCache: {}
};
if (bWatch) opts.plugin = [watchify];

function bundle() {
    b.bundle()
     .on('error', console.error)
     .pipe(exorcist(mapfile))
     .pipe(fs.createWriteStream(dst));
}
    
var b = browserify(opts);
b.transform('browserify-replace', {
    replace: [
        { from: /#build_date/, to: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' UTC' },
        { from: /#release_tag/, to: releaseVersion },
        { from: /#code_version/, to: git.long() },
        { from: /#rollbar_client_token/, to: config.rollbar.client_token || "" },
        { from: /#rollbar_environment/, to: env }
    ]
})
if (bWatch) b.on('update', bundle);

bundle();