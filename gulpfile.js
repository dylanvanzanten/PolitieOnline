"use strict";

const gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gp_sourcemaps = require('gulp-sourcemaps'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    mergeMQ = require('gulp-merge-media-queries'),
    d = new Date(),
    headerComment = '/*Generated on:' + d + '*/\n';

// folders
const distFolder = 'dist/',
      srcFolder = 'src/';

// watch gulp task
gulp.task('watch', function () {

    // watch for JS changes
    gulp.watch(srcFolder + '**/*.js', ['scripts']);

    gulp.watch(srcFolder + '**/*.scss', ['sass']);
});

gulp.task('scripts', () => {
    return browserify({entries: srcFolder + 'index.js', debug: false})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gp_sourcemaps.init())
        // .pipe(gp_uglify())
        .pipe(gp_concat('index.js'))
        .pipe(gp_sourcemaps.write())
        .pipe(gulp.dest(distFolder))
        .on('error', onError);
});

gulp.task('sass', () => {
    return gulp.src(srcFolder + 'scss/style.scss')
        .on('error', onError)
        .pipe(sass().on('error', sass.logError))
        .pipe(gp_sourcemaps.init())
        .pipe(autoprefixer({
          browsers: ['> 1%'],
          cascade: false,
          remove: false
        }))
        .pipe(mergeMQ({ log: true }))
        .pipe(cssnano())
        .pipe(gp_rename('style.css'))
        .pipe(gp_sourcemaps.write())
        .pipe(gulp.dest(distFolder));
});

gulp.task('default', ['watch'], function(){});

function onError(err) {
  console.log(err.toString());
  this.emit('end');
}
