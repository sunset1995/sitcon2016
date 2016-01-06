var config = require('./_config.js');

var gulp = require('gulp');
var browsersSync = require('browser-sync');

gulp.task('debug' , ['scss-debug'] , function(){
	var reload = browsersSync.reload;
	browsersSync({
		server: {
			baseDir: './build/'
		}
	});

	gulp.watch(config.scss.watch, ['scss-debug', reload]);
});
