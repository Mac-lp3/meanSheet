var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
 
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
    './public/stylesheets/*.css',
    './public/javascripts/*.js'
  ]).on('change', browserSync.reload);
});