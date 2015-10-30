
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('debug' , ['cfp'] , function(){
	gulp.watch('./cfp/landingpage.scss' , ['cfp']);
	gulp.watch('./cfp/CFP.scss' , ['cfp']);
})

gulp.task('cfp' , function(){
	return gulp.src( ['./cfp/landingpage.scss' , './cfp/CFP.scss'] )
		.pipe(sass())
		.on('error' , errorLog )
		.pipe(concat('landingpage.css'))
		.pipe(autoprefixer(['last 10 version']))
		.pipe(cssmin())
		.pipe(gulp.dest( './cfp' ));
});

function errorLog(error){
	console.log(error.toString());
	console.error.bind(error);
	this.emit('end');
}