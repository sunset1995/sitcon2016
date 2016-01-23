require('dom.js');

resizeHandler = function() {
	var stk = [];
	var handle = function() {
		var nowWidth = document.body.offsetWidth;
		for(var i=0; i<stk.length; ++i)
			stk[i](nowWidth);
	}
	addEvent(window, 'resize', handle);
	return {
		regist: function(matainer) {
			if( typeof matainer !== 'function' )
				return;
			stk.push(matainer);
		},
		forceHandle: function() {
			handle();
		}
	}
}();
