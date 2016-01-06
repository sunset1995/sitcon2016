// when error occur, dump err info instead of crash watch
exports.errorLog = function(error){
	console.log(error);
	console.error.bind(error);
	this.emit('end');
}
