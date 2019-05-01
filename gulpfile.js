require('dotenv').config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });
const gulp = require('gulp');
const rollbar = require('gulp-rollbar');
const git = require('git-rev-sync');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('rollbar:sourcemap', () => {
    if (process.env.ROLLBAR_SERVER_TOKEN && process.env.ROLLBAR_SOURCE_MAPPING_URL_PREFIX) {
        return gulp.src('build/**/*.min.js')
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(rollbar({
                accessToken: process.env.ROLLBAR_SERVER_TOKEN,
                version: git.long(),
                sourceMappingURLPrefix: process.env.ROLLBAR_SOURCE_MAPPING_URL_PREFIX,
            }));
    }
    console.log('No rollbar config.');
});
