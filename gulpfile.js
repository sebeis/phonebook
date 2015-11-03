const gulp = require('gulp'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	connect = require('gulp-connect'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
	del = require('del');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('watch', ['connect'], function() {
	gulp.start('reload');
  gulp.watch(['src/**/*'], ['reload']);
});

gulp.task('connect', ['clean'], function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('clean', function() {
	return del('build');
});

gulp.task('reload', ['js', 'index'], function() {
  gulp.src('').pipe(connect.reload());
});

gulp.task('js', function() {
	return browserify({
    	entries: './src/main.js',
    	debug: true
  	})
    .transform(babelify, {
			presets: 'es2015'
		})
    .on('error', handleError)
    .bundle()
    .on('error', handleError)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('index', function() {
	gulp.src('src/index.html').pipe(gulp.dest('build'));
});
