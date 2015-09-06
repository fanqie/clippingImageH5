'use strict';

var gulp=require('gulp');
var watch=require('gulp-watch');
var concat=require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');

gulp.task('jshint',function(){
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('compressCss',function(){
    return gulp.src('./src/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css/'));
});
gulp.task('compressJs',function(){
    return gulp.src('./src/js/*.js')
        .pipe(concat('clippingImageH5.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});
gulp.task('default',function(){
    gulp.watch(['./src/css/*','./src/js/*'],['jshint','compressJs','compressCss']);
});
