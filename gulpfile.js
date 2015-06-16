var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect-multi')();



gulp.task('stylus', function(){
    gulp.src(['bower_components/normalize.styl/normalize.styl', 'css/stylus/*.styl', 'css/stylus/!(svg.styl)'])
       .pipe(stylus({compress : true}))
       .pipe(concat('concat.css'))
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


gulp.task('default', ['connect', 'stylus', 'watch', 'svgcss'])

