var gulp         = require('gulp');
var rename       = require('gulp-rename');
var connect      = require('gulp-connect');
var browserify   = require('gulp-coffeeify');
var jshint       = require('gulp-jshint');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var removeStar = function(path) { path.basename = path.basename.substr(1); };

gulp.task('scripts', function() {
  gulp.src('www/scripts/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

  gulp.src('www/scripts/src/[*]*.js')
    .pipe(browserify())
    .pipe(rename(removeStar))
    .pipe(gulp.dest('www/scripts'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  gulp.src('www/styles/src/[*]*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 32,
      errLogToConsole: true,
      onSuccess: function(result) { console.log('Successfully compiled scss @ %s', result.stats.entry) }
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename(removeStar))
    .pipe(gulp.dest('www/styles'))
    .pipe(connect.reload());
});

gulp.task('templates', function() {
  gulp.src('www/**/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', ['scripts', 'styles'], function() {
  connect.server({
    port: 4240,
    root: 'www',
    livereload: true
  });

  gulp.watch('www/scripts/src/**/*.js', ['scripts']);
  gulp.watch('www/styles/src/**/*.scss', ['styles']);
  gulp.watch('www/**/*.html', ['templates']);
});
