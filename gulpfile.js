const gulp = require('gulp'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
	del = require('del'),
	buffer = require('vinyl-buffer');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('watch', ['connect'], function() {
	gulp.start('reload');
  gulp.watch(['src/**/*'], ['reload']);
});

gulp.task('connect', function() {
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
			presets: ['es2015', 'react']
		}).on('error', handleError)
    .bundle().on('error', handleError)
    .pipe(source('bundle.js'))
		.pipe(buffer())
		//.pipe(sourcemaps.init({loadMaps: true}))
    	//.pipe(uglify()).on('error', gutil.log)
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('index', function() {
	gulp.src('src/index.html').pipe(gulp.dest('build'));
});
