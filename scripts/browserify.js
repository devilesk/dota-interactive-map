var fs = require('fs');
var git = require('git-rev-sync');
var browserify = require('browserify');
var env = process.argv[3] || 'development';
var opts = {
    debug:true,
    standalone: 'InteractiveMap'
};

var outPath = './www/bundle.js';
if (env === 'production') {
    outPath = './build/temp.js';
}

browserify(['./src/app.js'], opts)  // Pass browserify the entry point
        .transform('browserify-replace', {
            replace: [
                { from: /#DEV_BUILD/, to: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' UTC' },
                { from: /#code_version/, to: git.long() },
                { from: /environment: 'development'/, to: "environment: '" + env + "'" }
            ]
        })
        .bundle()
        .on('error', console.error)
        .pipe(fs.createWriteStream(outPath));