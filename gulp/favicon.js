var errorLog = require('./_errorLog.js').errorLog;
var faviconPath = require('./_config.js').favicon;

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task("favicon", function () {
	return gulp.src(faviconPath.src)
		.pipe(imagemin())
		.on('error', errorLog)
		.pipe(gulp.dest(faviconPath.dst));
});
