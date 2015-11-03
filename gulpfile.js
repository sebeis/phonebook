const gulp = require('gulp'),
browserify = require('browserify'),
babelify = require('babelify'),
source = require('vinyl-source-stream'),
gutil = require('gulp-util');

gulp.task('js', function() {
	return browserify({
    	entries: './src/main.js',
    	debug: true
  	})
    .transform(babelify, {
			presets: 'es2015'
		})
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('index', function() {
	gulp.src('src/index.html').pipe(gulp.dest('bundle'));
})
