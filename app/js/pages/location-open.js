require('../lib/dom.js');

var locationOpening = function() {
	removeEvent(Qid('link-location'), 'click',
					locationOpening);
	var locationMap = Qid('location-map');
	setTimeout(function() {
		addClass(locationMap, 'middle');
	}, 1000);
	setTimeout(function() {
		addClass(locationMap, 'open');
		locationMap = null;
	}, 1500);
}

if( location.hash.slice(8) === 'location' ){
	var locationMap = Qid('location-map');
	setTimeout(function() {
		addClass(locationMap, 'middle');
	}, 100);
	setTimeout(function() {
		addClass(locationMap, 'open');
		locationMap = null;
	}, 500);
}
else
	addEvent(Qid('link-location'), 'click',
			locationOpening);
