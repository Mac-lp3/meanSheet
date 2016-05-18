'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
 
gulp.task('dev', function() {
 
  nodemon({
    script: 'bin/www',
    watch: ['app.js', 'routes/*', 'model/*'],
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
 
  browserSync.init({
        proxy: 'localhost:3000',
        port: 3001
  });
 
  browserSync.watch([
    './public/html/*.html',
    './public/app/**.*',
    './public/app/views/**.*',
    './public/stylesheets/*.css',
    './public/javascripts/*.js'
  ]).on('change', browserSync.reload);
});