var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var preprocess = require('gulp-preprocess');
var imagemin = require('gulp-imagemin');
var gulpSequence = require('gulp-sequence');
var uglify = require('gulp-uglify');
var pump = require('pump');
var del = require('del');
var path = require('path');
var spawn = require('child_process').spawn;

var deploy_dir = '/srv/www/devilesk.com/dota2/apps/interactivemap3';

gulp.task('default', ['build']);

gulp.task('css', function () {
    return gulp.src([
          'src/openlayers.css',
          'src/interactivemap.css'
        ])
        .pipe(concat('interactivemap.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'))
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(preprocess({context: { NODE_ENV: 'production'}})) //To set environment variables in-line 
        .pipe(gulp.dest('dist/'))
});

gulp.task('image', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('build-ol', function (cb) {
    var dir = path.resolve(process.cwd(), './ol2/build');
    console.log(dir);
    spawn('python', ['build.py', '../../interactivemap.cfg'], { cwd: dir, stdio: 'inherit' }).on('close', cb);
});

gulp.task('minify', function (cb) {
    pump([
        gulp.src([
            'ol2/build/OpenLayers.js',
            'src/interactivemap.js'
        ]),
        uglify({ compress: { drop_console: true, dead_code: true } }),
        concat('interactivemap.js'),
        gulp.dest('dist')
    ],
    cb
    );
});

gulp.task('copy-data', function () {
    return gulp
        .src('src/data687.json'),
        .src('src/data700.json')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean-build', function () {
    return del([
        'dist/**/*'
    ], {force: true});
});

gulp.task('build', gulpSequence('clean-build', ['css', 'html', 'image', 'build-ol', 'copy-data'], 'minify'));

gulp.task('clean', function () {
    return del([
        deploy_dir +'/**/*'
    ], {force: true});
});

gulp.task('deploy', ['clean'], function () {
    return gulp
        .src('dist/**/*')
        .pipe(gulp.dest(deploy_dir));
});