var config = require('./_config.js');

var gulp = require('gulp');
var browsersSync = require('browser-sync');

gulp.task('debug' , ['html', 'scss-debug', 'js-debug', 'cfp'] , function() {
	var reload = browsersSync.reload;
	browsersSync({
		server: {
			baseDir: './build/'
		}
	});

	gulp.watch(config.html.watch, ['html', reload]);
	gulp.watch(config.scss.watch, ['scss-debug', reload]);
	gulp.watch(config.js.watch, ['js-debug', reload]);
	gulp.watch(config.cfp.watch, ['cfp', reload]);
});
