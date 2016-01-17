require('./dom.js');
var perfectScrollBar = require('perfect-scrollbar');

fancybox = function() {
	var fancybox = Qid('fancybox');
	var fancyForward = Qid('fancybox-forwardbox');
	var fancyBg = Qid('fancybox-bg');
	var fancyContainer = Qid('fancybox-container');
	var locked = false;

	var content = fancyContainer.querySelector('.content');
	var xx = fancyContainer.querySelector('.xx');
	var str = '';
	perfectScrollBar.initialize(content);

	var duration = 1000;
	var step3 = function() {
		content.innerHTML = str;
		perfectScrollBar.update(content);
		content.style.opacity	= xx.style.opacity
								= '1';
	}
	var step2 = function() {
		addClass(fancyForward, 'open');
		addClass(fancyBg, 'open');
		addClass(fancyContainer, 'open');
		setTimeout(step3, duration+200);
	};
	var step1 = function() {
		addClass(fancyForward, 'in');
		addClass(fancyBg, 'in');
		addClass(fancyContainer, 'in');
		setTimeout(step2, duration);
	};
	var reset = function() {
		removeClass(fancyForward, 'in');
		removeClass(fancyBg, 'in');
		removeClass(fancyContainer, 'in');
		removeClass(fancyForward, 'open');
		removeClass(fancyBg, 'open');
		removeClass(fancyContainer, 'open');
		content.style.opacity	= xx.style.opacity
								= '0';
	};

	var close = function() {
		fancybox.style.display = 'none';
		reset();
		locked = false;
	}
	addEvent(fancyBg, 'click', close);
	addEvent(xx, 'click', close);

	return {
		setContent: function(val) {
			str = val;
		},
		open: function() {
			if( locked ) return;
			locked = true;
			fancybox.style.display = 'block';
			setTimeout(step1, 100);
		},
		close: close
	}
}();
