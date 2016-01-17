require('../lib/dom.js');
require('../lib/fancybox.js');

var eventList = [
	'event-lighting-talk',
	'event-salon',
	'event-unconference',
	'event-angel',
	'event-code-puzzle',
	'event-booth'
];

for(var i=0; i<eventList.length; ++i) {
	var eventDOM = Qid(eventList[i]);
	addEvent(eventDOM, 'click', function() {
		var storageDOM = Qid(eventList[i]+'-info');
		return function() {
			fancybox.setContent(storageDOM.innerHTML);
			fancybox.open();
		};
	}());
	eventDOM = null;
}
