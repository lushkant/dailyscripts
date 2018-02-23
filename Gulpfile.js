/**
 * @package gulp webdev script
 * @version 1.0.0
 * @description Gulp Task Running script for day-to-day
 * web development
 * @author Krishna Kant Chourasiya
 * Requires following node modules to be installed
 * gulp gulp-sass gulp-autoprefixer gulp-newer
 * gulp-imagemin browser-sync gulp-concat gulp-uglify
 * gulp-sourcemaps gulp-watch
 **/

// You probably know what's this if don't ignore (optional) 
"use strict"

// Importing all the node modules and 
// declaring them in variable containers
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    newer = require('gulp-newer'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    imgSrc = 'assets/images/origin/*',
    imgDest = 'assets/images/';

const AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
];

//  Browsersync task
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

// Sass compiler task
gulp.task('sass', function () {
    return gulp.src('assets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

// Browsersync Watch Files task
gulp.task('watch', function () {

    // Sass files
    gulp.watch('assets/sass/*.scss', ['sass']).on("change", browserSync.reload);
    gulp.watch('assets/sass/**/*.scss', ['sass']).on("change", browserSync.reload);
    gulp.watch('assets/sass/**/*.scss', ['sass']).on("change", browserSync.reload);

    // HTML Files
    gulp.watch('src/*.html').on("change", browserSync.reload);
    gulp.watch('src/**/*.html').on("change", browserSync.reload);

    // JS Files
    gulp.watch('assets/js/**/*.js', ['js']).on("change", browserSync.reload);

    // Image Files
    gulp.watch(imgSrc, ['images']).on("change", browserSync.reload);
});

// Image minification task
gulp.task('images', function () {
    return gulp.src(imgSrc, { base: 'assets/images/origin' })
        .pipe(newer(imgDest))
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(imgDest));
});

var jsInput = { js: 'assets/js/dev/**/*.js' }
var jsOutput = 'assets/js/dist';

// JS minification task
gulp.task('js', function () {
    return gulp.src(jsInput.js)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/dist'))
});

// Final & Default Task
gulp.task('default', ['sass', 'browser-sync', 'watch', 'images', 'js']);
