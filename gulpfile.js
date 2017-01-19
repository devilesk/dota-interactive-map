var gulp = require('gulp');
var rollbar = require('gulp-rollbar');
var git = require('git-rev-sync');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./config.json');

gulp.task('rollbar:sourcemap', function () {
    return gulp.src('dist/**/*.min.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(rollbar({
          accessToken: config.rollbar.server_token,
          version: git.long(),
          sourceMappingURLPrefix: config.rollbar.sourceMappingURLPrefix
        }))
});