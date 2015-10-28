
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('debug' , ['scss'] , function(){
	gulp.watch('./landingpage.scss' , ['scss']);
})

gulp.task('scss' , function(){
	return gulp.src( './landingpage.scss' )
		.pipe(sass())
		.on('error' , errorLog )
		.pipe(autoprefixer(['last 10 version']))
		.pipe(cssmin())
		.pipe(gulp.dest( './' ));
});

function errorLog(error){
	console.log(error.toString());
	console.error.bind(error);
	this.emit('end');
}