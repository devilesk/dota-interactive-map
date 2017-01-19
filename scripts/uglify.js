var fs = require('fs');
var git = require('git-rev-sync');
var UglifyJS = require("uglify-js");

var root = './dist/';
var src = root + 'bundle-' + git.short() + '.js';
var dst = root + 'bundle-' + git.short() + '.min.js';
var srcMap = root + 'bundle-' + git.short() + '.js.map';
var dstMap = 'bundle-' + git.short() + '.min.js.map';
var dstMapfile = root + dstMap;

var result = UglifyJS.minify(src, {
    inSourceMap: srcMap,
    outSourceMap: dstMapfile,
    sourceMapUrl: dstMap,
    compress: {drop_console: true}
});

fs.writeFile(dst, result.code, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("File was successfully saved.");
    }
});

fs.writeFile(dstMapfile, result.map, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("File was successfully saved.");
    }
});