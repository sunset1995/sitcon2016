require('./dom.js');
var perfectScrollBar = require('perfect-scrollbar');

fancybox = function() {
	var fancybox = Qid('fancybox');
	var fancyBg = Qid('fancybox-bg');
	var fancyContainer = Qid('fancybox-container');
	var fancyboxForward1 = Qid('fancybox-forward1');
	var fancyboxForward2 = Qid('fancybox-forward2');
	var blurArea = Qid('blur-area');
	var locked = false, opened = false;

	var content = fancyContainer.querySelector('.content');
	var xx = fancyContainer.querySelector('.xx');
	var str = '';
	perfectScrollBar.initialize(content);

	var duration = 530;
	var step2 = function() {
		content.innerHTML = str;
		perfectScrollBar.update(content);
		content.style.opacity	= xx.style.opacity
								= '1';
		document.documentElement.style.overflowY = 'hidden';
		setTimeout(function() {
			if( opened )
				addClass(blurArea, 'blur');
		}, 500)
	};
	var step1 = function() {
		addClass(fancyboxForward1, 'open');
		addClass(fancyboxForward2, 'open');
		addClass(fancyContainer, 'open');
		setTimeout(step2, duration);
	};
	var reset = function() {
		removeClass(fancyboxForward1, 'open');
		removeClass(fancyboxForward2, 'open');
		removeClass(fancyContainer, 'open');
		content.style.opacity	= xx.style.opacity
								= '0';
	};

	var close = function() {
		opened = false;
		fancybox.style.display = 'none';
		document.documentElement.style.overflowY = 'scroll';
		removeClass(blurArea, 'blur');
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
			locked = opened = true;
			fancybox.style.display = 'block';
			setTimeout(step1, 100);
		},
		close: close
	}
}();
