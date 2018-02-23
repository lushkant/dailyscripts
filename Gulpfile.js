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
    imgSrc = 'assets/images/originals/*',
    imgDest = 'assets/images/';

//  Browsersync task
gulp.task('browser-sync', function() {
    browerSync.init({
        server: "localhost:3000"
    });
});

// Sass compiler task
gulp.task('sass', function() {
    return gulp.src('assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(sass({ outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./'));
});

// Browsersync Watch Files task
gulp.task('watch', function() {

    // Sass files
    gulp.watch('assets/sass/*.scss', ['sass']).on("change", browserSync.reload);
    gulp.watch('assets/sass/**/*.scss', ['sass']).on("change", browserSync.reload);
    gulp.watch('assets/sass/**/*.scss', ['sass']).on("change", browserSync.reload);

    // HTML Files
    gulp.watch('src/*.html', ['html']).on("change", browserSync.reload);
    gulp.watch('src/**/*.html', ['html']).on("change", browserSync.reload);

    // JS Files
    gulp.watch('assets/js/**/*.js', ['js']).on("change", browserSync.reload);

    // Image Files
    gulp.watch($imgSrc, ['images']).on("change", browserSync.reload);
});

// Image minification task
gulp.task('images', function() {
    return gulp.src(imgSrc, {base: 'assets/images/origin'})
    .pipe(newer(imgDest))
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(imgDest));
});

var jsInput = { js: 'assets/js/dev/**/*.js' }
var jsOutput = 'assets/js/dist';

// JS minification task
gulp.task('js', function() {
    return gulp.src(jsInput.js)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/dist'))
});

// Final & Default Task
gulp.task('default', ['sass', 'browser-sync', 'watch', 'images', 'js']);
