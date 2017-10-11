const path = require('path');
const gulp = require('gulp');
//const logger = require('./applogger');
const usemin = require('gulp-usemin');
const minifyHtml = require('gulp-minify-html');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const minifyCss = require('gulp-minify-css');
const clean = require('gulp-clean');
const flatten = require('gulp-flatten');
const gulpWebpack = require('gulp-webpack');

gulp.task('webpack', ['clean'], function() {
  const webPackConfig = require('./webpack.config.js');
  return gulp.src(path.resolve(__dirname, 'client', 'Route.jsx'))
  .pipe(gulpWebpack(webPackConfig))
  .pipe(gulp.dest(path.resolve(__dirname, 'client', 'assets')));
});

gulp.task('usemin', ['clean', 'webpack'], function() {
  return gulp.src(['client/*.html'])
  .pipe(usemin({
    html: [minifyHtml({
      empty: true
    })],
    js: [uglify(), rev()],
    inlinejs: [uglify()],
    css: [rev()],
    inlinecss: [minifyCss()]
  })).pipe(gulp.dest('dist/server/public'));
});

gulp.task('copy:package.json', ['clean'], function() {
  return gulp.src('package.json')
  .pipe(gulp.dest('dist/'));
});

gulp.task('copy:server', ['clean'], function() {
  gulp.src(['server/**/*'])
  .pipe(gulp.dest('dist/server/'));
});

gulp.task('clean', function() {
  return gulp.src('dist', {
    read: false
  })
  .pipe(clean());
});

gulp.task('copy', ['copy:package.json', 'copy:server']);

gulp.task('build', ['usemin', 'copy']);

gulp.task('default', ['build']);
