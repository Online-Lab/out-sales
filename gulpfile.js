var gulp          = require('gulp'),
    stylus        = require('gulp-stylus'),
    concat        = require('gulp-concat'),
    autoprefixer  = require('gulp-autoprefixer'),
    uglify        = require('gulp-uglifyjs'),
    order         = require('gulp-order'),
    print         = require('gulp-print'),
    // clean         = require('gulp-clean'),
    connect       = require('gulp-connect-multi')();


// gulp.task('clean', function(){
//   gulp.src(['css/built', 'js/build'], {read: false})
//       .pipe(clean({force: true}));
// });


gulp.task('stylus', function(){
    gulp.src(['css/stylus/*.styl', '!css/stylus/first.styl'])
      .pipe(stylus({compress : true}))
      .pipe(concat('concat.css'))
      .pipe(autoprefixer())
      .pipe(gulp.dest('css/build'));
});


gulp.task('style-first', function(){
    gulp.src(['bower_components/normalize.styl/normalize.styl', 
              'css/stylus/first.styl'])
       .pipe(stylus({compress : true}))
       .pipe(concat('first.css'))
       .pipe(autoprefixer())
       .pipe(gulp.dest('css/build'));
});


gulp.task('svgcss', function(){
    gulp.src(['css/stylus/svg.styl'])
       .pipe(stylus({compress : true}))
       .pipe(concat('svg.css'))
       .pipe(autoprefixer())
       .pipe(gulp.dest('css/build'));
});



gulp.task('connect', connect.server({
  root: ['../out-sales'],
  port: 3000,
  livereload: true,
  open: {
    browser: 'Google Chrome' // if not working OS X browser: 'Google Chrome' 
  }
}));


gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});


gulp.task('js', function () {
  gulp.src('*.js')
    .pipe(connect.reload());
});


gulp.task('watch', function(){
    gulp.watch(['css/stylus/*.styl'], ['stylus']);
    gulp.watch(['*.html'], ['html']);
    gulp.watch(['*.js'], ['js']);
});


gulp.task('uglify', function() {
  gulp.src(['js/*.js', 
    'js/vendor/jquery-1.11.3.min.js',
    'bower_components/slick.js/slick/slick.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/ngDialog/js/ngDialog.min.js'])
    .pipe(order([
        // 'js/vendor/modernizr-2.8.3.min.js',
        'js/vendor/jquery-1.11.3.min.js',
        'bower_components/slick.js/slick/slick.min.js', 
        'bower_components/angular/angular.min.js',
        'bower_components/ngDialog/js/ngDialog.min.js',
        'js/jquery.maskedinput.min.js',
        'js/classie.js',
        'js/main.js',
        'js/app.js'
      ], { base: './' }))
    .pipe(print())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('js/build'))
});



gulp.task('default', ['connect', 'style-first', 'stylus', 'watch', 'svgcss', 'uglify']);

