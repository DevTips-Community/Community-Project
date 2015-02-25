var gulp         = require('gulp');
var rename       = require('gulp-rename');
var connect      = require('gulp-connect');
var browserify   = require('gulp-coffeeify');
var jshint       = require('gulp-jshint');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var removeStar = function(path) { path.basename = path.basename.substr(1); };

gulp.task('app:scripts', function() {
  gulp.src('app/src/scripts/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

  gulp.src('app/src/scripts/src/[*]*.js')
    .pipe(browserify())
    .pipe(rename(removeStar))
    .pipe(gulp.dest('app/src/scripts'))
    .pipe(connect.reload());
});

gulp.task('app:styles', function() {
  gulp.src('app/src/styles/src/[*]*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 32,
      errLogToConsole: true,
      onSuccess: function(result) { console.log('Successfully compiled scss @ %s', result.stats.entry) }
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename(removeStar))
    .pipe(gulp.dest('app/src/styles'))
    .pipe(connect.reload());
});

gulp.task('app:templates', function() {
  gulp.src('app/src/**/*.html')
    .pipe(connect.reload());
});

gulp.task('app', ['app:scripts', 'app:styles'], function() {
  connect.server({
    port: 4240,
    root: 'app/src',
    livereload: true
  });

  gulp.watch('app/src/scripts/src/**/*.js', ['app:scripts']);
  gulp.watch('app/src/styles/src/**/*.scss', ['app:styles']);
  gulp.watch('app/src/**/*.html', ['app:templates']);
});
