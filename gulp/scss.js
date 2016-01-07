var errorLog = require('./_errorLog.js').errorLog;
var scssPath = require('./_config.js').scss;

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var scssCompileMode = function(output_style) {
    var output_style = output_style || 'compressed';
	return function() {
		gulp.src(scssPath.src)
			.pipe(sass({
				outputStyle: output_style
			}))
			.on('error', errorLog)
			.pipe(autoprefixer(['last 10 version']))
			.pipe(rename('sitcon2016.css'))
			.pipe(gulp.dest(scssPath.dst));
	};
};

gulp.task('scss', scssCompileMode());
gulp.task('scss-debug', scssCompileMode('nested'));
