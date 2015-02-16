var gulp         = require( 'gulp' );
var gutil        = require( 'gulp-util' );
var rename       = require( 'gulp-rename' );
var connect      = require( 'gulp-connect' );
var zip          = require( 'gulp-zip' );
var sass         = require( 'gulp-sass' );
var minifyCSS    = require( 'gulp-minify-css' );
var autoprefixer = require( 'gulp-autoprefixer' );
var coffeeify    = require( 'gulp-coffeeify' );
var uglify       = require( 'gulp-uglify' );
var minifyHTML   = require( 'gulp-minify-html' );

var removeStar = function( path ) { path.basename = path.basename.substr( 1 ); }
var addMinSuffix = function( path ) { path.basename += '.min'; }

gulp.task( 'assets:scripts', function() {
  gulp.src( [
    'app/scripts/**/[*]*.{js,coffee}',
    '!app/scripts/lib/**/*.{js,coffee}'
  ] )
    .pipe( coffeeify() ).on( 'error', function( error ) { gutil.log( error ); } )
    .pipe( rename( removeStar ) )
    .pipe( gulp.dest( 'dist/scripts' ) )
    .pipe( uglify() )
    .pipe( rename( addMinSuffix ) )
    .pipe( gulp.dest( 'dist/scripts' ) )
    .pipe( connect.reload() );
  
  gulp.src( 'app/scripts/lib/**/[*]*.js' )
    .pipe( rename( removeStar ) )
    .pipe( gulp.dest( 'dist/scripts/lib' ) )
    .pipe( connect.reload() );
} );

gulp.task( 'assets:styles', function() {
  gulp.src( [ 
    'app/styles/**/[*]*.{css,scss}',
    '!app/styles/lib/**/*.{css,scss}'
  ] )
    .pipe( sass() ).on( 'error', function( error ) { gutil.log( error ); } )
    .pipe( autoprefixer() )
    .pipe( rename( removeStar ) )
    .pipe( gulp.dest( 'dist/styles' ) )
    .pipe( minifyCSS() )
    .pipe( rename( addMinSuffix ) )
    .pipe( gulp.dest( 'dist/styles' ) )
    .pipe( connect.reload() );

  gulp.src( 'app/styles/lib/**/[*]*.css' )
    .pipe( rename( removeStar ) )
    .pipe( gulp.dest( 'dist/styles/lib' ) )
    .pipe( connect.reload() );
} );

gulp.task( 'assets:templates', function() {
  gulp.src( 'app/**/*.html' )
    .pipe( minifyHTML() )
    .pipe( gulp.dest( 'dist' ) )
    .pipe( connect.reload() );
} );

gulp.task( 'assets', [
  'assets:scripts',
  'assets:styles',
  'assets:templates'
] );

gulp.task( 'watch', [ 'assets' ], function() {
  connect.server( {
    port: 8000,
    root: 'dist',
    livereload: true
  } );

  gulp.watch( 'app/scripts/**/*.{js,coffee}', [ 'assets:scripts' ]   );
  gulp.watch( 'app/styles/**/*.{css,scss}',   [ 'assets:styles' ]    );
  gulp.watch( 'app/**/*.html',                [ 'assets:templates' ] );
} );

gulp.task( 'dist', [ 'assets' ], function() {
  gulp.src( 'config.xml' )
    .pipe( gulp.dest( 'dist' ) );
  
  // TODO: zip
  // gulp.src( 'dist' )
  //   .pipe( zip( 'dist.zip' ) )
  //   .pipe( gulp.dest( './' ) );
} );
