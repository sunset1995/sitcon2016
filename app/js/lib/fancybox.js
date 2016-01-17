require('./dom.js');
var perfectScrollBar = require('perfect-scrollbar');

fancybox = function() {
	var fancybox = Qid('fancybox');
	var fancyBg = Qid('fancybox-bg');
	var fancyContainer = Qid('fancybox-container');
	var locked = false;

	var content = fancyContainer.querySelector('.content');
	var xx = fancyContainer.querySelector('.xx');
	var str = '';
	perfectScrollBar.initialize(content);

	var duration = 530;
	var step3 = function() {
		content.innerHTML = str;
		perfectScrollBar.update(content);
		content.style.opacity	= xx.style.opacity
								= '1';
	}
	var step2 = function() {
		addClass(fancyContainer, 'open');
		setTimeout(step3, duration);
	};
	var step1 = function() {
		addClass(fancyContainer, 'in');
		setTimeout(step2, duration);
	};
	var reset = function() {
		removeClass(fancyContainer, 'in');
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
