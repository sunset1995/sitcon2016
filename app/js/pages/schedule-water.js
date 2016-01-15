require('../lib/dom.js');
require('../lib/mouse.js');
var perfectScrollBar = require('perfect-scrollbar');

var fancyboxTalkDetail = Qid('fancybox-talk-detail');
var circleMask = Qid('circleMask');
var bg = fancyboxTalkDetail.querySelector('.bg');
var container = fancyboxTalkDetail.querySelector('.container');
var locked = false;

perfectScrollBar.initialize(container);

addEvent(bg, 'click', function() {
	fancyboxTalkDetail.style.display = 'none';
	document.documentElement.style.overflowY = 'auto';
	bg.style.display = 'none';
	circleMask.style.display = 'none';
	circleMask.style.transform
	= 'translate(-50%, -50%) scale(0)';
	removeClass(container, 'active');
	locked = false;
});

var createConfFancy = function(dom) {
	return function() {
		if( locked ) return;
		locked = true;
		fancyboxTalkDetail.style.display = 'block';
		circleMask.style.left = mousePosX + 'px';
		circleMask.style.top = mousePosY + 'px';
		circleMask.style.display = 'block';

		setTimeout(function() {
			var x = document.body.offsetWidth*2;
			circleMask.style.transform
			= 'translate(-50%, -50%) scale('+x+')';
		}, 100);
		setTimeout(function() {
			document.documentElement.style.overflowY = 'hidden';
			bg.style.display = 'block';
			circleMask.style.display = 'none';
			addClass(container, 'active');
		}, 1100)
	};
}

Qall('#page-schedule .clickable', function(ele) {
	addEvent(ele, 'click', createConfFancy(ele));
});
	
