
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('debug' , ['cfp'] , function(){
	gulp.watch('./landingpage.scss' , ['cfp']);
})

gulp.task('cfp' , function(){
	return gulp.src( './cfp/landingpage.scss' )
		.pipe(sass())
		.on('error' , errorLog )
		.pipe(autoprefixer(['last 10 version']))
		.pipe(cssmin())
		.pipe(gulp.dest( './cfp' ));
});

function errorLog(error){
	console.log(error.toString());
	console.error.bind(error);
	this.emit('end');
}