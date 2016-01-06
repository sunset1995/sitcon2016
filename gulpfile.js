/*
*	Program to manage preprocess tasks
*	All gulp's task in ./gulp/
*/

var fs = require('fs');

fs.readdirSync('./gulp')
	.forEach(function( task ){
		if( task[0] != '_' )
			require('./gulp/' + task);
	});
