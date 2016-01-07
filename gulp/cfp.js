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

gulp.task('cfp', ['cfp-scss', 'cfp-others']);

gulp.task('cfp-scss', function() {
	return gulp.src(cfpPath.scss.src)
		.pipe(sass())
		.on('error', errorLog )
		.pipe(concat('landingpage.css'))
		.pipe(autoprefixer(['last 10 version']))
		.pipe(cssmin())
		.pipe(gulp.dest(cfpPath.scss.dst));
});

gulp.task('cfp-others', function() {
	return gulp.src(cfpPath.allOthers.src)
		.pipe(gulp.dest(cfpPath.allOthers.dst));
});
