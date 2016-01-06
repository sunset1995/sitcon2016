/*
*	Style for Call For Paper
*	http://sitcon.org/2016/cfp/
*/
var errorLog = require('./_errorLog.js').errorLog;
var cfpPath = require('./_config.js').cfp;

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('cfp', function(){
	return gulp.src(cfpPath.src)
		.pipe(sass())
		.on('error', errorLog )
		.pipe(concat('landingpage.css'))
		.pipe(autoprefixer(['last 10 version']))
		.pipe(cssmin())
		.pipe(gulp.dest(cfpPath.dst));
});
