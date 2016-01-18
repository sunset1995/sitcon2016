var config = require('./_config')

var gulp = require('gulp')
var browserSync = require('browser-sync');
var reload = browserSync.reload

gulp.task('watch', ['default'], function() {
    browserSync({
        server: {
            baseDir: config.html.dst
        }
    })

    gulp.watch(config.html.watch, ['html', reload])
    gulp.watch(config.scss.watch, ['scss', reload])
    gulp.watch(config.js.watch, ['js', reload])
    gulp.watch(config.cfp.watch, ['cfp', reload])
})
