var errorLog = require('./_errorLog.js').errorLog;
var jsPath = require('./_config.js').js;

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');

gulp.task('js', function(){
	return gulp.src(jsPath.src)
		.pipe(browserify({
			paths: jsPath.include_paths
		}))
		.on('error', errorLog)
		.pipe(concat('sitcon2016.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(jsPath.dst));
});

gulp.task('js-debug', function(){
	return gulp.src(jsPath.src)
		.pipe(browserify({
			paths: jsPath.include_paths
		}))
		.on('error', errorLog)
		.pipe(concat('sitcon2016.js'))
		.pipe(buffer())
		.pipe(gulp.dest(jsPath.dst));
});
