require('requestAnimationFrame.js');
require('dom.js');
var perfectScrollBar = require('perfect-scrollbar');

fancybox = function() {
	var fancybox = Qid('fancybox');
	var fancyBg = Qid('fancybox-bg');
	var fancyContainer = Qid('fancybox-container');
	var fancyboxForward1 = Qid('fancybox-forward1');
	var fancyboxForward2 = Qid('fancybox-forward2');
	var blurArea = Qid('blur-area');
	var locked = false;

	var content = fancyContainer.querySelector('.content');
	var xx = fancyContainer.querySelector('.xx');
	var str = '';
	perfectScrollBar.initialize(content);

	var stepCnt = 0;
	var starttime = null;
	var eachstep = [
		{
			stime: 0,
			dostep: function() {
				fancybox.style.display = 'block';
			}
		},
		{
			stime: 100,
			dostep: function() {
				addClass(fancyboxForward1, 'open');
			}
		},
		{
			stime: 116,
			dostep: function() {
				addClass(fancyboxForward2, 'open');
			}
		},
		{
			stime: 132,
			dostep: function() {
				addClass(fancyContainer, 'open');
			}
		},
		{
			stime: 600,
			dostep: function() {
				disableScroll();
			}
		},
		{
			stime: 616,
			dostep: function() {
				content.innerHTML = str;
			}
		},
		{
			stime: 632,
			dostep: function() {
				content.scrollTop = 0;
			}
		},
		{
			stime: 648,
			dostep: function() {
				perfectScrollBar.update(content);
			}
		},
		{
			stime: 664,
			dostep: function() {
				content.style.opacity = '1';
			}
		},
		{
			stime: 700,
			dostep: function() {
				xx.style.opacity = '1';
			}
		},
		{
			stime: 1200,
			dostep: function() {
				addClass(blurArea, 'blur');
				locked = false;
			}
		}
	];
	function openStep(nowtime) {
		if( starttime === null )
			starttime = nowtime;
		var passtime = nowtime - starttime;
		if( passtime > eachstep[stepCnt].stime ) {
			eachstep[stepCnt].dostep();
			++stepCnt;
		}
		if( stepCnt < eachstep.length )
			requestAnimationFrame(openStep);
	}

	function reset() {
		removeClass(blurArea, 'blur');
		removeClass(fancyboxForward1, 'open');
		removeClass(fancyboxForward2, 'open');
		removeClass(fancyContainer, 'open');
		content.style.opacity = '0';
		xx.style.opacity = '0';
		locked = false;
	}

	function close() {
		if( locked ) return;
		enableScroll();
		fancybox.style.display = 'none';
		requestAnimationFrame(reset);
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
			stepCnt = 0;
			starttime = null;
			requestAnimationFrame(openStep);
		},
		close: close
	}
}();

function preventScroll(e) {
	e.preventDefault();
}
function disableScroll() {
	addEvent(document.documentElement, 'DOMMouseScroll', preventScroll);
	addEvent(document.documentElement, 'touchmove', preventScroll);
}
function enableScroll() {
	removeEvent(document.documentElement, 'DOMMouseScroll', preventScroll);
	removeEvent(document.documentElement, 'touchmove', preventScroll);
}
