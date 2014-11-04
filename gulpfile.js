/*
 * Copyright (c) 2014, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var jshint = require('gulp-jshint');
var gulp   = require('gulp');
var stylish = require('jshint-stylish');

gulp.task('jshint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['jshint']);
});
