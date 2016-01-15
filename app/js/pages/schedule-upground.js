require('../lib/dom.js');
var perfectScrollBar = require('perfect-scrollbar');

var eventList = [
	'event-lighting-talk',
	'event-salon',
	'event-unconference',
	'event-angel',
	'event-code-puzzle',
	'event-booth'
];

var fancybox = Qid('fancybox-event-detail');

var closeArea = fancybox.querySelector('.closearea');
var closeX = fancybox.querySelector('.close');
addEvent(closeArea, 'click', function() {
	closeFancyboxEventDetail();
});
addEvent(closeX, 'click', function() {
	closeFancyboxEventDetail();
});
closeArea = closeX = null;

var container = fancybox.querySelector('.container');
perfectScrollBar.initialize(container);

var content = fancybox.querySelector('.content');

for(var i=0; i<eventList.length; ++i) {
	var eventDOM = Qid(eventList[i]);
	addEvent(eventDOM, 'click', function() {
		var storageDOM = Qid(eventList[i]+'-info');
		return function() {
			content.innerHTML = storageDOM.innerHTML;
			openFancyboxEventDetail();
		};
	}());
	eventDOM = null;
}

function openFancyboxEventDetail() {
	perfectScrollBar.update(container);
	fancybox.style.display = 'block';
	document.documentElement.style.overflow = 'hidden';
}
function closeFancyboxEventDetail() {
	fancybox.style.display = 'none';
	document.documentElement.style.overflow = 'auto';
}
