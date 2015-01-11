var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  sass: ['./scss/**/*.scss', './www/css/**/*.scss'],
	js: ['./www/js/**/*.js']
};

gulp.task('default', ['sass']);

gulp.task('sass', function() {
  gulp.src(paths.sass)
  .pipe(concat('style.min.css'))
  .pipe(sass())
  .pipe(minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(gulp.dest('./www/'))
});

gulp.task('js', function() {
	gulp.src(paths.js)
	.pipe(concat('app.min.js'))
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(gulp.dest('./www/'))
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.js, ['js']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
