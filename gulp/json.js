var errorLog = require('./_errorLog.js').errorLog;
var jsonPath = require('./_config.js').json;

var gulp = require('gulp');

gulp.task('json', function(){
	return gulp.src(jsonPath.src)
		.on('error', errorLog)
		.pipe(gulp.dest(jsonPath.dst));
});
