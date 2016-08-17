var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var preprocess = require('gulp-preprocess');
var imagemin = require('gulp-imagemin');
var gulpSequence = require('gulp-sequence');
var uglify = require('gulp-uglify');
var pump = require('pump');
var path = require('path')
var spawn = require('child_process').spawn;

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('css', function () {
    return gulp.src([
          'openlayers.css',
          'interactivemap.css'
        ])
        .pipe(concat('interactivemap.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'))
});

gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(preprocess({context: { NODE_ENV: 'production'}})) //To set environment variables in-line 
        .pipe(gulp.dest('dist/'))
});

gulp.task('image', function () {
    return gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('build', function (cb) {
    var dir = path.resolve(process.cwd(), './ol2/build');
    console.log(dir);
    spawn('python', ['build.py', '../../interactivemap.cfg'], { cwd: dir, stdio: 'inherit' }).on('close', cb);
});

gulp.task('minify', function (cb) {
    pump([
        gulp.src([
            'ol2/build/OpenLayers.js',
            'interactivemap.js'
        ]),
        uglify({ compress: { drop_console: true, dead_code: true } }),
        concat('interactivemap.js'),
        gulp.dest('dist')
    ],
    cb
    );
});

gulp.task('copy', function () {
    return gulp
        .src('data.json')
        .pipe(gulp.dest('dist'));
});