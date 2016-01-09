var errorLog = require('./_errorLog.js').errorLog;
var imagePath = require('./_config.js').image;

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('image', function() {
	return gulp.src(imagePath.src)
		.pipe(imagemin())
		.on('error', errorLog)
		.pipe(gulp.dest(imagePath.dst));
});
